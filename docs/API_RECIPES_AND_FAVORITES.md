# API Recipes and Local Favorites

## API Endpoint

Cookly loads catalog recipes from:

```text
https://raw.githubusercontent.com/EdwardFBDev/Cookly/master/api/recipes/recipes.json
```

Expected response:

```json
{
  "version": "1.0.0",
  "recipes": []
}
```

The network service validates connectivity, HTTP status, and the response structure before returning the `recipes` array.

## Recipe Rendering

Remote recipe fields are mapped into the existing `Recipe` UI model:

- `name` maps to `title`.
- `category` is normalized to the supported local category values.
- `description` is rendered on recipe cards.
- `prepTime` and `cookTime` are combined for card timing.
- `ingredients` and `steps` are mapped for the existing detail screen.

The catalog screen displays a loading state while fetching, an error state with retry when the request fails, and the recipe list when the request succeeds.

## SQLite Table

Favorites are persisted in the local Expo SQLite database using the existing database infrastructure.

```sql
CREATE TABLE IF NOT EXISTS favorite_recipes (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

The `id` primary key prevents duplicate favorites. Saves use `INSERT OR IGNORE`.

## Favorite Workflow

The catalog and detail screens toggle favorites through the recipe store. The store delegates SQLite work to `FavoritesRepository`.

- Add favorite: save `id`, `name`, `category`, and `description` locally, then mark the recipe as favorite in state.
- Read favorites: load all local records from SQLite and merge them into recipe state.
- Remove favorite: delete the local record and update state immediately.

The favorites screen loads records from SQLite when it opens and refreshes automatically after removal because the shared recipe store state changes.

## State Management Decision

The app already uses Zustand for recipe state, so this implementation reuses that store instead of introducing a new global state solution. Screen hooks orchestrate loading and expose state to the UI. Network and database logic remain outside presentation components.

## Manual Testing

1. Open the recipes catalog and confirm the loading state appears before recipes render.
2. Confirm recipes render with name, category, and description from the remote JSON endpoint.
3. Temporarily break the endpoint URL in `src/services/recipesApi.ts` and confirm the catalog shows a retryable error state.
4. Restore the endpoint, add a recipe to favorites from the catalog, and confirm the favorite indicator changes.
5. Open Favorites and confirm the saved recipe appears.
6. Restart the app and confirm the favorite remains in Favorites.
7. Remove the favorite from Favorites and confirm the list refreshes automatically.

## Technical Decisions

- Existing navigation and screens were reused.
- Existing `RecipeCard`, catalog, and favorites screens were extended rather than replaced.
- Favorites persistence is intentionally minimal and stores only the fields required for offline favorite display.
- No new dependencies were added.
