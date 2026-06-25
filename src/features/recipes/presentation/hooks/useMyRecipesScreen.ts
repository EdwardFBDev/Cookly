import {
    selectOwnedRecipes,
    useRecipeStore,
} from '@/features/recipes/presentation/stores/useRecipeStore';
import { useRecipeNavigation } from '@/features/recipes/presentation/hooks/useRecipeNavigation';

export function useMyRecipesScreen() {
    const recipes = useRecipeStore((state) => state.recipes);
    const navigation = useRecipeNavigation();
    const ownedRecipes = selectOwnedRecipes(recipes);

    return {
        hasRecipes: ownedRecipes.length > 0,
        navigation,
        recipes: ownedRecipes,
    };
}
