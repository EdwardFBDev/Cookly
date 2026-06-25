# Recipes Feature Tasks

## REC-001 Recipe Catalog

- Create recipe domain models.
- Create static recipe content for this increment.
- Create local recipe store for filters and favorites.
- Implement catalog hook with derived visible recipes.
- Implement catalog screen with header, search placeholder, filters, cards, and bottom navigation.
- Add `/recipes` route wrapper.

## REC-002 Recipe Detail

- Implement detail hook that resolves route recipe ids.
- Implement detail screen found and missing states.
- Show ingredient availability and preparation steps.
- Add TODO-backed actions for shopping list, cooking mode, sharing, and editing.
- Add `/recipes/[recipeId]` route wrapper.

## REC-003 My Recipes

- Implement my recipes hook for owned recipes.
- Implement my recipes screen with owned/editable recipe cards.
- Add empty state.
- Add `/recipes/my` route wrapper.

## REC-004 Favorites

- Add derived favorite recipe selector.
- Implement favorites hook.
- Implement favorites screen with favorite cards and empty state.
- Add `/recipes/favorites` route wrapper.
- Connect favorites entry from the existing recipe flow.

## REC-005 Create Recipe

- Add basic create recipe input model.
- Add local create recipe store action.
- Implement create recipe hook with validation.
- Implement create recipe screen for photo placeholder, name, category, time, and servings.
- Add TODO-backed save draft and photo upload actions.
- Add `/recipes/create` route wrapper.

## REC-006 Recipe Filters

- Add structured recipe filter options and local selected filter state.
- Implement filters hook with apply and clear behavior.
- Implement filters screen with category, time, and availability options.
- Add `/recipes/filters` route wrapper.
- Connect Recipe Catalog filter action to the filters route.

## Integration

- Connect existing Recipes bottom navigation entries to `/recipes`.
- Preserve existing home recommendations route.
- Reuse existing theme tokens and navigation patterns.
- Validate changed files for TypeScript or lint diagnostics.
