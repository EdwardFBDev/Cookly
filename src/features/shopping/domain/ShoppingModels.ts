import { Recipe } from '@/features/recipes/domain/RecipeModels';

export type ShoppingScreenMode = 'summary' | 'list' | 'empty';

export type ShoppingCategory = 'meat' | 'vegetables' | 'dairy' | 'grains';

export type ShoppingItemStatus = 'missing' | 'in-cart';

export type ShoppingItem = {
    id: string;
    name: string;
    quantityLabel: string;
    category: ShoppingCategory;
    sourceRecipeIds: string[];
    status: ShoppingItemStatus;
};

export type ShoppingCategorySummary = {
    category: ShoppingCategory;
    label: string;
    icon: string;
    count: number;
};

export type ShoppingInfluencingRecipe = {
    recipeId: string;
    missingCount: number;
};

export type ShoppingContent = {
    locationName: string;
    plannedMealCount: number;
    summaryTitle: string;
    summaryDescription: string;
    assistantTitle: string;
    assistantDescription: string;
    items: ShoppingItem[];
    influencingRecipes: ShoppingInfluencingRecipe[];
};

export type ShoppingRecipeSummary = ShoppingInfluencingRecipe & {
    recipe?: Recipe;
};

export type ShoppingCategoryGroup = ShoppingCategorySummary & {
    items: ShoppingItem[];
};
