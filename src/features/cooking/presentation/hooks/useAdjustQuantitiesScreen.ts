import { useMemo } from 'react';

import { useCookingNavigation } from '@/features/cooking/presentation/hooks/useCookingNavigation';
import { useCookingRouteRecipe } from '@/features/cooking/presentation/hooks/useCookingRouteRecipe';
import { useCookingStore } from '@/features/cooking/presentation/stores/useCookingStore';

export function useAdjustQuantitiesScreen() {
    const route = useCookingRouteRecipe();
    const adjustQuantity = useCookingStore((state) => state.adjustQuantity);
    const navigation = useCookingNavigation(route.recipeId);
    const selectedIngredients = useMemo(
        () => route.session?.ingredients.filter((ingredient) => ingredient.isSelected) ?? [],
        [route.session?.ingredients],
    );

    return {
        ...route,
        adjustQuantity: (ingredientId: string, direction: 'decrease' | 'increase') => {
            if (route.recipeId) {
                adjustQuantity(route.recipeId, ingredientId, direction);
            }
        },
        navigation,
        selectedIngredients,
    };
}
