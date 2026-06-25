import {
    RECIPE_FILTERS,
    selectCatalogRecipes,
    useRecipeStore,
} from '@/features/recipes/presentation/stores/useRecipeStore';
import { useRecipeNavigation } from '@/features/recipes/presentation/hooks/useRecipeNavigation';

export function useRecipeCatalogScreen() {
    const recipes = useRecipeStore((state) => state.recipes);
    const selectedFilter = useRecipeStore((state) => state.selectedFilter);
    const structuredFilters = useRecipeStore((state) => state.structuredFilters);
    const setSelectedFilter = useRecipeStore((state) => state.setSelectedFilter);
    const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
    const navigation = useRecipeNavigation();

    const visibleRecipes = selectCatalogRecipes(recipes, selectedFilter, structuredFilters);
    const activeStructuredFilterCount = Object.values(structuredFilters).filter(Boolean).length;

    return {
        activeStructuredFilterCount,
        filters: RECIPE_FILTERS,
        hasRecipes: visibleRecipes.length > 0,
        navigation,
        recipes: visibleRecipes,
        selectedFilter,
        setSelectedFilter,
        toggleFavorite,
    };
}
