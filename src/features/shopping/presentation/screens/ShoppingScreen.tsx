import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { HomeBottomNavigation } from '@/features/home/presentation/components/HomeBottomNavigation';
import {
    ShoppingCategoryGroup,
    ShoppingItem,
    ShoppingRecipeSummary,
} from '@/features/shopping/domain/ShoppingModels';
import { useShoppingScreen } from '@/features/shopping/presentation/hooks/useShoppingScreen';
import {
    CooklyIcon,
    CooklyIconButton,
    CooklyTopAppBar,
} from '@/shared/presentation/components/CooklyUI';

export function ShoppingScreen() {
    const screen = useShoppingScreen();

    if (screen.mode === 'empty') {
        return <ShoppingEmptyState screen={screen} />;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {screen.mode === 'summary' ? (
                    <ShoppingSummaryState screen={screen} />
                ) : (
                    <ShoppingListState screen={screen} />
                )}
            </ScrollView>

            {screen.mode === 'list' ? (
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Add in-cart items to inventory"
                    onPress={screen.syncInventory}
                    style={styles.inventoryButton}
                >
                    <Text style={styles.inventoryButtonText}>
                        + Add {screen.inCartCount} {screen.inCartCount === 1 ? 'item' : 'items'} to Inventory
                    </Text>
                </Pressable>
            ) : null}

            <HomeBottomNavigation
                activeTab="shopping"
                onHomePress={screen.goHome}
                onInventoryPress={screen.goInventory}
                onPlanPress={screen.goPlan}
                onProfilePress={screen.goSettings}
                onRecipesPress={screen.goRecipes}
                onShoppingPress={screen.goShopping}
            />
        </SafeAreaView>
    );
}

type ShoppingScreenData = ReturnType<typeof useShoppingScreen>;

type ShoppingStateProps = {
    screen: ShoppingScreenData;
};

function ShoppingSummaryState({ screen }: ShoppingStateProps) {
    return (
        <>
            <ShoppingBrandHeader
                onNotificationsPress={screen.showNotifications}
                onProfilePress={screen.showProfile}
            />

            <View style={styles.summaryCard}>
                <View>
                    <Text style={styles.cardTitle}>{screen.summaryTitle}</Text>
                    <Text style={styles.cardDescription}>{screen.summaryDescription}</Text>
                </View>
                <View style={styles.summaryMetricRow}>
                    <View>
                        <Text style={styles.missingCount}>{screen.itemCount} Items Missing</Text>
                        <Text style={styles.metricCaption}>for {screen.plannedMealCount} Planned Meals</Text>
                    </View>
                    <View style={styles.progressRing}>
                        <Text style={styles.progressText}>66%</Text>
                    </View>
                </View>
            </View>

            <View style={styles.categorySummaryCard}>
                <Text style={styles.sectionCaption}>By Category</Text>
                <View style={styles.categoryChipRow}>
                    {screen.categorySummaries.map((summary) => (
                        <View key={summary.category} style={styles.categoryChip}>
                            <Text style={styles.categoryChipText}>
                                {summary.icon} {summary.label}: {summary.count}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recipes Influencing This List</Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.recipeList}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {screen.recipeSummaries.map((summary) => (
                    <SummaryRecipeCard
                        key={summary.recipeId}
                        onPress={() => screen.goRecipeDetail(summary.recipeId)}
                        summary={summary}
                    />
                ))}
            </ScrollView>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Missing Ingredients</Text>
                <Text style={styles.sectionCount}>{screen.itemCount} items</Text>
            </View>
            <View style={styles.itemList}>
                {screen.items.map((item) => (
                    <ShoppingSummaryItem
                        item={item}
                        key={item.id}
                        onPress={() => screen.showItemDetail(item.name)}
                    />
                ))}
            </View>

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Confirm and create shopping list"
                onPress={screen.confirmCreateList}
                style={styles.confirmButton}
            >
                <Text style={styles.confirmButtonText}>Confirm & Create List</Text>
            </Pressable>
            <Text style={styles.helperText}>
                This will automatically add items to your Shopping List tab.
            </Text>
        </>
    );
}

function ShoppingListState({ screen }: ShoppingStateProps) {
    return (
        <>
            <CooklyTopAppBar
                rightAccessory={
                    <>
                        <CooklyIconButton
                            accessibilityLabel="Search shopping list"
                            icon="search"
                            onPress={screen.goSearch}
                        />
                        <CooklyIconButton
                            accessibilityLabel="Open profile"
                            icon="profile"
                            onPress={screen.showProfile}
                        />
                    </>
                }
                title="Cookly"
            />

            <View>
                <Text style={styles.listTitle}>Shopping List</Text>
                <Text style={styles.locationText}>⌖ {screen.locationName}</Text>
            </View>

            <View style={styles.assistantCard}>
                <View style={styles.assistantIcon}>
                    <CooklyIcon name="shopping" size={typography.subtitle} />
                </View>
                <View style={styles.flex}>
                    <Text style={styles.assistantTitle}>{screen.assistantTitle}</Text>
                    <Text style={styles.assistantDescription}>{screen.assistantDescription}</Text>
                </View>
            </View>

            {screen.groups.map((group) => (
                <ShoppingCategorySection
                    group={group}
                    key={group.category}
                    onItemPress={screen.showItemDetail}
                />
            ))}
        </>
    );
}

function ShoppingEmptyState({ screen }: ShoppingStateProps) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ShoppingBrandHeader
                onNotificationsPress={screen.showNotifications}
                onProfilePress={screen.showProfile}
            />

            <View style={styles.emptyContent}>
                <View style={styles.emptyIllustration}>
                    <View style={styles.bag}>
                        <CooklyIcon name="shopping" size={42} />
                    </View>
                    <View style={styles.emptyIngredient}>
                        <CooklyIcon color={colors.inputBackground} name="recipes" size={typography.label} />
                    </View>
                </View>

                <Text style={styles.emptyTitle}>Your list is empty</Text>
                <Text style={styles.emptyDescription}>
                    Once you plan your meals, missing ingredients will appear here automatically.
                </Text>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Go to planning"
                    onPress={screen.goPlan}
                    style={styles.emptyButton}
                >
                    <Text style={styles.emptyButtonText}>Go to Planning</Text>
                </Pressable>
            </View>

            <HomeBottomNavigation
                activeTab="shopping"
                onHomePress={screen.goHome}
                onInventoryPress={screen.goInventory}
                onPlanPress={screen.goPlan}
                onProfilePress={screen.goSettings}
                onRecipesPress={screen.goRecipes}
                onShoppingPress={screen.goShopping}
            />
        </SafeAreaView>
    );
}

type ShoppingBrandHeaderProps = {
    onNotificationsPress: () => void;
    onProfilePress: () => void;
};

function ShoppingBrandHeader({ onNotificationsPress, onProfilePress }: ShoppingBrandHeaderProps) {
    return (
        <CooklyTopAppBar
            onNotificationPress={onNotificationsPress}
            rightAccessory={
                <CooklyIconButton
                    accessibilityLabel="Open profile"
                    icon="profile"
                    onPress={onProfilePress}
                />
            }
            title="Cookly"
        />
    );
}

type SummaryRecipeCardProps = {
    summary: ShoppingRecipeSummary;
    onPress: () => void;
};

function SummaryRecipeCard({ onPress, summary }: SummaryRecipeCardProps) {
    const recipe = summary.recipe;

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Open ${recipe?.title ?? 'recipe'}`}
            onPress={onPress}
            style={styles.recipeCard}
        >
            <ImageBackground
                imageStyle={styles.recipeImage}
                source={{ uri: recipe?.imageUrl ?? '' }}
                style={[styles.recipeImageFrame, { backgroundColor: recipe?.accentColor ?? colors.backgroundMuted }]}
            />
            <Text numberOfLines={1} style={styles.recipeTitle}>
                {recipe?.title ?? 'Recipe'}
            </Text>
            <Text style={styles.recipeMeta}>{summary.missingCount} missing</Text>
        </Pressable>
    );
}

type ShoppingSummaryItemProps = {
    item: ShoppingItem;
    onPress: () => void;
};

function ShoppingSummaryItem({ item, onPress }: ShoppingSummaryItemProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Review ${item.name}`}
            onPress={onPress}
            style={styles.summaryItem}
        >
            <View style={styles.outlineCheckbox} />
            <View style={styles.flex}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemMeta}>
                    {item.quantityLabel} - {getCategoryLabel(item.category)}
                </Text>
            </View>
            <CooklyIcon color={colors.textSubtle} name="chevron-right" size={typography.label} />
        </Pressable>
    );
}

type ShoppingCategorySectionProps = {
    group: ShoppingCategoryGroup;
    onItemPress: (itemName: string) => void;
};

function ShoppingCategorySection({ group, onItemPress }: ShoppingCategorySectionProps) {
    return (
        <View style={styles.categorySection}>
            <View style={styles.listSectionHeader}>
                <Text style={styles.listSectionTitle}>{getCategoryLabel(group.category).toUpperCase()}</Text>
                <Text style={styles.countPill}>
                    {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
                </Text>
            </View>
            <View style={styles.groupList}>
                {group.items.map((item) => (
                    <ShoppingListItem
                        item={item}
                        key={item.id}
                        onPress={() => onItemPress(item.name)}
                    />
                ))}
            </View>
        </View>
    );
}

type ShoppingListItemProps = {
    item: ShoppingItem;
    onPress: () => void;
};

function ShoppingListItem({ item, onPress }: ShoppingListItemProps) {
    const isInCart = item.status === 'in-cart';

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Open ${item.name}`}
            onPress={onPress}
            style={[styles.listItem, isInCart ? styles.listItemChecked : null]}
        >
            <View style={[styles.listCheckbox, isInCart ? styles.listCheckboxChecked : null]}>
                {isInCart ? <CooklyIcon color={colors.white} name="check" size={12} /> : null}
            </View>
            <View style={styles.flex}>
                <Text style={[styles.listItemName, isInCart ? styles.checkedText : null]}>{item.name}</Text>
                <Text style={[styles.listItemStatus, isInCart ? styles.inCartText : null]}>
                    {isInCart ? 'In Cart' : 'Missing'}
                </Text>
            </View>
            <Text style={styles.quantityText}>{item.quantityLabel}</Text>
        </Pressable>
    );
}

function getCategoryLabel(category: ShoppingItem['category']): string {
    const labels: Record<ShoppingItem['category'], string> = {
        dairy: 'Dairy',
        grains: 'Grains',
        meat: 'Meat',
        vegetables: 'Vegetables',
    };

    return labels[category];
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
        flex: 1,
    },
    content: {
        gap: spacing.md,
        padding: spacing.md,
        paddingBottom: 122,
    },
    brandHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.sm,
    },
    profileButton: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        height: 34,
        justifyContent: 'center',
        width: 34,
    },
    profileText: {
        color: colors.primary,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    brand: {
        color: colors.primary,
        flex: 1,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    notificationIcon: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    summaryCard: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: spacing.md,
        padding: spacing.md,
    },
    cardTitle: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    cardDescription: {
        color: colors.textMuted,
        fontSize: 11,
        lineHeight: 16,
        marginTop: spacing.xs,
    },
    summaryMetricRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    missingCount: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    metricCaption: {
        color: colors.textMuted,
        fontSize: 10,
        marginTop: 2,
    },
    progressRing: {
        alignItems: 'center',
        borderColor: colors.primary,
        borderRadius: radius.pill,
        borderWidth: 3,
        height: 48,
        justifyContent: 'center',
        width: 48,
    },
    progressText: {
        color: colors.text,
        fontSize: 10,
        fontWeight: '900',
    },
    categorySummaryCard: {
        borderColor: colors.border,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: spacing.sm,
        padding: spacing.md,
    },
    sectionCaption: {
        color: colors.text,
        fontSize: 10,
        fontWeight: '800',
    },
    categoryChipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    categoryChip: {
        backgroundColor: colors.backgroundElevated,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    categoryChipText: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '800',
    },
    sectionHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.sm,
    },
    sectionTitle: {
        color: colors.text,
        flex: 1,
        fontSize: typography.label,
        fontWeight: '900',
    },
    sectionCount: {
        color: colors.textMuted,
        fontSize: 10,
    },
    recipeList: {
        gap: spacing.md,
    },
    recipeCard: {
        width: 138,
    },
    recipeImageFrame: {
        borderRadius: radius.sm,
        height: 82,
        marginBottom: spacing.sm,
        overflow: 'hidden',
    },
    recipeImage: {
        borderRadius: radius.sm,
    },
    recipeTitle: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '900',
    },
    recipeMeta: {
        color: colors.textMuted,
        fontSize: 10,
        marginTop: 2,
    },
    itemList: {
        gap: spacing.sm,
    },
    summaryItem: {
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        flexDirection: 'row',
        gap: spacing.md,
        minHeight: 54,
        paddingHorizontal: spacing.md,
    },
    outlineCheckbox: {
        borderColor: colors.primary,
        borderRadius: radius.sm,
        borderWidth: 2,
        height: 20,
        width: 20,
    },
    flex: {
        flex: 1,
    },
    itemName: {
        color: colors.text,
        fontSize: typography.caption,
        fontWeight: '800',
    },
    itemMeta: {
        color: colors.textMuted,
        fontSize: 10,
        marginTop: 2,
    },
    chevron: {
        color: colors.textMuted,
        fontSize: typography.body,
        fontWeight: '900',
    },
    confirmButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
        justifyContent: 'center',
        marginTop: spacing.sm,
        minHeight: 52,
    },
    confirmButtonText: {
        color: colors.inputBackground,
        fontSize: typography.label,
        fontWeight: '900',
    },
    helperText: {
        color: colors.textMuted,
        fontSize: 10,
        textAlign: 'center',
    },
    listHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    brandLarge: {
        color: colors.primary,
        fontSize: typography.title,
        fontWeight: '900',
    },
    headerActions: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.md,
    },
    headerIcon: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    avatar: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        height: 34,
        justifyContent: 'center',
        width: 34,
    },
    avatarText: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: '900',
    },
    listTitle: {
        color: colors.text,
        fontSize: typography.title,
        fontWeight: '900',
    },
    locationText: {
        color: colors.textMuted,
        fontSize: typography.label,
        fontWeight: '700',
        marginTop: spacing.sm,
    },
    assistantCard: {
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: radius.md,
        borderWidth: 1,
        flexDirection: 'row',
        gap: spacing.md,
        minHeight: 76,
        padding: spacing.md,
    },
    assistantIcon: {
        alignItems: 'center',
        backgroundColor: colors.primaryMuted,
        borderRadius: radius.pill,
        height: 44,
        justifyContent: 'center',
        width: 44,
    },
    assistantIconText: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    assistantTitle: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    assistantDescription: {
        color: colors.textMuted,
        fontSize: typography.caption,
        marginTop: 2,
    },
    categorySection: {
        gap: spacing.sm,
    },
    listSectionHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listSectionTitle: {
        color: colors.primary,
        fontSize: typography.label,
        fontWeight: '900',
    },
    countPill: {
        backgroundColor: colors.backgroundElevated,
        borderRadius: radius.pill,
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '900',
        overflow: 'hidden',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    groupList: {
        gap: spacing.sm,
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.border,
        borderRadius: radius.md,
        borderWidth: 1,
        flexDirection: 'row',
        gap: spacing.md,
        minHeight: 78,
        padding: spacing.md,
    },
    listItemChecked: {
        opacity: 0.7,
    },
    listCheckbox: {
        alignItems: 'center',
        borderColor: colors.primary,
        borderRadius: radius.sm,
        borderWidth: 2,
        height: 22,
        justifyContent: 'center',
        width: 22,
    },
    listCheckboxChecked: {
        backgroundColor: '#55B95A',
        borderColor: '#55B95A',
    },
    checkText: {
        color: colors.white,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    listItemName: {
        color: colors.text,
        fontSize: typography.label,
    },
    checkedText: {
        textDecorationLine: 'line-through',
    },
    listItemStatus: {
        color: colors.primary,
        fontSize: typography.caption,
        fontWeight: '900',
        marginTop: 2,
    },
    inCartText: {
        color: '#68C16F',
    },
    quantityText: {
        color: colors.textMuted,
        fontSize: typography.label,
    },
    inventoryButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
        bottom: 76,
        justifyContent: 'center',
        left: spacing.md,
        minHeight: 52,
        position: 'absolute',
        right: spacing.md,
        zIndex: 2,
    },
    inventoryButtonText: {
        color: colors.inputBackground,
        fontSize: typography.label,
        fontWeight: '900',
    },
    emptyContent: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: spacing.lg,
        paddingBottom: 116,
    },
    emptyIllustration: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        height: 244,
        justifyContent: 'center',
        marginBottom: spacing.lg,
        width: '76%',
    },
    bag: {
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        height: 112,
        justifyContent: 'center',
        transform: [{ rotate: '-4deg' }],
        width: 92,
    },
    bagIcon: {
        color: colors.primary,
        fontSize: 44,
        fontWeight: '900',
    },
    emptyIngredient: {
        alignItems: 'center',
        backgroundColor: '#B7832D',
        borderRadius: radius.pill,
        height: 46,
        justifyContent: 'center',
        left: 80,
        position: 'absolute',
        top: 68,
        transform: [{ rotate: '-24deg' }],
        width: 28,
    },
    emptyIngredientText: {
        color: colors.inputBackground,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    emptyTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    emptyDescription: {
        color: colors.textMuted,
        fontSize: typography.body,
        lineHeight: 25,
        marginTop: spacing.md,
        maxWidth: 290,
        textAlign: 'center',
    },
    emptyButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
        justifyContent: 'center',
        marginTop: spacing.xl,
        minHeight: 48,
        width: '100%',
    },
    emptyButtonText: {
        color: colors.inputBackground,
        fontSize: typography.body,
        fontWeight: '800',
    },
});
