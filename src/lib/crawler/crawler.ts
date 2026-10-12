import { chromium, type Browser, type BrowserContext, type Page } from "playwright-core";
import fs from "node:fs";
import type { CookieObserve, DonneesCrawl, Formulaire, Lien, PageLegale, RequeteTierce } from "../types";
import {
  ALLEGATIONS_VERTES,
  CHATBOTS,
  HEBERGEURS,
  MOTIFS_PAGES_LEGALES,
  MOTIFS_PAGES_UTILES,
  PAIEMENTS,
  PLATEFORMES,
  RE,
} from "./patterns";
import { CMP_SIGNATURES, estCookieTechnique, identifierCookie, identifierDomaine } from "./trackers";

const USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 VigieAudit/0.1 (+https://github.com/florestanb/vigie)";
const MAX_PAGES_UTILES = 5;
const MAX_TEXTE_PAGE_LEGALE = 60_000;
const DELAI_PAGE = 25_000;

function cheminChromium(): string | undefined {
  const candidats = [
    process.env.CHROMIUM_PATH,
    "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];
  return candidats.find((c) => c && fs.existsSync(c));
}

/** Domaine enregistrable approximatif (exemple.fr, exemple.co.uk). */
export function domaineRacine(host: string): string {
  const parties = host.replace(/^www\./, "").split(".");
  const secondNiveau = ["co", "com", "org", "net", "gouv", "asso", "ac"];
  if (parties.length > 2 && secondNiveau.includes(parties[parties.length - 2])) return parties.slice(-3).join(".");
  return parties.slice(-2).join(".");
}

export function normaliserUrl(saisie: string): string {
  let u = saisie.trim();
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  const url = new URL(u);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Seules les adresses http(s) sont acceptées.");
  const local = /^(localhost|127\.|10\.|192\.168\.|169\.254\.|0\.|\[::1\])/.test(url.hostname) || url.hostname.endsWith(".local");
  if (local && process.env.VIGIE_AUTORISER_LOCAL !== "1") {
    throw new Error("Cette adresse ne pointe pas vers un site public.");
  }
  url.hash = "";
  return url.toString();
}

interface ExtraitPage {
  url: string;
  titre: string;
  langue: string | null;
  texte: string;
  html: string;
  liens: Lien[];
  formulaires: Omit<Formulaire, "page">[];
  scripts: string[];
}

// Script exécuté dans la page. Écrit en JavaScript brut (chaîne) pour échapper aux transformations
// du bundler (helpers comme __name) qui n'existent pas dans le navigateur.
const SCRIPT_EXTRACTION = `(() => {
  const estPied = (el) => !!el.closest('footer, [role="contentinfo"], #footer, .footer, [class*="footer" i], [id*="footer" i]');
  const liens = Array.from(document.querySelectorAll("a[href]")).map((a) => ({
    texte: (a.innerText || a.getAttribute("aria-label") || a.getAttribute("title") || "").trim().replace(/\\s+/g, " ").slice(0, 120),
    href: a.href,
    dansPiedDePage: estPied(a),
  }));
  const formulaires = Array.from(document.querySelectorAll("form"))
    .map((f) => {
      const champs = Array.from(f.querySelectorAll("input, textarea, select"))
        .filter((c) => !["hidden", "submit", "button"].includes(c.type))
        .map((c) => (c.type === "text" || !c.type ? c.getAttribute("name") || c.getAttribute("autocomplete") || "texte" : c.type));
      const conteneur = f.parentElement || f;
      const recherche = f.getAttribute("role") === "search" || !!f.querySelector('input[type="search"], input[name="q"], input[name="s"]');
      return { champs, texteProche: (conteneur.innerText || "").replace(/\\s+/g, " ").slice(0, 1200), recherche };
    })
    .filter((f) => f.champs.length > 0 && !(f.recherche && f.champs.length <= 2))
    .map((f) => ({ champs: f.champs, texteProche: f.texteProche }));
  return {
    titre: document.title,
    langue: document.documentElement.getAttribute("lang"),
    texte: document.body ? document.body.innerText : "",
    liens,
    formulaires,
    scripts: Array.from(document.scripts).map((s) => s.src).filter(Boolean),
  };
})()`;

async function extrairePage(page: Page): Promise<ExtraitPage> {
  const donnees = (await page.evaluate(SCRIPT_EXTRACTION)) as Omit<ExtraitPage, "url" | "html">;
  return { ...donnees, url: page.url(), html: await page.content() };
}

const MOTIF_REFUS = /^\s*(tout\s+refuser|refuser\s+tout|tout\s+rejeter|rejeter\s+tout|refuser(\s+les\s+cookies)?|je\s+refuse|non\s+merci|continuer\s+sans\s+accepter|reject\s+all|decline(\s+all)?|deny|refuse\s+all|nur\s+notwendige)\s*$/i;
const MOTIF_ACCEPTER = /^\s*(tout\s+accepter|accepter(\s+tout|\s+et\s+fermer|\s+les\s+cookies)?|j'accepte|ok|accept(\s+all)?|allow\s+all|agree)\s*$/i;

async function detecterBoutonRefus(page: Page): Promise<{ refus: boolean; accepter: boolean }> {
  const tester = async (motif: RegExp) => {
    const candidats = page.locator('button, a, [role="button"], input[type="button"], input[type="submit"]').filter({ hasText: motif });
    const n = Math.min(await candidats.count(), 10);
    for (let i = 0; i < n; i++) if (await candidats.nth(i).isVisible().catch(() => false)) return true;
    for (const frame of page.frames().slice(1)) {
      const c = frame.locator('button, a, [role="button"]').filter({ hasText: motif });
      if ((await c.count().catch(() => 0)) > 0 && (await c.first().isVisible().catch(() => false))) return true;
    }
    return false;
  };
  return { refus: await tester(MOTIF_REFUS), accepter: await tester(MOTIF_ACCEPTER) };
}

function classerLienLegal(lien: Lien): PageLegale["type"] | null {
  for (const m of MOTIFS_PAGES_LEGALES) {
    if (m.texte.test(lien.texte)) return m.type;
  }
  for (const m of MOTIFS_PAGES_LEGALES) {
    try {
      if (m.url.test(new URL(lien.href).pathname)) return m.type;
    } catch {
      /* lien invalide */
    }
  }
  return null;
}

function uniques<T>(liste: T[], cle: (x: T) => string = (x) => String(x)): T[] {
  const vus = new Set<string>();
  return liste.filter((x) => (vus.has(cle(x)) ? false : (vus.add(cle(x)), true)));
}

export interface OptionsCrawl {
  onEtape?: (message: string) => void;
}

export async function crawler(urlSaisie: string, options: OptionsCrawl = {}): Promise<DonneesCrawl> {
  const debut = Date.now();
  const etape = options.onEtape ?? (() => {});
  const url = normaliserUrl(urlSaisie);
  const erreurs: string[] = [];

  let navigateur: Browser | null = null;
  try {
    const proxy = process.env.VIGIE_PROXY ? { server: process.env.VIGIE_PROXY } : undefined;
    navigateur = await chromium.launch({ executablePath: cheminChromium(), headless: true, args: ["--no-sandbox"], proxy });
    const contexte: BrowserContext = await navigateur.newContext({
      userAgent: USER_AGENT,
      locale: "fr-FR",
      timezoneId: "Europe/Paris",
      viewport: { width: 1366, height: 900 },
      extraHTTPHeaders: { "Accept-Language": "fr-FR,fr;q=0.9" },
    });

    // Aucune interaction avec le bandeau n'a lieu pendant tout le parcours : chaque requête et
    // chaque cookie observés l'ont été sans consentement.
    etape("Ouverture de la page d'accueil");
    const requetes: { host: string; path: string }[] = [];
    contexte.on("request", (r) => {
      try {
        const u = new URL(r.url());
        requetes.push({ host: u.hostname, path: u.pathname });
      } catch {
        /* data:, blob: */
      }
    });
    const page = await contexte.newPage();
    const reponse = await page.goto(url, { waitUntil: "domcontentloaded", timeout: DELAI_PAGE });
    await page.waitForLoadState("networkidle", { timeout: 12_000 }).catch(() => {});
    await page.waitForTimeout(2500);
    const urlFinale = page.url();
    const hoteSite = new URL(urlFinale).hostname;
    const racine = domaineRacine(hoteSite);

    etape("Relevé des cookies et traceurs déposés avant consentement");
    const accueil = await extrairePage(page);
    const { refus, accepter } = await detecterBoutonRefus(page);
    const htmlScripts = accueil.html + accueil.scripts.join(" ");
    const cmp = CMP_SIGNATURES.find((c) => c.motifs.some((m) => m.test(htmlScripts)))?.nom ?? null;

    // 2. Pages légales et pages utiles.
    const liens = uniques(accueil.liens.filter((l) => /^https?:/.test(l.href)), (l) => l.href.split("#")[0] + "|" + l.texte);
    const internes = liens.filter((l) => {
      try {
        return domaineRacine(new URL(l.href).hostname) === racine;
      } catch {
        return false;
      }
    });
    const legales = new Map<PageLegale["type"], string>();
    // Les liens de pied de page sont prioritaires.
    for (const lien of [...internes.filter((l) => l.dansPiedDePage), ...internes]) {
      const type = classerLienLegal(lien);
      if (type && !legales.has(type)) legales.set(type, lien.href.split("#")[0]);
    }
    // Les CGV/CGU hébergées chez un tiers (Shopify policies, etc.) restent sur le même domaine ; on ne suit pas les autres.

    const pagesLegales: PageLegale[] = [];
    const pagesVisitees = [urlFinale];
    const formulaires: Formulaire[] = accueil.formulaires.map((f) => ({ ...f, page: urlFinale }));
    let texteGlobal = accueil.texte;
    let htmlGlobal = accueil.html;
    const dejaVu = new Map<string, PageLegale["type"]>();

    for (const [type, href] of legales) {
      const precedent = dejaVu.get(href);
      if (precedent) {
        // Une même page sert plusieurs documents (ex. « Mentions légales et CGV »).
        const p = pagesLegales.find((x) => x.url === href);
        if (p) pagesLegales.push({ ...p, type });
        continue;
      }
      etape(`Lecture : ${href}`);
      try {
        const p = await contexte.newPage();
        await p.goto(href, { waitUntil: "domcontentloaded", timeout: DELAI_PAGE });
        await p.waitForLoadState("networkidle", { timeout: 6_000 }).catch(() => {});
        const ex = await extrairePage(p);
        pagesLegales.push({ type, url: ex.url, titre: ex.titre, texte: ex.texte.slice(0, MAX_TEXTE_PAGE_LEGALE) });
        formulaires.push(...ex.formulaires.map((f) => ({ ...f, page: ex.url })));
        texteGlobal += "\n" + ex.texte;
        pagesVisitees.push(ex.url);
        dejaVu.set(href, type);
        await p.close();
      } catch (e) {
        erreurs.push(`Page ${href} illisible : ${(e as Error).message.split("\n")[0]}`);
      }
    }

    const utiles = uniques(
      internes
        .filter((l) => !legales.has(classerLienLegal(l) as PageLegale["type"]))
        .filter((l) => MOTIFS_PAGES_UTILES.some((m) => m.test(l.href) || m.test(l.texte)))
        .map((l) => l.href.split("#")[0])
        .filter((h) => h !== urlFinale && !pagesVisitees.includes(h)),
    ).slice(0, MAX_PAGES_UTILES);

    for (const href of utiles) {
      etape(`Exploration : ${href}`);
      try {
        const p = await contexte.newPage();
        await p.goto(href, { waitUntil: "domcontentloaded", timeout: DELAI_PAGE });
        await p.waitForTimeout(1200);
        const ex = await extrairePage(p);
        formulaires.push(...ex.formulaires.map((f) => ({ ...f, page: ex.url })));
        texteGlobal += "\n" + ex.texte;
        htmlGlobal += ex.html;
        pagesVisitees.push(ex.url);
        await p.close();
      } catch (e) {
        erreurs.push(`Page ${href} illisible : ${(e as Error).message.split("\n")[0]}`);
      }
    }

    const cookiesBruts = await contexte.cookies();
    const maintenant = Date.now() / 1000;
    const cookiesAvantConsentement: CookieObserve[] = cookiesBruts
      .filter((c) => !estCookieTechnique(c.name))
      .map((c) => {
        const service = identifierCookie(c.name);
        return {
          nom: c.name,
          domaine: c.domain,
          expireJours: c.expires > 0 ? Math.round((c.expires - maintenant) / 86400) : null,
          service: service?.service,
          categorie: service ? (service.exempte ? "exempte" : service.categorie) : domaineRacine(c.domain.replace(/^\./, "")) === racine ? "premiere-partie" : "inconnu",
        };
      });
    const requetesAvantConsentement: RequeteTierce[] = uniques(
      requetes
        .filter((r) => domaineRacine(r.host) !== racine)
        .map((r) => {
          const s = identifierDomaine(r.host, r.path);
          return { domaine: r.host, categorie: s ? (s.exempte ? "exempte" : s.categorie) : "autre", service: s?.service };
        }),
      (r) => r.service ?? r.domaine,
    );

    // 3. Signaux et identité.
    etape("Analyse des signaux du site");
    const texteLegal = pagesLegales.map((p) => p.texte).join("\n");
    const piedDePage = liens.filter((l) => l.dansPiedDePage).map((l) => l.texte).join(" | ");
    const texteIdentite = texteLegal + "\n" + accueil.texte.slice(-4000);
    const tousLesLiens = liens.map((l) => `${l.texte} ${l.href}`).join("\n");

    const sirens = uniques(
      Array.from(texteIdentite.matchAll(RE.siren)).map((m) => m[1].replace(/\D/g, "").slice(0, 9)).filter((s) => s.length === 9),
    );
    const resultat: DonneesCrawl = {
      url,
      urlFinale,
      https: urlFinale.startsWith("https://") && (reponse?.ok() ?? true),
      langue: accueil.langue,
      titre: accueil.titre,
      pagesVisitees,
      liens: liens.slice(0, 400),
      pagesLegales,
      formulaires: uniques(formulaires, (f) => f.champs.join(",") + f.texteProche.slice(0, 80)).slice(0, 20),
      requetesAvantConsentement,
      cookiesAvantConsentement,
      cmp,
      boutonRefus: cmp || accepter ? refus : null,
      signaux: {
        panier: RE.panier.test(texteGlobal),
        paiement: PAIEMENTS.filter((p) => p.motif.test(htmlGlobal)).map((p) => p.nom),
        prix: RE.prix.test(texteGlobal),
        prixBarres: RE.prixBarre.test(htmlGlobal),
        abonnement: RE.abonnement.test(accueil.texte + tousLesLiens),
        compte: RE.compte.test(tousLesLiens) || formulaires.some((f) => f.champs.includes("password")),
        newsletter: RE.newsletter.test(texteGlobal),
        avis: RE.avis.test(accueil.texte),
        chatbot: CHATBOTS.find((c) => c.motif.test(htmlScripts))?.nom ?? null,
        plateforme: PLATEFORMES.find((p) => p.motif.test(htmlGlobal))?.nom ?? null,
        allegationsVertes: uniques(
          ALLEGATIONS_VERTES.flatMap((re) => {
            const m = texteGlobal.match(re);
            return m ? [m[0]] : [];
          }),
        ).slice(0, 8),
        alcool: (texteGlobal.match(new RegExp(RE.alcool.source, "gi"))?.length ?? 0) >= 4,
        messageAlcool: RE.messageAlcool.test(texteGlobal),
        marketplace: RE.marketplace.test(texteGlobal),
        contenusNumeriques: RE.contenusNumeriques.test(accueil.texte),
        blog: RE.blog.test(tousLesLiens),
        commentaires: RE.commentaires.test(texteGlobal),
        pro: RE.pro.test(accueil.texte),
        reserveAuxPros: RE.reserveAuxPros.test(texteGlobal),
        lienRetractation: liens.some((l) => RE.retractation.test(l.texte) || /retract/i.test(l.href)),
        lienResiliation: liens.some((l) => RE.resiliation.test(l.texte) || /resili/i.test(l.href)),
        lienODR: RE.odr.test(tousLesLiens + texteLegal),
        mentionAccessibilite: RE.accessibilite.test(accueil.texte + piedDePage) || legales.has("accessibilite"),
      },
      identite: {
        siren: sirens,
        tva: uniques(Array.from(texteIdentite.matchAll(RE.tva)).map((m) => m[0].replace(/\s/g, "").toUpperCase())),
        emails: uniques(Array.from(texteIdentite.matchAll(RE.email)).map((m) => m[0].toLowerCase())).filter((e) => !/\.(png|jpe?g|webp|svg)$/.test(e)).slice(0, 5),
        telephones: uniques(Array.from(texteIdentite.matchAll(RE.telephone)).map((m) => m[0])).slice(0, 5),
        rcs: RE.rcs.test(texteIdentite),
        capital: RE.capital.test(texteIdentite),
        hebergeur: (() => {
          const idx = texteLegal.search(RE.hebergeur);
          if (idx < 0) return null;
          const zone = texteLegal.slice(idx, idx + 600);
          return HEBERGEURS.find((h) => h.motif.test(zone))?.nom ?? "mentionné";
        })(),
        directeurPublication: RE.directeur.test(texteLegal),
        mediateur: RE.mediateur.test(texteLegal + tousLesLiens),
      },
      texteAccueil: accueil.texte.slice(0, 8000),
      erreurs,
      duree: Date.now() - debut,
    };
    resultat.signaux.lienODR ||= RE.odr.test(htmlGlobal);
    return resultat;
  } finally {
    await navigateur?.close().catch(() => {});
  }
}
