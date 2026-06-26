import { useRouter } from 'expo-router';

export function useHomeNavigation() {
    const router = useRouter();

    function showFutureRoute(routeName: string) {
        // TODO: Replace this fallback when the target route receives an approved spec.
        router.push({ pathname: '/feature-in-progress', params: { title: routeName } });
    }

    return {
        goHome: () => router.push('/home'),
        goExpiringIngredients: () => router.push('/inventory/expiring'),
        goNotifications: () => router.push('/notifications'),
        goRecommendations: () => router.push('/recommendations'),
        goRecipes: () => router.push('/recipes'),
        goMyRecipes: () => router.push('/recipes/my'),
        goRecipeDetail: (recipeId: string) => router.push(`/recipes/${recipeId}`),
        goInventory: () => router.push('/inventory'),
        goLocationManagement: () => router.push('/inventory/locations'),
        goPlan: () => router.push('/plan'),
        goSettings: () => router.push('/settings'),
        goShopping: () => router.push('/shopping'),
        goFeatureInProgress: showFutureRoute,
    };
}
