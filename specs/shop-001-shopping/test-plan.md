# SHOP-001 Shopping Test Plan

## Manual Checks

- Start the app and confirm the onboarding screen still renders at `/`.
- Confirm login still renders at `/login`.
- Navigate to `/home` and tap the Shopping bottom navigation action; confirm `/shopping` renders.
- Navigate to `/inventory` and tap the Shopping bottom navigation action; confirm `/shopping` renders.
- Navigate to `/plan` and tap the Shopping bottom navigation action; confirm `/shopping` renders.
- Tap Generate List from `/plan` and confirm `/shopping` renders.
- Confirm the shopping summary shows missing item count, planned meal count, category chips, influencing recipes, missing ingredients, and confirm action.
- Tap a recipe in the shopping summary and confirm the existing recipe detail screen opens.
- Tap Confirm & Create List and confirm the grouped shopping list state renders.
- Confirm category sections include item counts and item rows with quantity, category, and missing or in-cart status.
- Tap an unchecked item and confirm future item-detail feedback appears.
- Tap Add item to Inventory and confirm future inventory-update feedback appears.
- Open the empty shopping state during development by setting local shopping content to no active items and confirm Go to Planning opens `/plan`.

## Automated Checks

- Run TypeScript validation when available.
- Check IDE diagnostics for edited files.

## Not Covered

- Persisted shopping lists.
- Real generated missing ingredients from a meal-plan repository.
- Inventory quantity deduction or restocking.
- Multi-household shopping lists.
- Backend recipe, shopping, or inventory synchronization.
