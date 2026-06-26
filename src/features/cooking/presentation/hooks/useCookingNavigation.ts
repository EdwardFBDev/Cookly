import { useRouter } from 'expo-router';

export function useCookingNavigation(recipeId?: string) {
    const router = useRouter();

    return {
        goAdjustQuantities: () => {
            if (recipeId) {
                router.push(`/cooking/${recipeId}/quantities`);
            }
        },
        goBack: () => router.back(),
        goHome: () => router.push('/home'),
        goInventory: () => router.push('/inventory'),
        goRecipeCatalog: () => router.push('/recipes'),
        goReviewIngredients: () => {
            if (recipeId) {
                router.push(`/cooking/${recipeId}/review`);
            }
        },
        goSuccess: () => {
            if (recipeId) {
                router.push(`/cooking/${recipeId}/success`);
            }
        },
    };
}
