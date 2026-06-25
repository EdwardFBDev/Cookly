import { create } from 'zustand';

import {
    createLocalRecipe,
    getInitialRecipes,
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
    RecipeStructuredFilters,
} from '@/features/recipes/domain/RecipeModels';

type RecipeState = {
    recipes: Recipe[];
    selectedFilter: RecipeCatalogFilter;
    structuredFilters: RecipeStructuredFilters;
    addRecipe: (input: CreateRecipeInput) => Recipe;
    clearStructuredFilters: () => void;
    setStructuredFilters: (filters: RecipeStructuredFilters) => void;
    setSelectedFilter: (filter: RecipeCatalogFilter) => void;
    toggleFavorite: (recipeId: string) => void;
};

export const useRecipeStore = create<RecipeState>((set) => ({
    recipes: getInitialRecipes(),
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
    setStructuredFilters: (filters) => set({ structuredFilters: filters, selectedFilter: 'all' }),
    setSelectedFilter: (filter) => set({ selectedFilter: filter }),
    toggleFavorite: (recipeId) => {
        // TODO: Persist favorite changes through a recipe repository when it exists.
        set((state) => ({
            recipes: state.recipes.map((recipe) =>
                recipe.id === recipeId ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe,
            ),
        }));
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
