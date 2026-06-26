import { create } from 'zustand';

import { adjustCookingQuantity, createCookingIngredients } from '@/features/cooking/application/cookingContent';
import { CookingDeductionResult, CookingSession } from '@/features/cooking/domain/CookingModels';
import { InventoryIngredient } from '@/features/inventory/domain/InventoryModels';
import { Recipe } from '@/features/recipes/domain/RecipeModels';

type CookingState = {
    deductionResults: CookingDeductionResult[];
    sessions: Record<string, CookingSession>;
    adjustQuantity: (recipeId: string, ingredientId: string, direction: 'decrease' | 'increase') => void;
    completeSession: (recipeId: string, results: CookingDeductionResult[]) => void;
    selectAllIngredients: (recipeId: string) => void;
    startSession: (recipe: Recipe, inventoryIngredients: InventoryIngredient[]) => void;
    toggleIngredient: (recipeId: string, ingredientId: string) => void;
};

export const useCookingStore = create<CookingState>((set) => ({
    deductionResults: [],
    sessions: {},
    adjustQuantity: (recipeId, ingredientId, direction) => {
        set((state) => {
            const session = state.sessions[recipeId];

            if (!session) {
                return state;
            }

            return {
                sessions: {
                    ...state.sessions,
                    [recipeId]: {
                        ...session,
                        ingredients: session.ingredients.map((ingredient) =>
                            ingredient.id === ingredientId
                                ? adjustCookingQuantity(ingredient, direction)
                                : ingredient,
                        ),
                    },
                },
            };
        });
    },
    completeSession: (recipeId, results) => {
        set((state) => {
            const session = state.sessions[recipeId];

            if (!session) {
                return { deductionResults: results };
            }

            return {
                deductionResults: results,
                sessions: {
                    ...state.sessions,
                    [recipeId]: {
                        ...session,
                        completedAt: new Date().toISOString(),
                        ingredients: session.ingredients.map((ingredient) => ({
                            ...ingredient,
                            deductionApplied: results.some(
                                (result) => result.ingredientId === ingredient.id && result.wasApplied,
                            ),
                        })),
                    },
                },
            };
        });
    },
    selectAllIngredients: (recipeId) => {
        set((state) => {
            const session = state.sessions[recipeId];

            if (!session) {
                return state;
            }

            return {
                sessions: {
                    ...state.sessions,
                    [recipeId]: {
                        ...session,
                        ingredients: session.ingredients.map((ingredient) => ({
                            ...ingredient,
                            isSelected: true,
                        })),
                    },
                },
            };
        });
    },
    startSession: (recipe, inventoryIngredients) => {
        set((state) => {
            if (state.sessions[recipe.id]) {
                return state;
            }

            return {
                sessions: {
                    ...state.sessions,
                    [recipe.id]: {
                        recipeId: recipe.id,
                        ingredients: createCookingIngredients(recipe, inventoryIngredients),
                    },
                },
            };
        });
    },
    toggleIngredient: (recipeId, ingredientId) => {
        set((state) => {
            const session = state.sessions[recipeId];

            if (!session) {
                return state;
            }

            return {
                sessions: {
                    ...state.sessions,
                    [recipeId]: {
                        ...session,
                        ingredients: session.ingredients.map((ingredient) =>
                            ingredient.id === ingredientId
                                ? { ...ingredient, isSelected: !ingredient.isSelected }
                                : ingredient,
                        ),
                    },
                },
            };
        });
    },
}));

export function selectCookingSession(
    sessions: Record<string, CookingSession>,
    recipeId?: string,
): CookingSession | undefined {
    return recipeId ? sessions[recipeId] : undefined;
}
