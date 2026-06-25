import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';

type RecipeTab = 'inventory' | 'catalog' | 'my-recipes' | 'create';

type RecipeBottomNavigationProps = {
    activeTab: RecipeTab;
    onCatalogPress: () => void;
    onCreatePress: () => void;
    onInventoryPress: () => void;
    onMyRecipesPress: () => void;
};

const TABS: { key: RecipeTab; label: string; icon: string }[] = [
    { key: 'inventory', label: 'Inventory', icon: 'I' },
    { key: 'catalog', label: 'Catalog', icon: 'R' },
    { key: 'my-recipes', label: 'My Recipes', icon: 'H' },
    { key: 'create', label: 'Create', icon: '+' },
];

export function RecipeBottomNavigation({
    activeTab,
    onCatalogPress,
    onCreatePress,
    onInventoryPress,
    onMyRecipesPress,
}: RecipeBottomNavigationProps) {
    const actions: Record<RecipeTab, () => void> = {
        catalog: onCatalogPress,
        create: onCreatePress,
        inventory: onInventoryPress,
        'my-recipes': onMyRecipesPress,
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
        height: 28,
        justifyContent: 'center',
        width: 50,
    },
    iconActive: {
        backgroundColor: '#B83252',
    },
    iconText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    label: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '800',
    },
    activeText: {
        color: colors.white,
    },
});
