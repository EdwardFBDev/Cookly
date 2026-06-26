import type { Migration } from './Migration';
import { V001_CREATE_FAVORITE_RECIPES } from './V001CreateFavoriteRecipes';

export const migrations: readonly Migration[] = [V001_CREATE_FAVORITE_RECIPES];
