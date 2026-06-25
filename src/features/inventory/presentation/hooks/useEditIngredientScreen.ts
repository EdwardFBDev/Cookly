import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';

import {
    INVENTORY_CATEGORIES,
    INVENTORY_UNITS,
} from '@/features/inventory/application/inventoryContent';
import {
    IngredientCategory,
    IngredientUnit,
    InventoryLocation,
} from '@/features/inventory/domain/InventoryModels';
import { useInventoryNavigation } from '@/features/inventory/presentation/hooks/useInventoryNavigation';
import { useInventoryStore } from '@/features/inventory/presentation/stores/useInventoryStore';

type EditIngredientForm = {
    name: string;
    quantity: string;
    unit: IngredientUnit;
    category: IngredientCategory;
    location: InventoryLocation;
    storageArea: string;
    expirationDate: string;
};

export function useEditIngredientScreen(ingredientId: string) {
    const ingredient = useInventoryStore((state) =>
        state.ingredients.find((item) => item.id === ingredientId),
    );
    const deleteIngredient = useInventoryStore((state) => state.deleteIngredient);
    const locations = useInventoryStore((state) => state.locations);
    const updateIngredient = useInventoryStore((state) => state.updateIngredient);
    const navigation = useInventoryNavigation();
    const router = useRouter();
    const initialForm = useMemo<EditIngredientForm>(
        () => ({
            name: ingredient?.name ?? '',
            quantity: ingredient ? String(ingredient.quantity) : '',
            unit: ingredient?.unit ?? 'Grams (g)',
            category: ingredient?.category ?? 'meat',
            location: ingredient?.location ?? 'Casa',
            storageArea: ingredient?.storageArea ?? '',
            expirationDate: ingredient?.expirationDate ?? '',
        }),
        [ingredient],
    );
    const [form, setForm] = useState<EditIngredientForm>(initialForm);
    const [error, setError] = useState('');

    function updateForm<Key extends keyof EditIngredientForm>(key: Key, value: EditIngredientForm[Key]) {
        setError('');
        setForm((currentForm) => ({ ...currentForm, [key]: value }));
    }

    function handleUpdate() {
        const quantity = Number(form.quantity);
        const name = form.name.trim();
        const storageArea = form.storageArea.trim() || 'Pantry';
        const expirationDate = form.expirationDate.trim();

        if (!ingredient) {
            setError('Ingredient could not be loaded.');
            return;
        }

        if (!name) {
            setError('Ingredient name is required.');
            return;
        }

        if (!Number.isFinite(quantity) || quantity < 0) {
            setError('Quantity must be zero or greater.');
            return;
        }

        if (expirationDate && !/^\d{4}-\d{2}-\d{2}$/.test(expirationDate)) {
            setError('Expiration date must use YYYY-MM-DD format.');
            return;
        }

        const updatedIngredient = updateIngredient(ingredient.id, {
            name,
            quantity,
            unit: form.unit,
            category: form.category,
            location: form.location,
            storageArea,
            expirationDate: expirationDate || undefined,
        });

        if (updatedIngredient) {
            router.replace(`/inventory/${updatedIngredient.id}`);
        }
    }

    function handleDelete() {
        if (!ingredient) {
            return;
        }

        deleteIngredient(ingredient.id);
        router.replace('/inventory');
    }

    return {
        categories: INVENTORY_CATEGORIES,
        error,
        form,
        handleDelete,
        handleUpdate,
        ingredient,
        locations: locations.map((location) => location.name),
        navigation,
        units: INVENTORY_UNITS,
        updateForm,
    };
}
