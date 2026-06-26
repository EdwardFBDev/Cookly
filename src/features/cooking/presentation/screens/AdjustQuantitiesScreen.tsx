import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';
import { formatCookingQuantity } from '@/features/cooking/application/cookingContent';
import { CookingIngredient } from '@/features/cooking/domain/CookingModels';
import {
    CookingButton,
    CookingHeader,
    CookingNotice,
    CookingPreparingState,
    CookingProgress,
    CookingScreenShell,
    MissingCookingRecipeState,
} from '@/features/cooking/presentation/components/CookingFlowComponents';
import { useAdjustQuantitiesScreen } from '@/features/cooking/presentation/hooks/useAdjustQuantitiesScreen';
import { CooklyIcon } from '@/shared/presentation/components/CooklyUI';

export function AdjustQuantitiesScreen() {
    const screen = useAdjustQuantitiesScreen();
    const { navigation, recipe, session } = screen;

    if (!recipe) {
        return <MissingCookingRecipeState onRecipeCatalogPress={navigation.goRecipeCatalog} />;
    }

    if (!session) {
        return <CookingPreparingState />;
    }

    return (
        <CookingScreenShell
            footer={
                <View style={styles.footer}>
                    <CookingButton label="Back" onPress={navigation.goReviewIngredients} variant="outline" />
                    <CookingButton label="Final Review" onPress={navigation.goSuccess} />
                </View>
            }
        >
            <StatusBar style="light" />
            <CookingHeader onBackPress={navigation.goReviewIngredients} rightLabel="" title="Adjust Quantities" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <CookingProgress currentStep={2} label="Quantities" nextLabel="Success" />

                <Text style={styles.introText}>
                    Refine the quantities you actually used. We'll deduct these amounts from your Casa kitchen
                    inventory when you finish.
                </Text>

                <View style={styles.quantityList}>
                    {screen.selectedIngredients.map((ingredient) => (
                        <QuantityCard
                            ingredient={ingredient}
                            key={ingredient.id}
                            onDecrease={() => screen.adjustQuantity(ingredient.id, 'decrease')}
                            onIncrease={() => screen.adjustQuantity(ingredient.id, 'increase')}
                            recipeImageUrl={recipe.imageUrl}
                        />
                    ))}
                </View>

                {screen.selectedIngredients.length === 0 ? (
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyTitle}>No ingredients selected</Text>
                        <Text style={styles.emptyText}>Return to review and select at least one ingredient.</Text>
                    </View>
                ) : null}

                <CookingNotice
                    text="Changes will update your Casa inventory levels locally. Repository-backed sync is planned for a future task."
                    title="Reviewing inventory impact"
                />
            </ScrollView>
        </CookingScreenShell>
    );
}

type QuantityCardProps = {
    ingredient: CookingIngredient;
    onDecrease: () => void;
    onIncrease: () => void;
    recipeImageUrl: string;
};

function QuantityCard({ ingredient, onDecrease, onIncrease, recipeImageUrl }: QuantityCardProps) {
    return (
        <View style={styles.quantityCard}>
            <ImageBackground
                imageStyle={styles.ingredientImage}
                source={{ uri: recipeImageUrl }}
                style={styles.ingredientImageFrame}
            >
                <View style={styles.imageScrim} />
                <CooklyIcon name="inventory" size={typography.subtitle} />
            </ImageBackground>

            <View style={styles.ingredientBody}>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                <Text style={styles.ingredientMeta}>{ingredient.matchedInventoryStorageArea ?? 'Match pending'}</Text>
            </View>

            <View style={styles.stepper}>
                <Pressable accessibilityRole="button" onPress={onDecrease} style={styles.stepperButton}>
                    <Text style={styles.stepperText}>-</Text>
                </Pressable>
                <Text style={styles.quantityText}>
                    {formatCookingQuantity(ingredient.usedQuantity, ingredient.unitLabel)}
                </Text>
                <Pressable accessibilityRole="button" onPress={onIncrease} style={styles.stepperButton}>
                    <Text style={styles.stepperText}>+</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        gap: spacing.lg,
        padding: spacing.md,
        paddingBottom: 112,
    },
    introText: {
        color: colors.textMuted,
        fontSize: typography.body,
        lineHeight: 24,
    },
    quantityList: {
        gap: spacing.md,
    },
    quantityCard: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.md,
        borderWidth: 1,
        flexDirection: 'row',
        gap: spacing.md,
        minHeight: 76,
        padding: spacing.md,
    },
    ingredientImageFrame: {
        alignItems: 'center',
        borderRadius: radius.sm,
        height: 44,
        justifyContent: 'center',
        overflow: 'hidden',
        width: 44,
    },
    ingredientImage: {
        borderRadius: radius.sm,
    },
    imageScrim: {
        backgroundColor: colors.black,
        bottom: 0,
        left: 0,
        opacity: 0.45,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    ingredientBody: {
        flex: 1,
    },
    ingredientName: {
        color: colors.text,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    ingredientMeta: {
        color: colors.textMuted,
        fontSize: 11,
        fontWeight: '800',
        marginTop: 2,
    },
    stepper: {
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderColor: colors.borderMuted,
        borderRadius: radius.sm,
        borderWidth: 1,
        flexDirection: 'row',
        gap: spacing.sm,
        minWidth: 154,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
    },
    stepperButton: {
        alignItems: 'center',
        height: 28,
        justifyContent: 'center',
        width: 28,
    },
    stepperText: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    quantityText: {
        color: colors.primary,
        flex: 1,
        fontSize: typography.subtitle,
        fontWeight: '900',
        textAlign: 'center',
    },
    emptyCard: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderRadius: radius.md,
        gap: spacing.sm,
        padding: spacing.lg,
    },
    emptyTitle: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    emptyText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        textAlign: 'center',
    },
    footer: {
        backgroundColor: colors.background,
        borderTopColor: colors.borderMuted,
        borderTopWidth: 1,
        bottom: 0,
        flexDirection: 'row',
        gap: spacing.sm,
        left: 0,
        padding: spacing.md,
        position: 'absolute',
        right: 0,
    },
});
