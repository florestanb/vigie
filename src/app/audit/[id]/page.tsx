import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Rapport } from "@/components/Rapport";
import { chargerAudit } from "@/lib/audit";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const audit = await chargerAudit((await params).id);
  return { title: audit ? `Audit de ${new URL(audit.url).hostname}` : "Audit introuvable", robots: { index: false } };
}

export default async function PageAudit({ params }: Params) {
  const audit = await chargerAudit((await params).id);
  if (!audit) notFound();
  return <Rapport audit={audit} />;
}
