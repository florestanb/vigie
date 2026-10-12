import { lancerAudit } from "@/lib/audit";
import { autoriser, ipDe } from "@/lib/limite";

export const runtime = "nodejs";
export const maxDuration = 300;

/** Lance un audit et renvoie la progression en NDJSON, puis l'identifiant du rapport. */
export async function POST(req: Request) {
  const { url } = (await req.json().catch(() => ({}))) as { url?: string };
  const encodeur = new TextEncoder();
  const flux = new TransformStream<string, Uint8Array>({ transform: (ligne, c) => c.enqueue(encodeur.encode(ligne + "\n")) });
  const ecrivain = flux.writable.getWriter();
  const envoyer = (ev: object) => ecrivain.write(JSON.stringify(ev)).catch(() => {});

  (async () => {
    try {
      if (!url || typeof url !== "string" || url.length > 500) throw new Error("Indiquez l'adresse d'un site, par exemple votre-site.fr.");
      if (!autoriser(ipDe(req), 6, 10 * 60_000)) throw new Error("Trop d'audits lancés depuis votre connexion. Réessayez dans quelques minutes.");
      const audit = await lancerAudit(url, (message) => envoyer({ type: "etape", message }));
      await envoyer({ type: "fin", id: audit.id });
    } catch (e) {
      const message = (e as Error).message ?? "Erreur inconnue";
      const lisible = /ERR_NAME_NOT_RESOLVED|ENOTFOUND/.test(message)
        ? "Ce site est introuvable. Vérifiez l'adresse."
        : /Timeout|ERR_CONNECTION|ERR_TUNNEL/.test(message)
          ? "Le site n'a pas répondu à temps ou refuse la connexion."
          : message.split("\n")[0];
      await envoyer({ type: "erreur", message: lisible });
    } finally {
      await ecrivain.close().catch(() => {});
    }
  })();

  return new Response(flux.readable, { headers: { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store" } });
}
