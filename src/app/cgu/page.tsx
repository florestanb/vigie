import { PageLegale } from "@/components/PageLegale";

export const metadata = { title: "Conditions d'utilisation" };

export default function Page() {
  return (
    <PageLegale titre="Conditions générales d'utilisation">
      <h2>Objet</h2>
      <p>Vigie analyse automatiquement les pages publiques d&apos;un site et propose des projets de documents légaux. L&apos;utilisateur reste seul responsable des textes qu&apos;il publie après les avoir relus.</p>
      <h2>Usage autorisé</h2>
      <p>L&apos;utilisateur n&apos;audite que des sites qu&apos;il édite ou pour lesquels il est mandaté. L&apos;usage automatisé massif est interdit.</p>
      <h2>Responsabilité</h2>
      <p>Vigie est tenue d&apos;une obligation de moyens. Les constats reposent sur ce qui est visible publiquement à la date de l&apos;audit et sur le registre des obligations à jour à sa date de mise à jour.</p>
      <h2>Contenus générés par IA</h2>
      <p>Les analyses et documents sont produits avec l&apos;aide d&apos;un système d&apos;intelligence artificielle (Claude, d&apos;Anthropic), conformément à l&apos;article 50 du règlement (UE) 2024/1689.</p>
      <h2>Droit applicable</h2>
      <p>Droit français. [Médiateur de la consommation, si offre aux particuliers.]</p>
    </PageLegale>
  );
}
