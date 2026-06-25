import { InventoryIngredient } from '@/features/inventory/domain/InventoryModels';

export function formatIngredientQuantity(ingredient: InventoryIngredient): string {
    if (ingredient.unit === 'Grams (g)') {
        return `${ingredient.quantity}g`;
    }

    if (ingredient.unit === 'Kilograms (kg)') {
        return `${ingredient.quantity}kg`;
    }

    if (ingredient.unit === 'Milliliters (ml)') {
        return `${ingredient.quantity}ml`;
    }

    if (ingredient.unit === 'Liters (l)') {
        return `${ingredient.quantity}l`;
    }

    return `${ingredient.quantity} ${ingredient.quantity === 1 ? 'unit' : 'units'}`;
}
