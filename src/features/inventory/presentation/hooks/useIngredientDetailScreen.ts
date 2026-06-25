import { Alert } from 'react-native';

import {
    getCategoryLabel,
    getExpirationLabel,
} from '@/features/inventory/application/inventoryContent';
import { useInventoryNavigation } from '@/features/inventory/presentation/hooks/useInventoryNavigation';
import { useInventoryStore } from '@/features/inventory/presentation/stores/useInventoryStore';

export function useIngredientDetailScreen(ingredientId: string) {
    const ingredient = useInventoryStore((state) =>
        state.ingredients.find((item) => item.id === ingredientId),
    );
    const deleteIngredient = useInventoryStore((state) => state.deleteIngredient);
    const navigation = useInventoryNavigation();

    function showFutureAction(actionName: string) {
        // TODO: Connect ingredient actions when inventory use cases are implemented.
        Alert.alert('Coming soon', `${actionName} will be available in a future inventory task.`);
    }

    return {
        categoryLabel: ingredient ? getCategoryLabel(ingredient.category) : '',
        deleteIngredient: () => deleteIngredient(ingredientId),
        expirationLabel: ingredient ? getExpirationLabel(ingredient.expirationDate) : '',
        ingredient,
        navigation,
        showFutureAction,
    };
}
