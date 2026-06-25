import { useLocalSearchParams } from 'expo-router';

import {
    selectRecipeById,
    useRecipeStore,
} from '@/features/recipes/presentation/stores/useRecipeStore';
import { useRecipeNavigation } from '@/features/recipes/presentation/hooks/useRecipeNavigation';

export function useRecipeDetailScreen() {
    const params = useLocalSearchParams<{ recipeId?: string | string[] }>();
    const recipes = useRecipeStore((state) => state.recipes);
    const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
    const navigation = useRecipeNavigation();
    const recipeId = Array.isArray(params.recipeId) ? params.recipeId[0] : params.recipeId;
    const recipe = selectRecipeById(recipes, recipeId);

    return {
        navigation,
        recipe,
        toggleFavorite,
    };
}
