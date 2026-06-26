import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { RecipeRecommendation } from '@/features/home/domain/HomeModels';
import { HomeBottomNavigation } from '@/features/home/presentation/components/HomeBottomNavigation';
import { HomeCard } from '@/features/home/presentation/components/HomeCard';
import { HomeHeader } from '@/features/home/presentation/components/HomeHeader';
import { useRecommendationsScreen } from '@/features/home/presentation/hooks/useRecommendationsScreen';
import { CooklyChip, CooklyFab } from '@/shared/presentation/components/CooklyUI';

const FILTERS = ['Under 30 mins', '100% Compatible', 'Favorites'];

export function RecommendationsScreen() {
    const screen = useRecommendationsScreen();
    const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <HomeHeader onNotificationsPress={screen.navigation.goNotifications} />

                <View>
                    <Text style={styles.title}>Recommended for You</Text>
                    <Text style={styles.subtitle}>Smart recipes based on your current inventory.</Text>
                </View>

                <ScrollView
                    contentContainerStyle={styles.filterRow}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {FILTERS.map((filter) => (
                        <CooklyChip
                            active={filter === selectedFilter}
                            key={filter}
                            label={filter}
                            onPress={() => setSelectedFilter(filter)}
                        />
                    ))}
                </ScrollView>

                <View style={styles.recipeList}>
                    {screen.recommendations.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            onFavoritePress={() => screen.handleToggleFavorite(recipe.title)}
                            onPress={() => screen.navigation.goRecipeDetail(recipe.id)}
                            recipe={recipe}
                        />
                    ))}
                </View>
            </ScrollView>

            <CooklyFab onPress={screen.navigation.goRecipes} />

            <HomeBottomNavigation
                activeTab="recipes"
                onHomePress={screen.navigation.goHome}
                onInventoryPress={screen.navigation.goInventory}
                onPlanPress={screen.navigation.goPlan}
                onProfilePress={screen.navigation.goSettings}
                onRecipesPress={screen.navigation.goRecipes}
                onShoppingPress={screen.navigation.goShopping}
            />
        </SafeAreaView>
    );
}

type RecipeCardProps = {
    onFavoritePress: () => void;
    onPress: () => void;
    recipe: RecipeRecommendation;
};

function RecipeCard({ onFavoritePress, onPress, recipe }: RecipeCardProps) {
    const hasIssue = Boolean(recipe.issue);

    return (
        <HomeCard>
            <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Open ${recipe.title}`}
                onPress={onPress}
            >
            <View style={styles.recipeImage}>
                {recipe.badge ? (
                    <View style={styles.matchBadge}>
                        <Text style={styles.matchBadgeText}>{recipe.badge}</Text>
                    </View>
                ) : null}
                {recipe.issue ? (
                    <View style={styles.issueBadge}>
                        <Text style={styles.issueBadgeText}>{recipe.issue}</Text>
                    </View>
                ) : null}
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Toggle favorite for ${recipe.title}`}
                    onPress={onFavoritePress}
                    style={styles.favoriteButton}
                >
                    <Text style={styles.favoriteText}>{recipe.isFavorite ? '*' : '+'}</Text>
                </Pressable>
            </View>

            <View style={styles.recipeBody}>
                <View style={styles.recipeHeader}>
                    <Text style={styles.recipeTitle}>{recipe.title}</Text>
                    <Text style={[styles.availability, hasIssue ? styles.issueText : null]}>
                        {recipe.availabilityLabel}
                    </Text>
                </View>

                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{recipe.cookTimeMinutes} min</Text>
                    <Text style={styles.metaText}>{recipe.servings} servings</Text>
                </View>

                <View style={styles.compatibilityRow}>
                    <Text style={styles.compatibilityLabel}>Compatibility</Text>
                    <Text style={styles.compatibilityValue}>{recipe.compatibility}%</Text>
                </View>
                <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${recipe.compatibility}%` }]} />
                </View>
            </View>
            </Pressable>
        </HomeCard>
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
        paddingBottom: 112,
    },
    title: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    subtitle: {
        color: colors.textMuted,
        fontSize: 11,
        marginTop: spacing.xs,
    },
    filterRow: {
        gap: spacing.sm,
    },
    recipeList: {
        gap: spacing.md,
    },
    recipeImage: {
        backgroundColor: '#3B2B22',
        borderRadius: radius.sm,
        height: 155,
        overflow: 'hidden',
    },
    matchBadge: {
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        position: 'absolute',
        right: spacing.sm,
        top: spacing.sm,
    },
    matchBadgeText: {
        color: colors.inputBackground,
        fontSize: 10,
        fontWeight: '900',
    },
    issueBadge: {
        backgroundColor: '#C94C4C',
        borderRadius: radius.pill,
        left: spacing.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        position: 'absolute',
        top: spacing.sm,
    },
    issueBadgeText: {
        color: colors.white,
        fontSize: 10,
        fontWeight: '900',
    },
    favoriteButton: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderRadius: radius.pill,
        bottom: spacing.sm,
        height: 34,
        justifyContent: 'center',
        position: 'absolute',
        right: spacing.sm,
        width: 34,
    },
    favoriteText: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    recipeBody: {
        gap: spacing.sm,
        paddingTop: spacing.md,
    },
    recipeHeader: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.sm,
    },
    recipeTitle: {
        color: colors.text,
        flex: 1,
        fontSize: typography.label,
        fontWeight: '900',
    },
    availability: {
        color: '#68C16F',
        fontSize: 10,
        fontWeight: '900',
    },
    issueText: {
        color: '#FF6666',
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
    compatibilityRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    compatibilityLabel: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '800',
    },
    compatibilityValue: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '900',
    },
    progressTrack: {
        backgroundColor: colors.borderMuted,
        borderRadius: radius.pill,
        height: 5,
        overflow: 'hidden',
    },
    progressFill: {
        backgroundColor: colors.primary,
        height: '100%',
    },
});
