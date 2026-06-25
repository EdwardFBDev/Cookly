import {
    getDashboardMeals,
    getDashboardSummary,
} from '@/features/home/application/homeContent';
import { useHomeNavigation } from '@/features/home/presentation/hooks/useHomeNavigation';

export function useDashboardScreen() {
    const navigation = useHomeNavigation();

    return {
        meals: getDashboardMeals(),
        navigation,
        summary: getDashboardSummary(),
    };
}
