# PLAN-001 Weekly Planner Specification

## Screen Objective

Implement the first Cookly planning flow with two connected screen states:

- PLAN-001 Weekly Planner
- PLAN-002 Planning Empty

The flow lets users review a week of planned meals, see meal availability status, and enter recipe discovery or shopping-list generation from planning.

## User Goal

As a Cookly user, I want to see my weekly meal plan and understand which planned meals are ready to cook so I can prepare meals and generate a shopping list when ingredients are missing.

## Business Rules

- The planning flow must be available from existing bottom navigation Plan actions.
- The weekly planner must group planned meals by meal type: breakfast, lunch, and dinner.
- Empty meal slots must show that no meal is planned yet and provide an add action.
- Planned meals must be based on recipe data already available in the app when possible.
- Planned meal actions must not access databases, local storage, or external services directly from UI.
- Shopping list generation is a future integration until a shopping-list feature exists.
- Meal-plan persistence is a future integration until a meal-plan repository exists.
- The planning empty screen must provide a path to start planning and browse recipes.
- Existing onboarding, login, home, inventory, and recipes routes must remain preserved.

## Navigation Entry And Exit Points

- Entry points:
  - Home bottom navigation Plan tab opens `/plan`.
  - Home dashboard Edit Plan action opens `/plan`.
  - Inventory bottom navigation Plan tab opens `/plan`.
  - Planning empty route can be opened at `/plan/empty`.
- PLAN-001 route: `src/app/plan/index.tsx`.
- PLAN-002 route: `src/app/plan/empty.tsx`.
- Exits:
  - Bottom Home action opens `/home`.
  - Bottom Inventory action opens `/inventory`.
  - Bottom Recipes action opens `/recipes`.
  - Bottom Plan action opens `/plan`.
  - Planned meal card opens existing recipe detail route.
  - Add meal and browse recipe actions open `/recipes`.
  - Generate List and Shopping actions show future-integration feedback until shopping is implemented.

## Dependencies

- Existing Expo Router stack in `src/app/_layout.tsx`.
- Existing app theme tokens from `src/app/theme`.
- Existing `HomeBottomNavigation` for app-level tabs.
- Existing recipe store and recipe detail routes for planned meal cards.
- React Native primitives and Expo StatusBar.
- No new runtime or development dependencies.
- Future dependencies:
  - Meal-plan repository/service.
  - Shopping-list repository/service.
  - Calendar/date selection service.
  - Persisted household/location selection.

## Screen States

- Weekly planner default: week date range, horizontal day selector, meal sections, planned meal cards, empty slot, and generate list action render.
- Meal planned and in stock: card shows a positive availability badge.
- Meal planned with missing ingredients: card shows a missing-ingredient badge and supports shopping-list generation placeholder.
- Meal slot empty: slot shows no meal planned and add action opens recipe catalog.
- Planning empty: illustration, primary start-planning action, secondary browse-recipes action, and benefit cards render.
- Future integration action: shopping list, profile, notifications, and benefit actions show placeholder feedback until the target feature exists.

## Acceptance Criteria

- The PLAN flow has SDD documents before implementation.
- Existing routes, layouts, screens, components, stores, and services are preserved.
- `/plan` renders the weekly planner screen.
- `/plan/empty` renders the planning empty screen.
- Existing bottom navigation Plan actions from Home and Inventory open `/plan`.
- Weekly planner includes location, notification/profile placeholders, title, date range, day selector, breakfast, lunch, dinner, and generate list action.
- Weekly planner shows an empty meal slot and at least two planned meal cards using existing recipe data.
- Planned meal cards can navigate to existing recipe detail screens.
- Empty planning screen includes start planning, browse popular recipes, Auto-Shopping, and Zero Waste actions.
- Missing backend and future screen integrations are marked with TODOs.
- No new dependencies are added.

## Integration Points With Existing Screens

- Integrates with `src/features/home/presentation/hooks/useHomeNavigation.ts` by replacing the meal-planning placeholder with `/plan`.
- Integrates with `src/features/inventory/presentation/hooks/useInventoryNavigation.ts` by replacing the meal-planning placeholder with `/plan`.
- Reuses `src/features/home/presentation/components/HomeBottomNavigation.tsx` with active Plan tab.
- Reuses `src/features/recipes/presentation/stores/useRecipeStore.ts` so planned meals reference existing recipe data.
- Reuses existing `/recipes`, `/recipes/[recipeId]`, `/inventory`, and `/home` routes without changing their screen implementations.
