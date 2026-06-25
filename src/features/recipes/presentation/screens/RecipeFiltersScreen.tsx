import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { useRecipeFiltersScreen } from '@/features/recipes/presentation/hooks/useRecipeFiltersScreen';

export function RecipeFiltersScreen() {
    const screen = useRecipeFiltersScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <View style={styles.sheetHandle} />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Filters</Text>
                    <Pressable accessibilityRole="button" onPress={screen.navigation.goBack}>
                        <Text style={styles.closeText}>x</Text>
                    </Pressable>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Category</Text>
                    <View style={styles.chipRow}>
                        {screen.categories.map((category) => {
                            const isActive = category.key === screen.draftFilters.category;

                            return (
                                <Pressable
                                    accessibilityRole="button"
                                    key={category.key}
                                    onPress={() => screen.updateDraft({ category: category.key })}
                                    style={[styles.chip, isActive ? styles.chipActive : null]}
                                >
                                    <Text style={[styles.chipText, isActive ? styles.chipTextActive : null]}>
                                        {category.label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Time</Text>
                    <View style={styles.chipRow}>
                        {screen.timeFilters.map((filter) => {
                            const isActive = filter.key === screen.draftFilters.time;

                            return (
                                <Pressable
                                    accessibilityRole="button"
                                    key={filter.key}
                                    onPress={() => screen.updateDraft({ time: filter.key })}
                                    style={[styles.chip, isActive ? styles.chipActive : null]}
                                >
                                    <Text style={[styles.chipText, isActive ? styles.chipTextActive : null]}>
                                        {filter.label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Availability</Text>
                    <View style={styles.availabilityList}>
                        {screen.availabilityFilters.map((filter) => {
                            const isActive = filter.key === screen.draftFilters.availability;

                            return (
                                <Pressable
                                    accessibilityRole="button"
                                    key={filter.key}
                                    onPress={() => screen.updateDraft({ availability: filter.key })}
                                    style={styles.availabilityRow}
                                >
                                    <View style={styles.availabilityTextGroup}>
                                        <Text style={isActive ? styles.availableIcon : styles.warningIcon}>
                                            {isActive ? 'ok' : '!'}
                                        </Text>
                                        <View style={styles.flex}>
                                            <Text style={styles.availabilityTitle}>{filter.label}</Text>
                                            <Text style={styles.availabilityDescription}>
                                                {filter.description}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[styles.checkbox, isActive ? styles.checkboxActive : null]}>
                                        <Text style={styles.checkboxText}>{isActive ? 'x' : ''}</Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable
                    accessibilityRole="button"
                    onPress={screen.handleApply}
                    style={styles.applyButton}
                >
                    <Text style={styles.applyButtonText}>Apply Filters</Text>
                </Pressable>
                <Pressable
                    accessibilityRole="button"
                    onPress={screen.handleClear}
                    style={styles.clearButton}
                >
                    <Text style={styles.clearButtonText}>Clear Filters</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.backgroundElevated,
        flex: 1,
    },
    sheetHandle: {
        alignSelf: 'center',
        backgroundColor: colors.border,
        borderRadius: radius.pill,
        height: 5,
        marginTop: spacing.sm,
        width: 42,
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
    title: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    closeText: {
        color: colors.textMuted,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    section: {
        gap: spacing.md,
    },
    sectionTitle: {
        color: colors.textMuted,
        fontSize: typography.label,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    chip: {
        borderColor: colors.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    chipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    chipText: {
        color: colors.text,
        fontSize: typography.caption,
        fontWeight: '800',
    },
    chipTextActive: {
        color: colors.inputBackground,
    },
    availabilityList: {
        gap: spacing.sm,
    },
    availabilityRow: {
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: radius.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: spacing.md,
    },
    availabilityTextGroup: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        gap: spacing.sm,
    },
    availableIcon: {
        color: '#3FD05F',
        fontSize: typography.caption,
        fontWeight: '900',
    },
    warningIcon: {
        color: colors.primary,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    flex: {
        flex: 1,
    },
    availabilityTitle: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    availabilityDescription: {
        color: colors.textMuted,
        fontSize: typography.caption,
        marginTop: 2,
    },
    checkbox: {
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        height: 22,
        justifyContent: 'center',
        width: 22,
    },
    checkboxActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    checkboxText: {
        color: colors.inputBackground,
        fontSize: 10,
        fontWeight: '900',
    },
    footer: {
        backgroundColor: colors.backgroundElevated,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        bottom: 0,
        gap: spacing.md,
        left: 0,
        padding: spacing.md,
        position: 'absolute',
        right: 0,
    },
    applyButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
        height: 48,
        justifyContent: 'center',
    },
    applyButtonText: {
        color: colors.inputBackground,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    clearButton: {
        alignItems: 'center',
        height: 36,
        justifyContent: 'center',
    },
    clearButtonText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '800',
    },
});
