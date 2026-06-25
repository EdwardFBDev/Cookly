import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

export function useInventoryNavigation() {
    const router = useRouter();

    function showFutureRoute(routeName: string) {
        // TODO: Replace placeholder feedback when the target route exists.
        Alert.alert('Coming soon', `${routeName} will be connected in a future task.`);
    }

    return {
        goAddIngredient: () => router.push('/inventory/add'),
        goEditIngredient: (ingredientId: string) => router.push(`/inventory/${ingredientId}/edit`),
        goEmptyInventory: () => router.push('/inventory/empty'),
        goExpiringIngredients: () => router.push('/inventory/expiring'),
        goHome: () => router.push('/home'),
        goIngredientDetail: (ingredientId: string) => router.push(`/inventory/${ingredientId}`),
        goInventory: () => router.push('/inventory'),
        goLocationManagement: () => router.push('/inventory/locations'),
        goPlan: () => showFutureRoute('Meal planning'),
        goRecipes: () => router.push('/recommendations'),
        goShopping: () => showFutureRoute('Shopping list'),
        goBack: () => router.back(),
    };
}
