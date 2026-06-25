import { Alert } from 'react-native';

import { useInventoryNavigation } from '@/features/inventory/presentation/hooks/useInventoryNavigation';
import { useInventoryStore } from '@/features/inventory/presentation/stores/useInventoryStore';

export function useInventoryEmptyScreen() {
    const selectedLocation = useInventoryStore((state) => state.selectedLocation);
    const navigation = useInventoryNavigation();

    function showLearnMore() {
        // TODO: Connect inventory onboarding content when educational screens are implemented.
        Alert.alert('Coming soon', 'Inventory guidance will be added in a future task.');
    }

    return {
        navigation,
        selectedLocation,
        showLearnMore,
    };
}
