import { PageLegale } from "@/components/PageLegale";

export const metadata = { title: "Mentions légales" };

export default function Page() {
  return (
    <PageLegale titre="Mentions légales">
      <h2>Éditeur</h2>
      <p>[Dénomination], [forme juridique] au capital de [montant] €, siège social [adresse], immatriculée au RCS de [ville] sous le numéro [SIREN], TVA [numéro].</p>
      <p>Contact : [e-mail] · [téléphone]</p>
      <h2>Directeur de la publication</h2>
      <p>[Nom et prénom]</p>
      <h2>Hébergement</h2>
      <p>[Nom de l&apos;hébergeur], [adresse], [téléphone].</p>
      <h2>Nature du service</h2>
      <p>Vigie est un outil d&apos;aide à la conformité. Il produit des constats automatisés et des projets de documents ; il ne constitue pas une consultation juridique au sens de la loi n° 71-1130 du 31 décembre 1971.</p>
    </PageLegale>
  );
}
