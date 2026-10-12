export default function Introuvable() {
  return (
    <div className="etroit page-texte" style={{ textAlign: "center" }}>
      <h1>Rien à l&apos;horizon.</h1>
      <p style={{ color: "var(--texte-doux)" }}>Cette page n&apos;existe pas ou ce rapport a expiré.</p>
      <p style={{ marginTop: 20 }}><a className="bouton bouton-phare" href="/">Lancer un nouvel audit</a></p>
    </div>
  );
}
