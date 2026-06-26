import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';
import { Recipe } from '@/features/recipes/domain/RecipeModels';
import { CooklyIcon } from '@/shared/presentation/components/CooklyUI';

type RecipeCardProps = {
    recipe: Recipe;
    onPress: () => void;
    onFavoritePress?: () => void;
    showEditableBadge?: boolean;
};

export function RecipeCard({
    onFavoritePress,
    onPress,
    recipe,
    showEditableBadge = false,
}: RecipeCardProps) {
    const progressColor = recipe.missingIngredientCount > 0 ? '#FF9900' : '#3FD05F';

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Open ${recipe.title}`}
            onPress={onPress}
            style={styles.card}
        >
            <ImageBackground
                imageStyle={styles.image}
                source={{ uri: recipe.imageUrl }}
                style={[styles.imageFrame, { backgroundColor: recipe.accentColor }]}
            >
                <View style={styles.imageScrim} />
                {showEditableBadge ? (
                    <View style={styles.editableBadge}>
                        <Text style={styles.editableBadgeText}>Editable</Text>
                    </View>
                ) : (
                    <View
                        style={[
                            styles.matchBadge,
                            recipe.missingIngredientCount > 0 ? styles.warningBadge : null,
                        ]}
                    >
                        <Text style={styles.matchBadgeText}>{recipe.matchLabel}</Text>
                    </View>
                )}
                {onFavoritePress ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Toggle favorite for ${recipe.title}`}
                        onPress={onFavoritePress}
                        style={styles.favoriteButton}
                    >
                        <CooklyIcon
                            name={recipe.isFavorite ? 'check' : 'add'}
                            size={typography.label}
                        />
                    </Pressable>
                ) : null}
            </ImageBackground>

            <View style={styles.body}>
                <Text style={styles.title}>{recipe.title}</Text>
                <Text style={styles.category}>{formatRecipeCategory(recipe.category)}</Text>
                {recipe.description ? (
                    <Text numberOfLines={2} style={styles.description}>
                        {recipe.description}
                    </Text>
                ) : null}
                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{recipe.cookTimeMinutes} min</Text>
                    <Text style={styles.metaText}>{recipe.servings} servings</Text>
                </View>
                {!showEditableBadge ? (
                    <View style={styles.progressTrack}>
                        <View
                            style={[
                                styles.progressFill,
                                { backgroundColor: progressColor, width: `${recipe.compatibility}%` },
                            ]}
                        />
                    </View>
                ) : null}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.md,
        borderWidth: 1,
        overflow: 'hidden',
    },
    imageFrame: {
        height: 168,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    image: {
        borderTopLeftRadius: radius.md,
        borderTopRightRadius: radius.md,
    },
    imageScrim: {
        backgroundColor: colors.black,
        bottom: 0,
        left: 0,
        opacity: 0.1,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    matchBadge: {
        backgroundColor: '#46BD63',
        borderRadius: radius.pill,
        bottom: spacing.sm,
        left: spacing.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        position: 'absolute',
    },
    warningBadge: {
        backgroundColor: '#FFB22E',
    },
    matchBadgeText: {
        color: colors.inputBackground,
        fontSize: 10,
        fontWeight: '900',
    },
    editableBadge: {
        backgroundColor: '#2F7D38',
        borderRadius: radius.pill,
        left: spacing.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        position: 'absolute',
        top: spacing.sm,
    },
    editableBadgeText: {
        color: '#B9F5BE',
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    favoriteButton: {
        alignItems: 'center',
        backgroundColor: 'rgba(36, 35, 33, 0.78)',
        borderRadius: radius.pill,
        height: 32,
        justifyContent: 'center',
        position: 'absolute',
        right: spacing.sm,
        top: spacing.sm,
        width: 32,
    },
    body: {
        gap: spacing.sm,
        padding: spacing.md,
    },
    title: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    category: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    description: {
        color: colors.textMuted,
        fontSize: typography.caption,
        lineHeight: 18,
    },
    metaRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    metaText: {
        color: colors.textMuted,
        fontSize: 11,
        fontWeight: '700',
    },
    progressTrack: {
        backgroundColor: colors.borderMuted,
        borderRadius: radius.pill,
        height: 5,
        overflow: 'hidden',
    },
    progressFill: {
        borderRadius: radius.pill,
        height: '100%',
    },
});

function formatRecipeCategory(category: Recipe['category']): string {
    if (category === 'breakfast') {
        return 'Breakfast';
    }

    if (category === 'lunch') {
        return 'Lunch';
    }

    if (category === 'snacks') {
        return 'Snacks';
    }

    return 'Dinner';
}
