# COOK-001 Cooking Flow Acceptance Criteria

## COOK-001 Review Ingredients

- [ ] User can enter the review screen from a recipe detail screen.
- [ ] Screen shows the selected recipe title, serving count, cook time, and image.
- [ ] Screen shows all recipe ingredients with requested quantity labels.
- [ ] Available ingredients are selected by default.
- [ ] User can toggle individual ingredients.
- [ ] User can select all ingredients.
- [ ] Missing or unchecked ingredients are not eligible for deduction.
- [ ] User can navigate forward to Adjust Quantities when at least one ingredient is selected.

## COOK-002 Adjust Quantities

- [ ] Screen shows only selected ingredients from the review step.
- [ ] User can reduce or increase each consumed quantity.
- [ ] Quantity cannot go below zero.
- [ ] User can go back to Review Ingredients without losing the cooking session.
- [ ] User can continue to Cooking Success.

## COOK-003 Cooking Success

- [ ] Screen shows a confirmation that the meal is complete.
- [ ] Screen lists selected ingredients and final consumed quantities.
- [ ] Matched inventory ingredients are deducted locally.
- [ ] Unmatched ingredients are shown without blocking completion.
- [ ] User can return home.
- [ ] User can open inventory.

## Navigation And Preservation

- [ ] Existing app routes remain available.
- [ ] Existing feature screens are not deleted or replaced.
- [ ] Cooking routes are added under the existing Expo Router structure.
- [ ] Missing backend/repository work is documented with TODO comments.
