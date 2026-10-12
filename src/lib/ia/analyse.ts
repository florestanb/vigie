import { z } from "zod";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { CATALOGUE } from "../rules/catalogue";
import type { Constat, DonneesCrawl, Entreprise, Profil } from "../types";
import { claude, MODELE, OPTIONS_REPLI } from "./client";

const MAX_CARACTERES_PAGE = 40_000;

const SYSTEME = `Tu es l'analyste juridique de Vigie, un service qui audite la conformité légale des sites web au regard du droit français et du droit de l'Union européenne.

On te donne : ce qu'un robot a observé sur un site (signaux techniques, services tiers, cookies déposés avant consentement), le texte de ses pages légales, un premier profil du site déduit automatiquement, et une liste de questions de conformité, chacune liée à une règle identifiée.

Ton travail :
1. Corriger le profil du site si les textes montrent qu'il est faux (type de site, nature de l'éditeur, clientèle, secteurs réglementés, présence d'un chatbot IA, contenus d'utilisateurs, abonnements, public mineur, éditeur hors UE). Ne change un champ que si tu as un indice concret.
2. Répondre à chaque question pertinente pour ce site, à partir des seuls textes fournis.
   - "conforme" : l'exigence est satisfaite dans le texte.
   - "partiel" : traitée mais incomplète, imprécise ou datée.
   - "manquant" : absente alors que la page concernée existe, ou page absente.
   - "a-verifier" : impossible de trancher avec ce qui est fourni.
   - "non-applicable" : la question ne concerne pas ce site.
   Pour chaque réponse, donne une preuve courte : une citation exacte de moins de 200 caractères tirée du texte, ou ce qui manque précisément. N'invente jamais de citation.
3. Écrire un résumé de 3 phrases au plus, en français simple, destiné au gérant du site : les risques les plus sérieux d'abord.

Sois exigeant mais juste : un texte manifestement copié d'un autre site, renvoyant à des lois abrogées ou incohérent avec les services détectés (par exemple Google Analytics utilisé mais absent de la politique) n'est pas conforme. Tu n'es pas l'avocat du client : tu signales, tu ne garantis rien.`;

const SchemaAnalyse = z.object({
  profil: z.object({
    types: z.array(z.enum(["vitrine", "ecommerce", "saas", "marketplace", "media", "communaute"])),
    editeur: z.enum(["societe", "entrepreneur-individuel", "association", "particulier", "public"]),
    b2c: z.boolean(),
    b2b: z.boolean(),
    abonnements: z.boolean(),
    contenusNumeriques: z.boolean(),
    contenusUtilisateurs: z.boolean(),
    chatbotIA: z.boolean(),
    mineurs: z.boolean(),
    horsUE: z.boolean(),
    secteurs: z.array(
      z.enum([
        "alcool",
        "alimentaire",
        "immobilier",
        "credit-assurance",
        "sante",
        "tourisme",
        "btp-artisan",
        "livre",
        "jeux-argent",
        "electronique-electromenager",
        "formation",
        "profession-reglementee",
      ]),
    ),
    justification: z.string(),
  }),
  reponses: z.array(
    z.object({
      id: z.string(),
      statut: z.enum(["conforme", "partiel", "manquant", "a-verifier", "non-applicable"]),
      preuve: z.string(),
    }),
  ),
  resume: z.string(),
});

export type AnalyseIA = z.infer<typeof SchemaAnalyse>;

function contexteSite(c: DonneesCrawl, p: Profil, e: Entreprise | null): string {
  const tiers = c.requetesAvantConsentement.map((r) => `${r.service ?? r.domaine} [${r.categorie}]`);
  const cookies = c.cookiesAvantConsentement.map((k) => `${k.nom}${k.service ? ` (${k.service})` : ""} ${k.expireJours ?? "session"} j`);
  return [
    `Site : ${c.urlFinale} — « ${c.titre} »`,
    `Profil détecté : ${JSON.stringify(p)}`,
    e ? `Entreprise au répertoire Sirene : ${JSON.stringify(e)}` : "Aucune entreprise retrouvée au répertoire Sirene.",
    `Signaux : ${JSON.stringify(c.signaux)}`,
    `Identité relevée : ${JSON.stringify(c.identite)}`,
    `Bandeau de consentement : ${c.cmp ?? "aucun"} ; bouton de refus visible : ${c.boutonRefus ?? "inconnu"}`,
    `Services tiers chargés sans consentement : ${tiers.join(", ") || "aucun"}`,
    `Cookies non techniques déposés sans consentement : ${cookies.join(", ") || "aucun"}`,
    `Formulaires : ${c.formulaires.map((f) => `${new URL(f.page).pathname} [${f.champs.join(", ")}]`).join(" ; ") || "aucun"}`,
  ].join("\n");
}

function textesLegaux(c: DonneesCrawl): string {
  if (!c.pagesLegales.length) return "Aucune page légale trouvée sur le site.";
  return c.pagesLegales
    .map((pl) => {
      const tronque = pl.texte.length > MAX_CARACTERES_PAGE;
      const texte = pl.texte.slice(0, MAX_CARACTERES_PAGE);
      return `<page type="${pl.type}" url="${pl.url}" titre="${pl.titre}"${tronque ? ` tronquee="oui, ${pl.texte.length} caractères au total"` : ""}>\n${texte}\n</page>`;
    })
    .join("\n\n");
}

export async function analyserAvecClaude(c: DonneesCrawl, p: Profil, e: Entreprise | null): Promise<{ profil: Partial<Profil>; constats: Record<string, Constat>; resume: string }> {
  const questions = CATALOGUE.filter((r) => r.verification === "ia" && r.questionIA).map((r) => `- ${r.id} : ${r.questionIA}`).join("\n");

  const reponse = await claude().beta.messages.parse({
    model: MODELE,
    max_tokens: 16000,
    ...OPTIONS_REPLI,
    output_config: { effort: "high", format: betaZodOutputFormat(SchemaAnalyse) },
    system: [{ type: "text", text: SYSTEME, cache_control: { type: "ephemeral" } }],
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: `<questions>\n${questions}\n</questions>`, cache_control: { type: "ephemeral" } },
          { type: "text", text: `<observations>\n${contexteSite(c, p, e)}\n</observations>\n\n<pages_legales>\n${textesLegaux(c)}\n</pages_legales>` },
        ],
      },
    ],
  });

  if (reponse.stop_reason === "refusal") throw new Error("L'analyse IA a été refusée pour ce site.");
  const analyse = reponse.parsed_output;
  if (!analyse) throw new Error("Réponse de l'analyse IA illisible.");

  const constats: Record<string, Constat> = {};
  for (const r of analyse.reponses) {
    if (r.statut === "non-applicable") continue;
    constats[r.id] = { statut: r.statut, preuve: r.preuve };
  }
  const { justification: _j, ...profil } = analyse.profil;
  return { profil, constats, resume: analyse.resume };
}
