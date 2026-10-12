import { PageLegale } from "@/components/PageLegale";

export const metadata = { title: "Politique de confidentialité" };

export default function Page() {
  return (
    <PageLegale titre="Politique de confidentialité">
      <h2>Responsable de traitement</h2>
      <p>[Dénomination], [adresse], [e-mail de contact].</p>
      <h2>Données traitées</h2>
      <p>Adresse du site audité, contenu public de ses pages, résultats de l&apos;audit et informations saisies pour la rédaction des documents. Base légale : exécution du service demandé (art. 6.1.b RGPD). Aucun cookie de mesure d&apos;audience ni de publicité n&apos;est déposé.</p>
      <h2>Destinataires</h2>
      <p>Hébergeur [nom, pays] ; Anthropic PBC (États-Unis) pour l&apos;analyse et la rédaction par l&apos;API Claude, encadré par [mécanisme de transfert].</p>
      <h2>Durée de conservation</h2>
      <p>Les rapports d&apos;audit sont conservés [durée], puis supprimés.</p>
      <h2>Vos droits</h2>
      <p>Accès, rectification, effacement, limitation, opposition, portabilité et directives post-mortem, à exercer à [e-mail]. Réclamation possible auprès de la CNIL (cnil.fr).</p>
    </PageLegale>
  );
}
