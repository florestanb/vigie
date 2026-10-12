// Audit en ligne de commande, sans interface : npm run audit -- https://exemple.fr
import { lancerAudit } from "../src/lib/audit";
import { calculerScore, evaluer, trier } from "../src/lib/rules/engine";

const url = process.argv[2];
if (!url) {
  console.error("Usage : npm run audit -- <url>");
  process.exit(1);
}
const audit = await lancerAudit(url, (m) => console.error("·", m));
const resultats = trier(evaluer(audit.profil, audit.constatsAuto, audit.constatsIA));
const score = calculerScore(resultats);
console.log(`\n${audit.url} : ${score.note}/100 (${score.manquants} manquants, ${score.critiquesManquants} critiques)\n`);
for (const r of resultats.filter((r) => r.statut !== "conforme" && r.statut !== "a-verifier")) {
  console.log(`[${r.statut}] ${r.regle.titre} (${r.regle.gravite})${r.preuve ? `\n    ${r.preuve}` : ""}`);
}
console.log(`\nRapport complet : data/audits/${audit.id}.json`);
