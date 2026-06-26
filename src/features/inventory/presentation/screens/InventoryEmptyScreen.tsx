import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/app/theme';
import { HomeBottomNavigation } from '@/features/home/presentation/components/HomeBottomNavigation';
import { useInventoryEmptyScreen } from '@/features/inventory/presentation/hooks/useInventoryEmptyScreen';
import {
    CooklyButton,
    CooklyEmptyState,
    CooklyTopAppBar,
} from '@/shared/presentation/components/CooklyUI';

export function InventoryEmptyScreen() {
    const screen = useInventoryEmptyScreen();

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

            <View style={styles.content}>
                <CooklyEmptyState
                    actionLabel="Add First Item"
                    description={`Scan your grocery receipt or add items manually to start planning at ${screen.selectedLocation}.`}
                    onActionPress={screen.navigation.goAddIngredient}
                    title="No Ingredients Yet"
                />
                <CooklyButton label="Learn More" onPress={screen.showLearnMore} variant="outline" />
            </View>

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

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
        flex: 1,
    },
    content: {
        flex: 1,
        gap: spacing.md,
        justifyContent: 'center',
        padding: spacing.lg,
        paddingBottom: 116,
    },
});
