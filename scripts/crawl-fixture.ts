import path from "node:path";
import { servir } from "../tests/serveur";
import { crawler } from "../src/lib/crawler/crawler";
process.env.VIGIE_AUTORISER_LOCAL = "1";
const { url, fermer } = await servir(path.resolve("tests/fixtures", process.argv[2]));
const d = await crawler(url);
const { liens, texteAccueil, pagesLegales, ...reste } = d;
console.log(JSON.stringify({ ...reste, pagesLegales: pagesLegales.map((p) => ({ type: p.type, url: p.url, n: p.texte.length })) }, null, 1));
fermer();
