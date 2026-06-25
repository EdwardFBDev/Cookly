import { usePlanningNavigation } from '@/features/planning/presentation/hooks/usePlanningNavigation';

export function usePlanningEmptyScreen() {
    const navigation = usePlanningNavigation();

    return {
        navigation,
        showAutoShopping: () => navigation.showBenefit('Auto-Shopping'),
        showZeroWaste: () => navigation.showBenefit('Zero Waste'),
    };
}
