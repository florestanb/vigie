"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PLANS, type TypeDocument } from "@/lib/documents/plans";
import { markdownVersHtml } from "@/lib/markdown";
import type { Profil } from "@/lib/types";
import { cleProfil } from "./Rapport";

interface Props {
  auditId: string;
  hote: string;
  type: TypeDocument;
  initiales: Record<string, string>;
  existant: string | null;
}

function telecharger(nom: string, contenu: string, mime: string) {
  const lien = document.createElement("a");
  lien.href = URL.createObjectURL(new Blob([contenu], { type: mime }));
  lien.download = nom;
  lien.click();
  URL.revokeObjectURL(lien.href);
}

export function Redaction({ auditId, hote, type, initiales, existant }: Props) {
  const plan = PLANS[type];
  const [reponses, setReponses] = useState<Record<string, string>>(initiales);
  const [texte, setTexte] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [copie, setCopie] = useState(false);
  const annulation = useRef<AbortController | null>(null);

  useEffect(() => () => annulation.current?.abort(), []);

  async function rediger() {
    setEnCours(true);
    setErreur(null);
    setTexte("");
    let profil: Profil | undefined;
    try {
      const sauve = localStorage.getItem(cleProfil(auditId));
      if (sauve) profil = JSON.parse(sauve);
    } catch {
      /* stockage indisponible */
    }
    annulation.current = new AbortController();
    try {
      const r = await fetch("/api/documents", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ auditId, type, reponses, profil }),
        signal: annulation.current.signal,
      });
      if (!r.ok || !r.body) throw new Error(await r.text());
      const lecteur = r.body.pipeThrough(new TextDecoderStream()).getReader();
      for (;;) {
        const { value, done } = await lecteur.read();
        if (done) break;
        setTexte((t) => t + value);
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") setErreur((e as Error).message);
    } finally {
      setEnCours(false);
    }
  }

  const html = useMemo(() => markdownVersHtml(texte), [texte]);
  const controles = useMemo(() => {
    if (!texte || enCours) return [];
    const liste = plan.controles.map((c) => ({ libelle: c.libelle, ok: c.motif.test(texte) }));
    const n = (texte.match(/\[À COMPLÉTER/g) ?? []).length;
    liste.push({ libelle: n ? `${n} information${n > 1 ? "s" : ""} à compléter (surlignées)` : "Aucune information à compléter", ok: n === 0 });
    return liste;
  }, [texte, enCours, plan]);

  const nomFichier = `${plan.titre.toLowerCase().replace(/[^a-zà-ÿ0-9]+/gi, "-")}-${hote}`;

  return (
    <div className="conteneur">
      <section style={{ paddingTop: 40 }}>
        <p className="surtitre">
          <a href={`/audit/${auditId}`} style={{ textDecoration: "none" }}>← Rapport de {hote}</a>
        </p>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", marginTop: 10 }}>{plan.titre}</h1>
        <p className="meta" style={{ maxWidth: "70ch" }}>
          {plan.description} {existant ? <>Le texte actuel du site (<a href={existant} target="_blank" rel="noreferrer">voir</a>) est repris là où il est correct.</> : "Le site n'en a pas aujourd'hui."}
        </p>
      </section>

      <div className="grille-redaction">
        <form
          className="carte questions"
          onSubmit={(e) => {
            e.preventDefault();
            rediger();
          }}
        >
          <h3 style={{ fontSize: 18 }}>Informations du site</h3>
          <p className="aide" style={{ marginTop: -6 }}>Pré-remplies d&apos;après l&apos;audit. Ce qui reste vide sera signalé « à compléter » dans le document.</p>
          {plan.questions.map((q) => (
            <div key={q.cle}>
              <label className="etiquette" htmlFor={q.cle}>{q.libelle}</label>
              <input id={q.cle} className="champ" value={reponses[q.cle] ?? ""} onChange={(e) => setReponses({ ...reponses, [q.cle]: e.target.value })} />
              {q.aide && <p className="aide">{q.aide}</p>}
            </div>
          ))}
          <button className="bouton bouton-phare" disabled={enCours}>
            {enCours ? "Rédaction en cours…" : texte ? "Rédiger à nouveau" : "Rédiger le document"}
          </button>
          {controles.length > 0 && (
            <ul className="controles" aria-label="Contrôles après rédaction">
              {controles.map((c) => (
                <li key={c.libelle}>
                  <span className={c.ok ? "s-conforme" : "s-partiel"} style={{ background: "none", fontWeight: 800 }}>{c.ok ? "✓" : "!"}</span> {c.libelle}
                </li>
              ))}
            </ul>
          )}
        </form>

        <div>
          <article className="feuille" aria-live="polite" aria-busy={enCours}>
            {texte ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <p className="vide">{erreur ?? "Le document s'écrira ici, section par section."}</p>}
          </article>
          {erreur && texte && <p className="erreur">{erreur}</p>}
          {texte && !enCours && (
            <div className="actions">
              <button
                className="bouton bouton-encre"
                onClick={async () => {
                  await navigator.clipboard.writeText(texte);
                  setCopie(true);
                  setTimeout(() => setCopie(false), 2000);
                }}
              >
                {copie ? "Copié" : "Copier le texte"}
              </button>
              <button className="bouton bouton-ligne" onClick={() => telecharger(`${nomFichier}.md`, texte, "text/markdown")}>Télécharger (.md)</button>
              <button
                className="bouton bouton-ligne"
                onClick={() => telecharger(`${nomFichier}.html`, `<!doctype html><html lang="fr"><meta charset="utf-8"><title>${plan.titre}</title><body>${html}</body></html>`, "text/html")}
              >
                Télécharger (.html)
              </button>
            </div>
          )}
          <p className="aide" style={{ marginTop: 14 }}>Projet de document généré par IA à partir de l&apos;audit. Relisez-le avant publication ; Vigie ne fournit pas de conseil juridique.</p>
        </div>
      </div>
    </div>
  );
}
