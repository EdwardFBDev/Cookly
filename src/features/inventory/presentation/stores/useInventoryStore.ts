import { create } from 'zustand';

import {
    createInventoryIngredient,
    INVENTORY_LOCATIONS,
    getInitialInventory,
    updateInventoryIngredient,
} from '@/features/inventory/application/inventoryContent';
import {
    AddIngredientInput,
    InventoryFilter,
    InventoryIngredient,
    InventoryLocation,
    StorageLocation,
    UpdateIngredientInput,
} from '@/features/inventory/domain/InventoryModels';

type InventoryState = {
    ingredients: InventoryIngredient[];
    locations: StorageLocation[];
    selectedFilter: InventoryFilter;
    selectedLocation: InventoryLocation;
    addIngredient: (input: AddIngredientInput) => InventoryIngredient;
    addLocation: () => StorageLocation;
    deleteIngredient: (ingredientId: string) => void;
    deleteLocation: (locationId: InventoryLocation, relocationTargetId: InventoryLocation) => void;
    setSelectedFilter: (filter: InventoryFilter) => void;
    setSelectedLocation: (location: InventoryLocation) => void;
    updateIngredient: (ingredientId: string, input: UpdateIngredientInput) => InventoryIngredient | undefined;
};

export const useInventoryStore = create<InventoryState>((set) => ({
    ingredients: getInitialInventory(),
    locations: INVENTORY_LOCATIONS,
    selectedFilter: 'all',
    selectedLocation: 'Casa',
    addIngredient: (input) => {
        const ingredient = createInventoryIngredient(input);

        // TODO: Persist created inventory items through an inventory repository when it exists.
        set((state) => ({
            ingredients: [ingredient, ...state.ingredients],
            selectedLocation: ingredient.location,
        }));

        return ingredient;
    },
    addLocation: () => {
        const location = createLocalLocation();

        // TODO: Persist storage locations through an inventory repository when it exists.
        set((state) => ({
            locations: [...state.locations, location],
            selectedLocation: location.id,
        }));

        return location;
    },
    deleteIngredient: (ingredientId) => {
        // TODO: Persist ingredient deletion through an inventory repository when it exists.
        set((state) => ({
            ingredients: state.ingredients.filter((ingredient) => ingredient.id !== ingredientId),
        }));
    },
    deleteLocation: (locationId, relocationTargetId) => {
        // TODO: Replace local relocation with a transaction when the inventory repository exists.
        set((state) => {
            const remainingLocations = state.locations.filter((location) => location.id !== locationId);

            return {
                ingredients: state.ingredients.map((ingredient) =>
                    ingredient.location === locationId
                        ? { ...ingredient, location: relocationTargetId }
                        : ingredient,
                ),
                locations: remainingLocations,
                selectedLocation:
                    state.selectedLocation === locationId ? relocationTargetId : state.selectedLocation,
            };
        });
    },
    setSelectedFilter: (filter) => set({ selectedFilter: filter }),
    setSelectedLocation: (location) => set({ selectedLocation: location }),
    updateIngredient: (ingredientId, input) => {
        let updatedIngredient: InventoryIngredient | undefined;

        // TODO: Persist ingredient updates through an inventory repository when it exists.
        set((state) => ({
            ingredients: state.ingredients.map((ingredient) => {
                if (ingredient.id !== ingredientId) {
                    return ingredient;
                }

                updatedIngredient = updateInventoryIngredient(ingredient, input);
                return updatedIngredient;
            }),
            selectedLocation: input.location,
        }));

        return updatedIngredient;
    },
}));

function createLocalLocation(): StorageLocation {
    const locationName = `New Location ${Date.now().toString().slice(-4)}`;

    return {
        id: locationName,
        name: locationName,
    };
}
