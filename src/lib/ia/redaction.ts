import { PLANS, type TypeDocument } from "../documents/plans";
import { reglesApplicables } from "../rules/engine";
import type { Audit } from "../types";
import { claude, MODELE, OPTIONS_REPLI } from "./client";

const SYSTEME = `Tu es le rédacteur juridique de Vigie. Tu rédiges, pour un site web précis, un projet de document légal conforme au droit français et au droit de l'Union européenne en vigueur au ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}.

Règles de rédaction :
- Tu suis exactement le plan fourni, dans l'ordre, avec des titres Markdown (## pour les sections).
- Chaque exigence de la liste fournie doit être couverte. Tu n'ajoutes pas d'obligations inventées.
- Tu ne cites que des articles présents dans la liste des sources fournie. Jamais de numéro d'article de mémoire.
- Tu utilises les faits observés sur le site (services tiers réellement détectés, hébergeur, moyens de paiement…) et les réponses de l'utilisateur. Quand une information manque, tu écris [À COMPLÉTER : description précise] au lieu de l'inventer.
- Tu ne recopies pas les clauses illégales ou abusives du texte existant ; tu peux reprendre ce qui est correct.
- Style : français clair, phrases courtes, vouvoiement du lecteur, aucun jargon inutile. Tableaux Markdown quand ils aident (finalités, cookies).
- Tu ne mets ni préambule ni commentaire hors du document : la réponse est le document, qui commence par un titre de niveau 1.
- Dernière ligne : « Dernière mise à jour : [date du jour] ».`;

export interface DemandeRedaction {
  audit: Audit;
  type: TypeDocument;
  reponses: Record<string, string>;
}

function consignes({ audit, type, reponses }: DemandeRedaction): string {
  const plan = PLANS[type];
  const exigences = reglesApplicables(audit.profil)
    .filter((r) => r.document === type || (type === "cgv" && r.document === "interface" && r.domaine === "Vente à distance"))
    .map((r) => `- ${r.titre} : ${r.exigence}\n  Sources : ${r.sources.map((s) => `${s.texte}${s.article ? `, ${s.article}` : ""}`).join(" ; ")}`)
    .join("\n");
  const existant = audit.crawl.pagesLegales.find((p) => p.type === type);
  const c = audit.crawl;
  const faits = {
    site: c.urlFinale,
    titre: c.titre,
    profil: audit.profil,
    entreprise: audit.entreprise,
    identiteRelevee: c.identite,
    servicesTiers: [...new Set(c.requetesAvantConsentement.map((r) => r.service ?? r.domaine))],
    cookies: c.cookiesAvantConsentement.map((k) => ({ nom: k.nom, service: k.service, dureeJours: k.expireJours })),
    outilConsentement: c.cmp,
    paiement: c.signaux.paiement,
    plateforme: c.signaux.plateforme,
    formulaires: c.formulaires.map((f) => ({ page: f.page, champs: f.champs })),
  };
  return [
    `<document>${plan.titre}</document>`,
    `<plan>\n${plan.sections.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n</plan>`,
    `<exigences>\n${exigences}\n</exigences>`,
    `<faits_observes>\n${JSON.stringify(faits, null, 1)}\n</faits_observes>`,
    `<reponses_utilisateur>\n${JSON.stringify(reponses, null, 1)}\n</reponses_utilisateur>`,
    existant ? `<texte_existant url="${existant.url}">\n${existant.texte.slice(0, 30_000)}\n</texte_existant>` : "<texte_existant>aucun</texte_existant>",
  ].join("\n\n");
}

/** Rédaction en flux : le texte arrive au fur et à mesure dans l'interface. */
export function redigerEnFlux(demande: DemandeRedaction) {
  return claude().beta.messages.stream({
    model: MODELE,
    max_tokens: 64000,
    ...OPTIONS_REPLI,
    output_config: { effort: "medium" },
    system: [{ type: "text", text: SYSTEME }],
    messages: [{ role: "user", content: consignes(demande) }],
  });
}

export function controlerDocument(type: TypeDocument, texte: string): { libelle: string; ok: boolean }[] {
  const controles = PLANS[type].controles.map((c) => ({ libelle: c.libelle, ok: c.motif.test(texte) }));
  const aCompleter = (texte.match(/\[À COMPLÉTER/g) ?? []).length;
  controles.push({ libelle: aCompleter ? `${aCompleter} information(s) à compléter` : "Aucune information manquante", ok: aCompleter === 0 });
  return controles;
}
