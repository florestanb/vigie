import Anthropic from "@anthropic-ai/sdk";

export const MODELE = process.env.VIGIE_MODELE ?? "claude-opus-5-5";

// Si une requête est refusée par les filtres de sécurité, l'API la rejoue sur le modèle de repli recommandé.
export const OPTIONS_REPLI = { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const };

let client: Anthropic | null = null;

/** L'IA est facultative : sans clé, Vigie fait l'audit automatique seul. */
export function iaDisponible(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

export function claude(): Anthropic {
  client ??= new Anthropic();
  return client;
}

export function messageErreurIA(e: unknown): string {
  if (e instanceof Anthropic.AuthenticationError) return "Clé d'API Claude invalide.";
  if (e instanceof Anthropic.RateLimitError) return "Limite de débit de l'API Claude atteinte, réessayez dans un instant.";
  if (e instanceof Anthropic.APIConnectionError) return "API Claude injoignable.";
  if (e instanceof Anthropic.APIError) return `Erreur de l'API Claude (${e.status ?? "?"}).`;
  return (e as Error)?.message ?? "Erreur inconnue de l'analyse IA.";
}
