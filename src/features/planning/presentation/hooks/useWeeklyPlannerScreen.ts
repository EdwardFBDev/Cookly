import {
    getWeeklyPlanningContent,
    PLANNING_SECTION_ORDER,
} from '@/features/planning/application/planningContent';
import { WeeklyPlanningSection } from '@/features/planning/domain/PlanningModels';
import { usePlanningNavigation } from '@/features/planning/presentation/hooks/usePlanningNavigation';
import { useRecipeStore } from '@/features/recipes/presentation/stores/useRecipeStore';

export function useWeeklyPlannerScreen() {
    const recipes = useRecipeStore((state) => state.recipes);
    const navigation = usePlanningNavigation();
    const content = getWeeklyPlanningContent();

    const sections: WeeklyPlanningSection[] = PLANNING_SECTION_ORDER.map((section) => ({
        mealTime: section.key,
        label: section.label,
        icon: section.icon,
        meals: content.mealSlots
            .filter((slot) => slot.mealTime === section.key)
            .map((slot) => ({
                ...slot,
                recipe: slot.recipeId
                    ? recipes.find((recipe) => recipe.id === slot.recipeId)
                    : undefined,
            })),
    }));

    return {
        days: content.days,
        locationName: content.locationName,
        navigation,
        sections,
        title: content.title,
        weekRange: content.weekRange,
    };
}
