# Cookly

Cookly is an early-stage React Native cooking assistant built with Expo, TypeScript, local data, a remote JSON recipe catalog, and SQLite-backed persistence for favorite recipes.

![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)

## Overview

Cookly is a mobile application for organizing food-related workflows around recipes, inventory, meal planning, shopping, and cooking preparation.

The project exists to explore how a mobile app can help users answer practical kitchen questions such as what they can cook, what ingredients are missing, and what should be used soon. Cookly is currently in an early stage and is designed to grow incrementally through small, documented features.

The repository also serves as a software engineering practice project focused on clean mobile architecture, Spec-Driven Development, and AI-assisted development with Cursor.

## Current Features

- Onboarding, login, dashboard, settings, notifications, and feature navigation screens.
- Remote recipe catalog loaded from a JSON endpoint in this repository.
- Recipe cards with category, description, timing, serving, compatibility, and favorite state.
- Recipe detail screens with ingredients, preparation steps, availability information, and future-action placeholders.
- Recipe filtering by category, time, availability, and local catalog state.
- Favorite recipe toggling with local Expo SQLite persistence.
- Favorites screen backed by the shared recipe store and SQLite repository.
- Local "My Recipes" and basic create-recipe flow for session-created recipes.
- Connected inventory screens using local Zustand state.
- Inventory detail, add, edit, delete, expiring items, location management, and empty-state flows.
- Early meal planning, shopping list, and cooking setup screens using local/static state.
- Loading, error, retry, missing-record, and empty-state handling where implemented.

Some screens are intentionally backed by local or static data while repository and backend integrations are developed.

## Technology Stack

- React Native
- Expo
- Expo Router
- TypeScript
- Expo SQLite
- Zustand
- React
- Git and GitHub
- Cursor
- AI-assisted development

## Software Architecture

Cookly follows a feature-based structure with Clean Architecture principles. UI screens render state and user interactions, hooks orchestrate screen behavior, stores manage local feature state, application modules derive presentation data, domain modules define models, and infrastructure/services isolate persistence and remote API access.

Recipe favorites are persisted locally through Expo SQLite. Inventory, planning, shopping, and cooking flows currently use local/static state for incremental development.

More detail is available in:

- [`docs/architecture/database/DATABASE_SCHEMA.md`](docs/architecture/database/DATABASE_SCHEMA.md)
- [`docs/architecture/database/DATABASE_MIGRATIONS.md`](docs/architecture/database/DATABASE_MIGRATIONS.md)
- [`docs/API_RECIPES_AND_FAVORITES.md`](docs/API_RECIPES_AND_FAVORITES.md)

## Development Workflow

Cookly is developed with Spec-Driven Development (SDD). Features are planned before implementation and documented with specifications, tasks, acceptance criteria, and test plans where applicable.

The workflow emphasizes planning before coding, documentation-first development, incremental implementation, continuous refactoring within feature scope, Git-based collaboration, and AI-assisted development with Cursor.

More detail is available in:

- [`docs/workflow/AI_DEVELOPMENT_FRAMEWORK.md`](docs/workflow/AI_DEVELOPMENT_FRAMEWORK.md)
- [`docs/workflow/FEATURE_DEVELOPMENT_WORKFLOW.md`](docs/workflow/FEATURE_DEVELOPMENT_WORKFLOW.md)
- [`docs/workflow/SDD_DOCUMENT_LIFECYCLE.md`](docs/workflow/SDD_DOCUMENT_LIFECYCLE.md)

## Learning Goals

This repository is also used to improve practical skills in React, React Native, Expo, Expo Router, TypeScript, SQLite, REST-style API consumption, state management, mobile architecture, Clean Architecture, and software engineering best practices.

## Current Milestone

The current milestone focuses on connecting the recipe catalog and favorites flow with real application boundaries:

- Remote API consumption from a JSON recipe catalog.
- JSON response validation and recipe model mapping.
- Loading, error, and retry handling for recipe fetching.
- SQLite persistence for favorite recipes.
- Local recipe filtering and favorite state synchronization.
- Clear separation between presentation, network, state, and persistence layers.

Inventory, meal planning, shopping, and cooking flows are present as local incremental app flows and continue to evolve toward fuller persistence and integration.

## Roadmap

The roadmap will evolve as the project grows.

- [Completed] Sprint 0 - Project setup base
- [Completed] Sprint 1 - Recipe catalog
- [Completed] Recipe favorites with SQLite persistence
- [In progress] Front UX/UI refinement
- [Planned] Inventory persistence
- [Planned] Meal planning persistence
- [Planned] Shopping lists
- [Planned] Cooking flow integration
- [Planned] Smart recipe recommendations
- [Planned] Offline-first improvements
- [Planned] AI-assisted recommendations

Planned functionality should not be considered complete until it is implemented, documented, and validated through the SDD workflow.

## Project Structure

```text
api/                  JSON data used as a lightweight remote catalog source.
assets/               Expo app icons, splash assets, and static media.
docs/                 Architecture, workflow, standards, and feature docs.
skills/               Reusable guidance for AI-assisted development.
specs/                Feature specs, tasks, acceptance criteria, and test plans.
src/app/              Expo Router routes, bootstrap, providers, and theme tokens.
src/core/             Shared configuration and error types.
src/features/         Feature modules organized by architecture layer.
src/infrastructure/   Shared infrastructure such as SQLite setup and migrations.
src/services/         Remote API service modules.
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Expo-compatible Android or iOS development environment
- Expo Go or a simulator/emulator

### Installation

```bash
git clone <repository-url>
cd Cookly
npm install
```

### Run The App

```bash
npm start
```

Run directly on a platform:

```bash
npm run android
npm run ios
npm run web
```

The iOS command requires macOS with the required iOS tooling. Android development requires an Android emulator or connected device.

### TypeScript Check

```bash
npx tsc --noEmit
```

## Engineering Principles

- Keep code simple and readable.
- Reuse existing components, hooks, stores, services, and repositories before creating new ones.
- Separate responsibilities between UI, state orchestration, business rules, services, and persistence.
- Build incrementally from approved specifications.
- Avoid unrelated refactors during feature work.
- Document architectural and workflow decisions.
- Prioritize maintainability over premature abstraction.
- Follow Spec-Driven Development.

## Additional Documentation

Start with these documents when contributing or reviewing the project:

- [`docs/API_RECIPES_AND_FAVORITES.md`](docs/API_RECIPES_AND_FAVORITES.md)
- [`docs/features/recipes/spec.md`](docs/features/recipes/spec.md)
- [`docs/features/recipes/acceptance-criteria.md`](docs/features/recipes/acceptance-criteria.md)
- [`docs/features/inventory/spec.md`](docs/features/inventory/spec.md)
- [`docs/standards/CODING_STANDARDS.md`](docs/standards/CODING_STANDARDS.md)
- [`docs/standards/PROJECT_STRUCTURE_STANDARD.md`](docs/standards/PROJECT_STRUCTURE_STANDARD.md)
- [`docs/workflow/START_NEW_FEATURE.md`](docs/workflow/START_NEW_FEATURE.md)

Contributors should review the relevant feature spec and workflow documentation before changing implementation code.

## License

No open source license has been selected yet. Until a `LICENSE` file is added, all rights are reserved by the project owner.
