import { Alert } from 'react-native';

import {
    getExpirationGroup,
    getExpirationLabel,
} from '@/features/inventory/application/inventoryContent';
import { InventoryIngredient } from '@/features/inventory/domain/InventoryModels';
import { useInventoryNavigation } from '@/features/inventory/presentation/hooks/useInventoryNavigation';
import { useInventoryStore } from '@/features/inventory/presentation/stores/useInventoryStore';

export type ExpiringIngredientGroup = {
    key: 'today' | 'week' | 'month';
    label: string;
    tone: 'critical' | 'urgent' | 'monitor';
    ingredients: InventoryIngredient[];
};

export function useExpiringIngredientsScreen() {
    const ingredients = useInventoryStore((state) => state.ingredients);
    const selectedLocation = useInventoryStore((state) => state.selectedLocation);
    const navigation = useInventoryNavigation();
    const expiringIngredients = ingredients.filter(
        (ingredient) =>
            ingredient.location === selectedLocation && Boolean(getExpirationGroup(ingredient.expirationDate)),
    );
    const allGroups: ExpiringIngredientGroup[] = [
        {
            key: 'today',
            label: 'Expiring Today',
            tone: 'critical',
            ingredients: expiringIngredients.filter(
                (ingredient) => getExpirationGroup(ingredient.expirationDate) === 'today',
            ),
        },
        {
            key: 'week',
            label: 'This Week',
            tone: 'urgent',
            ingredients: expiringIngredients.filter(
                (ingredient) => getExpirationGroup(ingredient.expirationDate) === 'week',
            ),
        },
        {
            key: 'month',
            label: 'This Month',
            tone: 'monitor',
            ingredients: expiringIngredients.filter(
                (ingredient) => getExpirationGroup(ingredient.expirationDate) === 'month',
            ),
        },
    ];
    const groups = allGroups.filter((group) => group.ingredients.length > 0);

    function showFutureAction(actionName: string) {
        // TODO: Connect these actions to recipe and cooking workflows when those features exist.
        Alert.alert('Coming soon', `${actionName} will be connected in a future task.`);
    }

    return {
        getExpirationLabel,
        groups,
        hasExpiringIngredients: expiringIngredients.length > 0,
        navigation,
        selectedLocation,
        showFutureAction,
    };
}
