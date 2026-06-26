import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { RecipeBottomNavigation } from '@/features/recipes/presentation/components/RecipeBottomNavigation';
import { RecipeCard } from '@/features/recipes/presentation/components/RecipeCard';
import { useMyRecipesScreen } from '@/features/recipes/presentation/hooks/useMyRecipesScreen';
import {
    CooklyButton,
    CooklySearchBar,
    CooklyTopAppBar,
} from '@/shared/presentation/components/CooklyUI';

export function MyRecipesScreen() {
    const screen = useMyRecipesScreen();

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
                onLocationPress={screen.navigation.goLocationManagement}
                onNotificationPress={screen.navigation.goNotifications}
                onProfilePress={screen.navigation.goSettings}
                profileName="Chef Cookly"
            />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                <Text style={styles.title}>My Recipes</Text>

                <CooklySearchBar
                    onPress={screen.navigation.goSearch}
                    placeholder="Search your recipes..."
                />

                <CooklyButton
                    fullWidth
                    icon="add"
                    label="Create Recipe"
                    onPress={screen.navigation.goCreateRecipe}
                />

                {screen.hasRecipes ? (
                    <View style={styles.recipeList}>
                        {screen.recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                onPress={() => screen.navigation.goRecipeDetail(recipe.id)}
                                recipe={recipe}
                                showEditableBadge
                            />
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>No saved recipes yet</Text>
                        <Text style={styles.emptyText}>
                            Created recipes will appear here when recipe creation is connected.
                        </Text>
                    </View>
                )}
            </ScrollView>

            <RecipeBottomNavigation
                activeTab="my-recipes"
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
        paddingBottom: 108,
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
