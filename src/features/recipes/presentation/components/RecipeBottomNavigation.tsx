import {
    CooklyBottomNavigation,
    CooklyIconName,
} from '@/shared/presentation/components/CooklyUI';

type RecipeTab = 'inventory' | 'catalog' | 'my-recipes' | 'favorites' | 'create';

type RecipeBottomNavigationProps = {
    activeTab: RecipeTab;
    onCatalogPress: () => void;
    onCreatePress: () => void;
    onFavoritesPress?: () => void;
    onInventoryPress: () => void;
    onMyRecipesPress: () => void;
};

const TABS: { key: RecipeTab; label: string; icon: CooklyIconName }[] = [
    { key: 'inventory', label: 'Inventory', icon: 'inventory' },
    { key: 'catalog', label: 'Catalog', icon: 'catalog' },
    { key: 'my-recipes', label: 'My Recipes', icon: 'recipes' },
    { key: 'favorites', label: 'Favorites', icon: 'check' },
];

export function RecipeBottomNavigation({
    activeTab,
    onCatalogPress,
    onCreatePress,
    onFavoritesPress,
    onInventoryPress,
    onMyRecipesPress,
}: RecipeBottomNavigationProps) {
    const actions: Record<RecipeTab, () => void> = {
        catalog: onCatalogPress,
        create: onCreatePress,
        favorites: onFavoritesPress ?? onCatalogPress,
        inventory: onInventoryPress,
        'my-recipes': onMyRecipesPress,
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
