import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { HomeBottomNavigation } from '@/features/home/presentation/components/HomeBottomNavigation';
import {
    WeeklyPlanningMeal,
    WeeklyPlanningSection,
} from '@/features/planning/domain/PlanningModels';
import { useWeeklyPlannerScreen } from '@/features/planning/presentation/hooks/useWeeklyPlannerScreen';

export function WeeklyPlannerScreen() {
    const screen = useWeeklyPlannerScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Pressable accessibilityRole="button" style={styles.locationRow}>
                        <Text style={styles.locationIcon}>P</Text>
                        <Text style={styles.location}>{screen.locationName}</Text>
                        <Text style={styles.chevron}>v</Text>
                    </Pressable>
                    <View style={styles.headerActions}>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Open planning notifications"
                            onPress={screen.navigation.showNotifications}
                        >
                            <Text style={styles.headerIcon}>!</Text>
                        </Pressable>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Open profile"
                            onPress={screen.navigation.showProfile}
                            style={styles.avatar}
                        >
                            <Text style={styles.avatarText}>C</Text>
                        </Pressable>
                    </View>
                </View>

                <View>
                    <Text style={styles.title}>{screen.title}</Text>
                    <Text style={styles.subtitle}>{screen.weekRange}</Text>
                </View>

                <ScrollView
                    contentContainerStyle={styles.dayList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {screen.days.map((day) => (
                        <View key={day.id} style={[styles.dayCard, day.isSelected ? styles.dayCardActive : null]}>
                            <Text style={[styles.dayText, day.isSelected ? styles.dayTextActive : null]}>
                                {day.weekday}
                            </Text>
                            <Text style={[styles.dayNumber, day.isSelected ? styles.dayNumberActive : null]}>
                                {day.dayNumber}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                {screen.sections.map((section) => (
                    <PlanningMealSection
                        key={section.mealTime}
                        onAddMeal={screen.navigation.goRecipes}
                        onMealPress={screen.navigation.goRecipeDetail}
                        section={section}
                    />
                ))}
            </ScrollView>

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Generate shopping list"
                onPress={screen.navigation.showGenerateList}
                style={styles.generateButton}
            >
                <Text style={styles.generateIcon}>S</Text>
                <Text style={styles.generateText}>Generate List</Text>
            </Pressable>

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

type PlanningMealSectionProps = {
    section: WeeklyPlanningSection;
    onAddMeal: () => void;
    onMealPress: (recipeId: string) => void;
};

function PlanningMealSection({ onAddMeal, onMealPress, section }: PlanningMealSectionProps) {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleRow}>
                    <Text style={styles.sectionIcon}>{section.icon}</Text>
                    <Text style={styles.sectionTitle}>{section.label}</Text>
                </View>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Add ${section.label}`}
                    onPress={onAddMeal}
                    style={styles.addButton}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </Pressable>
            </View>

            {section.meals.map((meal) =>
                meal.recipe ? (
                    <PlanningMealCard
                        key={meal.id}
                        meal={meal}
                        onPress={() => meal.recipeId && onMealPress(meal.recipeId)}
                    />
                ) : (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Add ${section.label} meal`}
                        key={meal.id}
                        onPress={onAddMeal}
                        style={styles.emptySlot}
                    >
                        <Text style={styles.emptySlotText}>{meal.statusLabel}</Text>
                    </Pressable>
                ),
            )}
        </View>
    );
}

type PlanningMealCardProps = {
    meal: WeeklyPlanningMeal;
    onPress: () => void;
};

function PlanningMealCard({ meal, onPress }: PlanningMealCardProps) {
    const recipe = meal.recipe;
    const isMissing = meal.status === 'missing';

    if (!recipe) {
        return null;
    }

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Open ${recipe.title}`}
            onPress={onPress}
            style={styles.mealCard}
        >
            <ImageBackground
                imageStyle={styles.mealImage}
                source={{ uri: recipe.imageUrl }}
                style={[styles.mealImageFrame, { backgroundColor: recipe.accentColor }]}
            />
            <View style={styles.mealBody}>
                <View style={styles.mealHeader}>
                    <Text numberOfLines={1} style={styles.mealTitle}>
                        {recipe.title}
                    </Text>
                    <Text style={styles.moreIcon}>:</Text>
                </View>
                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{recipe.cookTimeMinutes} mins</Text>
                    <Text style={styles.metaText}>{recipe.servings} servings</Text>
                </View>
                <View style={[styles.statusPill, isMissing ? styles.statusPillWarning : null]}>
                    <Text style={[styles.statusText, isMissing ? styles.statusTextWarning : null]}>
                        {meal.statusLabel}
                    </Text>
                </View>
            </View>
        </Pressable>
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
        paddingBottom: 132,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    locationRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.xs,
    },
    locationIcon: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    location: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    chevron: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '900',
    },
    headerActions: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.md,
    },
    headerIcon: {
        color: colors.text,
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
    dayList: {
        gap: spacing.sm,
    },
    dayCard: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderRadius: radius.md,
        gap: spacing.xs,
        minWidth: 56,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    dayCardActive: {
        backgroundColor: colors.primary,
    },
    dayText: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    dayTextActive: {
        color: colors.inputBackground,
    },
    dayNumber: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    dayNumberActive: {
        color: colors.inputBackground,
    },
    section: {
        gap: spacing.md,
    },
    sectionHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionTitleRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.sm,
    },
    sectionIcon: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    sectionTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    addButton: {
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        height: 34,
        justifyContent: 'center',
        width: 34,
    },
    addButtonText: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '700',
    },
    emptySlot: {
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: radius.md,
        borderStyle: 'dashed',
        borderWidth: 1,
        justifyContent: 'center',
        minHeight: 82,
    },
    emptySlotText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '800',
    },
    mealCard: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.md,
        borderWidth: 1,
        flexDirection: 'row',
        gap: spacing.md,
        padding: spacing.md,
    },
    mealImageFrame: {
        borderRadius: radius.sm,
        height: 80,
        overflow: 'hidden',
        width: 80,
    },
    mealImage: {
        borderRadius: radius.sm,
    },
    mealBody: {
        flex: 1,
        gap: spacing.sm,
    },
    mealHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.sm,
    },
    mealTitle: {
        color: colors.text,
        flex: 1,
        fontSize: typography.label,
        fontWeight: '900',
    },
    moreIcon: {
        color: colors.textMuted,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    metaRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    metaText: {
        color: colors.textMuted,
        fontSize: 11,
        fontWeight: '700',
    },
    statusPill: {
        alignSelf: 'flex-start',
        backgroundColor: '#17391D',
        borderRadius: radius.pill,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    statusPillWarning: {
        backgroundColor: '#4B3515',
    },
    statusText: {
        color: '#68C16F',
        fontSize: 9,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    statusTextWarning: {
        color: colors.primary,
    },
    generateButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        bottom: 86,
        flexDirection: 'row',
        gap: spacing.sm,
        justifyContent: 'center',
        minHeight: 48,
        paddingHorizontal: spacing.lg,
        position: 'absolute',
        right: spacing.md,
    },
    generateIcon: {
        color: colors.inputBackground,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    generateText: {
        color: colors.inputBackground,
        fontSize: typography.caption,
        fontWeight: '900',
    },
});
