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
        goFavorites: () => router.push('/recipes/favorites'),
        goFilters: () => router.push('/recipes/filters'),
        goInventory: () => router.push('/inventory'),
        goMyRecipes: () => router.push('/recipes/my'),
        goRecipeDetail: (recipeId: string) => router.push(`/recipes/${recipeId}`),
        showAddToShoppingList: (recipeName: string) =>
            showFutureRoute(`${recipeName} shopping list integration`),
        showCookMode: (recipeName: string) => showFutureRoute(`${recipeName} cooking mode`),
        showEditRecipe: (recipeName: string) => showFutureRoute(`${recipeName} editing`),
        showShareRecipe: (recipeName: string) => showFutureRoute(`${recipeName} sharing`),
    };
}
