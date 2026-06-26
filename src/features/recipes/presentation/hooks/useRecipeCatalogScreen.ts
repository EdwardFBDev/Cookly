import { useEffect } from 'react';

import {
    RECIPE_FILTERS,
    selectCatalogRecipes,
    useRecipeStore,
} from '@/features/recipes/presentation/stores/useRecipeStore';
import { useRecipeNavigation } from '@/features/recipes/presentation/hooks/useRecipeNavigation';

export function useRecipeCatalogScreen() {
    const recipes = useRecipeStore((state) => state.recipes);
    const isLoadingRecipes = useRecipeStore((state) => state.isLoadingRecipes);
    const recipesError = useRecipeStore((state) => state.recipesError);
    const selectedFilter = useRecipeStore((state) => state.selectedFilter);
    const structuredFilters = useRecipeStore((state) => state.structuredFilters);
    const loadRecipes = useRecipeStore((state) => state.loadRecipes);
    const setSelectedFilter = useRecipeStore((state) => state.setSelectedFilter);
    const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
    const navigation = useRecipeNavigation();

    const visibleRecipes = selectCatalogRecipes(recipes, selectedFilter, structuredFilters);
    const activeStructuredFilterCount = Object.values(structuredFilters).filter(Boolean).length;

    useEffect(() => {
        void loadRecipes();
    }, [loadRecipes]);

    return {
        activeStructuredFilterCount,
        filters: RECIPE_FILTERS,
        hasRecipes: visibleRecipes.length > 0,
        isLoading: isLoadingRecipes,
        loadRecipes,
        navigation,
        recipes: visibleRecipes,
        recipesError,
        selectedFilter,
        setSelectedFilter,
        toggleFavorite,
    };
}
