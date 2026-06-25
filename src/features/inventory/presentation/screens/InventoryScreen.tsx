import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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

export function InventoryScreen() {
    const screen = useInventoryScreen();

    if (!screen.hasAnyIngredientsInLocation) {
        return <InventoryEmptyScreen />;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Pressable
                        accessibilityRole="button"
                        onPress={screen.navigation.goLocationManagement}
                        style={styles.locationRow}
                    >
                        <Text style={styles.locationIcon}>P</Text>
                        <Text style={styles.location}>{screen.selectedLocation}</Text>
                        <Text style={styles.chevron}>v</Text>
                    </Pressable>
                    <View style={styles.headerActions}>
                        <Pressable
                            accessibilityRole="button"
                            onPress={screen.navigation.goExpiringIngredients}
                        >
                            <Text style={styles.headerIcon}>Q</Text>
                        </Pressable>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>C</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.searchBox}>
                    <Text style={styles.searchIcon}>S</Text>
                    <TextInput
                        editable={false}
                        placeholder="Search ingredients..."
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
                                onPress={() => screen.setSelectedFilter(filter.key)}
                                style={[styles.filterChip, isActive ? styles.filterChipActive : null]}
                            >
                                <Text style={[styles.filterText, isActive ? styles.filterTextActive : null]}>
                                    {filter.label}
                                </Text>
                            </Pressable>
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

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Add ingredient"
                onPress={screen.navigation.goAddIngredient}
                style={styles.fab}
            >
                <Text style={styles.fabText}>+</Text>
            </Pressable>

            <HomeBottomNavigation
                activeTab="inventory"
                onHomePress={screen.navigation.goHome}
                onInventoryPress={screen.navigation.goInventory}
                onPlanPress={screen.navigation.goPlan}
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
                <Text style={styles.categoryIcon}>{group.icon}</Text>
                <Text style={styles.categoryTitle}>{group.label}</Text>
                <Text style={styles.categoryChevron}>v</Text>
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
                <Text style={styles.ingredientIconText}>{ingredient.name.charAt(0)}</Text>
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
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    locationRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.xs,
    },
    locationIcon: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    location: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    chevron: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '900',
    },
    headerActions: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.md,
    },
    headerIcon: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    avatar: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        height: 32,
        justifyContent: 'center',
        width: 32,
    },
    avatarText: {
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
    categorySection: {
        gap: spacing.sm,
    },
    categoryHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.sm,
    },
    categoryIcon: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    categoryTitle: {
        color: colors.text,
        flex: 1,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    categoryChevron: {
        color: colors.textMuted,
        fontSize: typography.label,
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
    ingredientIconText: {
        color: colors.primary,
        fontSize: typography.label,
        fontWeight: '900',
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
