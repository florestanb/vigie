import type { SourceLegale } from "../types";

// Liens vers les textes consolidés (Légifrance, EUR-Lex) et les référentiels des autorités.
const LF = "https://www.legifrance.gouv.fr";
const EU = "https://eur-lex.europa.eu/eli";

export const TEXTES = {
  lcen: `${LF}/loda/id/JORFTEXT000000801164`,
  conso: `${LF}/codes/texte_lc/LEGITEXT000006069565`,
  civil: `${LF}/codes/texte_lc/LEGITEXT000006070721`,
  commerce: `${LF}/codes/texte_lc/LEGITEXT000005634379`,
  cpce: `${LF}/codes/texte_lc/LEGITEXT000006070987`,
  cmf: `${LF}/codes/texte_lc/LEGITEXT000006072026`,
  csp: `${LF}/codes/texte_lc/LEGITEXT000006072665`,
  environnement: `${LF}/codes/texte_lc/LEGITEXT000006074220`,
  assurances: `${LF}/codes/texte_lc/LEGITEXT000006073984`,
  tourisme: `${LF}/codes/texte_lc/LEGITEXT000006074073`,
  cgi: `${LF}/codes/texte_lc/LEGITEXT000006069577`,
  travail: `${LF}/codes/texte_lc/LEGITEXT000006072050`,
  cch: `${LF}/codes/texte_lc/LEGITEXT000006074096`,
  informatiqueLibertes: `${LF}/loda/id/JORFTEXT000000886460`,
  handicap2005: `${LF}/loda/id/JORFTEXT000000809647`,
  decretAccessibilite2019: `${LF}/loda/id/JORFTEXT000038811937`,
  toubon: `${LF}/loda/id/JORFTEXT000000349929`,
  arretePrix1987: `${LF}/loda/id/JORFTEXT000000874009`,
  hoguet: `${LF}/loda/id/JORFTEXT000000512228`,
  influenceurs: `${LF}/loda/id/JORFTEXT000047663185`,
  prixLivre: `${LF}/loda/id/JORFTEXT000000517179`,
  rgpd: `${EU}/reg/2016/679/oj/fra`,
  eprivacy: `${EU}/dir/2002/58/oj/fra`,
  dsa: `${EU}/reg/2022/2065/oj/fra`,
  aiAct: `${EU}/reg/2024/1689/oj/fra`,
  p2b: `${EU}/reg/2019/1150/oj/fra`,
  geoblocage: `${EU}/reg/2018/302/oj/fra`,
  eaa: `${EU}/dir/2019/882/oj/fra`,
  retractationEnLigne: `${EU}/dir/2023/2673/oj/fra`,
  omnibus: `${EU}/dir/2019/2161/oj/fra`,
  transitionVerte: `${EU}/dir/2024/825/oj/fra`,
  reparation: `${EU}/dir/2024/1799/oj/fra`,
  fin_rll: `${EU}/reg/2024/3228/oj/fra`,
  inco: `${EU}/reg/2011/1169/oj/fra`,
  cnilCookies: "https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies",
  cnilLignesDirectrices: `${LF}/jorf/id/JORFTEXT000042388179`,
  cnilRecommandation: `${LF}/jorf/id/JORFTEXT000042388193`,
  cnilMesure: "https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience",
  rgaa: "https://accessibilite.numerique.gouv.fr/",
  mediateurs: "https://www.economie.gouv.fr/mediation-conso/liste-des-mediateurs-references",
} as const;

export const src = (texte: string, url: string, article?: string): SourceLegale => ({ texte, url, article });
