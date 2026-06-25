import {
    selectFavoriteRecipes,
    useRecipeStore,
} from '@/features/recipes/presentation/stores/useRecipeStore';
import { useRecipeNavigation } from '@/features/recipes/presentation/hooks/useRecipeNavigation';

export function useFavoritesScreen() {
    const recipes = useRecipeStore((state) => state.recipes);
    const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
    const navigation = useRecipeNavigation();
    const favoriteRecipes = selectFavoriteRecipes(recipes);

    return {
        hasRecipes: favoriteRecipes.length > 0,
        navigation,
        recipes: favoriteRecipes,
        toggleFavorite,
    };
}
