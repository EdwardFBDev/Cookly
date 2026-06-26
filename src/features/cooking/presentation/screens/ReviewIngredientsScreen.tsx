import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';
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
import { useReviewIngredientsScreen } from '@/features/cooking/presentation/hooks/useReviewIngredientsScreen';
import { CooklyIcon } from '@/shared/presentation/components/CooklyUI';

export function ReviewIngredientsScreen() {
    const screen = useReviewIngredientsScreen();
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
                    <CookingButton
                        disabled={!screen.canContinue}
                        label="Continue to Quantities"
                        onPress={navigation.goAdjustQuantities}
                    />
                    <Text style={styles.footerText}>Step 1 of 3 · Cooking Setup</Text>
                </View>
            }
        >
            <StatusBar style="light" />
            <CookingHeader onBackPress={navigation.goBack} rightLabel="Next: Quantities" title="Review Ingredients" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <CookingProgress currentStep={1} label="Review" nextLabel="Quantities" />

                <ImageBackground
                    imageStyle={styles.heroImage}
                    source={{ uri: recipe.imageUrl }}
                    style={[styles.hero, { backgroundColor: recipe.accentColor }]}
                >
                    <View style={styles.heroScrim} />
                    <View style={styles.heroTextGroup}>
                        <Text style={styles.heroTitle}>{recipe.title}</Text>
                        <Text style={styles.heroMeta}>
                            {recipe.servings} servings - {recipe.cookTimeMinutes} min
                        </Text>
                    </View>
                </ImageBackground>

                <Text style={styles.introText}>
                    Verify the ingredients you're using. Once confirmed, selected quantities can be
                    deducted from your kitchen inventory.
                </Text>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Review Ingredients</Text>
                    <Pressable accessibilityRole="button" onPress={screen.selectAllIngredients}>
                        <Text style={styles.selectAllText}>Select All</Text>
                    </Pressable>
                </View>

                <View style={styles.ingredientList}>
                    {session.ingredients.map((ingredient) => (
                        <IngredientReviewCard
                            ingredient={ingredient}
                            key={ingredient.id}
                            onPress={() => screen.toggleIngredient(ingredient.id)}
                        />
                    ))}
                </View>

                <CookingNotice
                    text="Unchecking an item means you are sourcing it elsewhere and it will not be deducted from Cookly."
                    title="Inventory data is updated locally"
                />
            </ScrollView>
        </CookingScreenShell>
    );
}

type IngredientReviewCardProps = {
    ingredient: CookingIngredient;
    onPress: () => void;
};

function IngredientReviewCard({ ingredient, onPress }: IngredientReviewCardProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Toggle ${ingredient.name}`}
            onPress={onPress}
            style={[styles.ingredientCard, ingredient.isSelected ? styles.ingredientCardSelected : null]}
        >
            <View style={[styles.checkbox, ingredient.isSelected ? styles.checkboxSelected : null]}>
                {ingredient.isSelected ? (
                    <CooklyIcon color={colors.inputBackground} name="check" size={12} />
                ) : null}
            </View>
            <View style={styles.ingredientBody}>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                <Text style={styles.ingredientMeta}>{getInventoryMeta(ingredient)}</Text>
                {!ingredient.isAvailable ? <Text style={styles.warningText}>Missing from recipe inventory</Text> : null}
            </View>
            <View style={styles.quantityGroup}>
                <Text style={styles.quantityText}>{ingredient.quantityLabel}</Text>
                <Text style={styles.availableText}>{getAvailableLabel(ingredient)}</Text>
            </View>
        </Pressable>
    );
}

function getInventoryMeta(ingredient: CookingIngredient): string {
    if (!ingredient.matchedInventoryIngredientId) {
        return 'Inventory match pending';
    }

    return `${ingredient.matchedInventoryLocation} - ${ingredient.matchedInventoryStorageArea}`;
}

function getAvailableLabel(ingredient: CookingIngredient): string {
    if (ingredient.matchedInventoryQuantity === undefined || !ingredient.unitLabel) {
        return ingredient.isAvailable ? 'Available' : 'Unavailable';
    }

    return `Available: ${ingredient.matchedInventoryQuantity}${ingredient.unitLabel}`;
}

const styles = StyleSheet.create({
    content: {
        gap: spacing.md,
        padding: spacing.md,
        paddingBottom: 122,
    },
    hero: {
        borderRadius: radius.md,
        height: 156,
        justifyContent: 'flex-end',
        overflow: 'hidden',
        padding: spacing.md,
    },
    heroImage: {
        borderRadius: radius.md,
    },
    heroScrim: {
        backgroundColor: colors.black,
        bottom: 0,
        left: 0,
        opacity: 0.34,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    heroTextGroup: {
        gap: spacing.xs,
    },
    heroTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    heroMeta: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: '900',
    },
    introText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        lineHeight: 20,
    },
    sectionHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    selectAllText: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: '900',
    },
    ingredientList: {
        gap: spacing.sm,
    },
    ingredientCard: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.md,
        borderWidth: 1,
        flexDirection: 'row',
        gap: spacing.sm,
        minHeight: 72,
        padding: spacing.md,
    },
    ingredientCardSelected: {
        borderColor: colors.border,
    },
    checkbox: {
        alignItems: 'center',
        borderColor: colors.primary,
        borderRadius: radius.sm,
        borderWidth: 1,
        height: 22,
        justifyContent: 'center',
        width: 22,
    },
    checkboxSelected: {
        backgroundColor: colors.primary,
    },
    ingredientBody: {
        flex: 1,
        gap: 2,
    },
    ingredientName: {
        color: colors.text,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    ingredientMeta: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '700',
    },
    warningText: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '900',
    },
    quantityGroup: {
        alignItems: 'flex-end',
        gap: spacing.xs,
    },
    quantityText: {
        color: colors.primary,
        fontSize: typography.label,
        fontWeight: '900',
    },
    availableText: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '700',
    },
    footer: {
        backgroundColor: colors.background,
        borderTopColor: colors.borderMuted,
        borderTopWidth: 1,
        bottom: 0,
        gap: spacing.sm,
        left: 0,
        padding: spacing.md,
        position: 'absolute',
        right: 0,
    },
    footerText: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '700',
        textAlign: 'center',
    },
});
