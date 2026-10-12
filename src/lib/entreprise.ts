import type { Entreprise } from "./types";

// API publique « Recherche d'entreprises » (data.gouv / DINUM), gratuite et sans clé.
const API = "https://recherche-entreprises.api.gouv.fr/search";

const NATURES: Record<string, string> = {
  "1000": "Entrepreneur individuel",
  "5710": "SAS",
  "5720": "SASU",
  "5499": "SARL",
  "5498": "EURL",
  "5599": "SA à conseil d'administration",
  "5699": "SA à directoire",
  "5202": "SNC",
  "6540": "SCI",
  "5485": "SELARL",
  "9220": "Association déclarée",
  "9210": "Association non déclarée",
};

interface ResultatApi {
  siren: string;
  nom_complet: string;
  nature_juridique?: string;
  activite_principale?: string;
  date_creation?: string;
  tranche_effectif_salarie?: string | null;
  categorie_entreprise?: string | null;
  siege?: { adresse?: string; libelle_activite_principale?: string };
  dirigeants?: { nom?: string; prenoms?: string; denomination?: string; qualite?: string }[];
}

export async function rechercherEntreprise(siren: string): Promise<Entreprise | null> {
  try {
    const r = await fetch(`${API}?q=${encodeURIComponent(siren)}&per_page=1`, { signal: AbortSignal.timeout(8000), headers: { accept: "application/json" } });
    if (!r.ok) return null;
    const json = (await r.json()) as { results?: ResultatApi[] };
    const e = json.results?.find((x) => x.siren === siren);
    if (!e) return null;
    return {
      siren: e.siren,
      nom: e.nom_complet,
      formeJuridique: e.nature_juridique ? (NATURES[e.nature_juridique] ?? `code ${e.nature_juridique}`) : undefined,
      adresse: e.siege?.adresse,
      activite: e.activite_principale,
      dateCreation: e.date_creation,
      trancheEffectif: e.tranche_effectif_salarie ?? "NN",
      categorie: e.categorie_entreprise ?? undefined,
      dirigeants: e.dirigeants
        ?.map((d) => [d.prenoms, d.nom].filter(Boolean).join(" ") || d.denomination || "")
        .filter(Boolean)
        .slice(0, 3),
    };
  } catch {
    return null;
  }
}
