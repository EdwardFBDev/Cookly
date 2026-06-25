import { Alert } from 'react-native';

import { getRecipeRecommendations } from '@/features/home/application/homeContent';
import { useHomeNavigation } from '@/features/home/presentation/hooks/useHomeNavigation';

export function useRecommendationsScreen() {
    const navigation = useHomeNavigation();

    function handleToggleFavorite(recipeName: string) {
        // TODO: Persist favorites when the recipe repository exists.
        Alert.alert('Coming soon', `${recipeName} favorites will be saved in a future task.`);
    }

    return {
        handleToggleFavorite,
        navigation,
        recommendations: getRecipeRecommendations(),
    };
}
