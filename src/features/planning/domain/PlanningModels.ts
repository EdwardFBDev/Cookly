import { Recipe } from '@/features/recipes/domain/RecipeModels';

export type PlanningMealTime = 'breakfast' | 'lunch' | 'dinner';

export type PlanningMealStatus = 'empty' | 'in-stock' | 'missing';

export type PlanningDay = {
    id: string;
    weekday: string;
    dayNumber: string;
    isSelected: boolean;
};

export type PlanningMealSlot = {
    id: string;
    mealTime: PlanningMealTime;
    label: string;
    icon: string;
    recipeId?: string;
    status: PlanningMealStatus;
    statusLabel: string;
};

export type WeeklyPlanningContent = {
    locationName: string;
    title: string;
    weekRange: string;
    days: PlanningDay[];
    mealSlots: PlanningMealSlot[];
};

export type WeeklyPlanningMeal = PlanningMealSlot & {
    recipe?: Recipe;
};

export type WeeklyPlanningSection = {
    mealTime: PlanningMealTime;
    label: string;
    icon: string;
    meals: WeeklyPlanningMeal[];
};
