import { useState } from 'react';

import { RecipeStructuredFilters } from '@/features/recipes/domain/RecipeModels';
import {
    RECIPE_AVAILABILITY_FILTERS,
    RECIPE_CATEGORIES,
    RECIPE_TIME_FILTERS,
    useRecipeStore,
} from '@/features/recipes/presentation/stores/useRecipeStore';
import { useRecipeNavigation } from '@/features/recipes/presentation/hooks/useRecipeNavigation';

export function useRecipeFiltersScreen() {
    const currentFilters = useRecipeStore((state) => state.structuredFilters);
    const setStructuredFilters = useRecipeStore((state) => state.setStructuredFilters);
    const clearStructuredFilters = useRecipeStore((state) => state.clearStructuredFilters);
    const navigation = useRecipeNavigation();
    const [draftFilters, setDraftFilters] = useState<RecipeStructuredFilters>(currentFilters);

    function updateDraft(filters: RecipeStructuredFilters) {
        setDraftFilters((current) => ({ ...current, ...filters }));
    }

    function handleApply() {
        setStructuredFilters(draftFilters);
        navigation.goCatalog();
    }

    function handleClear() {
        setDraftFilters({});
        clearStructuredFilters();
    }

    return {
        availabilityFilters: RECIPE_AVAILABILITY_FILTERS,
        categories: RECIPE_CATEGORIES,
        draftFilters,
        handleApply,
        handleClear,
        navigation,
        timeFilters: RECIPE_TIME_FILTERS,
        updateDraft,
    };
}
