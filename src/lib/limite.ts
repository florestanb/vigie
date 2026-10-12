// Limitation de débit en mémoire, par adresse IP. Suffisant pour une instance unique.
const fenetres = new Map<string, number[]>();

export function autoriser(cle: string, max: number, fenetreMs: number): boolean {
  const maintenant = Date.now();
  const recents = (fenetres.get(cle) ?? []).filter((t) => maintenant - t < fenetreMs);
  if (recents.length >= max) return false;
  recents.push(maintenant);
  fenetres.set(cle, recents);
  return true;
}

export function ipDe(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
}
