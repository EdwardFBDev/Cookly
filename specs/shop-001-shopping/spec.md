# SHOP-001 Shopping Specification

## Screen Objective

Implement the Cookly shopping flow with three connected screen states:

- SHOP-001 Shopping Summary
- SHOP-002 Shopping List
- SHOP-003 Shopping Empty

The flow lets users review missing ingredients from planned meals, confirm a generated list, track shopping progress, and return to planning when no items are needed.

## User Goal

As a Cookly user, I want Cookly to turn missing planned-meal ingredients into a clear shopping list so I can buy only what is needed and update my pantry after shopping.

## Business Rules

- The shopping flow must be reachable from existing Shopping bottom-navigation actions.
- SHOP-001 must summarize missing ingredients before list creation.
- SHOP-002 must group shopping items by category and show missing or in-cart state.
- SHOP-003 must render when no shopping items are available.
- Generated shopping content must be based on planned meals and recipe data when possible.
- Shopping UI must not access database, local storage, or external services directly.
- Item persistence, pantry updates, and generated list persistence are future integrations.
- Existing onboarding, login, home, inventory, recipes, planning, routes, layouts, stores, and services must remain preserved.
- The implementation must not add new dependencies.

## Navigation Entry And Exit Points

- Entry points:
  - Home bottom navigation Shopping tab opens `/shopping`.
  - Inventory bottom navigation Shopping tab opens `/shopping`.
  - Planning bottom navigation Shopping tab opens `/shopping`.
  - Weekly planner Generate List action opens `/shopping`.
- SHOP route: `src/app/shopping/index.tsx`.
- Exits:
  - Bottom Home action opens `/home`.
  - Bottom Inventory action opens `/inventory`.
  - Bottom Recipes action opens `/recipes`.
  - Bottom Plan action opens `/plan`.
  - Bottom Shopping action opens `/shopping`.
  - Shopping summary recipe cards open existing recipe detail routes.
  - Empty state Go to Planning action opens `/plan`.
  - Future profile, notification, item detail, and pantry-update actions show placeholder feedback until those integrations exist.

## Dependencies

- Existing Expo Router stack in `src/app/_layout.tsx`.
- Existing app theme tokens from `src/app/theme`.
- Existing `HomeBottomNavigation` for app-level tabs.
- Existing recipe store and recipe detail routes for recipes influencing the list.
- Existing inventory category concepts for category grouping.
- React Native primitives and Expo StatusBar.
- No new runtime or development dependencies.
- Future dependencies:
  - Shopping-list repository/service.
  - Meal-plan repository/service.
  - Inventory update use case.
  - Persisted household/location selection.

## Screen States

- Shopping summary: missing item count, planned meal count, category chips, influencing recipes, missing ingredient list, and confirm action render.
- Shopping list: grouped category sections render with item counts, each item shows quantity and missing or in-cart state, and the pantry-update action renders.
- Shopping empty: empty illustration, explanatory copy, Go to Planning action, and bottom navigation render.
- Item interaction: tapping an item shows future item-detail feedback until item details exist.
- Pantry update interaction: tapping Add item to Inventory shows future inventory-update feedback until persistence exists.
- Empty list routing: when no generated or active items exist, the shopping route renders SHOP-003.

## Acceptance Criteria

- The SHOP flow has SDD documents before implementation.
- Existing routes, layouts, screens, components, stores, and services are preserved.
- `/shopping` renders the shopping flow.
- Existing Shopping bottom navigation actions from Home, Inventory, and Planning open `/shopping`.
- Weekly planner Generate List action opens `/shopping`.
- SHOP-001 summary includes missing count, planned meal count, category summary, influencing recipes, missing ingredients, and confirm action.
- SHOP-002 list includes location, assistant summary, category sections, item rows, checked/in-cart state, and pantry-update action.
- SHOP-003 empty includes illustration, copy, Go to Planning action, and bottom navigation.
- Recipe cards in the summary navigate to existing recipe detail screens.
- Missing backend and future screen integrations are marked with TODOs.
- No new dependencies are added.

## Integration Points With Existing Screens

- Integrates with `src/features/home/presentation/hooks/useHomeNavigation.ts` by connecting Shopping to `/shopping`.
- Integrates with `src/features/inventory/presentation/hooks/useInventoryNavigation.ts` by connecting Shopping to `/shopping`.
- Integrates with `src/features/planning/presentation/hooks/usePlanningNavigation.ts` by connecting Shopping and Generate List to `/shopping`.
- Reuses `src/features/home/presentation/components/HomeBottomNavigation.tsx` with active Shopping tab.
- Reuses `src/features/recipes/presentation/stores/useRecipeStore.ts` so summary recipes reference existing recipe data.
- Reuses existing `/recipes/[recipeId]`, `/plan`, `/inventory`, and `/home` routes without changing their screen implementations.
