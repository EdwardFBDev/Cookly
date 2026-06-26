import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { HomeBottomNavigation } from '@/features/home/presentation/components/HomeBottomNavigation';
import { InventoryIngredient } from '@/features/inventory/domain/InventoryModels';
import { InventoryStatusBadge } from '@/features/inventory/presentation/components/InventoryStatusBadge';
import {
    InventoryCategoryGroup,
    useInventoryScreen,
} from '@/features/inventory/presentation/hooks/useInventoryScreen';
import { InventoryEmptyScreen } from '@/features/inventory/presentation/screens/InventoryEmptyScreen';
import { formatIngredientQuantity } from '@/features/inventory/presentation/utils/ingredientDisplay';
import {
    CooklyChip,
    CooklyFab,
    CooklyIcon,
    CooklySearchBar,
    CooklyTopAppBar,
} from '@/shared/presentation/components/CooklyUI';

export function InventoryScreen() {
    const screen = useInventoryScreen();

    if (!screen.hasAnyIngredientsInLocation) {
        return <InventoryEmptyScreen />;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <CooklyTopAppBar
                currentLocation={screen.selectedLocation}
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

                <CooklySearchBar
                    onPress={screen.navigation.goSearch}
                    placeholder="Search ingredients..."
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
                                onPress={() => screen.setSelectedFilter(filter.key)}
                            />
                        );
                    })}
                </ScrollView>

                {screen.hasIngredients ? (
                    screen.groups.map((group) => (
                        <IngredientCategorySection
                            group={group}
                            key={group.category}
                            onIngredientPress={screen.navigation.goIngredientDetail}
                        />
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>No ingredients found</Text>
                        <Text style={styles.emptyText}>
                            Try another filter or add a new ingredient to this location.
                        </Text>
                    </View>
                )}
            </ScrollView>

            <CooklyFab onPress={screen.navigation.goAddIngredient} />

            <HomeBottomNavigation
                activeTab="inventory"
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

type IngredientCategorySectionProps = {
    group: InventoryCategoryGroup;
    onIngredientPress: (ingredientId: string) => void;
};

function IngredientCategorySection({ group, onIngredientPress }: IngredientCategorySectionProps) {
    return (
        <View style={styles.categorySection}>
            <View style={styles.categoryHeader}>
                <CooklyIcon name="inventory" size={typography.label} />
                <Text style={styles.categoryTitle}>{group.label}</Text>
                <CooklyIcon color={colors.textMuted} name="chevron-down" size={typography.label} />
            </View>

            <View style={styles.ingredientList}>
                {group.ingredients.map((ingredient, index) => (
                    <IngredientRow
                        ingredient={ingredient}
                        isUrgent={ingredient.status === 'urgent' && index === 0}
                        key={ingredient.id}
                        onPress={() => onIngredientPress(ingredient.id)}
                    />
                ))}
            </View>
        </View>
    );
}

type IngredientRowProps = {
    ingredient: InventoryIngredient;
    isUrgent: boolean;
    onPress: () => void;
};

function IngredientRow({ ingredient, isUrgent, onPress }: IngredientRowProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Open ${ingredient.name}`}
            onPress={onPress}
            style={[styles.ingredientCard, isUrgent ? styles.urgentCard : null]}
        >
            <View style={styles.ingredientIcon}>
                <CooklyIcon name="inventory" size={typography.label} />
            </View>

            <View style={styles.ingredientBody}>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                <Text style={styles.ingredientMeta}>
                    {formatIngredientQuantity(ingredient)} • {ingredient.storageArea}
                </Text>
            </View>

            <InventoryStatusBadge status={ingredient.status} />
        </Pressable>
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
    filterRow: {
        gap: spacing.sm,
    },
    categorySection: {
        gap: spacing.sm,
    },
    categoryHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.sm,
    },
    categoryTitle: {
        color: colors.text,
        flex: 1,
        fontSize: typography.subtitle,
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
        gap: spacing.md,
        minHeight: 76,
        padding: spacing.md,
    },
    urgentCard: {
        borderLeftColor: colors.primary,
        borderLeftWidth: 4,
    },
    ingredientIcon: {
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderRadius: radius.sm,
        height: 38,
        justifyContent: 'center',
        width: 38,
    },
    ingredientBody: {
        flex: 1,
    },
    ingredientName: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    ingredientMeta: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '700',
        marginTop: 2,
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
