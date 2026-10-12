# Identité visuelle de Vigie

## Le nom

Une **vigie** est la personne postée en haut du mât qui repère les écueils avant que le navire ne les touche. C'est exactement la promesse du produit : voir les risques juridiques d'un site avant un contrôle ou une plainte. Le mot est court, français, prononçable dans toute l'Europe, et évoque la veille (le catalogue est tenu à jour).

## Le logo

Une tour de guet vue de face dans un disque d'encre, dont le faisceau lumineux dessine un **V**. Fichiers : `src/components/Logo.tsx` (composant) et `public/favicon.svg`.

## Couleurs

| Nom | Valeur | Usage |
|---|---|---|
| Encre | `#13203a` | Texte, logo, fonds sombres |
| Papier | `#f7f3ea` | Fond principal, chaleureux comme un registre |
| Phare | `#e39b2d` | Accent : boutons, faisceau, focus |
| Phare foncé | `#b5741a` | Accent sur fond clair (contraste AA) |
| Conforme | `#2c7a57` | Statut conforme |
| Incomplet | `#b07a12` | Statut partiel |
| Manquant | `#b43a2e` | Statut manquant |
| À vérifier | `#5b6b84` | Statut neutre |
| À retirer | `#7b4fa0` | Mention obsolète |

Un thème sombre suit automatiquement les préférences du système.

## Typographies

- **Fraunces** pour les titres : une serif éditoriale, sérieuse sans être austère, qui rappelle les textes de loi imprimés.
- **Inter** pour le texte courant : lisible à toutes les tailles.
- **JetBrains Mono** pour les références juridiques (articles, numéros de texte).

Toutes sont chargées via `next/font` (aucune requête vers Google au chargement de la page, ce qui serait un comble pour un outil d'audit RGPD).

## Ton

Clair, direct, sans jargon. On dit ce qui manque, pourquoi, ce que risque le site et comment corriger. Jamais d'alarmisme : la gravité suffit.
