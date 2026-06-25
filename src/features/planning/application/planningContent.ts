import {
    PlanningDay,
    PlanningMealSlot,
    PlanningMealTime,
    WeeklyPlanningContent,
} from '@/features/planning/domain/PlanningModels';

export const PLANNING_SECTION_ORDER: { key: PlanningMealTime; label: string; icon: string }[] = [
    { key: 'breakfast', label: 'Breakfast', icon: 'B' },
    { key: 'lunch', label: 'Lunch', icon: 'L' },
    { key: 'dinner', label: 'Dinner', icon: 'D' },
];

const PLANNING_DAYS: PlanningDay[] = [
    { id: 'mon-23', weekday: 'Mon', dayNumber: '23', isSelected: false },
    { id: 'tue-24', weekday: 'Tue', dayNumber: '24', isSelected: true },
    { id: 'wed-25', weekday: 'Wed', dayNumber: '25', isSelected: false },
    { id: 'thu-26', weekday: 'Thu', dayNumber: '26', isSelected: false },
    { id: 'fri-27', weekday: 'Fri', dayNumber: '27', isSelected: false },
    { id: 'sat-28', weekday: 'Sat', dayNumber: '28', isSelected: false },
];

const PLANNING_MEAL_SLOTS: PlanningMealSlot[] = [
    {
        id: 'breakfast-empty',
        mealTime: 'breakfast',
        label: 'Breakfast',
        icon: 'B',
        status: 'empty',
        statusLabel: 'No meal planned yet',
    },
    {
        id: 'lunch-creamy-mushroom-pasta',
        mealTime: 'lunch',
        label: 'Lunch',
        icon: 'L',
        recipeId: 'creamy-mushroom-pasta',
        status: 'in-stock',
        statusLabel: 'All ingredients in stock',
    },
    {
        id: 'dinner-honey-glazed-salmon',
        mealTime: 'dinner',
        label: 'Dinner',
        icon: 'D',
        recipeId: 'honey-glazed-salmon',
        status: 'missing',
        statusLabel: 'Missing 2 ingredients',
    },
];

export function getWeeklyPlanningContent(): WeeklyPlanningContent {
    // TODO: Load the selected household, week, and planned meals from a meal-plan repository.
    return {
        locationName: 'Casa',
        title: 'Weekly Plan',
        weekRange: 'Oct 23 - Oct 29',
        days: PLANNING_DAYS,
        mealSlots: PLANNING_MEAL_SLOTS,
    };
}
