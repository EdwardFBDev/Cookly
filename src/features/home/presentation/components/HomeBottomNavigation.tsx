import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';

type HomeTab = 'home' | 'inventory' | 'recipes' | 'plan' | 'shopping';

type HomeBottomNavigationProps = {
    activeTab: HomeTab;
    onHomePress: () => void;
    onInventoryPress: () => void;
    onRecipesPress: () => void;
    onPlanPress: () => void;
    onShoppingPress: () => void;
};

const TABS: { key: HomeTab; label: string; icon: string }[] = [
    { key: 'home', label: 'Home', icon: 'H' },
    { key: 'inventory', label: 'Inventory', icon: 'I' },
    { key: 'recipes', label: 'Recipes', icon: 'R' },
    { key: 'plan', label: 'Plan', icon: 'P' },
    { key: 'shopping', label: 'Shopping', icon: 'S' },
];

export function HomeBottomNavigation({
    activeTab,
    onHomePress,
    onInventoryPress,
    onRecipesPress,
    onPlanPress,
    onShoppingPress,
}: HomeBottomNavigationProps) {
    const actions: Record<HomeTab, () => void> = {
        home: onHomePress,
        inventory: onInventoryPress,
        recipes: onRecipesPress,
        plan: onPlanPress,
        shopping: onShoppingPress,
    };

    return (
        <View style={styles.container}>
            {TABS.map((tab) => {
                const isActive = tab.key === activeTab;

                return (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={tab.label}
                        key={tab.key}
                        onPress={actions[tab.key]}
                        style={styles.tab}
                    >
                        <View style={[styles.icon, isActive ? styles.iconActive : null]}>
                            <Text style={[styles.iconText, isActive ? styles.activeText : null]}>
                                {tab.icon}
                            </Text>
                        </View>
                        <Text style={[styles.label, isActive ? styles.activeText : null]}>
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderTopColor: colors.borderMuted,
        borderTopLeftRadius: radius.md,
        borderTopRightRadius: radius.md,
        borderTopWidth: 1,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        left: 0,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
        position: 'absolute',
        right: 0,
    },
    tab: {
        alignItems: 'center',
        flex: 1,
        gap: 2,
    },
    icon: {
        alignItems: 'center',
        borderRadius: radius.pill,
        height: 24,
        justifyContent: 'center',
        width: 36,
    },
    iconActive: {
        backgroundColor: colors.primary,
    },
    iconText: {
        color: colors.textMuted,
        fontSize: 11,
        fontWeight: '900',
    },
    label: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '700',
    },
    activeText: {
        color: colors.inputBackground,
    },
});
