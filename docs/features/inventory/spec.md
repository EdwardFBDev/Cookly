# Inventory Feature Specification

## Feature

[INVENTORY] - [INV-001 Inventory] - [INV-002 Ingredient Detail] - [INV-003 Add Ingredient] - [INV-004 Edit Ingredient] - [INV-005 Expiring Ingredients] - [INV-006 Location Management] - [INV-007 Inventory Empty]

## Screen Objective

Provide a connected inventory flow where users can review ingredients by location and category, inspect ingredient details, add or edit ingredients, prioritize expiring ingredients, manage storage locations, and understand the empty inventory state.

## User Goal

The user wants to understand what ingredients are available at each location, identify ingredients that need attention, view or update ingredient details, manage storage locations, and start from a clear empty state without leaving the Cookly app flow.

## Business Rules

- Inventory items belong to a storage location.
- Inventory items have a name, quantity, unit, category, and optional expiration date.
- Ingredients may be filtered by all items, expiring soon, expired, or out of stock.
- Ingredient status is derived from quantity and expiration:
  - Out of stock when quantity is zero.
  - Expired when the expiration date is before today.
  - Urgent when the expiration date is today or tomorrow.
  - Expiring soon when the expiration date is within three days.
  - Available otherwise.
- Add Ingredient requires ingredient name, quantity, unit, category, and storage location.
- Edit Ingredient requires ingredient name, quantity, unit, category, location, and storage area.
- Deleting an ingredient removes it from local inventory state after confirmation.
- Expiring Ingredients prioritizes urgent, expiring soon, and monthly monitoring groups.
- Deleting a location with inventory requires moving its items to another location first.
- The last remaining location cannot be deleted.
- Empty Inventory appears when the active location has no inventory items.
- Missing backend persistence must not block the screen; local feature state may be used with TODOs for future repository integration.

## Navigation Entry And Exit Points

- Entry from Home dashboard "View Inventory" and bottom Inventory tab.
- Entry from Inventory floating action button to Add Ingredient.
- Entry from Inventory header location action to Location Management.
- Entry from Inventory search/action area to Expiring Ingredients for attention-focused review.
- Entry from Inventory ingredient row to Ingredient Detail.
- Entry from Ingredient Detail edit action to Edit Ingredient.
- Exit from Ingredient Detail back to Inventory.
- Exit from Add Ingredient by canceling back to Inventory.
- Successful Add Ingredient returns to the created ingredient detail.
- Successful Edit Ingredient returns to the updated ingredient detail.
- Delete Ingredient returns to Inventory.
- Location Management returns to Inventory after selection, creation, or relocation.
- Inventory Empty can navigate to Add Ingredient or back into the normal Inventory tab flow.
- Bottom navigation remains available from Inventory and Ingredient Detail.

## Dependencies

- Expo Router file-based navigation.
- Existing app root stack in `src/app/_layout.tsx`.
- Existing theme tokens in `src/app/theme`.
- Existing `HomeBottomNavigation` for the current app flow.
- Existing SQLite database schema for future `inventory_items` persistence.
- Zustand for local connected feature state.

## Screen States

- Inventory default state with grouped ingredients.
- Inventory filtered state.
- Inventory empty state when no ingredient matches the selected filter.
- Ingredient Detail found state.
- Ingredient Detail missing state when an unknown id is opened.
- Add Ingredient pristine state.
- Add Ingredient validation error state.
- Add Ingredient submitted state returning to detail.
- Edit Ingredient loaded state.
- Edit Ingredient validation error state.
- Edit Ingredient missing ingredient state.
- Edit Ingredient delete confirmation state.
- Expiring Ingredients grouped state.
- Expiring Ingredients empty state.
- Location Management default state.
- Location Management delete relocation state.
- Location Management transfer progress state.
- Inventory Empty state for active locations without items.

## Integration Points With Existing Screens

- `useHomeNavigation.goInventory` must navigate to the new Inventory route instead of showing a placeholder alert.
- Home dashboard and Recommendations bottom navigation keep their existing routes and screens.
- Inventory bottom navigation uses existing callbacks for Home, Inventory, Recipes, Plan, and Shopping.
- Ingredient Detail edit action opens Edit Ingredient instead of placeholder feedback.
- Inventory header actions open Expiring Ingredients and Location Management.
- Empty Inventory uses Add Ingredient to repopulate the same local feature state.
- Recipes, Meal Planning, Shopping, and backend persistence remain TODO-backed future integrations where routes are not yet implemented.
