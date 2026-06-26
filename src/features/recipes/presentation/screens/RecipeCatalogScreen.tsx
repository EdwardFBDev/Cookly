import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { RecipeBottomNavigation } from '@/features/recipes/presentation/components/RecipeBottomNavigation';
import { RecipeCard } from '@/features/recipes/presentation/components/RecipeCard';
import { useRecipeCatalogScreen } from '@/features/recipes/presentation/hooks/useRecipeCatalogScreen';
import {
    CooklyChip,
    CooklyFab,
    CooklySearchBar,
    CooklyTopAppBar,
} from '@/shared/presentation/components/CooklyUI';

export function RecipeCatalogScreen() {
    const screen = useRecipeCatalogScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <CooklyTopAppBar
                currentLocation="Casa"
                drawerItems={[
                    {
                        active: true,
                        icon: 'profile',
                        label: 'Profile',
                        onPress: screen.navigation.goSettings,
                    },
                    {
                        icon: 'meal-plan',
                        label: 'Meal Plan',
                        onPress: screen.navigation.goPlan,
                    },
                    {
                        icon: 'recipes',
                        label: 'My Recipes',
                        onPress: screen.navigation.goMyRecipes,
                    },
                    {
                        icon: 'warning',
                        label: 'Expired Items',
                        // TODO: Apply an expired-items filter when inventory filtering supports it.
                        onPress: screen.navigation.goInventory,
                        sectionLabel: 'Inventory Management',
                    },
                    {
                        icon: 'inventory',
                        label: 'Expiring Soon',
                        onPress: screen.navigation.goExpiringIngredients,
                    },
                    {
                        icon: 'settings',
                        label: 'Settings',
                        onPress: screen.navigation.goSettings,
                    },
                ]}
                filterLabel={
                    screen.activeStructuredFilterCount > 0
                        ? `Filters (${screen.activeStructuredFilterCount})`
                        : 'Filters'
                }
                onFilterPress={screen.navigation.goFilters}
                onLocationPress={screen.navigation.goLocationManagement}
                onNotificationPress={screen.navigation.goNotifications}
            />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                <CooklySearchBar
                    onPress={screen.navigation.goSearch}
                    placeholder="Search recipes, ingredients..."
                />

                <ScrollView
                    contentContainerStyle={styles.filterRow}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {screen.filters.map((filter) => {
                        const isActive = filter.key === screen.selectedFilter;

                        return (
                            <CooklyChip
                                active={isActive}
                                key={filter.key}
                                label={filter.label}
                                onPress={() =>
                                    filter.key === 'favorites'
                                        ? screen.navigation.goFavorites()
                                        : screen.setSelectedFilter(filter.key)
                                }
                            />
                        );
                    })}
                </ScrollView>

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
                        <Text style={styles.emptyTitle}>No recipes found</Text>
                        <Text style={styles.emptyText}>
                            Try another filter or check back when recipe services are connected.
                        </Text>
                    </View>
                )}
            </ScrollView>

            <CooklyFab icon="add" onPress={screen.navigation.goCreateRecipe} />

            <RecipeBottomNavigation
                activeTab="catalog"
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
        paddingBottom: 118,
    },
    filterRow: {
        gap: spacing.sm,
    },
    recipeList: {
        gap: spacing.md,
    },
    emptyState: {
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
});
