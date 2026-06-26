import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { HomeActionButton } from '@/features/home/presentation/components/HomeActionButton';
import { HomeBottomNavigation } from '@/features/home/presentation/components/HomeBottomNavigation';
import { HomeCard } from '@/features/home/presentation/components/HomeCard';
import { HomeHeader } from '@/features/home/presentation/components/HomeHeader';
import { useNotificationsScreen } from '@/features/home/presentation/hooks/useNotificationsScreen';
import { CooklyIcon } from '@/shared/presentation/components/CooklyUI';

export function NotificationsScreen() {
    const screen = useNotificationsScreen();
    const expiring = screen.notifications.filter((item) => item.category === 'expiring');
    const plannedMeal = screen.notifications.find((item) => item.category === 'meal');
    const shopping = screen.notifications.find((item) => item.category === 'shopping');

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <HomeHeader />

                <View>
                    <Text style={styles.title}>Notifications</Text>
                    <Text style={styles.subtitle}>Stay updated with your kitchen's pulse.</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Expiring Soon</Text>
                    {expiring.map((notification) => (
                        <HomeCard key={notification.id}>
                            <View style={styles.notificationRow}>
                                <View
                                    style={[
                                        styles.iconBox,
                                        notification.isUrgent ? styles.urgentIconBox : null,
                                    ]}
                                >
                                    <CooklyIcon name="warning" size={typography.label} />
                                </View>
                                <View style={styles.flex}>
                                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                                    <Text
                                        style={[
                                            styles.notificationDescription,
                                            notification.isUrgent ? styles.urgentText : null,
                                        ]}
                                    >
                                        {notification.description}
                                    </Text>
                                </View>
                            </View>
                        </HomeCard>
                    ))}
                </View>

                {plannedMeal ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Planned Meals</Text>
                        <HomeCard>
                            <View style={styles.mealCard}>
                                <Text style={styles.meta}>{plannedMeal.meta}</Text>
                                <Text style={styles.notificationTitle}>{plannedMeal.title}</Text>
                                <Text style={styles.notificationDescription}>
                                    {plannedMeal.description}
                                </Text>
                                <HomeActionButton
                                    label="View Recipe"
                                    onPress={screen.handleViewRecipe}
                                />
                            </View>
                        </HomeCard>
                    </View>
                ) : null}

                {shopping ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Shopping</Text>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Open shopping reminder"
                            onPress={screen.navigation.goShopping}
                        >
                            <HomeCard>
                                <View style={styles.notificationRow}>
                                    <View style={styles.dashedCircle}>
                                        <Text style={styles.iconText}>8</Text>
                                    </View>
                                    <View style={styles.flex}>
                                        <Text style={styles.notificationTitle}>{shopping.title}</Text>
                                        <Text style={styles.notificationDescription}>
                                            {shopping.description}
                                        </Text>
                                    </View>
                                    <Text style={styles.chevron}>{'>'}</Text>
                                </View>
                            </HomeCard>
                        </Pressable>
                    </View>
                ) : null}
            </ScrollView>

            <HomeBottomNavigation
                activeTab="shopping"
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

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
        flex: 1,
    },
    content: {
        gap: spacing.lg,
        padding: spacing.md,
        paddingBottom: 112,
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
    section: {
        gap: spacing.sm,
    },
    sectionTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    notificationRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.md,
    },
    iconBox: {
        alignItems: 'center',
        backgroundColor: colors.primaryMuted,
        borderRadius: radius.sm,
        height: 43,
        justifyContent: 'center',
        width: 43,
    },
    urgentIconBox: {
        backgroundColor: '#513819',
    },
    iconText: {
        color: colors.primary,
        fontWeight: '900',
    },
    flex: {
        flex: 1,
    },
    notificationTitle: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    notificationDescription: {
        color: colors.textMuted,
        fontSize: typography.caption,
        marginTop: 2,
    },
    urgentText: {
        color: colors.primary,
        fontWeight: '900',
    },
    mealCard: {
        gap: spacing.sm,
    },
    meta: {
        alignSelf: 'flex-start',
        backgroundColor: '#31394A',
        borderRadius: radius.sm,
        color: colors.text,
        fontSize: 10,
        fontWeight: '900',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        textTransform: 'uppercase',
    },
    dashedCircle: {
        alignItems: 'center',
        borderColor: colors.primary,
        borderRadius: radius.pill,
        borderStyle: 'dashed',
        borderWidth: 2,
        height: 44,
        justifyContent: 'center',
        width: 44,
    },
    chevron: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
});
