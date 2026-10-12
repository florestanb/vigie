import type { NextConfig } from "next";

const config: NextConfig = {
  // Playwright pilote un vrai navigateur : il reste hors du bundle serveur.
  serverExternalPackages: ["playwright-core"],
  poweredByHeader: false,
};

export default config;
