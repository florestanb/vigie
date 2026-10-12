import { FormulaireAudit } from "@/components/FormulaireAudit";
import { CATALOGUE } from "@/lib/rules/catalogue";

const DOMAINES = Object.entries(
  CATALOGUE.filter((r) => !r.obsolete).reduce<Record<string, number>>((acc, r) => ((acc[r.domaine] = (acc[r.domaine] ?? 0) + 1), acc), {}),
).sort((a, b) => b[1] - a[1]);

function Faisceau() {
  return (
    <svg className="faisceau" viewBox="0 0 620 520" aria-hidden="true">
      <defs>
        <linearGradient id="lumiere" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--phare)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--phare)" stopOpacity="0.32" />
        </linearGradient>
      </defs>
      <path d="M520 250 L40 60 L40 440 Z" fill="url(#lumiere)" />
      <rect x="500" y="250" width="40" height="230" rx="6" fill="var(--texte)" />
      <rect x="490" y="226" width="60" height="30" rx="8" fill="var(--texte)" />
      <circle cx="520" cy="240" r="13" fill="var(--phare)" />
      <path d="M470 486 H570" stroke="var(--texte)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export default function Accueil() {
  return (
    <>
      <section className="hero">
        <Faisceau />
        <div className="conteneur" style={{ position: "relative" }}>
          <p className="surtitre">Audit légal automatisé · droit français et européen</p>
          <h1>Votre site est-il en règle ?</h1>
          <p className="chapo">
            Vigie parcourt votre site comme le ferait un contrôleur, relève les mentions légales, CGV, politiques de confidentialité et
            cookies manquants ou mal rédigés, puis rédige les textes adaptés à votre activité.
          </p>
          <FormulaireAudit />
          <div className="rassurance">
            <span>Gratuit et sans inscription</span>
            <span>Résultat en moins de deux minutes</span>
            <span>{CATALOGUE.filter((r) => !r.obsolete).length} obligations vérifiées, sources à l&apos;appui</span>
          </div>
        </div>
      </section>

      <section className="section" id="comment">
        <div className="conteneur">
          <h2>Trois étapes, de l&apos;URL aux textes prêts à publier.</h2>
          <div className="etapes">
            <div className="carte">
              <p className="etape-num">01</p>
              <h3>Le site est parcouru</h3>
              <p>Un vrai navigateur ouvre vos pages, note chaque cookie et chaque service tiers chargé avant consentement, et lit vos pages légales.</p>
            </div>
            <div className="carte">
              <p className="etape-num">02</p>
              <h3>Les manques sont relevés</h3>
              <p>Chaque obligation qui vous concerne est contrôlée, avec l&apos;article de loi, la sanction encourue et l&apos;extrait qui pose problème.</p>
            </div>
            <div className="carte">
              <p className="etape-num">03</p>
              <h3>Les textes sont rédigés</h3>
              <p>Mentions légales, politique de confidentialité, cookies, CGV, CGU : rédigés pour votre site, à partir de ce qui y a été observé.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="conteneur">
          <h2>Ce que Vigie contrôle.</h2>
          <p className="intro">
            Le registre couvre la LCEN, le Code de la consommation, le RGPD, les règles CNIL sur les cookies, le DSA, l&apos;AI Act,
            l&apos;accessibilité et les obligations sectorielles. Il intègre les textes récents : rétractation en ligne obligatoire depuis
            le 19 juin 2026, interdiction des allégations environnementales génériques depuis le 27 septembre 2026.
          </p>
          <div className="domaines">
            {DOMAINES.map(([d, n]) => (
              <span className="puce" key={d}>
                {d} <b>{n}</b>
              </span>
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            <a href="/registre">Consulter le registre complet et ses sources →</a>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="conteneur">
          <div className="bandeau-honnete">
            <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="19" fill="none" stroke="var(--phare-fonce)" strokeWidth="2" />
              <path d="M20 11 V23" stroke="var(--phare-fonce)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="20" cy="29" r="2" fill="var(--phare-fonce)" />
            </svg>
            <div>
              <h3 style={{ fontSize: 22 }}>Un outil, pas un avocat.</h3>
              <p style={{ marginTop: 8, color: "var(--texte-doux)", maxWidth: "70ch" }}>
                Vigie signale ce qui manque et vous propose des projets de documents, que vous relisez et validez. Les textes s&apos;appuient
                sur des modèles de clauses et sur les articles cités, jamais sur des références inventées. Pour une activité réglementée ou
                un doute sérieux, faites relire par un professionnel du droit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
