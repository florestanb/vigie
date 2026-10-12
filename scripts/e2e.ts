// Parcours complet dans un vrai navigateur : accueil → audit d'un site témoin → rapport → rédaction.
// Usage : VIGIE_AUTORISER_LOCAL=1 npm start (port 3100) puis npx tsx scripts/e2e.ts <dossier de captures>
import path from "node:path";
import { chromium } from "playwright-core";
import { servir } from "../tests/serveur";

const sortie = process.argv[2] ?? "captures";
const app = process.env.VIGIE_URL ?? "http://127.0.0.1:3100";
const { url, fermer } = await servir(path.resolve("tests/fixtures/boutique-risquee"));
const nav = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const [nom, opts] of [["bureau", { viewport: { width: 1440, height: 900 } }], ["mobile", { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }]] as const) {
  const page = await nav.newPage(opts);
  await page.goto(app);
  await page.screenshot({ path: `${sortie}/accueil-${nom}.png`, fullPage: nom === "bureau" });
  await page.fill("#url", url);
  await page.click("form.formulaire-url button");
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${sortie}/progression-${nom}.png` });
  await page.waitForURL(/\/audit\//, { timeout: 120_000 });
  await page.waitForSelector(".jauge");
  await page.screenshot({ path: `${sortie}/rapport-${nom}.png`, fullPage: true });
  await page.screenshot({ path: `${sortie}/rapport-haut-${nom}.png` });
  if (nom === "bureau") {
    await page.locator(".constat summary").first().click();
    await page.screenshot({ path: `${sortie}/rapport-detail.png` });
    await page.click('.doc-lien:has-text("Conditions générales de vente")');
    await page.waitForSelector(".feuille");
    await page.click("text=Rédiger le document");
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${sortie}/redaction.png`, fullPage: true });
    await page.goto(app + "/registre");
    await page.screenshot({ path: `${sortie}/registre.png` });
  }
  await page.emulateMedia({ colorScheme: "dark" });
  await page.screenshot({ path: `${sortie}/rapport-sombre-${nom}.png` });
}
await nav.close();
fermer();
console.log("ok");
