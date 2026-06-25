import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { HomeBottomNavigation } from '@/features/home/presentation/components/HomeBottomNavigation';
import { usePlanningEmptyScreen } from '@/features/planning/presentation/hooks/usePlanningEmptyScreen';

export function PlanningEmptyScreen() {
    const screen = usePlanningEmptyScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Open profile"
                    onPress={screen.navigation.showProfile}
                    style={styles.profileButton}
                >
                    <Text style={styles.profileText}>C</Text>
                </Pressable>
                <Text style={styles.brand}>Cookly</Text>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Open planning notifications"
                    onPress={screen.navigation.showNotifications}
                >
                    <Text style={styles.notificationIcon}>!</Text>
                </Pressable>
            </View>

            <View style={styles.content}>
                <View style={styles.illustrationCard}>
                    <View style={styles.calendarBody}>
                        <View style={styles.calendarTabs}>
                            <View style={styles.calendarTab} />
                            <View style={styles.calendarTab} />
                        </View>
                        <Text style={styles.calendarIcon}>P</Text>
                    </View>
                </View>

                <Text style={styles.title}>No meals planned yet</Text>
                <Text style={styles.subtitle}>
                    Plan your week and automatically generate shopping lists to save time and reduce
                    waste.
                </Text>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Start planning"
                    onPress={screen.navigation.goPlan}
                    style={styles.primaryButton}
                >
                    <Text style={styles.primaryButtonText}>+ Start Planning</Text>
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Browse popular recipes"
                    onPress={screen.navigation.goRecipes}
                    style={styles.secondaryButton}
                >
                    <Text style={styles.secondaryButtonText}>Browse Popular Recipes</Text>
                </Pressable>

                <View style={styles.benefitRow}>
                    <BenefitCard label="Auto-Shopping" onPress={screen.showAutoShopping} />
                    <BenefitCard label="Zero Waste" onPress={screen.showZeroWaste} />
                </View>
            </View>

            <HomeBottomNavigation
                activeTab="plan"
                onHomePress={screen.navigation.goHome}
                onInventoryPress={screen.navigation.goInventory}
                onPlanPress={screen.navigation.goPlan}
                onRecipesPress={screen.navigation.goRecipes}
                onShoppingPress={screen.navigation.goShopping}
            />
        </SafeAreaView>
    );
}

type BenefitCardProps = {
    label: string;
    onPress: () => void;
};

function BenefitCard({ label, onPress }: BenefitCardProps) {
    return (
        <Pressable accessibilityRole="button" onPress={onPress} style={styles.benefitCard}>
            <Text style={styles.benefitIcon}>S</Text>
            <Text style={styles.benefitLabel}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
        flex: 1,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.md,
        padding: spacing.md,
    },
    profileButton: {
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        height: 34,
        justifyContent: 'center',
        width: 34,
    },
    profileText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    brand: {
        color: colors.primary,
        flex: 1,
        fontSize: typography.title,
        fontWeight: '900',
    },
    notificationIcon: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    content: {
        alignItems: 'center',
        flex: 1,
        padding: spacing.lg,
        paddingBottom: 116,
    },
    illustrationCard: {
        alignItems: 'center',
        backgroundColor: colors.backgroundMuted,
        height: 294,
        justifyContent: 'center',
        marginBottom: spacing.xl,
        width: '92%',
    },
    calendarBody: {
        alignItems: 'center',
        backgroundColor: '#C1A05C',
        borderRadius: radius.lg,
        height: 142,
        justifyContent: 'center',
        transform: [{ rotate: '8deg' }],
        width: 150,
    },
    calendarTabs: {
        flexDirection: 'row',
        gap: spacing.lg,
        position: 'absolute',
        top: -14,
    },
    calendarTab: {
        backgroundColor: '#E1C887',
        borderRadius: radius.sm,
        height: 36,
        width: 26,
    },
    calendarIcon: {
        color: colors.inputBackground,
        fontSize: 54,
        fontWeight: '900',
    },
    title: {
        color: colors.text,
        fontSize: typography.title,
        fontWeight: '900',
        textAlign: 'center',
    },
    subtitle: {
        color: colors.textMuted,
        fontSize: typography.label,
        lineHeight: 22,
        marginTop: spacing.md,
        maxWidth: 270,
        textAlign: 'center',
    },
    primaryButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
        justifyContent: 'center',
        marginTop: spacing.lg,
        minHeight: 48,
        width: '72%',
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
        minHeight: 42,
        width: '72%',
    },
    secondaryButtonText: {
        color: colors.primary,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    benefitRow: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginTop: 'auto',
        width: '100%',
    },
    benefitCard: {
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        flex: 1,
        gap: spacing.xs,
        justifyContent: 'center',
        minHeight: 54,
    },
    benefitIcon: {
        color: colors.primary,
        fontSize: typography.label,
        fontWeight: '900',
    },
    benefitLabel: {
        color: colors.textSubtle,
        fontSize: typography.caption,
        fontWeight: '800',
    },
});
