import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { RecipeBottomNavigation } from '@/features/recipes/presentation/components/RecipeBottomNavigation';
import { RecipeCard } from '@/features/recipes/presentation/components/RecipeCard';
import { useFavoritesScreen } from '@/features/recipes/presentation/hooks/useFavoritesScreen';
import {
    CooklyButton,
    CooklyFab,
    CooklyTopAppBar,
} from '@/shared/presentation/components/CooklyUI';

export function FavoritesScreen() {
    const screen = useFavoritesScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <CooklyTopAppBar
                    locationLabel="Casa"
                    rightAccessory={
                        <Pressable accessibilityRole="button" onPress={screen.navigation.goFilters}>
                            <Text style={styles.filterAction}>Filters</Text>
                        </Pressable>
                    }
                    title="Cookly"
                />

                <Text style={styles.title}>Favorites</Text>

                {screen.isLoading ? (
                    <View style={styles.emptyState}>
                        <ActivityIndicator color={colors.primary} />
                        <Text style={styles.emptyTitle}>Loading favorites</Text>
                        <Text style={styles.emptyText}>Reading saved recipes from this device.</Text>
                    </View>
                ) : screen.favoritesError ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>Unable to load favorites</Text>
                        <Text style={styles.emptyText}>{screen.favoritesError}</Text>
                        <CooklyButton label="Try Again" onPress={screen.loadFavorites} />
                    </View>
                ) : screen.hasRecipes ? (
                    <View style={styles.recipeList}>
                        {screen.recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                onFavoritePress={() => void screen.toggleFavorite(recipe.id)}
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

            <CooklyFab onPress={screen.navigation.goCreateRecipe} />

            <RecipeBottomNavigation
                activeTab="favorites"
                onCatalogPress={screen.navigation.goCatalog}
                onCreatePress={screen.navigation.goCreateRecipe}
                onFavoritesPress={screen.navigation.goFavorites}
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
});
