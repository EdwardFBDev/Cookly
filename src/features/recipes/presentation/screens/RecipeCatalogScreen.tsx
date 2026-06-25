import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { RecipeBottomNavigation } from '@/features/recipes/presentation/components/RecipeBottomNavigation';
import { RecipeCard } from '@/features/recipes/presentation/components/RecipeCard';
import { useRecipeCatalogScreen } from '@/features/recipes/presentation/hooks/useRecipeCatalogScreen';

export function RecipeCatalogScreen() {
    const screen = useRecipeCatalogScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Pressable accessibilityRole="button" style={styles.locationRow}>
                        <Text style={styles.locationPin}>v</Text>
                        <Text style={styles.location}>Casa</Text>
                        <Text style={styles.chevron}>v</Text>
                    </Pressable>
                    <Text style={styles.brand}>Cookly</Text>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Open recipe filters"
                        onPress={screen.navigation.goFilters}
                        style={styles.filterButton}
                    >
                        <Text style={styles.filterButtonText}>
                            {screen.activeStructuredFilterCount > 0
                                ? `Filters (${screen.activeStructuredFilterCount})`
                                : 'Filters'}
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.searchBox}>
                    <Text style={styles.searchIcon}>S</Text>
                    <TextInput
                        editable={false}
                        placeholder="Search recipes, ingredients..."
                        placeholderTextColor={colors.textSubtle}
                        style={styles.searchInput}
                    />
                </View>

                <ScrollView
                    contentContainerStyle={styles.filterRow}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {screen.filters.map((filter) => {
                        const isActive = filter.key === screen.selectedFilter;

                        return (
                            <Pressable
                                accessibilityRole="button"
                                key={filter.key}
                                onPress={() =>
                                    filter.key === 'favorites'
                                        ? screen.navigation.goFavorites()
                                        : screen.setSelectedFilter(filter.key)
                                }
                                style={[styles.filterChip, isActive ? styles.filterChipActive : null]}
                            >
                                <Text style={[styles.filterText, isActive ? styles.filterTextActive : null]}>
                                    {filter.label}
                                </Text>
                            </Pressable>
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

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Open recipe creation"
                onPress={screen.navigation.goCreateRecipe}
                style={styles.fab}
            >
                <Text style={styles.fabText}>R</Text>
            </Pressable>

            <RecipeBottomNavigation
                activeTab="catalog"
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
        paddingBottom: 118,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    locationRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.xs,
        minWidth: 72,
    },
    locationPin: {
        color: colors.primary,
        fontSize: typography.body,
        fontWeight: '900',
    },
    location: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    chevron: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '900',
    },
    brand: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    filterButton: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        minHeight: 32,
        justifyContent: 'center',
        paddingHorizontal: spacing.sm,
    },
    filterButtonText: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: '900',
    },
    searchBox: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.border,
        borderRadius: radius.md,
        borderWidth: 1,
        flexDirection: 'row',
        gap: spacing.sm,
        minHeight: 45,
        paddingHorizontal: spacing.md,
    },
    searchIcon: {
        color: colors.textMuted,
        fontSize: typography.label,
        fontWeight: '900',
    },
    searchInput: {
        color: colors.text,
        flex: 1,
        fontSize: typography.label,
        padding: 0,
    },
    filterRow: {
        gap: spacing.sm,
    },
    filterChip: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.pill,
        borderWidth: 1,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    filterChipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    filterText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '800',
    },
    filterTextActive: {
        color: colors.inputBackground,
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
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
});
