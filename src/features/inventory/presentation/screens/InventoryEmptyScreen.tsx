import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { HomeBottomNavigation } from '@/features/home/presentation/components/HomeBottomNavigation';
import { useInventoryEmptyScreen } from '@/features/inventory/presentation/hooks/useInventoryEmptyScreen';

export function InventoryEmptyScreen() {
    const screen = useInventoryEmptyScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <Text style={styles.locationIcon}>P</Text>
                <Text style={styles.headerTitle}>Inventory</Text>
                <Pressable accessibilityRole="button" onPress={screen.navigation.goExpiringIngredients}>
                    <Text style={styles.searchIcon}>Q</Text>
                </Pressable>
            </View>

            <View style={styles.content}>
                <View style={styles.illustrationCard}>
                    <View style={styles.shelf}>
                        <Text style={styles.shelfIcon}>I</Text>
                    </View>
                    <View style={styles.floatingBadgeLeft}>
                        <Text style={styles.floatingBadgeText}>B</Text>
                    </View>
                    <View style={styles.floatingBadgeRight}>
                        <Text style={styles.floatingBadgeText}>I</Text>
                    </View>
                </View>

                <Text style={styles.title}>Your inventory is empty</Text>
                <Text style={styles.subtitle}>
                    Add ingredients to start discovering recipes and managing your smart kitchen workflow at{' '}
                    {screen.selectedLocation}.
                </Text>

                <Pressable
                    accessibilityRole="button"
                    onPress={screen.navigation.goAddIngredient}
                    style={styles.primaryButton}
                >
                    <Text style={styles.primaryButtonText}>+ Add Ingredient</Text>
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    onPress={screen.showLearnMore}
                    style={styles.secondaryButton}
                >
                    <Text style={styles.secondaryButtonText}>Learn More</Text>
                </Pressable>
            </View>

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

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
        flex: 1,
    },
    header: {
        alignItems: 'center',
        borderBottomColor: colors.borderMuted,
        borderBottomWidth: 1,
        flexDirection: 'row',
        gap: spacing.md,
        padding: spacing.md,
    },
    locationIcon: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    headerTitle: {
        color: colors.primary,
        flex: 1,
        fontSize: typography.title,
        fontWeight: '900',
    },
    searchIcon: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: spacing.lg,
        paddingBottom: 116,
    },
    illustrationCard: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.lg,
        borderWidth: 1,
        height: 246,
        justifyContent: 'center',
        marginBottom: spacing.lg,
        width: '82%',
    },
    shelf: {
        alignItems: 'center',
        backgroundColor: '#14252A',
        height: 156,
        justifyContent: 'center',
        width: '76%',
    },
    shelfIcon: {
        color: colors.primary,
        fontSize: 72,
        fontWeight: '900',
    },
    floatingBadgeLeft: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        bottom: 24,
        height: 42,
        justifyContent: 'center',
        left: -22,
        position: 'absolute',
        transform: [{ rotate: '-10deg' }],
        width: 42,
    },
    floatingBadgeRight: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
        height: 48,
        justifyContent: 'center',
        position: 'absolute',
        right: -16,
        top: -16,
        transform: [{ rotate: '10deg' }],
        width: 48,
    },
    floatingBadgeText: {
        color: colors.inputBackground,
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
        fontSize: typography.label,
        lineHeight: 21,
        marginTop: spacing.sm,
    },
    primaryButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
        justifyContent: 'center',
        marginTop: spacing.xl,
        minHeight: 48,
    },
    primaryButtonText: {
        color: colors.inputBackground,
        fontSize: typography.label,
        fontWeight: '900',
    },
    secondaryButton: {
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        justifyContent: 'center',
        marginTop: spacing.sm,
        minHeight: 48,
    },
    secondaryButtonText: {
        color: colors.primary,
        fontSize: typography.label,
        fontWeight: '900',
    },
});
