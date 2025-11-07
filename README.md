# Pendu Clean Architecture

Un jeu du pendu moderne, robuste et maintenable, développé en TypeScript avec Next.js et une Clean Architecture.

## Fonctionnalités principales
- Jeu du pendu avec niveaux, catégories, et gestion des scores
- UI rétro/arcade avec CSS custom
- Persistance des scores via API Next.js
- Architecture découplée (domain, use_cases, adapters, frameworks)
- Tests unitaires et fonctionnels sur tous les adapters, use_cases, entities et drivers

## Structure du projet
```
├── src/
│   ├── app/
│   │   └── use_cases/         # Cas d'usage métier (testés)
│   ├── domain/
│   │   └── entities/          # Entités métier (testées)
│   ├── adapters/
│   │   └── infrastructure/    # Contrôleurs, gateways, presenters (testés)
│   ├── frameworks/
│   │   └── drivers/           # Accès API, stockage, etc. (testés)
│   └── pages/api/             # API Next.js pour la persistance
├── public/                    # Assets statiques
├── app/                       # UI Next.js (rétro/arcade)
├── package.json
├── jest.config.js             # Config tests (ts-jest, jsdom)
```

## Installation & Lancement
```sh
npm install
npm run dev
```

## Lancer les tests
```sh
npx jest
```
Tous les adapters, use_cases, entities et drivers sont couverts par des tests fonctionnels/unitaires.

## Principes d'architecture
- **Domain** : Entités et logique métier pure, sans dépendance extérieure
- **Use Cases** : Orchestration métier, application des règles du jeu
- **Adapters** : Interface entre le domaine et l'extérieur (UI, API, stockage)
- **Frameworks/Drivers** : Accès aux technos concrètes (API, fetch, etc.)
- **Dépendances** : Injection via `ControllerService` et `resources`

## UI & Expérience
- Interface Next.js/React, style rétro/arcade
- Expérience fluide, responsive, et accessible

## Auteur
Projet réalisé par melwin-duquenne
