# Inventory Feature Acceptance Criteria

## Inventory

- The user can open Inventory from the existing Home inventory entry points.
- The screen shows the active location.
- The screen shows a search input placeholder.
- The screen shows inventory status filters.
- Ingredients are grouped by category.
- Ingredient rows show name, quantity, storage area, and status.
- Empty filtered results show a helpful empty state.
- Tapping an ingredient opens Ingredient Detail.
- Tapping the floating add button opens Add Ingredient.
- Tapping the location header opens Location Management.
- Tapping the search/action icon opens Expiring Ingredients.
- If the active location has no ingredients, the Inventory Empty screen is shown.

## Ingredient Detail

- The screen shows the selected ingredient name.
- The screen shows quantity, expiration, category, and location.
- The screen shows a smart impact section.
- The user can navigate back to Inventory.
- Missing ingredient ids show a safe empty state.
- Edit opens Edit Ingredient for the selected item.
- Transfer and sharing remain TODO-backed behavior.

## Add Ingredient

- The screen requires name, quantity, unit, category, and location.
- The screen validates invalid submissions with an inline error.
- The user can choose a category.
- The user can choose a storage location.
- Saving creates a local ingredient entry.
- After saving, the app opens the created Ingredient Detail.
- Cancel returns to Inventory without creating an ingredient.

## Edit Ingredient

- The screen loads the selected ingredient into an editable form.
- The screen validates invalid submissions with an inline error.
- Updating an ingredient modifies the local inventory state.
- After updating, the app opens the updated Ingredient Detail.
- Deleting an ingredient removes it from local inventory state and returns to Inventory.
- Missing ingredient ids show a safe empty state.

## Expiring Ingredients

- The user can open Expiring Ingredients from the Inventory flow.
- Ingredients are grouped by urgency: expiring today, this week, and this month.
- Each expiring item shows name, quantity, storage area, and expiration timing.
- Use Ingredient and View Recipes actions provide TODO-backed feedback for future integrations.
- If no ingredients are expiring, the screen shows an empty state.

## Location Management

- The user can open Location Management from Inventory.
- The screen lists available locations and local item counts.
- Selecting a location updates the active inventory location.
- Deleting a location with items requires relocation to another available location.
- Completing relocation moves items locally and removes the deleted location.
- The last remaining location cannot be deleted.

## Inventory Empty

- The screen appears when the active location has no inventory items.
- The user can open Add Ingredient from the empty state.
- Learn More provides TODO-backed feedback for future onboarding content.
- Bottom navigation remains available.

## Existing Work

- Existing onboarding, login, home, notifications, and recommendations routes remain available.
- Existing root layout and app providers remain intact.
- Existing database bootstrap remains unchanged.
