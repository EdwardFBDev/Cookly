import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { RecipeBottomNavigation } from '@/features/recipes/presentation/components/RecipeBottomNavigation';
import { RecipeCard } from '@/features/recipes/presentation/components/RecipeCard';
import { useMyRecipesScreen } from '@/features/recipes/presentation/hooks/useMyRecipesScreen';

export function MyRecipesScreen() {
    const screen = useMyRecipesScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.brandRow}>
                        <Text style={styles.locationPin}>v</Text>
                        <Text style={styles.brand}>Cookly</Text>
                    </View>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>C</Text>
                    </View>
                </View>

                <Text style={styles.title}>My Recipes</Text>

                <View style={styles.searchBox}>
                    <Text style={styles.searchIcon}>S</Text>
                    <TextInput
                        editable={false}
                        placeholder="Search your recipes..."
                        placeholderTextColor={colors.textSubtle}
                        style={styles.searchInput}
                    />
                </View>

                <Pressable
                    accessibilityRole="button"
                    onPress={screen.navigation.goCreateRecipe}
                    style={styles.createButton}
                >
                    <Text style={styles.createButtonText}>+ Create Recipe</Text>
                </Pressable>

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
    avatar: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        height: 36,
        justifyContent: 'center',
        width: 36,
    },
    avatarText: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: '900',
    },
    title: {
        color: colors.text,
        fontSize: typography.title,
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
    createButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.md,
        height: 46,
        justifyContent: 'center',
    },
    createButtonText: {
        color: colors.inputBackground,
        fontSize: typography.caption,
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
