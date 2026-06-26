import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { HomeBottomNavigation } from '@/features/home/presentation/components/HomeBottomNavigation';
import { InventoryStatusBadge } from '@/features/inventory/presentation/components/InventoryStatusBadge';
import { useIngredientDetailScreen } from '@/features/inventory/presentation/hooks/useIngredientDetailScreen';
import { formatIngredientQuantity } from '@/features/inventory/presentation/utils/ingredientDisplay';
import {
    CooklyIcon,
    CooklyIconButton,
    CooklyTopAppBar,
} from '@/shared/presentation/components/CooklyUI';

type IngredientDetailScreenProps = {
    ingredientId: string;
};

export function IngredientDetailScreen({ ingredientId }: IngredientDetailScreenProps) {
    const screen = useIngredientDetailScreen(ingredientId);

    if (!screen.ingredient) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar style="light" />
                <View style={styles.missingContainer}>
                    <Text style={styles.missingTitle}>Ingredient not found</Text>
                    <Text style={styles.missingText}>
                        This ingredient may have been removed or has not synced yet.
                    </Text>
                    <Pressable
                        accessibilityRole="button"
                        onPress={screen.navigation.goInventory}
                        style={styles.primaryButton}
                    >
                        <Text style={styles.primaryButtonText}>Back to Inventory</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    const ingredient = screen.ingredient;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <CooklyTopAppBar
                    onBackPress={screen.navigation.goInventory}
                    rightAccessory={
                        <>
                            <CooklyIconButton
                                accessibilityLabel="Edit ingredient"
                                icon="edit"
                                onPress={() => screen.navigation.goEditIngredient(ingredient.id)}
                            />
                            <CooklyIconButton
                                accessibilityLabel="Share ingredient"
                                icon="shopping"
                                onPress={() => screen.showFutureAction('Share ingredient')}
                            />
                        </>
                    }
                    title={ingredient.name}
                />

                <View style={styles.hero}>
                    <View style={styles.heroBadge}>
                        <InventoryStatusBadge status={ingredient.status} />
                    </View>
                    <CooklyIcon name="inventory" size={42} />
                </View>

                <View style={styles.metricGrid}>
                    <MetricCard label="Quantity" value={formatIngredientQuantity(ingredient)} />
                    <MetricCard label="Expires in" value={screen.expirationLabel} />
                    <MetricCard label="Category" value={screen.categoryLabel} />
                    <MetricCard label="Location" value={ingredient.location} />
                </View>

                <View style={styles.smartImpactCard}>
                    <View style={styles.smartImpactHeader}>
                        <CooklyIcon name="recipes" size={typography.label} />
                        <Text style={styles.smartImpactTitle}>Smart Impact</Text>
                    </View>
                    <Text style={styles.smartImpactText}>
                        Used in {ingredient.smartImpactRecipeCount} recipes you can cook now with your
                        current inventory.
                    </Text>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => screen.showFutureAction('Recipe recommendations')}
                        style={styles.linkButton}
                    >
                        <Text style={styles.linkText}>View Recipes</Text>
                    </Pressable>
                </View>

                <View style={styles.actionRow}>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => screen.showFutureAction('Ingredient transfer')}
                        style={styles.secondaryButton}
                    >
                        <Text style={styles.secondaryButtonText}>Transfer</Text>
                    </Pressable>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => screen.navigation.goEditIngredient(ingredient.id)}
                        style={styles.secondaryButton}
                    >
                        <Text style={styles.secondaryButtonText}>Edit</Text>
                    </Pressable>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => {
                            screen.deleteIngredient();
                            screen.navigation.goInventory();
                        }}
                        style={styles.iconButton}
                    >
                        <CooklyIcon color="#F0A5AD" name="close" size={typography.caption} />
                    </Pressable>
                </View>
            </ScrollView>

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

type MetricCardProps = {
    label: string;
    value: string;
};

function MetricCard({ label, value }: MetricCardProps) {
    return (
        <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>{label}</Text>
            <Text style={styles.metricValue}>{value}</Text>
        </View>
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
    headerIcon: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    title: {
        color: colors.text,
        flex: 1,
        fontSize: typography.label,
        fontWeight: '900',
        marginLeft: spacing.md,
    },
    headerActions: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    hero: {
        alignItems: 'center',
        backgroundColor: '#21331F',
        borderRadius: radius.md,
        height: 210,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    heroBadge: {
        position: 'absolute',
        right: spacing.md,
        top: spacing.md,
    },
    heroIcon: {
        color: '#73BC62',
        fontSize: 96,
        fontWeight: '900',
    },
    metricGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    metricCard: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: spacing.sm,
        minHeight: 92,
        padding: spacing.md,
        width: '47.5%',
    },
    metricLabel: {
        color: colors.textSubtle,
        fontSize: typography.caption,
        fontWeight: '800',
    },
    metricValue: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    smartImpactCard: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: spacing.sm,
        padding: spacing.md,
    },
    smartImpactHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.sm,
    },
    smartImpactIcon: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    smartImpactTitle: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    smartImpactText: {
        color: colors.textMuted,
        fontSize: typography.label,
        lineHeight: 20,
    },
    linkButton: {
        alignSelf: 'flex-start',
        paddingVertical: spacing.xs,
    },
    linkText: {
        color: colors.primary,
        fontSize: typography.label,
        fontWeight: '900',
    },
    actionRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    secondaryButton: {
        alignItems: 'center',
        borderColor: colors.borderMuted,
        borderRadius: radius.pill,
        borderWidth: 1,
        flex: 1,
        justifyContent: 'center',
        paddingVertical: spacing.sm,
    },
    iconButton: {
        alignItems: 'center',
        borderColor: colors.borderMuted,
        borderRadius: radius.pill,
        borderWidth: 1,
        justifyContent: 'center',
        paddingHorizontal: spacing.md,
    },
    secondaryButtonText: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    missingContainer: {
        alignItems: 'center',
        flex: 1,
        gap: spacing.md,
        justifyContent: 'center',
        padding: spacing.lg,
    },
    missingTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    missingText: {
        color: colors.textMuted,
        fontSize: typography.label,
        textAlign: 'center',
    },
    primaryButton: {
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    primaryButtonText: {
        color: colors.inputBackground,
        fontSize: typography.label,
        fontWeight: '900',
    },
});
