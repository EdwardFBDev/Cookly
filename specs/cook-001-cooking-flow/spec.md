# COOK-001 Cooking Flow Specification

## Screen Objective

Implement the Cookly cooking setup flow for a selected recipe:

- COOK-001 Review Ingredients
- COOK-002 Adjust Quantities
- COOK-003 Cooking Success

The flow verifies which recipe ingredients are being used, lets the user adjust consumed quantities, and confirms that inventory deductions have been applied locally.

## User Goal

As a Cookly user, I want to confirm the ingredients and quantities used while cooking so my Casa inventory stays accurate after I finish a recipe.

## Business Rules

- The flow starts from an existing recipe detail screen.
- Only the selected recipe is shown in the cooking flow.
- Available ingredients are selected by default during review.
- Missing ingredients or unchecked ingredients must not be deducted.
- Users may select or unselect ingredients before continuing.
- Quantity adjustments cannot go below zero.
- Quantity adjustments apply only to selected ingredients.
- Completing the flow deducts matched inventory quantities from the local inventory store.
- Inventory quantities must not become negative.
- If an inventory item cannot be matched to a recipe ingredient, the success state still records the cooking item and marks it as pending inventory integration.
- Backend persistence is out of scope until repositories/services exist.

## Navigation Entry And Exit Points

- Entry: `RecipeDetailScreen` `Cook Recipe` action.
- COOK-001 exit: Continue to COOK-002.
- COOK-002 exit: Back to COOK-001 or continue to COOK-003.
- COOK-003 exit: Return Home or View Inventory.
- Missing recipe fallback: return to recipe catalog.

## Dependencies

- Expo Router route wrappers under `src/app`.
- Existing recipe store and recipe domain models.
- Existing inventory store and inventory domain models.
- Existing app theme tokens.
- Existing recipe detail navigation hook.

## Screen States

- Review state: selected recipe with reviewable ingredients.
- Review empty state: no selectable ingredients are available.
- Quantity state: selected ingredients with adjustable consumed quantities.
- Success state: completed deductions summary.
- Missing recipe state: route parameter does not match a known recipe.

## Acceptance Criteria

- The recipe detail `Cook Recipe` action opens COOK-001 for that recipe.
- COOK-001 displays recipe context, progress step, all recipe ingredients, selected status, availability, and inventory match details when available.
- COOK-001 supports selecting all ingredients and toggling individual ingredients.
- COOK-001 continues only with selected ingredients.
- COOK-002 displays selected ingredients and allows increasing/decreasing quantities.
- COOK-002 preserves adjusted quantities when navigating back and forward.
- COOK-003 displays a deduction summary after final review.
- COOK-003 updates the existing inventory store for matched ingredients.
- COOK-003 links to home and inventory screens.
- Existing recipe, inventory, shopping, planning, and home routes remain intact.

## Integration Points With Existing Screens

- `RecipeDetailScreen`: replaces the cooking placeholder action with the connected cooking route.
- `InventoryScreen`: reflects any local inventory quantity changes for matched ingredients after completion.
- `DashboardScreen`: unchanged, but used as a success exit.
- `RecipeCatalogScreen`: unchanged, but used as a missing-recipe fallback.

## Out Of Scope

- Recipe instruction cook mode timers.
- Barcode scanning or external inventory matching.
- Backend synchronization.
- Multi-location inventory selection beyond the current Casa assumption.
