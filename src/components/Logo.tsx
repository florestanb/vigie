/** Marque Vigie : une tour de guet dont le faisceau dessine un V. */
export function Logo({ taille = 30 }: { taille?: number }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="var(--texte)" />
      <path d="M5 7 L16 19 L27 7" fill="none" stroke="var(--phare)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 27 L14.2 20 H17.8 L19 27 Z" fill="var(--fond)" />
      <circle cx="16" cy="18.6" r="2.2" fill="var(--phare)" />
    </svg>
  );
}

export function Marque() {
  return (
    <a href="/" className="marque" aria-label="Vigie, accueil">
      <Logo />
      <span>Vigie</span>
    </a>
  );
}
