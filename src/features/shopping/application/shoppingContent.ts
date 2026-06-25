import {
    ShoppingCategory,
    ShoppingCategorySummary,
    ShoppingContent,
    ShoppingItem,
} from '@/features/shopping/domain/ShoppingModels';

export const SHOPPING_CATEGORY_ORDER: { key: ShoppingCategory; label: string; icon: string }[] = [
    { key: 'meat', label: 'Meat', icon: 'M' },
    { key: 'vegetables', label: 'Veg', icon: 'V' },
    { key: 'dairy', label: 'Dairy', icon: 'D' },
    { key: 'grains', label: 'Grains', icon: 'G' },
];

const SHOPPING_ITEMS: ShoppingItem[] = [
    {
        id: 'cremini-mushrooms',
        name: 'Cremini Mushrooms',
        quantityLabel: '500g',
        category: 'vegetables',
        sourceRecipeIds: ['creamy-mushroom-pasta'],
        status: 'missing',
    },
    {
        id: 'heavy-cream',
        name: 'Heavy Cream',
        quantityLabel: '250ml',
        category: 'dairy',
        sourceRecipeIds: ['creamy-mushroom-pasta'],
        status: 'missing',
    },
    {
        id: 'fresh-salmon-fillets',
        name: 'Fresh Salmon Fillets',
        quantityLabel: '2 units',
        category: 'meat',
        sourceRecipeIds: ['honey-glazed-salmon'],
        status: 'missing',
    },
    {
        id: 'fresh-parsley',
        name: 'Fresh Parsley',
        quantityLabel: '1 bunch',
        category: 'vegetables',
        sourceRecipeIds: ['creamy-mushroom-pasta'],
        status: 'missing',
    },
    {
        id: 'shallots',
        name: 'Shallots',
        quantityLabel: '3 units',
        category: 'vegetables',
        sourceRecipeIds: ['creamy-mushroom-pasta', 'honey-glazed-salmon'],
        status: 'missing',
    },
    {
        id: 'pappardelle-pasta',
        name: 'Pappardelle Pasta',
        quantityLabel: '250g',
        category: 'grains',
        sourceRecipeIds: ['creamy-mushroom-pasta'],
        status: 'missing',
    },
    {
        id: 'asparagus',
        name: 'Asparagus',
        quantityLabel: '1 bunch',
        category: 'vegetables',
        sourceRecipeIds: ['honey-glazed-salmon'],
        status: 'missing',
    },
    {
        id: 'milk',
        name: 'Milk',
        quantityLabel: '1.5L',
        category: 'dairy',
        sourceRecipeIds: ['creamy-mushroom-pasta'],
        status: 'missing',
    },
];

export function getShoppingContent(): ShoppingContent {
    // TODO: Generate this content from meal-plan, recipe, inventory, and shopping repositories.
    return {
        locationName: 'Casa',
        plannedMealCount: 12,
        summaryTitle: 'Shopping Summary',
        summaryDescription: 'Review missing essentials before finalizing your list.',
        assistantTitle: 'Inventory Assistant',
        assistantDescription: 'Review items to update your pantry stock.',
        items: SHOPPING_ITEMS,
        influencingRecipes: [
            { recipeId: 'creamy-mushroom-pasta', missingCount: 3 },
            { recipeId: 'honey-glazed-salmon', missingCount: 2 },
        ],
    };
}

export function getShoppingCategorySummaries(items: ShoppingItem[]): ShoppingCategorySummary[] {
    return SHOPPING_CATEGORY_ORDER.map((category) => ({
        category: category.key,
        label: category.label,
        icon: category.icon,
        count: items.filter((item) => item.category === category.key).length,
    })).filter((summary) => summary.count > 0);
}
