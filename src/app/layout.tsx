import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { Marque } from "@/components/Logo";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Vigie, la conformité légale de votre site", template: "%s · Vigie" },
  description:
    "Vigie parcourt votre site, relève les mentions légales, CGV, politiques de confidentialité et cookies manquants ou mal rédigés, puis rédige les textes adaptés à votre activité.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <header className="entete">
          <div className="conteneur">
            <Marque />
            <nav className="nav" aria-label="Navigation principale">
              <a href="/#comment">Comment ça marche</a>
              <a href="/registre">Registre des obligations</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="pied">
          <div className="conteneur">
            <p>Vigie relève et rédige, mais ne remplace pas un avocat.</p>
            <nav aria-label="Informations légales">
              <a href="/mentions-legales">Mentions légales</a>
              <a href="/confidentialite">Confidentialité</a>
              <a href="/cgu">Conditions d&apos;utilisation</a>
              <span>Accessibilité : non conforme (audit à venir)</span>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
