import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { RecipeIngredient, RecipeStep } from '@/features/recipes/domain/RecipeModels';
import { useRecipeDetailScreen } from '@/features/recipes/presentation/hooks/useRecipeDetailScreen';

export function RecipeDetailScreen() {
    const screen = useRecipeDetailScreen();
    const { navigation, recipe } = screen;

    if (!recipe) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar style="light" />
                <View style={styles.missingState}>
                    <Text style={styles.missingTitle}>Recipe not found</Text>
                    <Text style={styles.missingText}>
                        This recipe may have been moved or removed from the local catalog.
                    </Text>
                    <Pressable
                        accessibilityRole="button"
                        onPress={navigation.goCatalog}
                        style={styles.primaryButton}
                    >
                        <Text style={styles.primaryButtonText}>Back to Catalog</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.topBar}>
                    <Pressable accessibilityRole="button" onPress={navigation.goBack} style={styles.iconButton}>
                        <Text style={styles.iconText}>{'<'}</Text>
                    </Pressable>
                    <Pressable accessibilityRole="button" onPress={navigation.goCatalog}>
                        <Text style={styles.catalogText}>Casa</Text>
                    </Pressable>
                    <View style={styles.topActions}>
                        <Pressable
                            accessibilityRole="button"
                            onPress={() => navigation.showEditRecipe(recipe.title)}
                        >
                            <Text style={styles.smallAction}>Edit</Text>
                        </Pressable>
                        <Pressable
                            accessibilityRole="button"
                            onPress={() => navigation.showShareRecipe(recipe.title)}
                        >
                            <Text style={styles.smallAction}>Share</Text>
                        </Pressable>
                    </View>
                </View>

                <ImageBackground
                    imageStyle={styles.heroImage}
                    source={{ uri: recipe.imageUrl }}
                    style={[styles.hero, { backgroundColor: recipe.accentColor }]}
                >
                    <View style={styles.heroScrim} />
                    <View style={styles.compatibilityBadge}>
                        <Text style={styles.compatibilityText}>{recipe.compatibility}% Compatible</Text>
                    </View>
                </ImageBackground>

                <View style={styles.summaryCard}>
                    <Text style={styles.title}>{recipe.title}</Text>
                    <View style={styles.metaRow}>
                        <Text style={styles.metaText}>{recipe.cookTimeMinutes} min</Text>
                        <Text style={styles.metaText}>{recipe.servings} servings</Text>
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Ingredients</Text>
                    <Text style={styles.sectionMeta}>
                        {recipe.ingredients.length - recipe.missingIngredientCount} / {recipe.ingredients.length}{' '}
                        Available
                    </Text>
                </View>
                <View style={styles.ingredientList}>
                    {recipe.ingredients.map((ingredient) => (
                        <IngredientRow ingredient={ingredient} key={ingredient.id} />
                    ))}
                </View>

                {recipe.missingIngredientCount > 0 ? (
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => navigation.showAddToShoppingList(recipe.title)}
                        style={styles.outlineButton}
                    >
                        <Text style={styles.outlineButtonText}>Add Missing to Shopping List</Text>
                    </Pressable>
                ) : null}

                <Text style={styles.sectionTitle}>Preparation Steps</Text>
                <View style={styles.stepList}>
                    {recipe.steps.map((step, index) => (
                        <PreparationStep index={index} key={step.id} step={step} />
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable
                    accessibilityRole="button"
                    onPress={() => navigation.showCookMode(recipe.title)}
                    style={styles.cookButton}
                >
                    <Text style={styles.cookButtonText}>Cook Recipe</Text>
                </Pressable>
                <Pressable
                    accessibilityRole="button"
                    onPress={() => screen.toggleFavorite(recipe.id)}
                    style={styles.saveButton}
                >
                    <Text style={styles.saveButtonText}>{recipe.isFavorite ? '*' : '+'}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

type IngredientRowProps = {
    ingredient: RecipeIngredient;
};

function IngredientRow({ ingredient }: IngredientRowProps) {
    const isMissing = ingredient.availability === 'missing';

    return (
        <View style={[styles.ingredientRow, isMissing ? styles.missingIngredientRow : null]}>
            <Text style={[styles.ingredientStatus, isMissing ? styles.missingStatus : null]}>
                {isMissing ? 'x' : 'ok'}
            </Text>
            <Text style={styles.ingredientName}>{ingredient.name}</Text>
            <Text style={[styles.ingredientQuantity, isMissing ? styles.missingQuantity : null]}>
                {ingredient.quantityLabel}
            </Text>
        </View>
    );
}

type PreparationStepProps = {
    index: number;
    step: RecipeStep;
};

function PreparationStep({ index, step }: PreparationStepProps) {
    return (
        <View style={styles.stepRow}>
            <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.stepBody}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
        flex: 1,
    },
    content: {
        gap: spacing.md,
        padding: spacing.md,
        paddingBottom: 96,
    },
    topBar: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.sm,
    },
    iconButton: {
        alignItems: 'center',
        height: 28,
        justifyContent: 'center',
        width: 28,
    },
    iconText: {
        color: colors.primary,
        fontSize: typography.body,
        fontWeight: '900',
    },
    catalogText: {
        color: colors.primary,
        flex: 1,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    topActions: {
        flex: 1,
        flexDirection: 'row',
        gap: spacing.md,
        justifyContent: 'flex-end',
    },
    smallAction: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    hero: {
        borderRadius: radius.md,
        height: 230,
        overflow: 'hidden',
    },
    heroImage: {
        borderRadius: radius.md,
    },
    heroScrim: {
        backgroundColor: colors.black,
        bottom: 0,
        left: 0,
        opacity: 0.08,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    compatibilityBadge: {
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        bottom: spacing.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        position: 'absolute',
        right: spacing.sm,
    },
    compatibilityText: {
        color: colors.inputBackground,
        fontSize: 10,
        fontWeight: '900',
    },
    summaryCard: {
        backgroundColor: colors.backgroundElevated,
        borderRadius: radius.md,
        gap: spacing.sm,
        marginTop: -48,
        padding: spacing.md,
        width: '72%',
    },
    title: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    metaRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    metaText: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '800',
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
    sectionMeta: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '800',
    },
    ingredientList: {
        gap: spacing.sm,
    },
    ingredientRow: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderRadius: radius.sm,
        flexDirection: 'row',
        gap: spacing.sm,
        padding: spacing.md,
    },
    missingIngredientRow: {
        backgroundColor: '#352427',
    },
    ingredientStatus: {
        color: '#52C96F',
        fontSize: typography.caption,
        fontWeight: '900',
    },
    missingStatus: {
        color: '#DD6666',
    },
    ingredientName: {
        color: colors.text,
        flex: 1,
        fontSize: typography.caption,
        fontWeight: '800',
    },
    ingredientQuantity: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '800',
    },
    missingQuantity: {
        color: '#ECA0A0',
    },
    outlineButton: {
        alignItems: 'center',
        borderColor: colors.primary,
        borderRadius: radius.sm,
        borderWidth: 1,
        padding: spacing.md,
    },
    outlineButtonText: {
        color: colors.primary,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    stepList: {
        gap: spacing.md,
    },
    stepRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    stepNumber: {
        alignItems: 'center',
        borderColor: colors.primary,
        borderRadius: radius.pill,
        borderWidth: 1,
        height: 24,
        justifyContent: 'center',
        width: 24,
    },
    stepNumberText: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '900',
    },
    stepBody: {
        flex: 1,
        gap: spacing.xs,
    },
    stepTitle: {
        color: colors.text,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    stepDescription: {
        color: colors.textMuted,
        fontSize: 11,
        lineHeight: 16,
    },
    footer: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        bottom: 0,
        flexDirection: 'row',
        gap: spacing.md,
        left: 0,
        padding: spacing.md,
        position: 'absolute',
        right: 0,
    },
    cookButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
        flex: 1,
        height: 48,
        justifyContent: 'center',
    },
    cookButtonText: {
        color: colors.inputBackground,
        fontSize: typography.caption,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    saveButton: {
        alignItems: 'center',
        backgroundColor: colors.backgroundMuted,
        borderRadius: radius.sm,
        height: 48,
        justifyContent: 'center',
        width: 48,
    },
    saveButtonText: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    missingState: {
        alignItems: 'center',
        flex: 1,
        gap: spacing.md,
        justifyContent: 'center',
        padding: spacing.lg,
    },
    missingTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    missingText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        textAlign: 'center',
    },
    primaryButton: {
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    primaryButtonText: {
        color: colors.inputBackground,
        fontSize: typography.caption,
        fontWeight: '900',
    },
});
