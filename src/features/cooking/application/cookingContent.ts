import { CookingDeductionResult, CookingIngredient } from '@/features/cooking/domain/CookingModels';
import { InventoryIngredient, UpdateIngredientInput } from '@/features/inventory/domain/InventoryModels';
import { Recipe, RecipeIngredient } from '@/features/recipes/domain/RecipeModels';

const DEFAULT_QUANTITY_STEP = 10;

export function createCookingIngredients(
    recipe: Recipe,
    inventoryIngredients: InventoryIngredient[],
): CookingIngredient[] {
    return recipe.ingredients.map((ingredient) =>
        createCookingIngredient(ingredient, inventoryIngredients),
    );
}

export function adjustCookingQuantity(ingredient: CookingIngredient, direction: 'decrease' | 'increase') {
    const step = getQuantityStep(ingredient);
    const nextQuantity =
        direction === 'increase'
            ? ingredient.usedQuantity + step
            : Math.max(0, ingredient.usedQuantity - step);

    return {
        ...ingredient,
        usedQuantity: roundQuantity(nextQuantity),
    };
}

export function formatCookingQuantity(quantity: number, unitLabel: string): string {
    if (!unitLabel) {
        return quantity > 0 ? quantity.toString() : '0';
    }

    return `${quantity}${unitLabel}`;
}

export function applyCookingDeductions(
    ingredients: CookingIngredient[],
    inventoryIngredients: InventoryIngredient[],
    updateIngredient: (ingredientId: string, input: UpdateIngredientInput) => InventoryIngredient | undefined,
): CookingDeductionResult[] {
    return ingredients
        .filter((ingredient) => ingredient.isSelected && ingredient.usedQuantity > 0)
        .map((ingredient) => {
            const inventoryIngredient = inventoryIngredients.find(
                (item) => item.id === ingredient.matchedInventoryIngredientId,
            );

            if (!inventoryIngredient) {
                return createDeductionResult(ingredient, false);
            }

            // TODO: Move deduction into an inventory use case/repository transaction when persistence exists.
            updateIngredient(inventoryIngredient.id, {
                category: inventoryIngredient.category,
                expirationDate: inventoryIngredient.expirationDate,
                location: inventoryIngredient.location,
                name: inventoryIngredient.name,
                quantity: Math.max(0, inventoryIngredient.quantity - ingredient.usedQuantity),
                storageArea: inventoryIngredient.storageArea,
                unit: inventoryIngredient.unit,
            });

            return createDeductionResult(ingredient, true);
        });
}

function createCookingIngredient(
    recipeIngredient: RecipeIngredient,
    inventoryIngredients: InventoryIngredient[],
): CookingIngredient {
    const parsedQuantity = parseRecipeQuantity(recipeIngredient.quantityLabel);
    const matchedInventoryIngredient = findInventoryMatch(recipeIngredient, inventoryIngredients);

    return {
        id: recipeIngredient.id,
        recipeIngredientId: recipeIngredient.id,
        name: recipeIngredient.name,
        quantityLabel: recipeIngredient.quantityLabel,
        requestedQuantity: parsedQuantity.quantity,
        usedQuantity: parsedQuantity.quantity,
        unitLabel: parsedQuantity.unitLabel,
        isAvailable: recipeIngredient.availability === 'available',
        isSelected: recipeIngredient.availability === 'available',
        matchedInventoryIngredientId: matchedInventoryIngredient?.id,
        matchedInventoryQuantity: matchedInventoryIngredient?.quantity,
        matchedInventoryLocation: matchedInventoryIngredient?.location,
        matchedInventoryStorageArea: matchedInventoryIngredient?.storageArea,
        deductionApplied: false,
    };
}

function parseRecipeQuantity(quantityLabel: string): { quantity: number; unitLabel: string } {
    const match = quantityLabel.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)?/);

    if (!match) {
        return { quantity: 0, unitLabel: '' };
    }

    return {
        quantity: Number(match[1]),
        unitLabel: match[2]?.toLowerCase() ?? '',
    };
}

function findInventoryMatch(
    recipeIngredient: RecipeIngredient,
    inventoryIngredients: InventoryIngredient[],
): InventoryIngredient | undefined {
    const recipeName = normalizeName(recipeIngredient.name);
    const recipeId = normalizeName(recipeIngredient.id);

    return inventoryIngredients.find((ingredient) => {
        const inventoryName = normalizeName(ingredient.name);
        return inventoryName === recipeName || inventoryName === recipeId;
    });
}

function normalizeName(value: string): string {
    return value.toLowerCase().replace(/\([^)]*\)/g, '').replace(/[^a-z0-9]+/g, '');
}

function getQuantityStep(ingredient: CookingIngredient): number {
    if (ingredient.unitLabel === 'ml' || ingredient.unitLabel === 'g') {
        return Math.max(DEFAULT_QUANTITY_STEP, Math.round(ingredient.requestedQuantity / 5));
    }

    if (ingredient.requestedQuantity > 1) {
        return 1;
    }

    return 0.5;
}

function roundQuantity(quantity: number): number {
    return Math.round(quantity * 10) / 10;
}

function createDeductionResult(
    ingredient: CookingIngredient,
    wasApplied: boolean,
): CookingDeductionResult {
    return {
        ingredientId: ingredient.id,
        name: ingredient.name,
        quantityLabel: formatCookingQuantity(ingredient.usedQuantity, ingredient.unitLabel),
        deductedQuantity: ingredient.usedQuantity,
        unitLabel: ingredient.unitLabel,
        wasApplied,
    };
}
