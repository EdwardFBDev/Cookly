import { useRouter } from 'expo-router';
import { useState } from 'react';

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

type AddIngredientForm = {
    name: string;
    quantity: string;
    unit: IngredientUnit;
    category: IngredientCategory;
    location: InventoryLocation;
    storageArea: string;
    expirationDate: string;
};

const INITIAL_FORM: AddIngredientForm = {
    name: '',
    quantity: '',
    unit: 'Grams (g)',
    category: 'meat',
    location: 'Casa',
    storageArea: 'Refrigerator',
    expirationDate: '',
};

export function useAddIngredientScreen() {
    const [form, setForm] = useState<AddIngredientForm>(INITIAL_FORM);
    const [error, setError] = useState('');
    const addIngredient = useInventoryStore((state) => state.addIngredient);
    const locations = useInventoryStore((state) => state.locations);
    const navigation = useInventoryNavigation();
    const router = useRouter();

    function updateForm<Key extends keyof AddIngredientForm>(key: Key, value: AddIngredientForm[Key]) {
        setError('');
        setForm((currentForm) => ({ ...currentForm, [key]: value }));
    }

    function handleSave() {
        const quantity = Number(form.quantity);
        const name = form.name.trim();
        const storageArea = form.storageArea.trim() || 'Pantry';
        const expirationDate = form.expirationDate.trim();

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

        const ingredient = addIngredient({
            name,
            quantity,
            unit: form.unit,
            category: form.category,
            location: form.location,
            storageArea,
            expirationDate: expirationDate || undefined,
        });

        router.replace(`/inventory/${ingredient.id}`);
    }

    return {
        categories: INVENTORY_CATEGORIES,
        error,
        form,
        handleSave,
        locations: locations.map((location) => location.name),
        navigation,
        units: INVENTORY_UNITS,
        updateForm,
    };
}
