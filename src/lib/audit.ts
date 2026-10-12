import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { crawler } from "./crawler/crawler";
import { rechercherEntreprise } from "./entreprise";
import { analyserAvecClaude } from "./ia/analyse";
import { iaDisponible, messageErreurIA } from "./ia/client";
import { profilDepuisCrawl } from "./profil";
import { CATALOGUE } from "./rules/catalogue";
import { executerChecks } from "./rules/checks";
import type { Audit } from "./types";

const DOSSIER = process.env.VIGIE_DONNEES ?? path.join(process.cwd(), "data", "audits");

export async function lancerAudit(url: string, onEtape: (m: string) => void = () => {}): Promise<Audit> {
  const crawl = await crawler(url, { onEtape });

  onEtape("Vérification de l'entreprise au répertoire Sirene");
  const entreprise = crawl.identite.siren[0] ? await rechercherEntreprise(crawl.identite.siren[0]) : null;

  const checks = [...new Set(CATALOGUE.map((r) => r.check).filter(Boolean) as string[])];
  const constatsAuto = executerChecks(crawl, entreprise, checks);
  const profilDetecte = profilDepuisCrawl(crawl, entreprise);

  const audit: Audit = {
    id: crypto.randomBytes(9).toString("base64url"),
    url: crawl.urlFinale,
    date: new Date().toISOString(),
    crawl,
    profilDetecte,
    profil: profilDetecte,
    entreprise,
    constatsAuto,
    constatsIA: {},
    resumeIA: null,
    iaDisponible: iaDisponible(),
  };

  if (audit.iaDisponible) {
    onEtape("Lecture des textes légaux par Claude");
    try {
      const ia = await analyserAvecClaude(crawl, profilDetecte, entreprise);
      audit.profil = { ...profilDetecte, ...ia.profil };
      audit.constatsIA = ia.constats;
      audit.resumeIA = ia.resume;
    } catch (e) {
      audit.iaErreur = messageErreurIA(e);
    }
  }

  await enregistrer(audit);
  return audit;
}

export async function enregistrer(audit: Audit): Promise<void> {
  await fs.mkdir(DOSSIER, { recursive: true });
  await fs.writeFile(path.join(DOSSIER, `${audit.id}.json`), JSON.stringify(audit));
}

export async function chargerAudit(id: string): Promise<Audit | null> {
  if (!/^[\w-]{6,40}$/.test(id)) return null;
  try {
    return JSON.parse(await fs.readFile(path.join(DOSSIER, `${id}.json`), "utf8")) as Audit;
  } catch {
    return null;
  }
}
