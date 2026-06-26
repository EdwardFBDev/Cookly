import { useCookingNavigation } from '@/features/cooking/presentation/hooks/useCookingNavigation';
import { useCookingRouteRecipe } from '@/features/cooking/presentation/hooks/useCookingRouteRecipe';
import { useCookingStore } from '@/features/cooking/presentation/stores/useCookingStore';

export function useReviewIngredientsScreen() {
    const route = useCookingRouteRecipe();
    const selectAllIngredients = useCookingStore((state) => state.selectAllIngredients);
    const toggleIngredient = useCookingStore((state) => state.toggleIngredient);
    const navigation = useCookingNavigation(route.recipeId);
    const selectedCount = route.session?.ingredients.filter((ingredient) => ingredient.isSelected).length ?? 0;

    return {
        ...route,
        canContinue: selectedCount > 0,
        navigation,
        selectAllIngredients: () => {
            if (route.recipeId) {
                selectAllIngredients(route.recipeId);
            }
        },
        selectedCount,
        toggleIngredient: (ingredientId: string) => {
            if (route.recipeId) {
                toggleIngredient(route.recipeId, ingredientId);
            }
        },
    };
}
