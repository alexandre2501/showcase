# Showcase — Alexandre Urbanski

Site personnel de démonstration technique, construit avec Nuxt 4 (Vue 3 + TypeScript) et déployé sur GitHub Pages.

Chaque page présente un exemple concret d'architecture ou de pattern frontend, conçu et imaginé de toutes pièces. L'objectif n'est pas de répondre à un besoin métier réel, mais d'explorer des approches techniques et d'en montrer une implémentation de qualité production.

**Site déployé :** https://alexandre2501.github.io/showcase/

**Exemples actuels :**
- **[Calculatrice DDD](https://alexandre2501.github.io/showcase/calculatrice)** — une calculatrice avec plusieurs implémentations de service, illustrant les principes du Domain-Driven Design
- **[Models (rstore + DDD)](https://alexandre2501.github.io/showcase/models)** — un store réactif rstore encapsulé derrière une architecture DDD, rendant le store swappable sans toucher au controller ni à la présentation

## Lancer le projet

```bash
npm install
npm run dev       # Serveur de développement sur http://localhost:3000
npm run generate  # Build statique pour GitHub Pages
npm run preview   # Prévisualiser le build statique en local
```
