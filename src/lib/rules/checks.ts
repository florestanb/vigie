import type { Constat, DonneesCrawl, Entreprise, PageLegale } from "../types";
import { SERVICES } from "../crawler/trackers";

/**
 * Vérifications automatiques, sans IA : elles ne lisent que ce que le crawler a observé.
 * Une vérification renvoie null quand elle n'a rien à dire (la règle reste alors « à vérifier »).
 */
type Check = (c: DonneesCrawl, e: Entreprise | null) => Constat | null;

const page = (c: DonneesCrawl, type: PageLegale["type"]) => c.pagesLegales.find((p) => p.type === type);
const liste = (xs: string[], max = 5) => xs.slice(0, max).join(", ") + (xs.length > max ? `… (+${xs.length - max})` : "");

const CATEGORIES_CONSENTEMENT = new Set(["analytics", "publicite", "reseau-social"]);
const CATEGORIES_INTEGRATIONS = new Set(["video", "carte", "polices", "chat"]);

function presencePage(c: DonneesCrawl, type: PageLegale["type"], nom: string): Constat {
  const p = page(c, type);
  if (!p) return { statut: "manquant", preuve: `Aucune page « ${nom} » trouvée depuis la page d'accueil.` };
  const liens = c.liens.filter((l) => l.href.split("#")[0] === p.url.split("#")[0]);
  if (liens.length && !liens.some((l) => l.dansPiedDePage))
    return { statut: "partiel", preuve: `Page trouvée (« ${p.titre} ») mais le lien n'est pas dans le pied de page : il doit être accessible depuis toutes les pages.`, url: p.url };
  if (p.texte.trim().length < 200) return { statut: "partiel", preuve: `La page « ${p.titre} » est quasiment vide (${p.texte.trim().length} caractères).`, url: p.url };
  return { statut: "conforme", preuve: `Page « ${p.titre} » accessible.`, url: p.url };
}

/** Les SIREN respectent l'algorithme de Luhn. */
export function luhn(n: string): boolean {
  let somme = 0;
  for (let i = 0; i < n.length; i++) {
    let d = Number(n[n.length - 1 - i]);
    if (i % 2 === 1) d = d * 2 > 9 ? d * 2 - 9 : d * 2;
    somme += d;
  }
  return somme % 10 === 0;
}

export const CHECKS: Record<string, Check> = {
  "page-mentions": (c) => presencePage(c, "mentions-legales", "Mentions légales"),
  "page-confidentialite": (c) => presencePage(c, "confidentialite", "Politique de confidentialité"),
  "page-cgv": (c) => presencePage(c, "cgv", "Conditions générales de vente"),
  "page-cgu": (c) => presencePage(c, "cgu", "Conditions générales d'utilisation"),

  "identite-editeur": (c) => {
    const id = c.identite;
    const manque = [!id.capital && "capital social", !id.rcs && "registre d'immatriculation"].filter(Boolean) as string[];
    if (!page(c, "mentions-legales")) return { statut: "manquant", preuve: "Pas de page de mentions légales." };
    return manque.length ? { statut: "partiel", preuve: `Non trouvé dans les mentions : ${manque.join(", ")}.` } : null;
  },

  contact: (c) => {
    const { emails, telephones } = c.identite;
    if (emails.length && telephones.length) return { statut: "conforme", preuve: `${emails[0]} · ${telephones[0]}` };
    if (emails.length || telephones.length)
      return { statut: "partiel", preuve: `Trouvé : ${[...emails, ...telephones].slice(0, 2).join(", ")}. Manque ${emails.length ? "un numéro de téléphone" : "une adresse e-mail"}.` };
    const formulaire = c.formulaires.some((f) => /contact/i.test(f.page));
    return { statut: formulaire ? "partiel" : "manquant", preuve: formulaire ? "Seul un formulaire de contact est proposé : une adresse e-mail et un téléphone sont exigés." : "Ni e-mail ni téléphone trouvés dans les pages légales." };
  },

  siren: (c, e) => {
    if (!c.identite.siren.length) return { statut: "manquant", preuve: "Aucun numéro SIREN ou RCS trouvé dans les mentions légales." };
    const n = c.identite.siren[0];
    if (!luhn(n)) return { statut: "partiel", preuve: `Le numéro ${n} n'est pas un SIREN valide (clé de contrôle incorrecte).` };
    if (e) return { statut: "conforme", preuve: `SIREN ${n} : ${e.nom}${e.formeJuridique ? ` (${e.formeJuridique})` : ""}, vérifié au répertoire Sirene.` };
    return { statut: "partiel", preuve: `SIREN ${n} trouvé mais introuvable au répertoire Sirene : à vérifier.` };
  },

  tva: (c) =>
    c.identite.tva.length
      ? { statut: "conforme", preuve: `Numéro ${c.identite.tva[0]}.` }
      : { statut: "a-verifier", preuve: "Aucun numéro de TVA trouvé. Il n'est pas exigé en franchise en base de TVA ; sinon, il faut l'ajouter." },

  "directeur-publication": (c) =>
    !page(c, "mentions-legales")
      ? { statut: "manquant", preuve: "Pas de page de mentions légales." }
      : c.identite.directeurPublication
        ? { statut: "conforme", preuve: "Directeur ou responsable de la publication mentionné." }
        : { statut: "manquant", preuve: "Aucun directeur de la publication indiqué." },

  hebergeur: (c) => {
    if (!c.identite.hebergeur) return { statut: "manquant", preuve: "L'hébergeur n'est pas identifié dans les pages légales." };
    if (c.identite.hebergeur === "mentionné") return { statut: "partiel", preuve: "Un hébergeur est évoqué mais Vigie n'a pas reconnu son nom : vérifier nom, adresse et téléphone." };
    return { statut: "conforme", preuve: `Hébergeur : ${c.identite.hebergeur}. Vérifier que l'adresse et le téléphone figurent.` };
  },

  "formulaires-mention": (c) => {
    const personnels = c.formulaires.filter((f) => f.champs.some((x) => /email|tel|nom|name|phone|adresse|address|password/i.test(x)));
    if (!personnels.length) return null;
    const sansMention = personnels.filter((f) => !/confidentialit|donn[ée]es personnelles|rgpd|vie priv[ée]e|privacy|traitement de vos donn/i.test(f.texteProche));
    if (!sansMention.length) return { statut: "conforme", preuve: `${personnels.length} formulaire(s), tous accompagnés d'une mention d'information.` };
    return {
      statut: sansMention.length === personnels.length ? "manquant" : "partiel",
      preuve: `${sansMention.length} formulaire(s) sur ${personnels.length} sans mention d'information ni lien vers la politique de confidentialité (${liste(sansMention.map((f) => new URL(f.page).pathname), 3)}).`,
      url: sansMention[0].page,
    };
  },

  https: (c) =>
    c.https ? { statut: "conforme", preuve: "Site servi en HTTPS." } : { statut: "manquant", preuve: `Le site est servi en clair (${new URL(c.urlFinale).protocol}).` },

  "traceurs-avant-consentement": (c) => {
    const services = [
      ...c.requetesAvantConsentement.filter((r) => CATEGORIES_CONSENTEMENT.has(r.categorie)).map((r) => r.service ?? r.domaine),
      ...c.cookiesAvantConsentement.filter((k) => CATEGORIES_CONSENTEMENT.has(k.categorie)).map((k) => `cookie ${k.nom}${k.service ? ` (${k.service})` : ""}`),
    ];
    const uniques = [...new Set(services)];
    if (!uniques.length) return { statut: "conforme", preuve: "Aucun traceur publicitaire ou de mesure d'audience non exemptée n'a été chargé avant le consentement." };
    return { statut: "manquant", preuve: `Chargés dès l'arrivée, sans consentement : ${liste(uniques, 8)}.` };
  },

  "integrations-tierces": (c) => {
    const tiers = [...new Set(c.requetesAvantConsentement.filter((r) => CATEGORIES_INTEGRATIONS.has(r.categorie)).map((r) => r.service ?? r.domaine))];
    if (!tiers.length) return { statut: "conforme", preuve: "Aucune intégration tierce (vidéo, carte, polices) chargée avant consentement." };
    return { statut: "partiel", preuve: `Contenus tiers chargés sans consentement : ${liste(tiers)}. Les héberger localement ou les bloquer jusqu'au choix de l'internaute.` };
  },

  cmp: (c) =>
    c.cmp
      ? { statut: "conforme", preuve: `Solution de consentement détectée : ${c.cmp}.` }
      : { statut: "manquant", preuve: "Aucun bandeau ou outil de gestion du consentement détecté." },

  "bouton-refus": (c) => {
    if (c.boutonRefus === true) return { statut: "conforme", preuve: "Un bouton de refus est visible au premier niveau du bandeau." };
    if (c.boutonRefus === false) return { statut: "manquant", preuve: `Le bandeau${c.cmp ? ` (${c.cmp})` : ""} propose d'accepter mais aucun bouton « Tout refuser » n'est visible au premier niveau.` };
    return c.cmp ? { statut: "a-verifier", preuve: "Bandeau détecté mais ses boutons n'ont pas pu être lus." } : null;
  },

  "duree-cookies": (c) => {
    const longs = c.cookiesAvantConsentement.filter((k) => k.expireJours !== null && k.expireJours > 395);
    if (!longs.length) return c.cookiesAvantConsentement.length ? { statut: "conforme", preuve: "Aucun cookie observé au-delà de 13 mois." } : null;
    return { statut: "partiel", preuve: `Cookies de plus de 13 mois : ${liste(longs.map((k) => `${k.nom} (${k.expireJours} jours)`))}.` };
  },

  "mesure-audience": (c) => {
    const tous = [...c.requetesAvantConsentement.map((r) => r.service), ...c.cookiesAvantConsentement.map((k) => k.service)].filter(Boolean) as string[];
    const nonExemptes = SERVICES.filter((s) => s.categorie === "analytics" && !s.exempte && tous.includes(s.service)).map((s) => s.service);
    const exemptes = SERVICES.filter((s) => s.categorie === "analytics" && s.exempte && tous.includes(s.service)).map((s) => s.service);
    if (nonExemptes.length) return { statut: "manquant", preuve: `${liste(nonExemptes)} ne bénéficie(nt) pas de l'exemption CNIL et a/ont été chargé(s) sans consentement.` };
    if (exemptes.length) return { statut: "a-verifier", preuve: `${liste(exemptes)} peut être exempté de consentement s'il est configuré selon les conditions CNIL (IP anonymisée, pas de recoupement).` };
    return null;
  },

  "lien-retractation": (c) =>
    c.signaux.lienRetractation
      ? { statut: "conforme", preuve: "Un lien ou bouton de rétractation est présent sur le site." }
      : { statut: "manquant", preuve: "Aucun lien ou bouton « Se rétracter » trouvé. Obligatoire depuis le 19 juin 2026." },

  "lien-resiliation": (c) =>
    c.signaux.lienResiliation
      ? { statut: "conforme", preuve: "Un lien de résiliation est présent." }
      : { statut: "a-verifier", preuve: "Aucun lien « Résilier » visible sur les pages publiques. Il peut se trouver dans l'espace client : à vérifier." },

  mediateur: (c) =>
    c.identite.mediateur
      ? { statut: "conforme", preuve: "Un médiateur de la consommation est mentionné." }
      : { statut: "manquant", preuve: "Aucun médiateur de la consommation mentionné." },

  "lien-odr": (c) =>
    c.signaux.lienODR ? { statut: "a-retirer", preuve: "Le site renvoie encore vers la plateforme européenne RLL, fermée depuis le 20 juillet 2025." } : null,

  "mention-accessibilite": (c) =>
    c.signaux.mentionAccessibilite
      ? { statut: "conforme", preuve: "Mention ou déclaration d'accessibilité présente." }
      : { statut: "manquant", preuve: "Aucune mention « Accessibilité : … conforme » ni déclaration d'accessibilité trouvée." },

  "allegations-vertes": (c) =>
    c.signaux.allegationsVertes.length
      ? { statut: "a-verifier", preuve: `Termes relevés : ${liste(c.signaux.allegationsVertes.map((a) => `« ${a} »`))}. Chacun doit être précis et justifié, sinon le retirer.` }
      : null,

  langue: (c) =>
    !c.langue || c.langue.toLowerCase().startsWith("fr")
      ? { statut: "conforme", preuve: "Contenu proposé en français." }
      : { statut: "partiel", preuve: `La page d'accueil est déclarée en « ${c.langue} » : l'offre et les conditions doivent exister en français.` },

  "message-alcool": (c) =>
    c.signaux.messageAlcool
      ? { statut: "conforme", preuve: "Message sanitaire présent." }
      : { statut: "manquant", preuve: "Le message « L'abus d'alcool est dangereux pour la santé… » n'a pas été trouvé." },
};

export function executerChecks(c: DonneesCrawl, e: Entreprise | null, ids: string[]): Record<string, Constat> {
  const r: Record<string, Constat> = {};
  for (const id of ids) {
    const fn = CHECKS[id];
    const res = fn?.(c, e);
    if (res) r[id] = res;
  }
  return r;
}
