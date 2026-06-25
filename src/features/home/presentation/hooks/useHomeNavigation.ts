import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

export function useHomeNavigation() {
    const router = useRouter();

    function showFutureRoute(routeName: string) {
        // TODO: Replace placeholder feedback when the target route exists.
        Alert.alert('Coming soon', `${routeName} will be connected in a future task.`);
    }

    return {
        goHome: () => router.push('/home'),
        goNotifications: () => router.push('/notifications'),
        goRecommendations: () => router.push('/recommendations'),
        goRecipes: () => router.push('/recipes'),
        goRecipeDetail: (recipeId: string) => router.push(`/recipes/${recipeId}`),
        goInventory: () => router.push('/inventory'),
        goPlan: () => showFutureRoute('Meal planning'),
        goShopping: () => showFutureRoute('Shopping list'),
    };
}
