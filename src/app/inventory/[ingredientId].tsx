import { useLocalSearchParams } from 'expo-router';

import { IngredientDetailScreen } from '@/features/inventory/presentation/screens/IngredientDetailScreen';

export default function IngredientDetailRoute() {
    const { ingredientId } = useLocalSearchParams<{ ingredientId: string }>();

    return <IngredientDetailScreen ingredientId={ingredientId ?? ''} />;
}
