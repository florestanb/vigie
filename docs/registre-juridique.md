# Registre des obligations légales

Généré depuis `src/lib/rules/catalogue.ts` (à jour au 2026-10-12). Ne pas modifier à la main : `npm run registre`.

87 obligations en vigueur, 1 obligation(s) abrogée(s) signalée(s) comme à retirer.

## Identification de l'éditeur

### Page « Mentions légales » accessible

Les informations d'identification de l'éditeur et de l'hébergeur doivent être « facilement, directement et en permanence » accessibles, en pratique via un lien présent sur toutes les pages (pied de page).

- **Gravité** : critique · **Vérification** : auto (`page-mentions`) · **Document** : mentions-legales
- **S'applique à** : tous les sites
- **Sanction** : 1 an d'emprisonnement et 75 000 € d'amende (375 000 € pour une personne morale), LCEN art. 1-2.
- **Sources** : [LCEN (loi n° 2004-575), modifiée par la loi SREN n° 2024-449, art. 1-1 (ex-art. 6-III)](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164)

### Identité complète de l'éditeur

Personne morale : dénomination ou raison sociale, forme juridique, adresse du siège, montant du capital social. Personne physique : nom, prénoms, domicile (un particulier non professionnel peut ne communiquer que les coordonnées de son hébergeur).

- **Gravité** : critique · **Vérification** : ia (`identite-editeur`) · **Document** : mentions-legales
- **S'applique à** : editeurs = societe, entrepreneur-individuel, association, public
- **Sanction** : LCEN art. 1-2 ; amende de 4e classe pour l'absence des mentions du Code de commerce.
- **Sources** : [LCEN, art. 1-1, I et II](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164) ; [Code de commerce, art. R123-237](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000005634379)

### Adresse e-mail et téléphone de contact

L'éditeur indique une adresse de courrier électronique et un numéro de téléphone permettant de le contacter rapidement et de communiquer directement avec lui.

- **Gravité** : majeure · **Vérification** : auto (`contact`) · **Document** : mentions-legales
- **S'applique à** : un parmi : editeurs = societe, entrepreneur-individuel, association, public | venteEnLigne = true
- **Sources** : [LCEN, art. 1-1 et art. 19](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164) ; [Code de la consommation, art. R111-1 et L221-5](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

### Numéro d'immatriculation (SIREN, RCS ou RNE)

Pour une entreprise assujettie aux formalités d'inscription au RCS ou au registre national des entreprises : le numéro d'inscription (SIREN suivi de la mention RCS et de la ville du greffe pour une société commerciale).

- **Gravité** : critique · **Vérification** : auto (`siren`) · **Document** : mentions-legales
- **S'applique à** : editeurs = societe, entrepreneur-individuel
- **Sources** : [LCEN, art. 1-1](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164) ; [Code de commerce, art. R123-237](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000005634379)

### Numéro de TVA intracommunautaire

Si l'activité est assujettie à la TVA : le numéro individuel d'identification à la TVA.

- **Gravité** : mineure · **Vérification** : auto (`tva`) · **Document** : mentions-legales
- **S'applique à** : editeurs = societe, entrepreneur-individuel ; un parmi : venteEnLigne = true | b2b = true | b2c = true
- **Sources** : [LCEN, art. 19](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164) ; [Code général des impôts, art. 286 ter](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069577)

### Directeur de la publication

Le nom du directeur ou du codirecteur de la publication et, le cas échéant, celui du responsable de la rédaction.

- **Gravité** : majeure · **Vérification** : auto (`directeur-publication`) · **Document** : mentions-legales
- **S'applique à** : editeurs = societe, entrepreneur-individuel, association, public
- **Sources** : [LCEN, art. 1-1, I, 3°](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164)

### Identité de l'hébergeur

Le nom, la dénomination ou la raison sociale, l'adresse et le numéro de téléphone de l'hébergeur du site.

- **Gravité** : majeure · **Vérification** : auto (`hebergeur`) · **Document** : mentions-legales
- **S'applique à** : tous les sites
- **Sources** : [LCEN, art. 1-1, I, 4°](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164)

### Mentions des professions réglementées

Pour une profession réglementée : la référence aux règles professionnelles applicables, le titre professionnel, l'État membre où il a été octroyé, le nom de l'ordre ou de l'organisme professionnel d'inscription.

- **Gravité** : majeure · **Vérification** : ia · **Document** : mentions-legales
- **S'applique à** : secteurs = profession-reglementee
- **Sources** : [LCEN, art. 19](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164) ; [Code de la consommation, art. R111-2](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

### Autorisation d'exercer, si l'activité y est soumise

Si l'activité est soumise à autorisation (agrément, carte professionnelle, immatriculation ORIAS, Atout France…) : le nom et l'adresse de l'autorité qui l'a délivrée.

- **Gravité** : majeure · **Vérification** : ia · **Document** : mentions-legales
- **S'applique à** : secteurs = immobilier, credit-assurance, tourisme, jeux-argent, sante
- **Sources** : [LCEN, art. 19](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164) ; [Code de la consommation, art. R111-2](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

## Données personnelles

### Politique de confidentialité accessible

Dès qu'il collecte des données personnelles (formulaire, compte, commande, newsletter, mesure d'audience), le site fournit une information concise, transparente et aisément accessible sur les traitements, en pratique une page dédiée liée depuis toutes les pages et depuis chaque formulaire.

- **Gravité** : critique · **Vérification** : auto (`page-confidentialite`) · **Document** : confidentialite
- **S'applique à** : un parmi : collecteDonnees = true | traceurs = true
- **Sanction** : Jusqu'à 20 M€ ou 4 % du chiffre d'affaires mondial (RGPD art. 83) ; amendes CNIL en procédure simplifiée jusqu'à 20 000 €.
- **Sources** : [RGPD, art. 12 et 13](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra) ; [Loi Informatique et Libertés, art. 48](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000886460)

### Identité et coordonnées du responsable de traitement

La politique indique qui est responsable du traitement et comment le contacter (et, le cas échéant, son représentant dans l'UE).

- **Gravité** : majeure · **Vérification** : ia · **Document** : confidentialite
- **S'applique à** : un parmi : collecteDonnees = true | traceurs = true
- **Sources** : [RGPD, art. 13.1.a](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Coordonnées du délégué à la protection des données

Si un DPO a été désigné (obligatoire pour les organismes publics et pour les suivis réguliers à grande échelle ou les données sensibles à grande échelle) : ses coordonnées.

- **Gravité** : majeure · **Vérification** : ia · **Document** : confidentialite
- **S'applique à** : un parmi : editeurs = public | grandeEntreprise = true | secteurs = sante
- **Sources** : [RGPD, art. 13.1.b et 37](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Finalités et bases légales de chaque traitement

Pour chaque traitement : à quoi servent les données et sur quelle base légale (contrat, consentement, obligation légale, intérêt légitime, en précisant lequel).

- **Gravité** : majeure · **Vérification** : ia · **Document** : confidentialite
- **S'applique à** : un parmi : collecteDonnees = true | traceurs = true
- **Sources** : [RGPD, art. 6 et 13.1.c-d](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Destinataires et sous-traitants

Les destinataires ou catégories de destinataires des données (prestataires techniques, outils d'analyse, paiement, envoi d'e-mails…).

- **Gravité** : majeure · **Vérification** : ia · **Document** : confidentialite
- **S'applique à** : un parmi : collecteDonnees = true | traceurs = true
- **Sources** : [RGPD, art. 13.1.e](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Transferts hors Union européenne

Si des données sont transférées hors de l'UE (outils américains notamment) : le pays, le mécanisme d'encadrement (décision d'adéquation dont le Data Privacy Framework, clauses contractuelles types…) et le moyen d'en obtenir une copie.

- **Gravité** : majeure · **Vérification** : ia · **Document** : confidentialite
- **S'applique à** : un parmi : collecteDonnees = true | traceurs = true
- **Sources** : [RGPD, art. 13.1.f et 44 à 49](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Durées de conservation

La durée de conservation de chaque catégorie de données, ou les critères qui la déterminent.

- **Gravité** : majeure · **Vérification** : ia · **Document** : confidentialite
- **S'applique à** : un parmi : collecteDonnees = true | traceurs = true
- **Sources** : [RGPD, art. 5.1.e et 13.2.a](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Droits des personnes et modalités d'exercice

Droits d'accès, rectification, effacement, limitation, portabilité, opposition, retrait du consentement à tout moment, avec un moyen concret de les exercer.

- **Gravité** : majeure · **Vérification** : ia · **Document** : confidentialite
- **S'applique à** : un parmi : collecteDonnees = true | traceurs = true
- **Sources** : [RGPD, art. 13.2.b-c et 15 à 22](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Directives relatives au sort des données après le décès

Spécificité française : le droit de définir des directives sur la conservation, l'effacement et la communication des données après le décès.

- **Gravité** : mineure · **Vérification** : ia · **Document** : confidentialite
- **S'applique à** : un parmi : collecteDonnees = true | traceurs = true
- **Sources** : [Loi Informatique et Libertés, art. 85](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000886460)

### Droit de réclamation auprès de la CNIL

Le droit d'introduire une réclamation auprès d'une autorité de contrôle, la CNIL en France.

- **Gravité** : mineure · **Vérification** : ia · **Document** : confidentialite
- **S'applique à** : un parmi : collecteDonnees = true | traceurs = true
- **Sources** : [RGPD, art. 13.2.d et 77](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Caractère obligatoire ou facultatif des données

Si la fourniture des données conditionne un contrat ou est obligatoire : le préciser et indiquer les conséquences d'un refus (souvent via des astérisques sur le formulaire).

- **Gravité** : mineure · **Vérification** : ia · **Document** : confidentialite
- **S'applique à** : collecteDonnees = true
- **Sources** : [RGPD, art. 13.2.e](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Profilage et décisions automatisées

En cas de décision entièrement automatisée ou de profilage produisant des effets significatifs : son existence, la logique sous-jacente et ses conséquences.

- **Gravité** : mineure · **Vérification** : ia · **Document** : confidentialite
- **S'applique à** : un parmi : publicite = true | chatbotIA = true | secteurs = credit-assurance
- **Sources** : [RGPD, art. 13.2.f et 22](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Information au point de collecte (formulaires)

Chaque formulaire porte une mention d'information courte (responsable, finalité, droits) avec un lien vers la politique de confidentialité, et distingue les champs obligatoires.

- **Gravité** : majeure · **Vérification** : auto (`formulaires-mention`) · **Document** : interface
- **S'applique à** : collecteDonnees = true
- **Sources** : [RGPD, art. 12 et 13](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra) ; [CNIL, modèles de mentions d'information](https://www.cnil.fr/fr/modeles/mention)

### Consentement des mineurs de moins de 15 ans

Pour un service en ligne proposé directement à des mineurs et fondé sur le consentement : en dessous de 15 ans, consentement conjoint du mineur et du titulaire de l'autorité parentale, et information rédigée en termes clairs pour un enfant.

- **Gravité** : majeure · **Vérification** : ia · **Document** : confidentialite
- **S'applique à** : mineurs = true ; collecteDonnees = true
- **Sources** : [RGPD, art. 8 et 12](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra) ; [Loi Informatique et Libertés, art. 45](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000886460)

### Représentant dans l'Union

Un éditeur établi hors UE qui cible des personnes dans l'UE désigne par écrit un représentant dans l'Union et l'indique.

- **Gravité** : majeure · **Vérification** : ia · **Document** : confidentialite
- **S'applique à** : horsUE = true ; collecteDonnees = true
- **Sources** : [RGPD, art. 3.2 et 27](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Registre des activités de traitement

Tenir un registre des traitements (non publié). L'exemption des moins de 250 salariés ne joue pas pour les traitements non occasionnels, comme la gestion des clients ou la prospection.

- **Gravité** : majeure · **Vérification** : declaratif · **Document** : interne
- **S'applique à** : collecteDonnees = true
- **Sources** : [RGPD, art. 30](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Contrats avec les sous-traitants

Un contrat conforme à l'article 28 (DPA) avec chaque prestataire qui traite des données pour le compte de l'éditeur : hébergeur, outil d'e-mailing, CRM, analytics…

- **Gravité** : majeure · **Vérification** : declaratif · **Document** : interne
- **S'applique à** : collecteDonnees = true
- **Sources** : [RGPD, art. 28](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Procédure de violation de données

Documenter les violations de données et notifier la CNIL sous 72 heures en cas de risque pour les personnes.

- **Gravité** : mineure · **Vérification** : declaratif · **Document** : interne
- **S'applique à** : collecteDonnees = true
- **Sources** : [RGPD, art. 33 et 34](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

## Sécurité

### Chiffrement HTTPS

Les pages, et a fortiori les formulaires et espaces de compte, sont servies en HTTPS. La CNIL considère le TLS comme une mesure de sécurité élémentaire.

- **Gravité** : critique · **Vérification** : auto (`https`) · **Document** : interface
- **S'applique à** : tous les sites
- **Sources** : [RGPD, art. 32](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra) ; [CNIL, guide de la sécurité des données](https://www.cnil.fr/fr/securite-des-donnees)

## Cookies et traceurs

### Aucun traceur non essentiel avant consentement

Les cookies et traceurs non strictement nécessaires (publicité, réseaux sociaux, la plupart des outils de mesure d'audience) ne sont déposés ni lus avant que l'internaute ait consenti.

- **Gravité** : critique · **Vérification** : auto (`traceurs-avant-consentement`) · **Document** : interface
- **S'applique à** : tous les sites
- **Sanction** : Sanctions CNIL régulières, de quelques dizaines de milliers à plusieurs centaines de millions d'euros.
- **Sources** : [Loi Informatique et Libertés, art. 82](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000886460) ; [Directive ePrivacy 2002/58/CE, art. 5.3](https://eur-lex.europa.eu/eli/dir/2002/58/oj/fra) ; [CNIL, lignes directrices du 17 septembre 2020](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042388179)

### Contenus tiers chargés avant consentement

Les intégrations qui transmettent l'adresse IP à un tiers (vidéos YouTube, cartes Google, polices Google Fonts, boutons sociaux) sont soit hébergées localement, soit bloquées jusqu'au consentement.

- **Gravité** : majeure · **Vérification** : auto (`integrations-tierces`) · **Document** : interface
- **S'applique à** : tous les sites
- **Sources** : [RGPD, art. 6 et 44](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra) ; [Loi Informatique et Libertés, art. 82](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000886460)

### Bandeau de consentement

Si des traceurs soumis à consentement sont utilisés : un mécanisme de recueil du consentement libre, spécifique, éclairé et univoque, qui liste les finalités et permet de choisir.

- **Gravité** : critique · **Vérification** : auto (`cmp`) · **Document** : interface
- **S'applique à** : traceurs = true
- **Sources** : [CNIL, recommandation du 17 septembre 2020](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042388193) ; [RGPD, art. 4.11 et 7](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Refuser aussi simplement qu'accepter

Le bandeau propose, au même niveau et avec la même visibilité que « Tout accepter », un moyen de tout refuser (bouton « Tout refuser » ou équivalent). Fermer le bandeau ou continuer à naviguer ne vaut pas consentement.

- **Gravité** : critique · **Vérification** : auto (`bouton-refus`) · **Document** : interface
- **S'applique à** : traceurs = true
- **Sanction** : Motif central des sanctions CNIL de 2021-2022 contre Google (150 M€) et Facebook (60 M€).
- **Sources** : [CNIL, lignes directrices et recommandation de 2020](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies) ; [RGPD, art. 7.3](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Durée de vie des traceurs et du choix

Durée de vie des traceurs limitée à 13 mois au plus (recommandation CNIL) ; le choix de l'internaute est conservé et redemandé à intervalle raisonnable (6 mois recommandés).

- **Gravité** : mineure · **Vérification** : auto (`duree-cookies`) · **Document** : cookies
- **S'applique à** : traceurs = true
- **Sources** : [CNIL, recommandation du 17 septembre 2020](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042388193)

### Information sur les traceurs

Une information accessible sur chaque finalité, l'identité des tiers qui déposent des traceurs, la durée de conservation et la possibilité de retirer son consentement aussi facilement qu'on l'a donné (lien permanent « Gérer mes cookies »).

- **Gravité** : majeure · **Vérification** : ia · **Document** : cookies
- **S'applique à** : traceurs = true
- **Sources** : [CNIL, lignes directrices du 17 septembre 2020](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042388179) ; [RGPD, art. 7.3](https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra)

### Mesure d'audience exemptée correctement configurée

Un outil de mesure d'audience n'est dispensé de consentement que s'il respecte les conditions CNIL : finalité strictement limitée, données anonymes agrégées, pas de recoupement, traceurs de 13 mois maximum, données conservées 25 mois. Google Analytics ne remplit pas ces conditions.

- **Gravité** : majeure · **Vérification** : auto (`mesure-audience`) · **Document** : cookies
- **S'applique à** : traceurs = true
- **Sources** : [CNIL, solutions pour la mesure d'audience](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience)

## Vente à distance

### Conditions générales de vente accessibles

Des conditions générales de vente accessibles avant la commande, téléchargeables et imprimables, que le client accepte expressément. Entre professionnels, les CGV sont le socle de la négociation et doivent être communiquées sur demande.

- **Gravité** : critique · **Vérification** : auto (`page-cgv`) · **Document** : cgv
- **S'applique à** : venteEnLigne = true
- **Sanction** : Amende administrative jusqu'à 15 000 € (personne morale) par manquement aux obligations d'information, C. conso art. L242-10.
- **Sources** : [Code civil, art. 1119 et 1127-1](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006070721) ; [Code de la consommation, art. L221-5 et L221-11](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565) ; [Code de commerce, art. L441-1](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000005634379)

### Informations précontractuelles

Avant la commande : caractéristiques essentielles, prix total TTC et frais de livraison, délai ou date de livraison, identité et coordonnées du vendeur, modalités de paiement et d'exécution, garanties légales, durée du contrat et conditions de résiliation, fonctionnalité et interopérabilité des contenus numériques.

- **Gravité** : critique · **Vérification** : ia · **Document** : cgv
- **S'applique à** : venteEnLigne = true ; b2c = true
- **Sources** : [Code de la consommation, art. L111-1, R111-1, L221-5 et R221-2](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

### Droit de rétractation de 14 jours et formulaire type

Les conditions, le délai (14 jours) et les modalités d'exercice du droit de rétractation, le formulaire type de rétractation, qui supporte les frais de retour, ou l'absence de droit de rétractation et sa raison (biens personnalisés, contenus numériques exécutés…).

- **Gravité** : critique · **Vérification** : ia · **Document** : cgv
- **S'applique à** : venteEnLigne = true ; b2c = true
- **Sanction** : À défaut d'information, le délai de rétractation est prolongé de 12 mois (C. conso art. L221-20).
- **Sources** : [Code de la consommation, art. L221-5 2°, L221-18 à L221-28, R221-1 et annexe](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

### Fonctionnalité de rétractation en ligne

Depuis le 19 juin 2026, tout contrat conclu à distance via une interface en ligne doit pouvoir être rétracté en ligne par une fonctionnalité gratuite, clairement libellée et accessible pendant tout le délai, suivie d'un accusé de réception sur support durable. Les CGV doivent décrire cette fonctionnalité.

- **Gravité** : critique · **Vérification** : auto (`lien-retractation`) · **Document** : interface
- **S'applique à** : venteEnLigne = true ; b2c = true
- **Applicable depuis** : 2026-06-19
- **Sources** : [Directive (UE) 2023/2673, art. 11 bis de la directive 2011/83/UE](https://eur-lex.europa.eu/eli/dir/2023/2673/oj/fra) ; [Code de la consommation, issu de l'ordonnance du 5 janvier 2026, art. L221-21](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

### Bouton « Commande avec obligation de paiement »

Le bouton qui finalise la commande porte la mention « commande avec obligation de paiement » ou une formule analogue dénuée d'ambiguïté. Le client peut vérifier le détail de sa commande et corriger ses erreurs avant de confirmer (double clic).

- **Gravité** : majeure · **Vérification** : declaratif · **Document** : interface
- **S'applique à** : venteEnLigne = true ; b2c = true
- **Sanction** : Le contrat n'engage pas le consommateur s'il n'a pas été informé de l'obligation de paiement.
- **Sources** : [Code de la consommation, art. L221-14](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565) ; [Code civil, art. 1127-2](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006070721)

### Confirmation de commande sur support durable

Une confirmation du contrat, reprenant toutes les informations précontractuelles et le formulaire de rétractation, envoyée sur support durable (e-mail) au plus tard à la livraison.

- **Gravité** : majeure · **Vérification** : declaratif · **Document** : interne
- **S'applique à** : venteEnLigne = true ; b2c = true
- **Sources** : [Code de la consommation, art. L221-13](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

### Garantie légale de conformité et garantie des vices cachés

Les CGV reproduisent les informations sur la garantie légale de conformité (2 ans, 1 an pour les biens d'occasion achetés depuis 2022 avec preuve au-delà, mise à jour des contenus numériques), la garantie des vices cachés et, le cas échéant, la garantie commerciale, sous la forme de l'encadré prévu par décret.

- **Gravité** : majeure · **Vérification** : ia · **Document** : cgv
- **S'applique à** : venteEnLigne = true ; b2c = true
- **Sources** : [Code de la consommation, art. L217-3 et s., L224-25-12 et s., D211-2](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565) ; [Code civil, art. 1641 à 1649](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006070721)

### Délai de livraison et transfert des risques

La date ou le délai de livraison (à défaut, 30 jours au plus), les conséquences d'un retard et le transfert des risques à la prise de possession par le consommateur.

- **Gravité** : majeure · **Vérification** : ia · **Document** : cgv
- **S'applique à** : venteEnLigne = true ; b2c = true
- **Sources** : [Code de la consommation, art. L216-1 à L216-4](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

### Médiateur de la consommation

Le professionnel adhère à un médiateur de la consommation référencé et communique ses coordonnées (nom, site internet) sur son site et dans ses CGV.

- **Gravité** : majeure · **Vérification** : auto (`mediateur`) · **Document** : cgv
- **S'applique à** : b2c = true ; un parmi : venteEnLigne = true | types = vitrine
- **Sanction** : Amende administrative jusqu'à 15 000 € pour une personne morale (art. L641-1).
- **Sources** : [Code de la consommation, art. L612-1, L616-1 et R616-1](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565) ; [Liste des médiateurs référencés](https://www.economie.gouv.fr/mediation-conso/liste-des-mediateurs-references)

### Lien vers la plateforme européenne RLL à retirer (abrogée, à retirer)

La plateforme européenne de règlement en ligne des litiges (ec.europa.eu/consumers/odr) a fermé le 20 juillet 2025 et l'obligation d'y renvoyer a disparu. Un lien encore présent est un lien mort à retirer des CGV et du pied de page.

- **Gravité** : mineure · **Vérification** : auto (`lien-odr`) · **Document** : cgv
- **S'applique à** : tous les sites
- **Applicable depuis** : 2025-07-20
- **Sources** : [Règlement (UE) 2024/3228 abrogeant le règlement (UE) n° 524/2013](https://eur-lex.europa.eu/eli/reg/2024/3228/oj/fra)

### Pas de discrimination géographique dans l'UE

Pas de blocage ni de redirection forcée, ni de conditions générales d'accès différentes selon la nationalité ou le lieu de résidence d'un client de l'UE, sauf justification légale (livraison possible à retirer sur place).

- **Gravité** : mineure · **Vérification** : ia · **Document** : cgv
- **S'applique à** : venteEnLigne = true
- **Sources** : [Règlement (UE) 2018/302 « géoblocage », art. 3 à 5](https://eur-lex.europa.eu/eli/reg/2018/302/oj/fra)

## Contrats en ligne

### Archivage des contrats de 120 € ou plus

Pour une commande de 120 € TTC ou plus, le professionnel conserve l'écrit du contrat pendant 10 ans et en garantit l'accès au consommateur ; les CGV indiquent ces modalités d'archivage.

- **Gravité** : mineure · **Vérification** : ia · **Document** : cgv
- **S'applique à** : venteEnLigne = true ; b2c = true
- **Sources** : [Code de la consommation, art. L213-1 et D213-1](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565) ; [Code civil, art. 1127-1](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006070721)

### Étapes de conclusion du contrat électronique

Les différentes étapes à suivre pour conclure le contrat, les moyens de corriger les erreurs de saisie, les langues proposées et les règles professionnelles auxquelles le vendeur se soumet.

- **Gravité** : mineure · **Vérification** : ia · **Document** : cgv
- **S'applique à** : venteEnLigne = true
- **Sources** : [Code civil, art. 1127-1](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006070721)

### Absence de clauses abusives

Les conditions ne contiennent pas de clauses abusives (liste noire et liste grise), par exemple exclure toute responsabilité du vendeur, imposer une juridiction éloignée au consommateur ou se réserver de modifier unilatéralement le prix.

- **Gravité** : majeure · **Vérification** : ia · **Document** : cgv
- **S'applique à** : b2c = true ; un parmi : venteEnLigne = true | comptesUtilisateurs = true
- **Sanction** : Clause réputée non écrite ; amende administrative jusqu'à 15 000 € pour une personne morale (art. L241-2).
- **Sources** : [Code de la consommation, art. L212-1, R212-1 et R212-2](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

### CGV entre professionnels : délais et pénalités de retard

Pour une clientèle professionnelle : conditions de règlement, délais de paiement (60 jours ou 45 jours fin de mois au plus), taux des pénalités de retard et indemnité forfaitaire de 40 € pour frais de recouvrement.

- **Gravité** : majeure · **Vérification** : ia · **Document** : cgv
- **S'applique à** : b2b = true ; venteEnLigne = true
- **Sanction** : Amende administrative jusqu'à 75 000 € (personne physique) ou 2 M€ (personne morale) pour les délais de paiement.
- **Sources** : [Code de commerce, art. L441-1, L441-10 et D441-5](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000005634379)

### Information sur la reconduction des abonnements

Le consommateur est informé par écrit, 1 à 3 mois avant le terme, de sa faculté de ne pas reconduire un contrat à reconduction tacite ; les conditions de résiliation figurent dans les conditions générales.

- **Gravité** : majeure · **Vérification** : ia · **Document** : cgv
- **S'applique à** : abonnements = true ; b2c = true
- **Sources** : [Code de la consommation, art. L215-1 à L215-4](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

### Résiliation en ligne « en trois clics »

Quand un contrat peut être conclu par voie électronique, il doit pouvoir être résilié de la même façon via une fonctionnalité gratuite, directement et facilement accessible (mention « résilier votre contrat »), avec confirmation de la résiliation sur support durable.

- **Gravité** : critique · **Vérification** : auto (`lien-resiliation`) · **Document** : interface
- **S'applique à** : abonnements = true ; b2c = true
- **Applicable depuis** : 2023-06-01
- **Sanction** : Amende administrative jusqu'à 75 000 € pour une personne morale (art. L241-3-1).
- **Sources** : [Code de la consommation, art. L215-1-1 et D215-1 à D215-3](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

### Contenus et services numériques

Information sur la fonctionnalité, la compatibilité et l'interopérabilité, les mises à jour fournies et la garantie légale de conformité des contenus et services numériques ; si l'exécution commence avant la fin du délai, accord exprès et renoncement au droit de rétractation.

- **Gravité** : majeure · **Vérification** : ia · **Document** : cgv
- **S'applique à** : contenusNumeriques = true ; b2c = true
- **Sources** : [Code de la consommation, art. L111-1 4°, L221-28 13° et L224-25-12 et s.](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

## Prix et promotions

### Pas de frais supplémentaires selon le moyen de paiement

Aucun surcoût ne peut être appliqué au consommateur pour l'utilisation d'une carte de paiement grand public ou d'un virement ou prélèvement SEPA.

- **Gravité** : mineure · **Vérification** : ia · **Document** : cgv
- **S'applique à** : venteEnLigne = true ; b2c = true
- **Sources** : [Code monétaire et financier, art. L112-12](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072026) ; [Code de la consommation, art. L112-4-1](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

### Prix affichés TTC, frais en sus indiqués

Les prix proposés aux consommateurs sont indiqués toutes taxes comprises, en euros, avec les frais de livraison ou leur mode de calcul ; prix à l'unité de mesure pour les produits concernés.

- **Gravité** : majeure · **Vérification** : ia · **Document** : interface
- **S'applique à** : venteEnLigne = true ; b2c = true
- **Sources** : [Code de la consommation, art. L112-1](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565) ; [Arrêté du 3 décembre 1987 relatif à l'information du consommateur sur les prix](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000874009)

### Prix de référence des réductions

Toute annonce de réduction de prix indique le prix antérieur pratiqué, à savoir le prix le plus bas des 30 derniers jours précédant la réduction.

- **Gravité** : majeure · **Vérification** : declaratif · **Document** : interface
- **S'applique à** : reductionsPrix = true
- **Sanction** : Amende administrative jusqu'à 15 000 € pour une personne morale.
- **Sources** : [Code de la consommation, art. L112-1-1](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565) ; [Directive (UE) 2019/2161 « Omnibus »](https://eur-lex.europa.eu/eli/dir/2019/2161/oj/fra)

### Prix personnalisés par algorithme

Si le prix est personnalisé sur la base d'une prise de décision automatisée, le consommateur en est informé.

- **Gravité** : mineure · **Vérification** : declaratif · **Document** : cgv
- **S'applique à** : venteEnLigne = true ; b2c = true ; publicite = true
- **Sources** : [Code de la consommation, art. L221-5 1° bis](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565) ; [Directive (UE) 2019/2161](https://eur-lex.europa.eu/eli/dir/2019/2161/oj/fra)

## Accessibilité

### Informations d'accessibilité du service dans les conditions générales

Les services de commerce électronique couverts par l'European Accessibility Act indiquent dans leurs conditions générales, ou un document équivalent, comment le service satisfait aux exigences d'accessibilité.

- **Gravité** : majeure · **Vérification** : ia · **Document** : cgv
- **S'applique à** : venteEnLigne = true ; b2c = true ; microEntreprise = false
- **Applicable depuis** : 2025-06-28
- **Sources** : [Directive (UE) 2019/882, annexe V](https://eur-lex.europa.eu/eli/dir/2019/882/oj/fra) ; [Loi n° 2005-102 modifiée par l'ordonnance n° 2023-859, art. 47](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000809647)

### Mention « Accessibilité : non / partiellement / totalement conforme »

Les acteurs soumis à l'obligation d'accessibilité affichent sur leur page d'accueil leur état de conformité, renvoient à une déclaration d'accessibilité et publient un schéma pluriannuel.

- **Gravité** : majeure · **Vérification** : auto (`mention-accessibilite`) · **Document** : accessibilite
- **S'applique à** : un parmi : editeurs = public | grandeEntreprise = true | venteEnLigne = true ; b2c = true ; microEntreprise = false
- **Sanction** : Jusqu'à 50 000 € pour défaut de déclaration, renouvelable tous les 6 mois ; sanctions spécifiques EAA depuis 2025.
- **Sources** : [Loi n° 2005-102, art. 47](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000809647) ; [Décret n° 2019-768, art. 3 à 5](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000038811937) ; [Référentiel RGAA](https://accessibilite.numerique.gouv.fr/)

### Conformité aux exigences d'accessibilité (RGAA / EN 301 549)

Depuis le 28 juin 2025, les services de commerce électronique et les services numériques des entreprises qui ne sont pas des microentreprises doivent être accessibles aux personnes handicapées (European Accessibility Act).

- **Gravité** : majeure · **Vérification** : declaratif · **Document** : interface
- **S'applique à** : un parmi : editeurs = public | grandeEntreprise = true | venteEnLigne = true ; b2c = true ; microEntreprise = false
- **Applicable depuis** : 2025-06-28
- **Sources** : [Directive (UE) 2019/882 « EAA »](https://eur-lex.europa.eu/eli/dir/2019/882/oj/fra) ; [Loi n° 2005-102 modifiée, art. 47](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000809647)

## Plateformes et contenus

### Conditions générales d'utilisation

Pour un service avec comptes, contenus d'utilisateurs ou mise en relation : des CGU claires qui fixent les règles d'usage, les restrictions imposées aux contenus et la procédure de modération (y compris les outils automatisés et le traitement des réclamations).

- **Gravité** : majeure · **Vérification** : auto (`page-cgu`) · **Document** : cgu
- **S'applique à** : un parmi : comptesUtilisateurs = true | contenusUtilisateurs = true | types = saas, marketplace, communaute
- **Applicable depuis** : 2024-02-17
- **Sources** : [Règlement (UE) 2022/2065 « DSA », art. 14](https://eur-lex.europa.eu/eli/reg/2022/2065/oj/fra) ; [Code civil, art. 1119](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006070721)

### Point de contact unique pour les utilisateurs et les autorités

Les fournisseurs de services intermédiaires (hébergement de contenus de tiers inclus) publient un point de contact électronique, facilement accessible, et les langues utilisables.

- **Gravité** : majeure · **Vérification** : ia · **Document** : cgu
- **S'applique à** : contenusUtilisateurs = true
- **Applicable depuis** : 2024-02-17
- **Sources** : [DSA, art. 11 et 12](https://eur-lex.europa.eu/eli/reg/2022/2065/oj/fra)

### Mécanisme de signalement des contenus illicites

Un dispositif facile d'accès permettant à toute personne de signaler un contenu illicite, avec accusé de réception, décision motivée et information des personnes concernées.

- **Gravité** : majeure · **Vérification** : ia · **Document** : interface
- **S'applique à** : contenusUtilisateurs = true
- **Applicable depuis** : 2024-02-17
- **Sources** : [DSA, art. 16 et 17](https://eur-lex.europa.eu/eli/reg/2022/2065/oj/fra) ; [LCEN, art. 6](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164)

### Transparence des plateformes en ligne

Les plateformes de mise en relation indiquent les critères de classement des offres, l'existence d'une relation capitalistique ou d'une rémunération influant sur le classement, la qualité du vendeur (professionnel ou particulier) et les droits qui en découlent.

- **Gravité** : majeure · **Vérification** : ia · **Document** : cgu
- **S'applique à** : types = marketplace
- **Sources** : [Code de la consommation, art. L111-7 et D111-7 à D111-15](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565) ; [Règlement (UE) 2019/1150 « P2B », art. 3 et 5](https://eur-lex.europa.eu/eli/reg/2019/1150/oj/fra) ; [DSA, art. 27 et 30](https://eur-lex.europa.eu/eli/reg/2022/2065/oj/fra)

### Conditions pour les vendeurs professionnels (P2B)

Conditions générales destinées aux entreprises utilisatrices : motifs de suspension, préavis de 30 jours avant modification, système interne de traitement des plaintes, médiateurs désignés.

- **Gravité** : majeure · **Vérification** : ia · **Document** : cgu
- **S'applique à** : types = marketplace
- **Sources** : [Règlement (UE) 2019/1150 « P2B », art. 3, 4, 11 et 12](https://eur-lex.europa.eu/eli/reg/2019/1150/oj/fra)

### Fiabilité des avis en ligne

Le site qui publie des avis indique s'ils font l'objet d'une vérification et, si oui, comment (procédure de contrôle, critères de publication, ordre d'affichage, possibilité de répondre). Publier ou commander de faux avis est une pratique trompeuse.

- **Gravité** : majeure · **Vérification** : ia · **Document** : interface
- **S'applique à** : avisClients = true
- **Sources** : [Code de la consommation, art. L111-7-2, D111-16 à D111-19 et L121-4 21° à 23°](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

### Pas d'interface trompeuse (dark patterns)

L'interface ne doit pas tromper ou manipuler l'utilisateur : options préselectionnées, désabonnement plus difficile que l'abonnement, sollicitations répétées, choix mis en avant de façon déséquilibrée.

- **Gravité** : mineure · **Vérification** : declaratif · **Document** : interface
- **S'applique à** : un parmi : types = marketplace, communaute | venteEnLigne = true
- **Sources** : [DSA, art. 25](https://eur-lex.europa.eu/eli/reg/2022/2065/oj/fra) ; [Code de la consommation, art. L121-1 à L121-4](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

### Protection des mineurs sur les plateformes

Les plateformes accessibles aux mineurs garantissent un niveau élevé de protection et n'affichent pas de publicité ciblée fondée sur le profilage d'un mineur.

- **Gravité** : majeure · **Vérification** : declaratif · **Document** : cgu
- **S'applique à** : mineurs = true ; contenusUtilisateurs = true
- **Sources** : [DSA, art. 28](https://eur-lex.europa.eu/eli/reg/2022/2065/oj/fra)

## Prospection et publicité

### Consentement à la prospection par e-mail

La prospection commerciale par e-mail ou SMS vers des particuliers exige leur consentement préalable (case non précochée), sauf pour des produits analogues vendus à un client existant qui a pu s'y opposer ; chaque message comporte un lien de désinscription.

- **Gravité** : majeure · **Vérification** : ia · **Document** : interface
- **S'applique à** : newsletter = true
- **Sanction** : Amende administrative jusqu'à 75 000 € (personne physique) ou 375 000 € (personne morale), C. conso art. L242-16.
- **Sources** : [Code des postes et des communications électroniques, art. L34-5](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006070987)

### Opposition au démarchage téléphonique

Quand un professionnel recueille le numéro de téléphone d'un consommateur, il l'informe de son droit de s'inscrire sur la liste Bloctel.

- **Gravité** : mineure · **Vérification** : ia · **Document** : interface
- **S'applique à** : collecteDonnees = true ; b2c = true
- **Sources** : [Code de la consommation, art. L223-2](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565)

### Publicité et contenus sponsorisés identifiables

Toute publicité, y compris un contenu sponsorisé ou un lien d'affiliation, doit être clairement identifiable comme telle et l'annonceur identifiable.

- **Gravité** : majeure · **Vérification** : declaratif · **Document** : interface
- **S'applique à** : publicite = true
- **Sources** : [LCEN, art. 20](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164) ; [Code de la consommation, art. L121-4 11°](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565) ; [DSA, art. 26](https://eur-lex.europa.eu/eli/reg/2022/2065/oj/fra)

### Influence commerciale

Les contenus d'influence commerciale portent la mention « publicité » ou « collaboration commerciale » et, le cas échéant, « image retouchée » ou « image virtuelle ».

- **Gravité** : majeure · **Vérification** : declaratif · **Document** : interface
- **S'applique à** : publicite = true ; types = media, communaute
- **Sources** : [Loi n° 2023-451 du 9 juin 2023, art. 5](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000047663185)

## Environnement

### Allégations environnementales génériques interdites

Depuis le 27 septembre 2026, les allégations génériques (« éco-responsable », « vert », « respectueux de l'environnement »…) sans performance environnementale excellente et reconnue, les allégations de neutralité carbone fondées sur la compensation et les labels non certifiés par un tiers sont des pratiques trompeuses.

- **Gravité** : critique · **Vérification** : auto (`allegations-vertes`) · **Document** : interface
- **S'applique à** : allegationsEnvironnementales = true
- **Applicable depuis** : 2026-09-27
- **Sanction** : Pratique commerciale trompeuse : 2 ans d'emprisonnement et 300 000 € d'amende, portée à 80 % des dépenses de communication en cas d'allégation environnementale.
- **Sources** : [Directive (UE) 2024/825 « transition verte »](https://eur-lex.europa.eu/eli/dir/2024/825/oj/fra) ; [Code de la consommation, art. L121-2 et L121-4](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565) ; [Code de l'environnement, art. L229-68 (neutralité carbone)](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006074220)

### Indice de réparabilité ou de durabilité

Pour les équipements électriques et électroniques concernés (smartphones, ordinateurs, téléviseurs, lave-linge…), afficher l'indice de réparabilité ou de durabilité à proximité du prix, y compris en ligne.

- **Gravité** : majeure · **Vérification** : declaratif · **Document** : interface
- **S'applique à** : secteurs = electronique-electromenager ; venteEnLigne = true
- **Sources** : [Code de l'environnement, art. L541-9-2](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006074220)

### Information sur la réparation

Pour les biens couverts par la directive « droit à la réparation » (applicable depuis le 31 juillet 2026) : informer de l'obligation de réparation du fabricant et des moyens d'accéder aux services de réparation.

- **Gravité** : mineure · **Vérification** : declaratif · **Document** : cgv
- **S'applique à** : secteurs = electronique-electromenager ; venteEnLigne = true
- **Applicable depuis** : 2026-07-31
- **Sources** : [Directive (UE) 2024/1799](https://eur-lex.europa.eu/eli/dir/2024/1799/oj/fra)

## Intelligence artificielle

### Information sur l'interaction avec une IA

Les personnes qui échangent avec un système d'IA (chatbot, assistant) sont informées qu'elles interagissent avec une IA, sauf évidence ; les contenus générés ou manipulés par IA (hypertrucages, textes d'information) sont signalés comme tels.

- **Gravité** : majeure · **Vérification** : ia · **Document** : interface
- **S'applique à** : chatbotIA = true
- **Applicable depuis** : 2026-08-02
- **Sources** : [Règlement (UE) 2024/1689 « AI Act », art. 50](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/fra)

## Langue

### Offre et conditions en français

La présentation des biens et services, les modes d'emploi, les garanties et les conditions contractuelles proposés à des consommateurs en France sont rédigés en français (les traductions sont permises en plus).

- **Gravité** : majeure · **Vérification** : auto (`langue`) · **Document** : interface
- **S'applique à** : b2c = true
- **Sources** : [Loi n° 94-665 « Toubon », art. 2](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000349929)

## Sectoriel

### Alcool : message sanitaire et interdiction de vente aux mineurs

Toute publicité pour des boissons alcooliques porte le message « L'abus d'alcool est dangereux pour la santé, à consommer avec modération » ; la vente aux mineurs est interdite et doit être affichée, avec un contrôle de l'âge.

- **Gravité** : critique · **Vérification** : auto (`message-alcool`) · **Document** : interface
- **S'applique à** : secteurs = alcool
- **Sources** : [Code de la santé publique, art. L3323-4 et L3342-1](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072665)

### Denrées alimentaires vendues à distance

Les informations obligatoires (dénomination, liste des ingrédients, allergènes, quantité, conditions de conservation, origine si requise) sont disponibles avant l'achat, sur la fiche produit.

- **Gravité** : majeure · **Vérification** : declaratif · **Document** : interface
- **S'applique à** : secteurs = alimentaire ; venteEnLigne = true
- **Sources** : [Règlement (UE) n° 1169/2011 « INCO », art. 9 et 14](https://eur-lex.europa.eu/eli/reg/2011/1169/oj/fra)

### Immobilier : honoraires, carte professionnelle, DPE

Les agents immobiliers affichent leurs barèmes d'honoraires TTC sur leur site, leur numéro de carte professionnelle et sa préfecture ou CCI de délivrance, leur garant ; les annonces mentionnent la classe énergie et climat (DPE).

- **Gravité** : critique · **Vérification** : declaratif · **Document** : mentions-legales
- **S'applique à** : secteurs = immobilier
- **Sources** : [Loi n° 70-9 « Hoguet »](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000512228) ; [Arrêté du 10 janvier 2017 relatif à l'information sur les prix des prestations des agents immobiliers](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000033860733) ; [Code de la construction et de l'habitation, art. L126-33](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006074096)

### Crédit et assurance : ORIAS et mentions de publicité

Les intermédiaires indiquent leur numéro d'immatriculation ORIAS ; la publicité pour un crédit à la consommation comporte les mentions obligatoires (TAEG en exemple représentatif, « Un crédit vous engage et doit être remboursé… »).

- **Gravité** : critique · **Vérification** : declaratif · **Document** : mentions-legales
- **S'applique à** : secteurs = credit-assurance
- **Sources** : [Code de la consommation, art. L312-5 à L312-10](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565) ; [Code des assurances, art. L512-1 et R521-1](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006073984)

### Santé : hébergement HDS et règles de vente en ligne

Les données de santé confiées à un prestataire sont hébergées chez un hébergeur certifié HDS ; la vente en ligne de médicaments est réservée aux pharmacies autorisées et soumise à des mentions précises (logo commun européen, lien vers l'ARS).

- **Gravité** : critique · **Vérification** : declaratif · **Document** : interne
- **S'applique à** : secteurs = sante
- **Sources** : [Code de la santé publique, art. L1111-8, L5125-33 et s.](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072665)

### Voyages et séjours : immatriculation et formulaire d'information

Les opérateurs de voyages indiquent leur immatriculation Atout France, leur garantie financière et fournissent le formulaire d'information standard avant la vente d'un forfait.

- **Gravité** : critique · **Vérification** : declaratif · **Document** : cgv
- **S'applique à** : secteurs = tourisme
- **Sources** : [Code du tourisme, art. L211-8, L211-18 et R211-3-1](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006074073)

### Artisans et BTP : assurance professionnelle

Les artisans soumis à une assurance obligatoire (décennale notamment) indiquent l'assurance souscrite, les coordonnées de l'assureur et la couverture géographique, sur les devis et factures et, en pratique, sur le site.

- **Gravité** : majeure · **Vérification** : declaratif · **Document** : mentions-legales
- **S'applique à** : secteurs = btp-artisan
- **Sources** : [Loi n° 96-603 du 5 juillet 1996, art. 22-2](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000193678) ; [Code des assurances, art. L243-2](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006073984)

### Livres : prix unique et frais de port minimum

Prix de vente fixé par l'éditeur (remise de 5 % au plus) ; pour la vente en ligne de livres neufs livrés, frais de livraison minimum de 3 € TTC en dessous de 35 € d'achat.

- **Gravité** : majeure · **Vérification** : declaratif · **Document** : cgv
- **S'applique à** : secteurs = livre ; venteEnLigne = true
- **Sources** : [Loi n° 81-766 « Lang », art. 1](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000517179)

### Jeux d'argent : agrément et mise en garde

Seuls les opérateurs agréés par l'ANJ peuvent proposer des jeux d'argent en ligne ; les communications portent un message de mise en garde et l'interdiction aux mineurs.

- **Gravité** : critique · **Vérification** : declaratif · **Document** : interface
- **S'applique à** : secteurs = jeux-argent
- **Sources** : [Loi n° 2010-476 du 12 mai 2010](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000022204510)

### Formation professionnelle : déclaration d'activité

Les organismes de formation indiquent leur numéro de déclaration d'activité (avec la mention qu'il ne vaut pas agrément de l'État) et, s'ils en bénéficient, la certification Qualiopi.

- **Gravité** : mineure · **Vérification** : declaratif · **Document** : mentions-legales
- **S'applique à** : secteurs = formation
- **Sources** : [Code du travail, art. L6352-1 et R6351-1 et s.](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072050)

### Photographies commerciales retouchées

Les photographies à usage commercial de mannequins dont la silhouette a été modifiée portent la mention « photographie retouchée ».

- **Gravité** : mineure · **Vérification** : declaratif · **Document** : interface
- **S'applique à** : publicite = true ; venteEnLigne = true
- **Sources** : [Code de la santé publique, art. L2133-2](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072665)
