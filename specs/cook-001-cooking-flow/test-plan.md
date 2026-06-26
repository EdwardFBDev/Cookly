# COOK-001 Cooking Flow Test Plan

## Manual Test Cases

1. Open a recipe detail screen and press `Cook Recipe`.
2. Confirm the review screen opens with the selected recipe.
3. Toggle one ingredient off and confirm it is excluded from the quantity screen.
4. Press `Select All` and confirm all available ingredients are selected.
5. Continue to quantity adjustment and modify at least one quantity down and up.
6. Navigate back to review, then forward again, and confirm adjusted state is preserved.
7. Continue to success and confirm the deduction summary is shown.
8. Press `View Inventory` and confirm the inventory route opens.
9. Repeat with an invalid cooking route recipe id and confirm the missing recipe fallback appears.

## Automated Checks

- TypeScript should compile without new errors.
- Recently edited files should have no IDE lint errors.

## Regression Checks

- Recipe catalog still opens recipe detail screens.
- Existing inventory, home, shopping, and planning tabs remain reachable.
- The cooking flow must not alter unrelated routes.

## Known Gaps

- Inventory deduction uses local state until an inventory repository/service is available.
- Recipe-to-inventory matching is conservative and only deducts confidently matched items.
