import {
    CooklyBottomNavigation,
    CooklyIconName,
} from '@/shared/presentation/components/CooklyUI';

type HomeTab = 'home' | 'inventory' | 'recipes' | 'plan' | 'profile' | 'shopping';

type HomeBottomNavigationProps = {
    activeTab: HomeTab;
    onHomePress: () => void;
    onInventoryPress: () => void;
    onRecipesPress: () => void;
    onPlanPress: () => void;
    onProfilePress: () => void;
    onShoppingPress?: () => void;
};

const TABS: { key: HomeTab; label: string; icon: CooklyIconName }[] = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'inventory', label: 'Inventory', icon: 'inventory' },
    { key: 'recipes', label: 'Recipes', icon: 'recipes' },
    { key: 'shopping', label: 'Shopping', icon: 'shopping' },
];

export function HomeBottomNavigation({
    activeTab,
    onHomePress,
    onInventoryPress,
    onRecipesPress,
    onPlanPress,
    onProfilePress,
    onShoppingPress,
}: HomeBottomNavigationProps) {
    const actions: Record<HomeTab, () => void> = {
        home: onHomePress,
        inventory: onInventoryPress,
        recipes: onRecipesPress,
        plan: onPlanPress,
        profile: onProfilePress,
        shopping: onShoppingPress ?? onProfilePress,
    };

    return (
        <CooklyBottomNavigation
            activeTab={activeTab}
            tabs={TABS.map((tab) => ({
                ...tab,
                onPress: actions[tab.key],
            }))}
        />
    );
}
