import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

export function useRecipeNavigation() {
    const router = useRouter();

    function showFutureRoute(routeName: string) {
        // TODO: Replace placeholder feedback when the target recipe flow exists.
        Alert.alert('Coming soon', `${routeName} will be connected in a future task.`);
    }

    return {
        goBack: () => router.back(),
        goCatalog: () => router.push('/recipes'),
        goCreateRecipe: () => router.push('/recipes/create'),
        goExpiringIngredients: () => router.push('/inventory/expiring'),
        goFavorites: () => router.push('/recipes/favorites'),
        goFilters: () => router.push('/recipes/filters'),
        goInventory: () => router.push('/inventory'),
        goLocationManagement: () => router.push('/inventory/locations'),
        goMyRecipes: () => router.push('/recipes/my'),
        goNotifications: () => router.push('/notifications'),
        goPlan: () => router.push('/plan'),
        goRecipeDetail: (recipeId: string) => router.push(`/recipes/${recipeId}`),
        goSearch: () => router.push('/search'),
        goSettings: () => router.push('/settings'),
        goCookingReview: (recipeId: string) => router.push(`/cooking/${recipeId}/review`),
        showAddToShoppingList: (recipeName: string) =>
            showFutureRoute(`${recipeName} shopping list integration`),
        showEditRecipe: (recipeName: string) => showFutureRoute(`${recipeName} editing`),
        showShareRecipe: (recipeName: string) => showFutureRoute(`${recipeName} sharing`),
    };
}
