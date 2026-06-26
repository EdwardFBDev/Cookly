import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

import { selectCookingSession, useCookingStore } from '@/features/cooking/presentation/stores/useCookingStore';
import { useInventoryStore } from '@/features/inventory/presentation/stores/useInventoryStore';
import { selectRecipeById, useRecipeStore } from '@/features/recipes/presentation/stores/useRecipeStore';

export function useCookingRouteRecipe() {
    const params = useLocalSearchParams<{ recipeId?: string | string[] }>();
    const recipes = useRecipeStore((state) => state.recipes);
    const inventoryIngredients = useInventoryStore((state) => state.ingredients);
    const sessions = useCookingStore((state) => state.sessions);
    const startSession = useCookingStore((state) => state.startSession);
    const recipeId = Array.isArray(params.recipeId) ? params.recipeId[0] : params.recipeId;
    const recipe = selectRecipeById(recipes, recipeId);
    const session = selectCookingSession(sessions, recipeId);

    useEffect(() => {
        if (recipe && !session) {
            startSession(recipe, inventoryIngredients);
        }
    }, [inventoryIngredients, recipe, session, startSession]);

    return {
        inventoryIngredients,
        recipe,
        recipeId,
        session,
    };
}
