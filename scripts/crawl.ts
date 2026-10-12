import { crawler } from "../src/lib/crawler/crawler";
const url = process.argv[2];
crawler(url, { onEtape: (m) => console.error("·", m) }).then((d) => {
  const { liens, texteAccueil, pagesLegales, ...reste } = d;
  console.log(JSON.stringify({ ...reste, pagesLegales: pagesLegales.map((p) => ({ type: p.type, url: p.url, longueur: p.texte.length })), nbLiens: liens.length }, null, 1));
});
