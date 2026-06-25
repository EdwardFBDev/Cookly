import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { HomeBottomNavigation } from '@/features/home/presentation/components/HomeBottomNavigation';
import { InventoryIngredient } from '@/features/inventory/domain/InventoryModels';
import {
    ExpiringIngredientGroup,
    useExpiringIngredientsScreen,
} from '@/features/inventory/presentation/hooks/useExpiringIngredientsScreen';
import { formatIngredientQuantity } from '@/features/inventory/presentation/utils/ingredientDisplay';

export function ExpiringIngredientsScreen() {
    const screen = useExpiringIngredientsScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Pressable accessibilityRole="button" onPress={screen.navigation.goInventory}>
                        <Text style={styles.locationIcon}>P</Text>
                    </Pressable>
                    <Text style={styles.headerTitle}>Inventory</Text>
                    <Text style={styles.searchIcon}>Q</Text>
                </View>

                <View>
                    <Text style={styles.title}>Expiring Soon</Text>
                    <Text style={styles.subtitle}>Prioritize these items to minimize food waste.</Text>
                </View>

                {screen.hasExpiringIngredients ? (
                    screen.groups.map((group) => (
                        <ExpiringGroup
                            getExpirationLabel={screen.getExpirationLabel}
                            group={group}
                            key={group.key}
                            onOpenIngredient={screen.navigation.goIngredientDetail}
                            onViewRecipes={() => screen.showFutureAction('Recipe recommendations')}
                            onUseIngredient={() => screen.showFutureAction('Use ingredient')}
                        />
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>Nothing expiring soon</Text>
                        <Text style={styles.emptyText}>
                            {screen.selectedLocation} has no ingredients requiring attention.
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

type ExpiringGroupProps = {
    getExpirationLabel: (expirationDate?: string) => string;
    group: ExpiringIngredientGroup;
    onOpenIngredient: (ingredientId: string) => void;
    onUseIngredient: () => void;
    onViewRecipes: () => void;
};

function ExpiringGroup({
    getExpirationLabel,
    group,
    onOpenIngredient,
    onUseIngredient,
    onViewRecipes,
}: ExpiringGroupProps) {
    return (
        <View style={styles.group}>
            <View style={styles.groupHeader}>
                <Text style={styles.groupTitle}>{group.label}</Text>
                <View style={[styles.groupBadge, styles[`${group.tone}Badge`]]}>
                    <Text style={styles.groupBadgeText}>{group.tone}</Text>
                </View>
            </View>

            {group.ingredients.map((ingredient) => (
                <ExpiringCard
                    expirationLabel={getExpirationLabel(ingredient.expirationDate)}
                    groupTone={group.tone}
                    ingredient={ingredient}
                    key={ingredient.id}
                    onOpen={() => onOpenIngredient(ingredient.id)}
                    onUseIngredient={onUseIngredient}
                    onViewRecipes={onViewRecipes}
                />
            ))}
        </View>
    );
}

type ExpiringCardProps = {
    expirationLabel: string;
    groupTone: ExpiringIngredientGroup['tone'];
    ingredient: InventoryIngredient;
    onOpen: () => void;
    onUseIngredient: () => void;
    onViewRecipes: () => void;
};

function ExpiringCard({
    expirationLabel,
    groupTone,
    ingredient,
    onOpen,
    onUseIngredient,
    onViewRecipes,
}: ExpiringCardProps) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onOpen}
            style={[styles.card, styles[`${groupTone}Card`]]}
        >
            <View style={styles.cardBody}>
                <View style={styles.itemImage}>
                    <Text style={styles.itemImageText}>{ingredient.name.charAt(0)}</Text>
                </View>
                <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{ingredient.name}</Text>
                    <Text style={styles.itemMeta}>
                        {formatIngredientQuantity(ingredient)} • {ingredient.storageArea}
                    </Text>
                </View>
                <View style={styles.expirationBox}>
                    <Text style={styles.expirationLabel}>{expirationLabel}</Text>
                    {ingredient.expirationDate ? (
                        <Text style={styles.expirationDate}>{ingredient.expirationDate.slice(5)}</Text>
                    ) : null}
                </View>
            </View>

            <View style={styles.actionRow}>
                <Pressable accessibilityRole="button" onPress={onUseIngredient} style={styles.primaryAction}>
                    <Text style={styles.primaryActionText}>Use Ingredient</Text>
                </Pressable>
                <Pressable accessibilityRole="button" onPress={onViewRecipes} style={styles.secondaryAction}>
                    <Text style={styles.secondaryActionText}>View Recipes</Text>
                </Pressable>
            </View>
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
        gap: spacing.sm,
    },
    locationIcon: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    headerTitle: {
        color: colors.primary,
        flex: 1,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    searchIcon: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    title: {
        color: colors.text,
        fontSize: typography.title,
        fontWeight: '900',
    },
    subtitle: {
        color: colors.textMuted,
        fontSize: typography.caption,
        marginTop: spacing.xs,
    },
    group: {
        gap: spacing.sm,
    },
    groupHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    groupTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    groupBadge: {
        borderRadius: radius.pill,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    criticalBadge: {
        backgroundColor: '#7A2727',
    },
    urgentBadge: {
        backgroundColor: '#6F4A05',
    },
    monitorBadge: {
        backgroundColor: '#67680C',
    },
    groupBadgeText: {
        color: colors.primary,
        fontSize: 9,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    card: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: spacing.md,
        padding: spacing.md,
    },
    criticalCard: {
        borderLeftColor: '#FF4D4D',
        borderLeftWidth: 4,
    },
    urgentCard: {
        borderLeftColor: colors.primary,
        borderLeftWidth: 4,
    },
    monitorCard: {
        borderLeftColor: '#E5EA28',
        borderLeftWidth: 4,
    },
    cardBody: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.md,
    },
    itemImage: {
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderRadius: radius.sm,
        height: 58,
        justifyContent: 'center',
        width: 58,
    },
    itemImageText: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    itemMeta: {
        color: colors.textMuted,
        fontSize: typography.caption,
        marginTop: spacing.xs,
    },
    expirationBox: {
        alignItems: 'flex-end',
    },
    expirationLabel: {
        color: colors.primary,
        fontSize: typography.label,
        fontWeight: '900',
    },
    expirationDate: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '800',
    },
    actionRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    primaryAction: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
        flex: 1,
        paddingVertical: spacing.sm,
    },
    primaryActionText: {
        color: colors.inputBackground,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    secondaryAction: {
        alignItems: 'center',
        borderColor: colors.primary,
        borderRadius: radius.sm,
        borderWidth: 1,
        flex: 1,
        paddingVertical: spacing.sm,
    },
    secondaryActionText: {
        color: colors.primary,
        fontSize: typography.caption,
        fontWeight: '900',
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
        height: 48,
        justifyContent: 'center',
        position: 'absolute',
        right: spacing.md,
        width: 48,
    },
    fabText: {
        color: colors.inputBackground,
        fontSize: typography.title,
        fontWeight: '900',
    },
});
