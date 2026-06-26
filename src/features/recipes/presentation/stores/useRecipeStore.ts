import { create } from 'zustand';

import {
    createLocalRecipe,
    getInitialRecipes,
    mapApiRecipesToCatalogRecipes,
    matchesRecipeFilter,
    matchesStructuredFilters,
    RECIPE_AVAILABILITY_FILTERS,
    RECIPE_CATEGORIES,
    RECIPE_FILTERS,
    RECIPE_TIME_FILTERS,
} from '@/features/recipes/application/recipeContent';
import {
    CreateRecipeInput,
    Recipe,
    RecipeCatalogFilter,
    RecipeCategory,
    RecipeStructuredFilters,
} from '@/features/recipes/domain/RecipeModels';
import {
    favoritesRepository,
    type FavoriteRecipeRecord,
} from '@/features/recipes/infrastructure/FavoritesRepository';
import { fetchRecipes } from '@/services/recipesApi';

type RecipeState = {
    recipes: Recipe[];
    isLoadingRecipes: boolean;
    recipesError?: string;
    isLoadingFavorites: boolean;
    favoritesError?: string;
    selectedFilter: RecipeCatalogFilter;
    structuredFilters: RecipeStructuredFilters;
    addRecipe: (input: CreateRecipeInput) => Recipe;
    clearStructuredFilters: () => void;
    loadFavorites: () => void;
    loadRecipes: () => Promise<void>;
    setStructuredFilters: (filters: RecipeStructuredFilters) => void;
    setSelectedFilter: (filter: RecipeCatalogFilter) => void;
    toggleFavorite: (recipeId: string) => Promise<void>;
};

export const useRecipeStore = create<RecipeState>((set) => ({
    recipes: getInitialRecipes(),
    isLoadingRecipes: false,
    recipesError: undefined,
    isLoadingFavorites: false,
    favoritesError: undefined,
    selectedFilter: 'all',
    structuredFilters: {},
    addRecipe: (input) => {
        const recipe = createLocalRecipe(input);

        // TODO: Persist created recipes through a recipe repository when it exists.
        set((state) => ({
            recipes: [recipe, ...state.recipes],
        }));

        return recipe;
    },
    clearStructuredFilters: () => set({ structuredFilters: {}, selectedFilter: 'all' }),
    loadFavorites: () => {
        set({ isLoadingFavorites: true, favoritesError: undefined });

        try {
            const favoriteRecords = favoritesRepository.getFavorites();
            const favoriteIds = new Set(favoriteRecords.map((favorite) => favorite.id));

            set((state) => {
                const existingRecipeIds = new Set(state.recipes.map((recipe) => recipe.id));
                const missingFavoriteRecipes = favoriteRecords
                    .filter((favorite) => !existingRecipeIds.has(favorite.id))
                    .map(mapFavoriteRecordToRecipe);

                return {
                    recipes: [
                        ...missingFavoriteRecipes,
                        ...state.recipes.map((recipe) => ({
                            ...recipe,
                            isFavorite: favoriteIds.has(recipe.id),
                        })),
                    ],
                    isLoadingFavorites: false,
                };
            });
        } catch (error) {
            set({
                favoritesError: getErrorMessage(error, 'Unable to load favorite recipes.'),
                isLoadingFavorites: false,
            });
        }
    },
    loadRecipes: async () => {
        set({ isLoadingRecipes: true, recipesError: undefined });

        try {
            const [apiRecipes, favoriteRecords] = await Promise.all([
                fetchRecipes(),
                Promise.resolve(favoritesRepository.getFavorites()),
            ]);
            const favoriteIds = new Set(favoriteRecords.map((favorite) => favorite.id));
            const catalogRecipes = mapApiRecipesToCatalogRecipes(apiRecipes, favoriteIds);

            set((state) => ({
                recipes: [
                    ...state.recipes.filter((recipe) => recipe.isOwned),
                    ...catalogRecipes,
                ],
                isLoadingRecipes: false,
            }));
        } catch (error) {
            set({
                recipesError: getErrorMessage(error, 'Unable to load recipes.'),
                isLoadingRecipes: false,
            });
        }
    },
    setStructuredFilters: (filters) => set({ structuredFilters: filters, selectedFilter: 'all' }),
    setSelectedFilter: (filter) => set({ selectedFilter: filter }),
    toggleFavorite: async (recipeId) => {
        const recipe = useRecipeStore.getState().recipes.find((currentRecipe) => currentRecipe.id === recipeId);

        if (!recipe) {
            return;
        }

        try {
            if (recipe.isFavorite) {
                favoritesRepository.removeFavorite(recipe.id);
            } else {
                favoritesRepository.saveFavorite({
                    id: recipe.id,
                    name: recipe.title,
                    category: recipe.category,
                    description: recipe.description ?? '',
                });
            }

            set((state) => ({
                favoritesError: undefined,
                recipes: state.recipes.map((currentRecipe) =>
                    currentRecipe.id === recipeId
                        ? { ...currentRecipe, isFavorite: !currentRecipe.isFavorite }
                        : currentRecipe,
                ),
            }));
        } catch (error) {
            set({ favoritesError: getErrorMessage(error, 'Unable to update favorite recipe.') });
        }
    },
}));

export function selectRecipeById(recipes: Recipe[], recipeId?: string): Recipe | undefined {
    return recipes.find((recipe) => recipe.id === recipeId);
}

export function selectCatalogRecipes(
    recipes: Recipe[],
    filter: RecipeCatalogFilter,
    structuredFilters: RecipeStructuredFilters,
): Recipe[] {
    return recipes.filter(
        (recipe) =>
            !recipe.isOwned &&
            matchesRecipeFilter(recipe, filter) &&
            matchesStructuredFilters(recipe, structuredFilters),
    );
}

export function selectOwnedRecipes(recipes: Recipe[]): Recipe[] {
    return recipes.filter((recipe) => recipe.isOwned);
}

export function selectFavoriteRecipes(recipes: Recipe[]): Recipe[] {
    return recipes.filter((recipe) => recipe.isFavorite);
}

export { RECIPE_AVAILABILITY_FILTERS, RECIPE_CATEGORIES, RECIPE_FILTERS, RECIPE_TIME_FILTERS };

function mapFavoriteRecordToRecipe(favorite: FavoriteRecipeRecord): Recipe {
    return {
        id: favorite.id,
        title: favorite.name,
        description: favorite.description,
        category: normalizeStoredCategory(favorite.category),
        cookTimeMinutes: 30,
        servings: 1,
        compatibility: 100,
        matchLabel: 'Saved',
        missingIngredientCount: 0,
        imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
        accentColor: '#30251F',
        ingredients: [],
        steps: [],
        isFavorite: true,
        isOwned: false,
    };
}

function normalizeStoredCategory(category: string): RecipeCategory {
    if (category === 'breakfast' || category === 'lunch' || category === 'dinner' || category === 'snacks') {
        return category;
    }

    return 'dinner';
}

function getErrorMessage(error: unknown, fallbackMessage: string): string {
    return error instanceof Error ? error.message : fallbackMessage;
}
