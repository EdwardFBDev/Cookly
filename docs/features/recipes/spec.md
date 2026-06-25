# Recipes Feature Specification

## Feature

[RECIPES] - [REC-001 Recipe Catalog] - [REC-002 Recipe Detail] - [REC-003 My Recipes] - [REC-004 Favorites] - [REC-005 Create Recipe] - [REC-006 Recipe Filters]

## Screen Objective

Provide a connected recipe flow where users can browse Cookly recipes, inspect availability and preparation details, access recipes they own or favorited, create local draft recipes, and apply structured catalog filters.

## User Goal

The user wants to discover recipes that fit their current kitchen, understand what ingredients are available or missing, quickly return to recipes they manage or favorited, and start a new recipe without leaving the Cookly flow.

## Business Rules

- Recipe Catalog is the primary recipe tab entry point.
- Recipe compatibility is shown as a percentage derived from available and missing ingredients in static local recipe data for this increment.
- Recipes with all required ingredients are shown as available now.
- Recipes with missing ingredients must identify the missing count or missing ingredient.
- Recipe Detail must show recipe metadata, ingredient availability, and preparation steps for a selected recipe.
- My Recipes only shows user-owned or editable recipes.
- Favorites only shows recipes marked as favorite in local recipe state.
- Create Recipe captures basic information in this increment: name, category, time, and servings.
- Create Recipe must validate recipe name, time, and servings before creating a local owned recipe.
- New local recipes must appear in My Recipes and open in Recipe Detail after creation.
- Recipe Filters applies structured catalog filters for category, time, and availability.
- Filter selections are local UI state until recipe search and repository services exist.
- Shopping list, sharing, cooking mode, photo upload, recipe steps editing, and full recipe creation remain TODO-backed until their backing services or screens exist.
- UI components must not directly access database, storage, or external services.
- Missing backend persistence must not block the flow; local feature state may be used with TODOs for future repository integration.

## Navigation Entry And Exit Points

- Entry from existing bottom Recipes tab opens `/recipes`.
- Entry from Inventory bottom Recipes action opens `/recipes`.
- Recipe Catalog route: `src/app/recipes/index.tsx`.
- Recipe Detail route: `src/app/recipes/[recipeId].tsx`.
- My Recipes route: `src/app/recipes/my.tsx`.
- Favorites route: `src/app/recipes/favorites.tsx`.
- Create Recipe route: `src/app/recipes/create.tsx`.
- Recipe Filters route: `src/app/recipes/filters.tsx`.
- Recipe Catalog exits:
  - Tapping a recipe card opens `/recipes/[recipeId]`.
  - Filter action opens `/recipes/filters`.
  - Favorites filter entry opens `/recipes/favorites`.
  - Bottom Inventory action opens `/inventory`.
  - Bottom My Recipes action opens `/recipes/my`.
  - Create action opens `/recipes/create`.
- Recipe Detail exits:
  - Back action returns to the previous route.
  - Casa/catalog action opens `/recipes`.
  - Add missing ingredient to shopping list shows TODO-backed feedback.
  - Cook Recipe shows TODO-backed feedback until cooking mode exists.
- My Recipes exits:
  - Tapping an owned recipe opens `/recipes/[recipeId]`.
  - Bottom Catalog action opens `/recipes`.
  - Bottom Inventory action opens `/inventory`.
  - Create action opens `/recipes/create`.
- Favorites exits:
  - Tapping a favorite recipe opens `/recipes/[recipeId]`.
  - Empty state action returns to `/recipes`.
  - Create action opens `/recipes/create`.
- Create Recipe exits:
  - Close action returns to the previous route.
  - Save Draft shows TODO-backed feedback until draft persistence exists.
  - Successful Next creates a local owned recipe and opens its detail screen.
- Recipe Filters exits:
  - Close returns to the previous route.
  - Apply Filters updates the catalog filter state and returns to `/recipes`.
  - Clear Filters resets structured filters.

## Dependencies

- Existing Expo Router file-based navigation.
- Existing root stack in `src/app/_layout.tsx`.
- Existing app theme tokens from `src/app/theme`.
- Existing `HomeBottomNavigation` remains available for home and inventory screens.
- Existing Inventory route for recipe flow bottom navigation.
- Zustand for local connected recipe state.
- Future dependencies:
  - Recipe repository/service.
  - Inventory matching use case.
  - Shopping list repository/service.
  - Full recipe creation and edit services.
  - Cooking mode flow.
  - Media/photo picker service.

## Screen States

- Recipe Catalog default state with search placeholder, filters, and recipe cards.
- Recipe Catalog filtered state for all, available now, under 30 min, and favorites.
- Recipe Catalog empty filtered state.
- Recipe Detail found state with hero, ingredients, preparation steps, and actions.
- Recipe Detail missing recipe state for unknown ids.
- Recipe Detail missing ingredient state with shopping list action.
- My Recipes default state with editable recipe cards.
- My Recipes empty state when no owned recipes exist.
- Favorites default state with favorite recipe cards.
- Favorites empty state when no recipes are favorited.
- Create Recipe pristine state.
- Create Recipe validation error state.
- Create Recipe submitted state returning to detail.
- Recipe Filters default state with current local selections.
- Recipe Filters cleared state.
- Recipe Filters applied state returning to catalog.
- Favorite toggle state updates local feature state.

## Acceptance Criteria

- The RECIPES flow has SDD documents before implementation.
- Existing onboarding, login, home, notifications, recommendations, inventory, database bootstrap, providers, and root layout remain available.
- The existing Recipes bottom navigation entry opens Recipe Catalog.
- Recipe Catalog displays location, search placeholder, filters, recipe cards, compatibility badges, metadata, favorite actions, and recipe progress.
- Tapping a Recipe Catalog card opens Recipe Detail for that recipe.
- Recipe Detail displays recipe title, compatibility, cook time, servings, ingredient availability, preparation steps, and TODO-backed future actions.
- My Recipes displays owned/editable recipes and opens Recipe Detail when a card is tapped.
- Favorites displays favorited recipes and opens Recipe Detail when a card is tapped.
- Create Recipe validates basic information, creates a local owned recipe, and opens its detail screen.
- Recipe Filters displays category, time, and availability options and applies local catalog filtering.
- Recipe flow bottom navigation connects Inventory, Catalog, My Recipes, and Create.
- Missing backend and future integrations are marked with TODOs.
- No new dependencies are added.

## Integration Points With Existing Screens

- `useHomeNavigation` exposes a recipe catalog navigation action for existing bottom navigation consumers.
- `useInventoryNavigation.goRecipes` opens `/recipes`.
- Home, Inventory, and Recommendations screens preserve their existing content and routes.
- The older `/recommendations` route remains available as the HOME recommendations screen.
- Recipe Detail can be reached from Catalog and My Recipes without isolating the screen.
- Favorites reuses the same recipe favorite state used by Catalog and Detail.
- Create Recipe writes to the existing local recipe store used by My Recipes and Detail.
- Recipe Filters updates the same catalog state consumed by Recipe Catalog.
