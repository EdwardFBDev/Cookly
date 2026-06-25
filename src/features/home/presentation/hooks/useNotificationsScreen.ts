import { getHomeNotifications } from '@/features/home/application/homeContent';
import { useHomeNavigation } from '@/features/home/presentation/hooks/useHomeNavigation';

export function useNotificationsScreen() {
    const navigation = useHomeNavigation();

    function handleViewRecipe() {
        navigation.goRecipes();
    }

    return {
        handleViewRecipe,
        navigation,
        notifications: getHomeNotifications(),
    };
}
