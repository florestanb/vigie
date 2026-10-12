import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { DonneesCrawl, Profil } from "../src/lib/types";

// Faux serveur d'API : vérifie la forme de la requête envoyée à Claude et renvoie une réponse type.
test("l'analyse IA envoie une requête valide et exploite la réponse structurée", async () => {
  let recue: any = null;
  let entetes: http.IncomingHttpHeaders = {};
  const reponseModele = {
    profil: { types: ["ecommerce"], editeur: "entrepreneur-individuel", b2c: true, b2b: false, abonnements: false, contenusNumeriques: false, contenusUtilisateurs: false, chatbotIA: false, mineurs: false, horsUE: false, secteurs: [], justification: "Mentions : Camille Martin, EI." },
    reponses: [
      { id: "vente.retractation-info", statut: "manquant", preuve: "Les CGV ne mentionnent pas la rétractation." },
      { id: "vente.clauses-abusives", statut: "partiel", preuve: "« se réserve le droit de modifier ses prix à tout moment, y compris après la commande »" },
      { id: "sect.alcool", statut: "non-applicable", preuve: "" },
    ],
    resume: "Le site n'informe pas du droit de rétractation.",
  };
  const serveur = http.createServer((req, res) => {
    let corps = "";
    req.on("data", (d) => (corps += d));
    req.on("end", () => {
      recue = JSON.parse(corps);
      entetes = req.headers;
      res.writeHead(200, { "content-type": "application/json" }).end(
        JSON.stringify({ id: "msg_test", type: "message", role: "assistant", model: recue.model, stop_reason: "end_turn", stop_sequence: null, usage: { input_tokens: 10, output_tokens: 10 }, content: [{ type: "text", text: JSON.stringify(reponseModele) }] }),
      );
    });
  });
  await new Promise<void>((ok) => serveur.listen(0, "127.0.0.1", () => ok()));
  process.env.ANTHROPIC_BASE_URL = `http://127.0.0.1:${(serveur.address() as { port: number }).port}`;
  process.env.ANTHROPIC_API_KEY = "test";

  const { analyserAvecClaude } = await import("../src/lib/ia/analyse");
  const crawl = {
    urlFinale: "https://exemple.fr/", titre: "Exemple", signaux: {}, identite: {}, cmp: null, boutonRefus: null,
    requetesAvantConsentement: [], cookiesAvantConsentement: [], formulaires: [],
    pagesLegales: [{ type: "cgv", url: "https://exemple.fr/cgv", titre: "CGV", texte: "Article 1…" }],
  } as unknown as DonneesCrawl;
  const r = await analyserAvecClaude(crawl, { types: ["vitrine"] } as Profil, null);
  serveur.close();

  assert.equal(recue.model, "claude-opus-5-5");
  assert.equal(recue.fallbacks, "default");
  assert.match(String(entetes["anthropic-beta"]), /server-side-fallback-2026-07-01/);
  assert.equal(recue.output_config.format.type, "json_schema");
  assert.ok(JSON.stringify(recue.messages).includes("vente.retractation-info"));
  assert.equal(r.profil.editeur, "entrepreneur-individuel");
  assert.equal(r.constats["vente.retractation-info"].statut, "manquant");
  assert.equal(r.constats["sect.alcool"], undefined, "les non-applicables sont écartés");
  assert.equal(r.resume, reponseModele.resume);
});
