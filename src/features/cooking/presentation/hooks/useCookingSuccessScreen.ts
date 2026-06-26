import { useEffect } from 'react';

import { applyCookingDeductions } from '@/features/cooking/application/cookingContent';
import { useCookingNavigation } from '@/features/cooking/presentation/hooks/useCookingNavigation';
import { useCookingRouteRecipe } from '@/features/cooking/presentation/hooks/useCookingRouteRecipe';
import { useCookingStore } from '@/features/cooking/presentation/stores/useCookingStore';
import { useInventoryStore } from '@/features/inventory/presentation/stores/useInventoryStore';

export function useCookingSuccessScreen() {
    const route = useCookingRouteRecipe();
    const deductionResults = useCookingStore((state) => state.deductionResults);
    const completeSession = useCookingStore((state) => state.completeSession);
    const updateIngredient = useInventoryStore((state) => state.updateIngredient);
    const navigation = useCookingNavigation(route.recipeId);

    useEffect(() => {
        if (!route.recipeId || !route.session || route.session.completedAt) {
            return;
        }

        const results = applyCookingDeductions(
            route.session.ingredients,
            route.inventoryIngredients,
            updateIngredient,
        );
        completeSession(route.recipeId, results);
    }, [completeSession, route.inventoryIngredients, route.recipeId, route.session, updateIngredient]);

    return {
        ...route,
        deductionResults,
        navigation,
    };
}
