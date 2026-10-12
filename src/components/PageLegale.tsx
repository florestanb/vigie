/** Gabarit des pages légales de Vigie elle-même. Les champs entre crochets sont à compléter avant la mise en ligne. */
export function PageLegale({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="etroit page-texte">
      <h1>{titre}</h1>
      <p className="avertissement" style={{ marginBottom: 24 }}>Page à compléter avec les informations de la société qui exploitera Vigie avant toute mise en ligne publique.</p>
      {children}
    </div>
  );
}
