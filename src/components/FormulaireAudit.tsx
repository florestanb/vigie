"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Evenement = { type: "etape"; message: string } | { type: "fin"; id: string } | { type: "erreur"; message: string };

export function FormulaireAudit() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [etapes, setEtapes] = useState<string[]>([]);
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function lancer(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setEnCours(true);
    setErreur(null);
    setEtapes(["Connexion au site"]);
    try {
      const reponse = await fetch("/api/audit", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ url }) });
      if (!reponse.body) throw new Error("Réponse vide du serveur.");
      const lecteur = reponse.body.pipeThrough(new TextDecoderStream()).getReader();
      let tampon = "";
      for (;;) {
        const { value, done } = await lecteur.read();
        if (done) break;
        tampon += value;
        const lignes = tampon.split("\n");
        tampon = lignes.pop() ?? "";
        for (const ligne of lignes.filter(Boolean)) {
          const ev = JSON.parse(ligne) as Evenement;
          if (ev.type === "etape") setEtapes((x) => [...x, ev.message]);
          if (ev.type === "erreur") throw new Error(ev.message);
          if (ev.type === "fin") {
            setEtapes((x) => [...x, "Rapport prêt"]);
            router.push(`/audit/${ev.id}`);
            return;
          }
        }
      }
      throw new Error("L'audit s'est interrompu.");
    } catch (err) {
      setErreur((err as Error).message);
      setEnCours(false);
    }
  }

  return (
    <>
      <form className="formulaire-url" onSubmit={lancer} role="search" aria-label="Auditer un site">
        <label htmlFor="url" className="sr-only" style={{ position: "absolute", left: -9999 }}>
          Adresse du site
        </label>
        <input id="url" type="text" inputMode="url" autoComplete="url" placeholder="votre-site.fr" value={url} onChange={(e) => setUrl(e.target.value)} disabled={enCours} />
        <button className="bouton bouton-phare" disabled={enCours}>
          {enCours ? "Audit en cours…" : "Auditer mon site"}
        </button>
      </form>
      {enCours && (
        <div className="progression" aria-live="polite">
          <ol>
            {etapes.slice(-6).map((e, i) => (
              <li key={i}>{e.length > 90 ? e.slice(0, 87) + "…" : e}</li>
            ))}
          </ol>
        </div>
      )}
      {erreur && <p className="erreur" role="alert">{erreur}</p>}
    </>
  );
}
