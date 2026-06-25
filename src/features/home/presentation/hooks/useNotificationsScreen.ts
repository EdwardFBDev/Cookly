import { Alert } from 'react-native';

import { getHomeNotifications } from '@/features/home/application/homeContent';
import { useHomeNavigation } from '@/features/home/presentation/hooks/useHomeNavigation';

export function useNotificationsScreen() {
    const navigation = useHomeNavigation();

    function handleViewRecipe() {
        // TODO: Navigate to recipe details when recipe routes exist.
        Alert.alert('Coming soon', 'Recipe details will be connected in a future task.');
    }

    return {
        handleViewRecipe,
        navigation,
        notifications: getHomeNotifications(),
    };
}
