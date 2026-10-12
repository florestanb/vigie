"use client";

import { useEffect, useMemo, useState } from "react";
import { ORDRE_DOCUMENTS, PLANS } from "@/lib/documents/plans";
import { LIBELLES_EDITEUR, LIBELLES_PROFIL, LIBELLES_SECTEURS, LIBELLES_TYPES } from "@/lib/profil";
import { calculerScore, evaluer, trier } from "@/lib/rules/engine";
import type { Audit, Editeur, Profil, ResultatRegle, Secteur, SiteType, Statut } from "@/lib/types";

const LIBELLE_STATUT: Record<Exclude<Statut, "non-applicable">, string> = {
  manquant: "Manquant",
  partiel: "Incomplet",
  "a-retirer": "À retirer",
  "a-verifier": "À vérifier",
  conforme: "Conforme",
};
const SYMBOLE: Record<Exclude<Statut, "non-applicable">, string> = { manquant: "✕", partiel: "!", "a-retirer": "−", "a-verifier": "?", conforme: "✓" };

export const cleProfil = (id: string) => `vigie:profil:${id}`;

function Jauge({ note }: { note: number }) {
  const r = 70;
  const tour = 2 * Math.PI * r;
  const couleur = note >= 80 ? "var(--ok)" : note >= 50 ? "var(--partiel)" : "var(--ko)";
  return (
    <div className="jauge" role="img" aria-label={`Score de conformité : ${note} sur 100`}>
      <svg viewBox="0 0 168 168" width="168" height="168">
        <circle cx="84" cy="84" r={r} fill="none" stroke="var(--trait)" strokeWidth="12" />
        <circle cx="84" cy="84" r={r} fill="none" stroke={couleur} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(note / 100) * tour} ${tour}`} transform="rotate(-90 84 84)" />
      </svg>
      <div className="jauge-texte">
        <div>
          <strong>{note}</strong>
          <span>sur 100</span>
        </div>
      </div>
    </div>
  );
}

function Constat({ r }: { r: ResultatRegle }) {
  return (
    <details className="constat">
      <summary>
        <span className={`pastille s-${r.statut}`} aria-label={LIBELLE_STATUT[r.statut]}>
          {SYMBOLE[r.statut]}
        </span>
        <span>
          <span className="titre">{r.regle.titre}</span>
          {r.preuve && <span className="preuve-courte">{r.preuve}</span>}
        </span>
        <span className={`gravite ${r.regle.gravite}`}>{r.regle.gravite}</span>
      </summary>
      <div className="corps">
        <p>{r.regle.exigence}</p>
        {r.regle.applicableDepuis && <p><span className="date-loi">Applicable depuis le {new Date(r.regle.applicableDepuis).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span></p>}
        {r.regle.sanction && <p><strong>Sanction encourue :</strong> {r.regle.sanction}</p>}
        {r.url && <p><a href={r.url} target="_blank" rel="noreferrer">Voir la page concernée ↗</a></p>}
        <div className="sources">
          {r.regle.sources.map((s, i) => (
            <a key={i} className="source" href={s.url} target="_blank" rel="noreferrer">
              {s.texte}
              {s.article ? `, ${s.article}` : ""}
            </a>
          ))}
        </div>
      </div>
    </details>
  );
}

export function Rapport({ audit }: { audit: Audit }) {
  const [profil, setProfil] = useState<Profil>(audit.profil);
  const [filtre, setFiltre] = useState<Statut | null>(null);

  useEffect(() => {
    try {
      const sauve = localStorage.getItem(cleProfil(audit.id));
      if (sauve) setProfil(JSON.parse(sauve));
    } catch {
      /* stockage indisponible */
    }
  }, [audit.id]);

  const modifier = (p: Profil) => {
    setProfil(p);
    try {
      localStorage.setItem(cleProfil(audit.id), JSON.stringify(p));
    } catch {
      /* stockage indisponible */
    }
  };

  const resultats = useMemo(() => trier(evaluer(profil, audit.constatsAuto, audit.constatsIA)), [profil, audit]);
  const score = useMemo(() => calculerScore(resultats), [resultats]);
  const visibles = filtre ? resultats.filter((r) => r.statut === filtre) : resultats;
  const groupes = useMemo(() => {
    const m = new Map<string, ResultatRegle[]>();
    for (const r of visibles) m.set(r.regle.domaine, [...(m.get(r.regle.domaine) ?? []), r]);
    return [...m.entries()].sort((a, b) => b[1].filter((x) => x.statut === "manquant").length - a[1].filter((x) => x.statut === "manquant").length);
  }, [visibles]);

  const documents = ORDRE_DOCUMENTS.map((type) => {
    const lies = resultats.filter((r) => r.regle.document === type);
    const pire = lies.find((r) => r.statut === "manquant") ? "manquant" : lies.find((r) => r.statut === "partiel") ? "partiel" : lies.length ? "conforme" : null;
    return { type, lies: lies.length, pire };
  }).filter((d) => d.lies > 0);

  const bascule = (cle: keyof typeof LIBELLES_PROFIL) => (
    <label className="bascule" key={cle}>
      <span>
        {LIBELLES_PROFIL[cle]} {profil[cle] !== audit.profil[cle] && <span className="modifie">modifié</span>}
      </span>
      <input type="checkbox" checked={profil[cle]} onChange={(e) => modifier({ ...profil, [cle]: e.target.checked })} />
    </label>
  );

  const compteurs: [Statut, number, string][] = [
    ["manquant", score.manquants, "s-manquant"],
    ["partiel", score.partiels, "s-partiel"],
    ["a-retirer", score.aRetirer, "s-a-retirer"],
    ["a-verifier", score.aVerifier, "s-a-verifier"],
    ["conforme", score.conformes, "s-conforme"],
  ];

  return (
    <div className="conteneur">
      <section className="rapport-entete">
        <div>
          <p className="surtitre">Rapport d&apos;audit</p>
          <h1>{audit.crawl.titre || new URL(audit.url).hostname}</h1>
          <p className="meta">
            <a href={audit.url} target="_blank" rel="noreferrer">{audit.url}</a> · analysé le{" "}
            {new Date(audit.date).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })} · {audit.crawl.pagesVisitees.length} pages lues
            {audit.entreprise && ` · ${audit.entreprise.nom} (SIREN ${audit.entreprise.siren})`}
          </p>
          <div className="compteurs" role="group" aria-label="Filtrer par statut">
            {compteurs
              .filter(([, n]) => n > 0)
              .map(([s, n, cls]) => (
                <button key={s} className={`compteur ${cls}`} aria-pressed={filtre === s} onClick={() => setFiltre(filtre === s ? null : s)}>
                  {n} {LIBELLE_STATUT[s as Exclude<Statut, "non-applicable">].toLowerCase()}
                  {n > 1 && !s.startsWith("a-") ? "s" : ""}
                </button>
              ))}
          </div>
        </div>
        <Jauge note={score.note} />
      </section>

      {audit.resumeIA && <p className="resume">{audit.resumeIA}</p>}
      {!audit.iaDisponible && (
        <p className="avertissement" style={{ marginTop: 20 }}>
          Audit automatique seul : la lecture des textes par Claude n&apos;est pas activée sur ce serveur, les points marqués « à vérifier » n&apos;ont pas été analysés.
        </p>
      )}
      {audit.iaErreur && <p className="avertissement" style={{ marginTop: 20 }}>L&apos;analyse des textes par Claude a échoué ({audit.iaErreur}). Les vérifications automatiques restent valables.</p>}
      {score.critiquesManquants > 0 && (
        <p className="avertissement" style={{ marginTop: 16 }}>
          <strong>{score.critiquesManquants} manquement{score.critiquesManquants > 1 ? "s" : ""} critique{score.critiquesManquants > 1 ? "s" : ""}</strong> : ce sont les points les plus souvent sanctionnés. Commencez par eux.
        </p>
      )}

      <div className="disposition">
        <div>
          {groupes.map(([domaine, rs]) => (
            <section className="groupe" key={domaine}>
              <h2>
                {domaine} <small>{rs.filter((r) => r.statut === "conforme").length}/{rs.length} conformes</small>
              </h2>
              {rs.filter((r) => filtre || r.statut !== "a-verifier").map((r) => (
                <Constat key={r.regle.id} r={r} />
              ))}
              {!filtre && rs.some((r) => r.statut === "a-verifier") && (
                <details className="a-verifier-groupe">
                  <summary>{rs.filter((r) => r.statut === "a-verifier").length} point(s) à vérifier</summary>
                  {rs.filter((r) => r.statut === "a-verifier").map((r) => (
                    <Constat key={r.regle.id} r={r} />
                  ))}
                </details>
              )}
            </section>
          ))}
          {!groupes.length && <p className="vide">Aucun point dans cette catégorie.</p>}
        </div>

        <aside className="lateral">
          <div className="carte">
            <h3>Documents à mettre en place</h3>
            <p className="aide" style={{ margin: "6px 0 12px" }}>Rédigés pour ce site à partir de l&apos;audit.</p>
            <div className="docs">
              {documents.map((d) => (
                <a key={d.type} className="doc-lien" href={`/audit/${audit.id}/document/${d.type}`}>
                  <span>{PLANS[d.type].titre}</span>
                  <em className={`s-${d.pire}`} style={{ background: "none" }}>
                    {d.pire === "manquant" ? "à rédiger" : d.pire === "partiel" ? "à compléter" : "à revoir"} →
                  </em>
                </a>
              ))}
            </div>
          </div>

          <div className="carte">
            <h3>Profil du site</h3>
            <p className="aide" style={{ margin: "6px 0 10px" }}>Déduit de l&apos;audit. Corrigez-le : les obligations se recalculent.</p>
            <label className="etiquette" htmlFor="editeur">Éditeur</label>
            <select id="editeur" className="champ" value={profil.editeur} onChange={(e) => modifier({ ...profil, editeur: e.target.value as Editeur })}>
              {Object.entries(LIBELLES_EDITEUR).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            <p className="etiquette" style={{ marginTop: 14 }}>Type de site</p>
            {(Object.keys(LIBELLES_TYPES) as SiteType[]).map((t) => (
              <label className="bascule" key={t}>
                <span>{LIBELLES_TYPES[t]}</span>
                <input type="checkbox" checked={profil.types.includes(t)} onChange={(e) => modifier({ ...profil, types: e.target.checked ? [...profil.types, t] : profil.types.filter((x) => x !== t) })} />
              </label>
            ))}
            <p className="etiquette" style={{ marginTop: 14 }}>Activité</p>
            {(Object.keys(LIBELLES_PROFIL) as (keyof typeof LIBELLES_PROFIL)[]).map(bascule)}
            <p className="etiquette" style={{ marginTop: 14 }}>Secteur réglementé</p>
            {(Object.keys(LIBELLES_SECTEURS) as Secteur[]).map((s) => (
              <label className="bascule" key={s}>
                <span>{LIBELLES_SECTEURS[s]}</span>
                <input type="checkbox" checked={profil.secteurs.includes(s)} onChange={(e) => modifier({ ...profil, secteurs: e.target.checked ? [...profil.secteurs, s] : profil.secteurs.filter((x) => x !== s) })} />
              </label>
            ))}
            <button className="bouton bouton-ligne" style={{ marginTop: 14, width: "100%" }} onClick={() => modifier(audit.profil)}>
              Revenir au profil détecté
            </button>
          </div>

          <div className="carte">
            <h3>Ce que Vigie a vu</h3>
            <ul style={{ paddingLeft: 18, margin: "10px 0 0", fontSize: 14, display: "grid", gap: 6 }}>
              <li>Bandeau cookies : {audit.crawl.cmp ?? "aucun"}</li>
              <li>Services tiers avant consentement : {audit.crawl.requetesAvantConsentement.map((r) => r.service ?? r.domaine).join(", ") || "aucun"}</li>
              <li>Plateforme : {audit.crawl.signaux.plateforme ?? "non identifiée"}</li>
              <li>Paiement : {audit.crawl.signaux.paiement.join(", ") || "non détecté"}</li>
              <li>Pages légales : {audit.crawl.pagesLegales.map((p) => PLANS[p.type]?.titre ?? p.type).join(", ") || "aucune"}</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
