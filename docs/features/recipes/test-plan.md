# Recipes Feature Test Plan

## Manual Validation

- Start the app and confirm existing onboarding/login/home flow still renders.
- Open Recipe Catalog from the existing Recipes bottom navigation entry.
- Switch each Recipe Catalog filter and confirm visible recipes update.
- Tap a catalog recipe and confirm Recipe Detail opens with the selected recipe.
- Open a missing recipe id manually and confirm the missing state renders.
- Use Recipe Detail back/catalog actions and confirm navigation returns safely.
- Open My Recipes from the recipe bottom navigation.
- Tap an owned recipe and confirm Recipe Detail opens.
- Open Favorites and confirm favorited recipes are shown.
- Toggle a recipe favorite and confirm Favorites updates.
- Open Create Recipe from the recipe bottom navigation.
- Submit invalid Create Recipe input and confirm inline validation appears.
- Submit valid Create Recipe input and confirm Recipe Detail opens for the created recipe.
- Return to My Recipes and confirm the created recipe appears.
- Open Recipe Filters from Recipe Catalog.
- Select category, time, and availability filters, apply, and confirm Catalog updates.
- Clear Recipe Filters and confirm Catalog returns to the default recipe set.
- Open Inventory from the recipe bottom navigation and confirm the existing Inventory screen is preserved.
- Trigger TODO-backed actions and confirm they show non-blocking feedback.

## Automated Validation

- Run TypeScript validation for changed source files if available.
- Check IDE diagnostics for changed files.

## Deferred Tests

- Repository-backed recipe loading tests are deferred until a recipe repository exists.
- Inventory matching use case tests are deferred until catalog compatibility is calculated from live inventory.
- Shopping list integration tests are deferred until the shopping list feature exists.
- Full recipe creation/edit tests are deferred until ingredients, steps, photo upload, and edit screens exist.
