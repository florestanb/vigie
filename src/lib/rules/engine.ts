import type { Conditions, Constat, Gravite, Profil, Regle, ResultatRegle } from "../types";
import { CATALOGUE } from "./catalogue";

/** Une règle s'applique quand toutes ses conditions sont remplies (les listes valent OU, `ou` aussi). */
export function conditionsRemplies(cond: Conditions, p: Profil): boolean {
  const { types, editeurs, secteurs, ou, ...booleens } = cond;
  if (types && !types.some((t) => p.types.includes(t))) return false;
  if (editeurs && !editeurs.includes(p.editeur)) return false;
  if (secteurs && !secteurs.some((s) => p.secteurs.includes(s))) return false;
  for (const [cle, attendu] of Object.entries(booleens)) {
    if (p[cle as keyof typeof booleens] !== attendu) return false;
  }
  if (ou && !ou.some((c) => conditionsRemplies(c, p))) return false;
  return true;
}

export function reglesApplicables(p: Profil, catalogue: Regle[] = CATALOGUE): Regle[] {
  // Un particulier non professionnel n'a que l'obligation d'identification minimale et le RGPD/cookies.
  return catalogue.filter((r) => conditionsRemplies(r.conditions, p));
}

/**
 * Croise le profil et les constats (vérifications automatiques puis analyse IA, qui prime).
 * Fonction pure : l'interface la rejoue quand l'utilisateur corrige le profil.
 */
export function evaluer(p: Profil, constatsAuto: Record<string, Constat>, constatsIA: Record<string, Constat> = {}): ResultatRegle[] {
  return reglesApplicables(p).flatMap((regle): ResultatRegle[] => {
    const auto = regle.check ? constatsAuto[regle.check] : undefined;
    const ia = constatsIA[regle.id];
    if (regle.obsolete) return auto?.statut === "a-retirer" ? [{ regle, ...auto }] : [];
    // L'IA lit le texte : elle précise un constat automatique, sauf quand celui-ci a établi une absence.
    const constat = auto?.statut === "manquant" && regle.verification === "auto" ? auto : (ia ?? auto);
    if (constat) return [{ regle, ...constat }];
    return [
      {
        regle,
        statut: "a-verifier",
        preuve:
          regle.verification === "declaratif"
            ? "Ne se voit pas depuis le site public : à confirmer par vous."
            : "Non vérifié automatiquement : l'analyse du texte est nécessaire.",
      },
    ];
  });
}

const POIDS: Record<Gravite, number> = { critique: 10, majeure: 5, mineure: 2 };
const VALEUR = { conforme: 1, partiel: 0.4, manquant: 0 } as const;

export interface Score {
  note: number; // 0 à 100
  conformes: number;
  partiels: number;
  manquants: number;
  aVerifier: number;
  aRetirer: number;
  critiquesManquants: number;
}

export function calculerScore(resultats: ResultatRegle[]): Score {
  let total = 0;
  let obtenu = 0;
  const s: Score = { note: 0, conformes: 0, partiels: 0, manquants: 0, aVerifier: 0, aRetirer: 0, critiquesManquants: 0 };
  for (const r of resultats) {
    if (r.statut === "a-verifier") s.aVerifier++;
    else if (r.statut === "a-retirer") s.aRetirer++;
    else {
      total += POIDS[r.regle.gravite];
      obtenu += POIDS[r.regle.gravite] * VALEUR[r.statut];
      if (r.statut === "conforme") s.conformes++;
      if (r.statut === "partiel") s.partiels++;
      if (r.statut === "manquant") {
        s.manquants++;
        if (r.regle.gravite === "critique") s.critiquesManquants++;
      }
    }
  }
  s.note = total ? Math.round((obtenu / total) * 100) : 0;
  return s;
}

const ORDRE_STATUT = { manquant: 0, partiel: 1, "a-retirer": 2, "a-verifier": 3, conforme: 4 } as const;
const ORDRE_GRAVITE = { critique: 0, majeure: 1, mineure: 2 } as const;

export function trier(resultats: ResultatRegle[]): ResultatRegle[] {
  return [...resultats].sort(
    (a, b) => ORDRE_STATUT[a.statut] - ORDRE_STATUT[b.statut] || ORDRE_GRAVITE[a.regle.gravite] - ORDRE_GRAVITE[b.regle.gravite],
  );
}
