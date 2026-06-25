import { useState } from 'react';
import { Alert } from 'react-native';

import { RecipeCategory } from '@/features/recipes/domain/RecipeModels';
import {
    RECIPE_CATEGORIES,
    useRecipeStore,
} from '@/features/recipes/presentation/stores/useRecipeStore';
import { useRecipeNavigation } from '@/features/recipes/presentation/hooks/useRecipeNavigation';

type CreateRecipeForm = {
    title: string;
    category: RecipeCategory;
    cookTimeMinutes: string;
    servings: string;
};

const INITIAL_FORM: CreateRecipeForm = {
    title: '',
    category: 'dinner',
    cookTimeMinutes: '30',
    servings: '4',
};

export function useCreateRecipeScreen() {
    const [form, setForm] = useState<CreateRecipeForm>(INITIAL_FORM);
    const [error, setError] = useState<string>();
    const addRecipe = useRecipeStore((state) => state.addRecipe);
    const navigation = useRecipeNavigation();

    function updateField<Key extends keyof CreateRecipeForm>(key: Key, value: CreateRecipeForm[Key]) {
        setForm((current) => ({ ...current, [key]: value }));
        setError(undefined);
    }

    function handleAddPhoto() {
        // TODO: Connect to image picker and recipe media storage when available.
        Alert.alert('Coming soon', 'Recipe photo upload will be connected in a future task.');
    }

    function handleSaveDraft() {
        // TODO: Persist recipe drafts separately when recipe draft storage exists.
        Alert.alert('Draft saved locally soon', 'Draft persistence will be connected in a future task.');
    }

    function handleSubmit() {
        const title = form.title.trim();
        const cookTimeMinutes = Number(form.cookTimeMinutes);
        const servings = Number(form.servings);

        if (!title) {
            setError('Recipe name is required.');
            return;
        }

        if (!Number.isFinite(cookTimeMinutes) || cookTimeMinutes <= 0) {
            setError('Time must be greater than 0 minutes.');
            return;
        }

        if (!Number.isFinite(servings) || servings <= 0) {
            setError('Servings must be greater than 0.');
            return;
        }

        const recipe = addRecipe({
            title,
            category: form.category,
            cookTimeMinutes,
            servings,
        });

        navigation.goRecipeDetail(recipe.id);
    }

    return {
        categories: RECIPE_CATEGORIES,
        error,
        form,
        handleAddPhoto,
        handleSaveDraft,
        handleSubmit,
        navigation,
        updateField,
    };
}
