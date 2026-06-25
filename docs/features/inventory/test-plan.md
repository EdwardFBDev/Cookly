# Inventory Feature Test Plan

## Manual Tests

1. Launch the app and navigate from Home to Inventory.
2. Confirm existing Home, Notifications, and Recommendations routes still render.
3. Confirm Inventory renders grouped ingredients for Casa.
4. Select each filter and confirm the ingredient list updates or shows an empty state.
5. Tap Spinach and confirm Ingredient Detail renders the selected ingredient.
6. Use back from Ingredient Detail and confirm Inventory is shown.
7. Open Add Ingredient from Inventory.
8. Submit an empty form and confirm validation is shown.
9. Enter a valid ingredient, save, and confirm the app opens the new ingredient detail.
10. Return to Inventory and confirm the created ingredient appears in the list.
11. Open Edit Ingredient from detail, update quantity, and confirm detail reflects the change.
12. Delete an ingredient and confirm Inventory no longer shows it.
13. Open Expiring Ingredients and confirm expiring items are grouped by timing.
14. Open Location Management, select Oficina, and confirm Inventory changes active location.
15. Delete Oficina and confirm its items move to Casa before the location is removed.
16. Open an empty location and confirm the Inventory Empty screen appears.

## Automated Test Notes

- No test runner is currently configured in `package.json`.
- Add unit tests for inventory status derivation when the project test framework is introduced.

## Regression Checks

- Root stack keeps `headerShown: false`.
- Database initialization continues to run from app providers.
- Placeholder alerts remain for routes that are still out of scope.
