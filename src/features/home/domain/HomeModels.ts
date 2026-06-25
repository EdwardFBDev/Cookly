export type MealTime = 'Breakfast' | 'Lunch' | 'Dinner';

export type DashboardMeal = {
    id: string;
    mealTime: MealTime;
    title: string;
    status: string;
};

export type DashboardSummary = {
    expiringSoonCount: number;
    shoppingItemCount: number;
    inventoryItemCount: number;
    inventoryCapacityLabel: string;
};

export type HomeNotification = {
    id: string;
    category: 'expiring' | 'meal' | 'shopping';
    title: string;
    description: string;
    meta?: string;
    isUrgent?: boolean;
};

export type RecipeRecommendation = {
    id: string;
    title: string;
    cookTimeMinutes: number;
    servings: number;
    compatibility: number;
    availabilityLabel: string;
    badge?: string;
    issue?: string;
    isFavorite: boolean;
};
