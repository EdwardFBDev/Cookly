import { useState } from 'react';

import { InventoryLocation } from '@/features/inventory/domain/InventoryModels';
import { useInventoryNavigation } from '@/features/inventory/presentation/hooks/useInventoryNavigation';
import { useInventoryStore } from '@/features/inventory/presentation/stores/useInventoryStore';

export function useLocationManagementScreen() {
    const addLocation = useInventoryStore((state) => state.addLocation);
    const deleteLocation = useInventoryStore((state) => state.deleteLocation);
    const ingredients = useInventoryStore((state) => state.ingredients);
    const locations = useInventoryStore((state) => state.locations);
    const selectedLocation = useInventoryStore((state) => state.selectedLocation);
    const setSelectedLocation = useInventoryStore((state) => state.setSelectedLocation);
    const [deleteTarget, setDeleteTarget] = useState<InventoryLocation | undefined>();
    const [error, setError] = useState('');
    const navigation = useInventoryNavigation();

    const locationSummaries = locations.map((location) => ({
        ...location,
        itemCount: ingredients.filter((ingredient) => ingredient.location === location.id).length,
    }));
    const relocationTarget = locations.find((location) => location.id !== deleteTarget)?.id;
    const deleteTargetSummary = locationSummaries.find((location) => location.id === deleteTarget);

    function handleSelectLocation(locationId: InventoryLocation) {
        setSelectedLocation(locationId);
        navigation.goInventory();
    }

    function handleAddLocation() {
        addLocation();
        navigation.goInventory();
    }

    function requestDeleteLocation(locationId: InventoryLocation) {
        setError('');

        if (locations.length <= 1) {
            setError('At least one storage location is required.');
            return;
        }

        const itemCount = ingredients.filter((ingredient) => ingredient.location === locationId).length;

        if (itemCount === 0) {
            const nextLocation = locations.find((location) => location.id !== locationId);

            if (nextLocation) {
                deleteLocation(locationId, nextLocation.id);
            }

            return;
        }

        setDeleteTarget(locationId);
    }

    function completeLocationDelete() {
        if (!deleteTarget || !relocationTarget) {
            return;
        }

        deleteLocation(deleteTarget, relocationTarget);
        setDeleteTarget(undefined);
    }

    return {
        cancelDelete: () => setDeleteTarget(undefined),
        completeLocationDelete,
        deleteTargetSummary,
        error,
        handleAddLocation,
        handleSelectLocation,
        locationSummaries,
        navigation,
        relocationTarget,
        requestDeleteLocation,
        selectedLocation,
    };
}
