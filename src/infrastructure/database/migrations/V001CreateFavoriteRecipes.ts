import type { Migration } from './Migration';

const CREATE_FAVORITE_RECIPES_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS favorite_recipes (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

export const V001_CREATE_FAVORITE_RECIPES: Migration = {
    version: 1,
    name: 'create_favorite_recipes',
    up: (database) => {
        database.execSync(CREATE_FAVORITE_RECIPES_TABLE_SQL);
    },
};
