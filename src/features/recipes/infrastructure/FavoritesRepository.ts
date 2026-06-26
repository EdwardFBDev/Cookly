import { database, type CooklyDatabase } from '@/infrastructure/database';

export type FavoriteRecipeRecord = {
    id: string;
    name: string;
    category: string;
    description: string;
};

type FavoriteRecipeRow = FavoriteRecipeRecord;

const CREATE_FAVORITE_RECIPES_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS favorite_recipes (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

export class FavoritesRepository {
    constructor(private readonly db: CooklyDatabase = database) {}

    saveFavorite(recipe: FavoriteRecipeRecord): void {
        this.createFavoritesTable();
        this.db.runSync(
            `
            INSERT OR IGNORE INTO favorite_recipes (id, name, category, description)
            VALUES (?, ?, ?, ?);
            `,
            [recipe.id, recipe.name, recipe.category, recipe.description],
        );
    }

    getFavorites(): FavoriteRecipeRecord[] {
        this.createFavoritesTable();

        return this.db.getAllSync<FavoriteRecipeRow>(
            `
            SELECT id, name, category, description
            FROM favorite_recipes
            ORDER BY created_at DESC;
            `,
        );
    }

    removeFavorite(recipeId: string): void {
        this.createFavoritesTable();
        this.db.runSync('DELETE FROM favorite_recipes WHERE id = ?;', [recipeId]);
    }

    private createFavoritesTable(): void {
        this.db.execSync(CREATE_FAVORITE_RECIPES_TABLE_SQL);
    }
}

export const favoritesRepository = new FavoritesRepository();
