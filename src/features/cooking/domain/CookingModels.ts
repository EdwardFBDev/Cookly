export type CookingFlowStep = 'review' | 'quantities' | 'success';

export type CookingIngredient = {
    id: string;
    recipeIngredientId: string;
    name: string;
    quantityLabel: string;
    requestedQuantity: number;
    usedQuantity: number;
    unitLabel: string;
    isAvailable: boolean;
    isSelected: boolean;
    matchedInventoryIngredientId?: string;
    matchedInventoryQuantity?: number;
    matchedInventoryLocation?: string;
    matchedInventoryStorageArea?: string;
    deductionApplied: boolean;
};

export type CookingSession = {
    recipeId: string;
    completedAt?: string;
    ingredients: CookingIngredient[];
};

export type CookingDeductionResult = {
    ingredientId: string;
    name: string;
    quantityLabel: string;
    deductedQuantity: number;
    unitLabel: string;
    wasApplied: boolean;
};
