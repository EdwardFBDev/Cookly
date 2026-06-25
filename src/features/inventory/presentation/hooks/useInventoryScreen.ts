import {
    INVENTORY_CATEGORIES,
    INVENTORY_FILTERS,
    matchesInventoryFilter,
} from '@/features/inventory/application/inventoryContent';
import {
    IngredientCategory,
    InventoryIngredient,
} from '@/features/inventory/domain/InventoryModels';
import { useInventoryNavigation } from '@/features/inventory/presentation/hooks/useInventoryNavigation';
import { useInventoryStore } from '@/features/inventory/presentation/stores/useInventoryStore';

export type InventoryCategoryGroup = {
    category: IngredientCategory;
    label: string;
    icon: string;
    ingredients: InventoryIngredient[];
};

export function useInventoryScreen() {
    const ingredients = useInventoryStore((state) => state.ingredients);
    const selectedFilter = useInventoryStore((state) => state.selectedFilter);
    const selectedLocation = useInventoryStore((state) => state.selectedLocation);
    const setSelectedFilter = useInventoryStore((state) => state.setSelectedFilter);
    const navigation = useInventoryNavigation();

    const locationIngredients = ingredients.filter(
        (ingredient) => ingredient.location === selectedLocation,
    );
    const visibleIngredients = ingredients.filter(
        (ingredient) =>
            ingredient.location === selectedLocation && matchesInventoryFilter(ingredient, selectedFilter),
    );

    const groups = INVENTORY_CATEGORIES.map((category) => ({
        category: category.key,
        label: category.label,
        icon: category.icon,
        ingredients: visibleIngredients.filter((ingredient) => ingredient.category === category.key),
    })).filter((group) => group.ingredients.length > 0);

    return {
        filters: INVENTORY_FILTERS,
        groups,
        hasAnyIngredientsInLocation: locationIngredients.length > 0,
        hasIngredients: visibleIngredients.length > 0,
        navigation,
        selectedFilter,
        selectedLocation,
        setSelectedFilter,
    };
}
