import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert } from 'react-native';

import {
    getShoppingCategorySummaries,
    getShoppingContent,
    SHOPPING_CATEGORY_ORDER,
} from '@/features/shopping/application/shoppingContent';
import {
    ShoppingCategoryGroup,
    ShoppingItem,
    ShoppingScreenMode,
} from '@/features/shopping/domain/ShoppingModels';
import { useRecipeStore } from '@/features/recipes/presentation/stores/useRecipeStore';

export function useShoppingScreen() {
    const router = useRouter();
    const recipes = useRecipeStore((state) => state.recipes);
    const content = getShoppingContent();
    const [mode, setMode] = useState<ShoppingScreenMode>(content.items.length > 0 ? 'summary' : 'empty');
    const [listItems, setListItems] = useState<ShoppingItem[]>(() => createInitialListItems(content.items));

    const categorySummaries = getShoppingCategorySummaries(content.items);
    const recipeSummaries = content.influencingRecipes.map((influencingRecipe) => ({
        ...influencingRecipe,
        recipe: recipes.find((recipe) => recipe.id === influencingRecipe.recipeId),
    }));

    const groups: ShoppingCategoryGroup[] = useMemo(
        () =>
            SHOPPING_CATEGORY_ORDER.map((category) => ({
                category: category.key,
                label: category.label,
                icon: category.icon,
                count: listItems.filter((item) => item.category === category.key).length,
                items: listItems.filter((item) => item.category === category.key),
            })).filter((group) => group.items.length > 0),
        [listItems],
    );

    const inCartCount = listItems.filter((item) => item.status === 'in-cart').length;

    function showFutureRoute(routeName: string) {
        // TODO: Replace placeholder feedback when shopping detail, profile, and sync flows exist.
        Alert.alert('Coming soon', `${routeName} will be connected in a future task.`);
    }

    return {
        assistantDescription: content.assistantDescription,
        assistantTitle: content.assistantTitle,
        categorySummaries,
        confirmCreateList: () => setMode(listItems.length > 0 ? 'list' : 'empty'),
        goHome: () => router.push('/home'),
        goInventory: () => router.push('/inventory'),
        goPlan: () => router.push('/plan'),
        goRecipeDetail: (recipeId: string) => router.push(`/recipes/${recipeId}`),
        goRecipes: () => router.push('/recipes'),
        goShopping: () => router.push('/shopping'),
        groups,
        inCartCount,
        itemCount: content.items.length,
        items: content.items,
        locationName: content.locationName,
        mode,
        plannedMealCount: content.plannedMealCount,
        recipeSummaries,
        showItemDetail: (itemName: string) => showFutureRoute(`${itemName} shopping details`),
        showNotifications: () => showFutureRoute('Shopping notifications'),
        showProfile: () => showFutureRoute('Profile'),
        syncInventory: () => showFutureRoute('Inventory update'),
        summaryDescription: content.summaryDescription,
        summaryTitle: content.summaryTitle,
    };
}

function createInitialListItems(items: ShoppingItem[]): ShoppingItem[] {
    return items.map((item, index) => ({
        ...item,
        status: index === items.length - 1 ? 'in-cart' : item.status,
    }));
}
