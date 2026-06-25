import { useLocalSearchParams } from 'expo-router';

import { EditIngredientScreen } from '@/features/inventory/presentation/screens/EditIngredientScreen';

export default function EditIngredientRoute() {
    const { ingredientId } = useLocalSearchParams<{ ingredientId: string }>();

    return <EditIngredientScreen ingredientId={ingredientId ?? ''} />;
}
