import {
    DashboardMeal,
    DashboardSummary,
    HomeNotification,
    RecipeRecommendation,
} from '@/features/home/domain/HomeModels';

export function getDashboardSummary(): DashboardSummary {
    // TODO: Replace static content with inventory, meal plan, and shopping use cases.
    return {
        expiringSoonCount: 5,
        shoppingItemCount: 8,
        inventoryItemCount: 124,
        inventoryCapacityLabel: '78% Full',
    };
}

export function getDashboardMeals(): DashboardMeal[] {
    return [
        {
            id: 'breakfast-oatmeal',
            mealTime: 'Breakfast',
            title: 'Classic Oatmeal',
            status: 'All ingredients ready',
        },
        {
            id: 'lunch-quinoa',
            mealTime: 'Lunch',
            title: 'Quinoa Bowl',
            status: 'All ingredients ready',
        },
    ];
}

export function getHomeNotifications(): HomeNotification[] {
    return [
        {
            id: 'spinach-urgent',
            category: 'expiring',
            title: 'Spinach is urgent',
            description: 'Expired yesterday',
            isUrgent: true,
        },
        {
            id: 'milk-expiring',
            category: 'expiring',
            title: 'Milk expires in 2 days',
            description: 'Check inventory before next shop',
        },
        {
            id: 'roast-chicken',
            category: 'meal',
            title: 'Roast Chicken',
            description: 'Today, 7:00 PM',
            meta: 'Dinner',
        },
        {
            id: 'shopping-reminder',
            category: 'shopping',
            title: "Don't forget the 8 items on your Casa list",
            description: "Essential for this week's plan",
        },
    ];
}

export function getRecipeRecommendations(): RecipeRecommendation[] {
    return [
        {
            id: 'creamy-mushroom-pasta',
            title: 'Creamy Mushroom Pasta',
            cookTimeMinutes: 20,
            servings: 2,
            compatibility: 100,
            availabilityLabel: '100% Available',
            badge: '100% Match',
            isFavorite: true,
        },
        {
            id: 'honey-glazed-salmon',
            title: 'Honey Glazed Salmon',
            cookTimeMinutes: 25,
            servings: 2,
            compatibility: 92,
            availabilityLabel: '92% Compatibility',
            issue: 'Missing: Asparagus',
            isFavorite: false,
        },
        {
            id: 'classic-caesar-salad',
            title: 'Classic Caesar Salad',
            cookTimeMinutes: 10,
            servings: 1,
            compatibility: 65,
            availabilityLabel: 'Action Required',
            issue: 'Contains Expired: Romaine',
            isFavorite: false,
        },
    ];
}
