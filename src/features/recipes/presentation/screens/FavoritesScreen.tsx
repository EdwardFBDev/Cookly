import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { RecipeBottomNavigation } from '@/features/recipes/presentation/components/RecipeBottomNavigation';
import { RecipeCard } from '@/features/recipes/presentation/components/RecipeCard';
import { useFavoritesScreen } from '@/features/recipes/presentation/hooks/useFavoritesScreen';

export function FavoritesScreen() {
    const screen = useFavoritesScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.brandRow}>
                        <Text style={styles.locationPin}>v</Text>
                        <Text style={styles.brand}>Cookly</Text>
                    </View>
                    <Pressable accessibilityRole="button" onPress={screen.navigation.goFilters}>
                        <Text style={styles.filterAction}>Filters</Text>
                    </Pressable>
                </View>

                <Text style={styles.title}>Favorites</Text>

                {screen.hasRecipes ? (
                    <View style={styles.recipeList}>
                        {screen.recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                onFavoritePress={() => screen.toggleFavorite(recipe.id)}
                                onPress={() => screen.navigation.goRecipeDetail(recipe.id)}
                                recipe={recipe}
                            />
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>No favorites yet</Text>
                        <Text style={styles.emptyText}>
                            Favorite recipes from the catalog or detail screen to collect them here.
                        </Text>
                        <Pressable
                            accessibilityRole="button"
                            onPress={screen.navigation.goCatalog}
                            style={styles.primaryButton}
                        >
                            <Text style={styles.primaryButtonText}>Browse Catalog</Text>
                        </Pressable>
                    </View>
                )}
            </ScrollView>

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Open recipe creation"
                onPress={screen.navigation.goCreateRecipe}
                style={styles.fab}
            >
                <Text style={styles.fabText}>+</Text>
            </Pressable>

            <RecipeBottomNavigation
                activeTab="my-recipes"
                onCatalogPress={screen.navigation.goCatalog}
                onCreatePress={screen.navigation.goCreateRecipe}
                onInventoryPress={screen.navigation.goInventory}
                onMyRecipesPress={screen.navigation.goMyRecipes}
            />
        </SafeAreaView>
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
        paddingBottom: 116,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    brandRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.xs,
    },
    locationPin: {
        color: colors.primary,
        fontSize: typography.body,
        fontWeight: '900',
    },
    brand: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    filterAction: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    title: {
        color: colors.text,
        fontSize: typography.title,
        fontWeight: '900',
    },
    recipeList: {
        gap: spacing.md,
    },
    emptyState: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderRadius: radius.md,
        gap: spacing.md,
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
    fab: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        bottom: 76,
        height: 54,
        justifyContent: 'center',
        position: 'absolute',
        right: spacing.md,
        width: 54,
    },
    fabText: {
        color: colors.inputBackground,
        fontSize: typography.title,
        fontWeight: '900',
    },
});
