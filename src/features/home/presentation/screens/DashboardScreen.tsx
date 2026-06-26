import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { HomeBottomNavigation } from '@/features/home/presentation/components/HomeBottomNavigation';
import { HomeCard } from '@/features/home/presentation/components/HomeCard';
import { useDashboardScreen } from '@/features/home/presentation/hooks/useDashboardScreen';
import {
    CooklyButton,
    CooklyFab,
    CooklyIcon,
    CooklyTopAppBar,
} from '@/shared/presentation/components/CooklyUI';

export function DashboardScreen() {
    const dashboard = useDashboardScreen();
    const { navigation, summary } = dashboard;

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
                        onPress: navigation.goSettings,
                    },
                    {
                        icon: 'meal-plan',
                        label: 'Meal Plan',
                        onPress: navigation.goPlan,
                    },
                    {
                        icon: 'recipes',
                        label: 'My Recipes',
                        onPress: navigation.goMyRecipes,
                    },
                    {
                        icon: 'warning',
                        label: 'Expired Items',
                        // TODO: Apply an expired-items filter when inventory filtering supports it.
                        onPress: navigation.goInventory,
                        sectionLabel: 'Inventory Management',
                    },
                    {
                        icon: 'inventory',
                        label: 'Expiring Soon',
                        onPress: navigation.goExpiringIngredients,
                    },
                    {
                        icon: 'settings',
                        label: 'Settings',
                        onPress: navigation.goSettings,
                    },
                ]}
                onLocationPress={navigation.goLocationManagement}
                onNotificationPress={navigation.goNotifications}
                onProfilePress={navigation.goSettings}
                profileName="Chef Cookly"
            />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                <View style={styles.hero}>
                    <View style={styles.heroOverlay} />
                    <Text style={styles.heroTitle}>What Can You Cook Today?</Text>
                    <Text style={styles.heroText}>
                        You have 42 compatible recipes based on your current inventory at Casa.
                    </Text>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Open recipe recommendations"
                        onPress={navigation.goRecommendations}
                        style={styles.heroButton}
                    >
                        <Text style={styles.heroButtonText}>What can I cook?</Text>
                    </Pressable>
                </View>

                <HomeCard>
                    <View style={styles.cardHeader}>
                        <View style={styles.warningIcon}>
                                <CooklyIcon name="warning" />
                        </View>
                        <Text style={styles.warningCount}>{summary.expiringSoonCount}</Text>
                    </View>
                    <Text style={styles.cardTitle}>Expiring Soon</Text>
                    <Text style={styles.cardDescription}>
                        Ingredients require immediate attention to prevent waste.
                    </Text>
                    <CooklyButton
                        label="View Inventory"
                        onPress={navigation.goInventory}
                        variant="outline"
                    />
                </HomeCard>

                <View style={styles.summaryRow}>
                    <HomeCard variant="danger">
                        <View style={styles.inlineCard}>
                            <View style={styles.roundIcon}>
                                <CooklyIcon name="shopping" />
                            </View>
                            <View style={styles.flex}>
                                <Text style={styles.cardTitle}>Shopping List</Text>
                                <Text style={styles.cardDescription}>
                                    {summary.shoppingItemCount} items pending purchase
                                </Text>
                            </View>
                            <Text style={styles.chevron}>{'>'}</Text>
                        </View>
                    </HomeCard>

                    <HomeCard>
                        <View style={styles.inlineCard}>
                            <View style={styles.roundIconMuted}>
                                <CooklyIcon name="inventory" />
                            </View>
                            <View style={styles.flex}>
                                <Text style={styles.cardTitle}>Casa Inventory</Text>
                                <Text style={styles.cardDescription}>
                                    {summary.inventoryItemCount} total items tracked
                                </Text>
                            </View>
                            <View style={styles.capacityPill}>
                                <Text style={styles.capacityText}>{summary.inventoryCapacityLabel}</Text>
                            </View>
                        </View>
                    </HomeCard>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Today's Meals</Text>
                    <Pressable accessibilityRole="button" onPress={navigation.goPlan}>
                        <Text style={styles.sectionAction}>Edit Plan</Text>
                    </Pressable>
                </View>

                <ScrollView
                    contentContainerStyle={styles.mealList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {dashboard.meals.map((meal) => (
                        <View key={meal.id} style={styles.mealCard}>
                            <View style={styles.mealImage}>
                                <View style={styles.mealPlate} />
                            </View>
                            <Text style={styles.mealTime}>{meal.mealTime}</Text>
                            <Text style={styles.mealTitle}>{meal.title}</Text>
                            <Text style={styles.mealStatus}>{meal.status}</Text>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>

            <CooklyFab onPress={navigation.goInventory} />

            <HomeBottomNavigation
                activeTab="home"
                onHomePress={navigation.goHome}
                onInventoryPress={navigation.goInventory}
                onPlanPress={navigation.goPlan}
                onProfilePress={navigation.goSettings}
                onRecipesPress={navigation.goRecipes}
                onShoppingPress={navigation.goShopping}
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
        paddingBottom: 112,
    },
    hero: {
        backgroundColor: '#2A1C12',
        borderRadius: radius.md,
        minHeight: 128,
        overflow: 'hidden',
        padding: spacing.md,
    },
    heroOverlay: {
        backgroundColor: colors.black,
        bottom: 0,
        left: 0,
        opacity: 0.22,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    heroTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
        maxWidth: 190,
    },
    heroText: {
        color: colors.textMuted,
        fontSize: 11,
        lineHeight: 15,
        marginTop: spacing.xs,
        maxWidth: 230,
    },
    heroButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        height: 38,
        justifyContent: 'center',
        marginTop: spacing.md,
        width: 150,
    },
    heroButtonText: {
        color: colors.inputBackground,
        fontSize: 11,
        fontWeight: '900',
    },
    cardHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    warningIcon: {
        alignItems: 'center',
        backgroundColor: colors.primaryMuted,
        borderRadius: radius.sm,
        height: 31,
        justifyContent: 'center',
        width: 31,
    },
    warningText: {
        color: colors.primary,
        fontWeight: '900',
    },
    warningCount: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    cardTitle: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    cardDescription: {
        color: colors.textMuted,
        fontSize: 11,
        lineHeight: 15,
        marginBottom: spacing.sm,
    },
    summaryRow: {
        gap: spacing.md,
    },
    inlineCard: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.md,
    },
    roundIcon: {
        alignItems: 'center',
        backgroundColor: '#8F2740',
        borderRadius: radius.pill,
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
    roundIconMuted: {
        alignItems: 'center',
        backgroundColor: colors.primaryMuted,
        borderRadius: radius.pill,
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
    roundIconText: {
        color: colors.primary,
        fontWeight: '900',
    },
    flex: {
        flex: 1,
    },
    chevron: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    capacityPill: {
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    capacityText: {
        color: colors.inputBackground,
        fontSize: 10,
        fontWeight: '900',
    },
    sectionHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    sectionAction: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: '900',
    },
    mealList: {
        gap: spacing.md,
    },
    mealCard: {
        backgroundColor: colors.backgroundElevated,
        borderRadius: radius.md,
        overflow: 'hidden',
        paddingBottom: spacing.md,
        width: 180,
    },
    mealImage: {
        alignItems: 'center',
        backgroundColor: '#253033',
        height: 90,
        justifyContent: 'center',
    },
    mealPlate: {
        backgroundColor: '#C6A55B',
        borderColor: colors.text,
        borderRadius: radius.pill,
        borderWidth: 3,
        height: 66,
        width: 66,
    },
    mealTime: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '900',
        marginHorizontal: spacing.md,
        marginTop: spacing.sm,
        textTransform: 'uppercase',
    },
    mealTitle: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
        marginHorizontal: spacing.md,
    },
    mealStatus: {
        color: '#68C16F',
        fontSize: 11,
        fontWeight: '700',
        marginHorizontal: spacing.md,
        marginTop: spacing.xs,
    },
});
