import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

export function usePlanningNavigation() {
    const router = useRouter();

    function showFutureRoute(routeName: string) {
        // TODO: Replace placeholder feedback when the target planning integration exists.
        Alert.alert('Coming soon', `${routeName} will be connected in a future task.`);
    }

    return {
        goHome: () => router.push('/home'),
        goInventory: () => router.push('/inventory'),
        goPlan: () => router.push('/plan'),
        goPlanningEmpty: () => router.push('/plan/empty'),
        goRecipeDetail: (recipeId: string) => router.push(`/recipes/${recipeId}`),
        goRecipes: () => router.push('/recipes'),
        goShopping: () => router.push('/shopping'),
        showBenefit: (benefitName: string) => showFutureRoute(benefitName),
        showGenerateList: () => router.push('/shopping'),
        showNotifications: () => showFutureRoute('Planning notifications'),
        showProfile: () => showFutureRoute('Profile'),
    };
}
