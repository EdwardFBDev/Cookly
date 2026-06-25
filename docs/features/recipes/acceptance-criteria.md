# Recipes Feature Acceptance Criteria

## Recipe Catalog

- The user can open Recipe Catalog from existing recipe navigation entry points.
- The screen shows the active location.
- The screen shows a search input placeholder.
- The screen shows recipe filters.
- Recipe cards show title, image area, compatibility badge, favorite state, cook time, servings, and progress.
- Available recipes and missing-ingredient recipes are visually distinguishable.
- Tapping a recipe opens Recipe Detail.
- Empty filtered results show a helpful empty state.

## Recipe Detail

- The screen resolves the selected recipe from the route id.
- The screen shows recipe title, compatibility, cook time, and servings.
- The screen shows ingredients with available or missing state.
- The screen shows preparation steps.
- Missing recipe ids show a safe empty state.
- Add to shopping list, Cook Recipe, sharing, and edit actions remain TODO-backed behavior.

## My Recipes

- The user can open My Recipes from the recipe flow bottom navigation.
- The screen lists user-owned recipes.
- Owned recipes are marked editable.
- Tapping an owned recipe opens Recipe Detail.
- Empty owned recipe results show a helpful empty state.
- Create Recipe opens the Create Recipe screen.

## Favorites

- The user can open Favorites from the recipe flow.
- The screen lists recipes marked favorite in local recipe state.
- Favorite recipe cards show title, image area, compatibility, and favorite state.
- Tapping a favorite recipe opens Recipe Detail.
- Empty favorite results show a helpful empty state with a path back to Catalog.

## Create Recipe

- The user can open Create Recipe from recipe bottom navigation and My Recipes.
- The screen shows a photo placeholder, recipe name, category, time, and servings fields.
- The screen validates missing name, invalid time, and invalid servings.
- Save Draft is TODO-backed behavior.
- Successful Next creates a local owned recipe.
- After creation, the app opens Recipe Detail for the created recipe.
- Created recipes appear in My Recipes.

## Recipe Filters

- The user can open Recipe Filters from Recipe Catalog.
- The screen shows category, time, and availability filter sections.
- The user can select and clear filter options.
- Applying filters returns to Recipe Catalog.
- The catalog uses the selected structured filter state to update visible recipes.

## Existing Work

- Existing onboarding and login routes remain available.
- Existing home, notifications, and recommendations routes remain available.
- Existing inventory routes and local inventory state remain available.
- Existing root layout, app providers, bootstrap, and database infrastructure remain unchanged.
- No new dependencies are added.
