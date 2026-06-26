import { useEffect } from 'react';

import {
    selectFavoriteRecipes,
    useRecipeStore,
} from '@/features/recipes/presentation/stores/useRecipeStore';
import { useRecipeNavigation } from '@/features/recipes/presentation/hooks/useRecipeNavigation';

export function useFavoritesScreen() {
    const recipes = useRecipeStore((state) => state.recipes);
    const favoritesError = useRecipeStore((state) => state.favoritesError);
    const isLoadingFavorites = useRecipeStore((state) => state.isLoadingFavorites);
    const loadFavorites = useRecipeStore((state) => state.loadFavorites);
    const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
    const navigation = useRecipeNavigation();
    const favoriteRecipes = selectFavoriteRecipes(recipes);

    useEffect(() => {
        loadFavorites();
    }, [loadFavorites]);

    return {
        favoritesError,
        hasRecipes: favoriteRecipes.length > 0,
        isLoading: isLoadingFavorites,
        loadFavorites,
        navigation,
        recipes: favoriteRecipes,
        toggleFavorite,
    };
}
