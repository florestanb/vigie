import http from "node:http";
import fs from "node:fs";
import path from "node:path";

/** Petit serveur statique pour les sites de test (tests/fixtures/<site>). */
export function servir(dossier: string): Promise<{ url: string; fermer: () => void }> {
  const serveur = http.createServer((req, res) => {
    const chemin = decodeURIComponent((req.url ?? "/").split("?")[0]);
    const fichier = path.join(dossier, chemin === "/" ? "index.html" : chemin);
    if (!fichier.startsWith(dossier) || !fs.existsSync(fichier)) {
      res.writeHead(404).end("introuvable");
      return;
    }
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" }).end(fs.readFileSync(fichier));
  });
  return new Promise((ok) =>
    serveur.listen(0, "127.0.0.1", () => {
      const port = (serveur.address() as { port: number }).port;
      ok({ url: `http://127.0.0.1:${port}/`, fermer: () => serveur.close() });
    }),
  );
}
