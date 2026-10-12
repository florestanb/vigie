// Types partagés entre le crawler, le moteur de règles, l'analyse IA et l'interface.

export type SiteType =
  | "vitrine" // site de présentation d'une activité
  | "ecommerce" // vente de biens ou services en ligne
  | "saas" // logiciel ou application en ligne, souvent par abonnement
  | "marketplace" // mise en relation de vendeurs tiers et d'acheteurs
  | "media" // blog, presse, contenus éditoriaux
  | "communaute"; // forum, réseau, contenus publiés par les utilisateurs

export type Editeur = "societe" | "entrepreneur-individuel" | "association" | "particulier" | "public";

export type Secteur =
  | "alcool"
  | "alimentaire"
  | "immobilier"
  | "credit-assurance"
  | "sante"
  | "tourisme"
  | "btp-artisan"
  | "livre"
  | "jeux-argent"
  | "electronique-electromenager"
  | "formation"
  | "profession-reglementee";

/** Ce que l'on sait (ou suppose) du site. Détecté automatiquement, puis corrigeable par l'utilisateur. */
export interface Profil {
  types: SiteType[];
  editeur: Editeur;
  b2c: boolean; // s'adresse à des consommateurs
  b2b: boolean; // s'adresse à des professionnels
  venteEnLigne: boolean; // un contrat peut être conclu en ligne (panier, paiement, souscription)
  abonnements: boolean; // contrats à reconduction ou abonnements payants
  contenusNumeriques: boolean; // vend des contenus ou services numériques (logiciel, streaming, ebook…)
  collecteDonnees: boolean; // formulaire, compte, newsletter, commande…
  comptesUtilisateurs: boolean;
  newsletter: boolean;
  traceurs: boolean; // cookies ou traceurs non strictement nécessaires
  contenusUtilisateurs: boolean; // avis, commentaires, annonces, messages publiés par des tiers
  avisClients: boolean;
  chatbotIA: boolean;
  publicite: boolean; // publicité, affiliation, contenus sponsorisés
  reductionsPrix: boolean; // annonces de prix barrés, soldes, promotions
  allegationsEnvironnementales: boolean;
  horsUE: boolean; // éditeur établi hors de l'Union européenne
  microEntreprise: boolean; // moins de 10 salariés et CA ou bilan ≤ 2 M€ (exemption accessibilité EAA)
  grandeEntreprise: boolean; // CA ≥ 250 M€ (obligation RGAA historique)
  mineurs: boolean; // public susceptible d'être mineur
  secteurs: Secteur[];
}

export type Gravite = "critique" | "majeure" | "mineure";
export type ModeVerification = "auto" | "ia" | "declaratif";
export type DocumentCible =
  | "mentions-legales"
  | "confidentialite"
  | "cookies"
  | "cgv"
  | "cgu"
  | "accessibilite"
  | "interface" // élément d'interface : bandeau, bouton, lien, mention à côté d'un prix…
  | "interne"; // document interne, non publié (registre, contrats…)

export type Domaine =
  | "Identification de l'éditeur"
  | "Données personnelles"
  | "Cookies et traceurs"
  | "Vente à distance"
  | "Contrats en ligne"
  | "Prix et promotions"
  | "Plateformes et contenus"
  | "Accessibilité"
  | "Prospection et publicité"
  | "Environnement"
  | "Intelligence artificielle"
  | "Langue"
  | "Sécurité"
  | "Sectoriel";

export interface SourceLegale {
  texte: string;
  article?: string;
  url: string;
}

/** Conditions d'application : toutes les clés présentes doivent être vraies (ET). Une liste vaut OU. */
export interface Conditions {
  types?: SiteType[];
  editeurs?: Editeur[];
  secteurs?: Secteur[];
  b2c?: boolean;
  b2b?: boolean;
  venteEnLigne?: boolean;
  abonnements?: boolean;
  contenusNumeriques?: boolean;
  collecteDonnees?: boolean;
  comptesUtilisateurs?: boolean;
  newsletter?: boolean;
  traceurs?: boolean;
  contenusUtilisateurs?: boolean;
  avisClients?: boolean;
  chatbotIA?: boolean;
  publicite?: boolean;
  reductionsPrix?: boolean;
  allegationsEnvironnementales?: boolean;
  horsUE?: boolean;
  microEntreprise?: boolean;
  grandeEntreprise?: boolean;
  mineurs?: boolean;
  /** Au moins une des sous-conditions (pour exprimer un OU entre critères différents). */
  ou?: Conditions[];
}

export interface Regle {
  id: string;
  domaine: Domaine;
  titre: string;
  /** Ce qui doit être présent ou respecté, en langage clair. */
  exigence: string;
  document: DocumentCible;
  conditions: Conditions;
  sources: SourceLegale[];
  sanction?: string;
  /** Date d'application, quand elle est récente ou future (AAAA-MM-JJ). */
  applicableDepuis?: string;
  /** Règle devenue obsolète : sa présence sur le site est signalée comme à retirer. */
  obsolete?: boolean;
  gravite: Gravite;
  verification: ModeVerification;
  /** Identifiant de la vérification automatique (voir checks.ts). */
  check?: string;
  /** Question posée à Claude quand la vérification passe par la lecture des textes. */
  questionIA?: string;
}

export type Statut = "conforme" | "partiel" | "manquant" | "a-verifier" | "a-retirer" | "non-applicable";

export interface Constat {
  statut: Exclude<Statut, "non-applicable">;
  preuve?: string; // extrait ou observation qui justifie le statut
  url?: string;
}

export interface ResultatRegle extends Constat {
  regle: Regle;
}

// ---------- Données du crawl ----------

export interface Lien {
  texte: string;
  href: string;
  dansPiedDePage: boolean;
}

export interface Formulaire {
  page: string;
  champs: string[]; // noms ou types des champs (email, tel, password…)
  texteProche: string; // texte autour du formulaire (mention d'information éventuelle)
}

export interface RequeteTierce {
  domaine: string;
  categorie: string; // analytics, publicité, réseau social, vidéo, polices, CMP, chat, paiement, autre
  service?: string;
}

export interface CookieObserve {
  nom: string;
  domaine: string;
  expireJours: number | null;
  service?: string;
  categorie: string;
}

export interface PageLegale {
  type: Exclude<DocumentCible, "interface" | "interne">;
  url: string;
  titre: string;
  texte: string;
}

export interface DonneesCrawl {
  url: string;
  urlFinale: string;
  https: boolean;
  langue: string | null;
  titre: string;
  pagesVisitees: string[];
  liens: Lien[];
  pagesLegales: PageLegale[];
  formulaires: Formulaire[];
  /** Requêtes et cookies observés AVANT toute interaction avec le bandeau. */
  requetesAvantConsentement: RequeteTierce[];
  cookiesAvantConsentement: CookieObserve[];
  cmp: string | null; // solution de gestion du consentement détectée
  boutonRefus: boolean | null; // un bouton de refus visible au premier niveau
  signaux: {
    panier: boolean;
    paiement: string[];
    prix: boolean;
    prixBarres: boolean;
    abonnement: boolean;
    compte: boolean;
    newsletter: boolean;
    avis: boolean;
    chatbot: string | null;
    plateforme: string | null; // CMS ou solution e-commerce
    allegationsVertes: string[];
    alcool: boolean;
    messageAlcool: boolean;
    marketplace: boolean;
    contenusNumeriques: boolean;
    blog: boolean;
    commentaires: boolean;
    pro: boolean; // s'adresse explicitement aux professionnels
    reserveAuxPros: boolean; // vente réservée aux professionnels
    lienRetractation: boolean;
    lienResiliation: boolean;
    lienODR: boolean;
    mentionAccessibilite: boolean;
  };
  identite: {
    siren: string[];
    tva: string[];
    emails: string[];
    telephones: string[];
    rcs: boolean;
    capital: boolean;
    hebergeur: string | null;
    directeurPublication: boolean;
    mediateur: boolean;
  };
  texteAccueil: string;
  erreurs: string[];
  duree: number;
}

export interface Entreprise {
  siren: string;
  nom: string;
  formeJuridique?: string;
  adresse?: string;
  activite?: string;
  dateCreation?: string;
  trancheEffectif?: string;
  categorie?: string; // PME, ETI, GE
  dirigeants?: string[];
}

export interface Audit {
  id: string;
  url: string;
  date: string;
  crawl: DonneesCrawl;
  profilDetecte: Profil;
  profil: Profil;
  entreprise: Entreprise | null;
  constatsAuto: Record<string, Constat>; // par identifiant de vérification automatique
  constatsIA: Record<string, Constat>; // par identifiant de règle
  resumeIA: string | null;
  iaDisponible: boolean;
  iaErreur?: string;
}
