import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { RecipeBottomNavigation } from '@/features/recipes/presentation/components/RecipeBottomNavigation';
import { useCreateRecipeScreen } from '@/features/recipes/presentation/hooks/useCreateRecipeScreen';
import {
    CooklyChip,
    CooklyIcon,
    CooklyIconButton,
} from '@/shared/presentation/components/CooklyUI';

export function CreateRecipeScreen() {
    const screen = useCreateRecipeScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Pressable accessibilityRole="button" onPress={screen.navigation.goBack}>
                        <CooklyIcon name="close" size={typography.label} />
                    </Pressable>
                    <Text style={styles.title}>New Recipe</Text>
                    <CooklyIconButton
                        accessibilityLabel="Open profile settings"
                        icon="profile"
                        onPress={screen.navigation.goSettings}
                    />
                </View>

                <View style={styles.progressHeader}>
                    <View>
                        <Text style={styles.stepText}>Step 1 of 3</Text>
                        <View style={styles.progressTrack}>
                            <View style={styles.progressFill} />
                        </View>
                    </View>
                    <Text style={styles.sectionLabel}>Basic Information</Text>
                </View>

                <Pressable
                    accessibilityRole="button"
                    onPress={screen.handleAddPhoto}
                    style={styles.photoBox}
                >
                    <CooklyIcon name="add" size={typography.title} />
                    <Text style={styles.photoTitle}>Add Recipe Photo</Text>
                    <Text style={styles.photoHelp}>High-quality JPG or PNG (Max 5MB)</Text>
                </Pressable>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Recipe Name</Text>
                    <TextInput
                        onChangeText={(value) => screen.updateField('title', value)}
                        placeholder="e.g., Spicy Honey Salmon"
                        placeholderTextColor={colors.textSubtle}
                        style={styles.input}
                        value={screen.form.title}
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Category</Text>
                    <View style={styles.categoryGrid}>
                        {screen.categories.map((category) => {
                            const isActive = category.key === screen.form.category;

                            return (
                                <CooklyChip
                                    active={isActive}
                                    key={category.key}
                                    label={category.label}
                                    onPress={() => screen.updateField('category', category.key)}
                                />
                            );
                        })}
                    </View>
                </View>

                <View style={styles.fieldRow}>
                    <View style={styles.fieldHalf}>
                        <Text style={styles.label}>Time (mins)</Text>
                        <TextInput
                            keyboardType="number-pad"
                            onChangeText={(value) => screen.updateField('cookTimeMinutes', value)}
                            placeholder="30"
                            placeholderTextColor={colors.textSubtle}
                            style={styles.input}
                            value={screen.form.cookTimeMinutes}
                        />
                    </View>
                    <View style={styles.fieldHalf}>
                        <Text style={styles.label}>Servings</Text>
                        <TextInput
                            keyboardType="number-pad"
                            onChangeText={(value) => screen.updateField('servings', value)}
                            placeholder="4"
                            placeholderTextColor={colors.textSubtle}
                            style={styles.input}
                            value={screen.form.servings}
                        />
                    </View>
                </View>

                {screen.error ? (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>{screen.error}</Text>
                    </View>
                ) : (
                    <View style={styles.tipBox}>
                        <Text style={styles.tipText}>
                            Clear names and accurate timing help Cookly match this recipe with your current
                            inventory.
                        </Text>
                    </View>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <Pressable
                    accessibilityRole="button"
                    onPress={screen.handleSaveDraft}
                    style={styles.secondaryButton}
                >
                    <Text style={styles.secondaryButtonText}>Save Draft</Text>
                </Pressable>
                <Pressable
                    accessibilityRole="button"
                    onPress={screen.handleSubmit}
                    style={styles.primaryButton}
                >
                    <Text style={styles.primaryButtonText}>Next</Text>
                </Pressable>
            </View>

            <RecipeBottomNavigation
                activeTab="create"
                onCatalogPress={screen.navigation.goCatalog}
                onCreatePress={screen.navigation.goCreateRecipe}
                onFavoritesPress={screen.navigation.goFavorites}
                onInventoryPress={screen.navigation.goInventory}
                onMyRecipesPress={screen.navigation.goMyRecipes}
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
        paddingBottom: 142,
    },
    header: {
        alignItems: 'center',
        borderBottomColor: colors.borderMuted,
        borderBottomWidth: 1,
        flexDirection: 'row',
        gap: spacing.md,
        marginHorizontal: -spacing.md,
        paddingBottom: spacing.md,
        paddingHorizontal: spacing.md,
    },
    closeText: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    title: {
        color: colors.primary,
        flex: 1,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    avatar: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        height: 32,
        justifyContent: 'center',
        width: 32,
    },
    avatarText: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '900',
    },
    progressHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stepText: {
        color: colors.primary,
        fontSize: typography.caption,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    progressTrack: {
        backgroundColor: colors.borderMuted,
        borderRadius: radius.pill,
        height: 5,
        marginTop: spacing.sm,
        overflow: 'hidden',
        width: 112,
    },
    progressFill: {
        backgroundColor: colors.primary,
        height: '100%',
        width: '34%',
    },
    sectionLabel: {
        color: colors.textMuted,
        fontSize: 11,
        fontWeight: '900',
    },
    photoBox: {
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: radius.md,
        borderStyle: 'dashed',
        borderWidth: 2,
        gap: spacing.sm,
        minHeight: 164,
        justifyContent: 'center',
    },
    photoIcon: {
        color: colors.textMuted,
        fontSize: typography.title,
        fontWeight: '900',
    },
    photoTitle: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    photoHelp: {
        color: colors.textSubtle,
        fontSize: 11,
        fontWeight: '800',
    },
    fieldGroup: {
        gap: spacing.sm,
    },
    label: {
        color: colors.text,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    input: {
        backgroundColor: colors.backgroundElevated,
        borderRadius: radius.sm,
        color: colors.text,
        fontSize: typography.label,
        minHeight: 42,
        paddingHorizontal: spacing.md,
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    fieldRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    fieldHalf: {
        flex: 1,
        gap: spacing.sm,
    },
    tipBox: {
        backgroundColor: '#221D15',
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        padding: spacing.md,
    },
    tipText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        lineHeight: 18,
    },
    errorBox: {
        backgroundColor: '#352427',
        borderColor: '#684149',
        borderRadius: radius.sm,
        borderWidth: 1,
        padding: spacing.md,
    },
    errorText: {
        color: '#ECA0A0',
        fontSize: typography.caption,
        fontWeight: '900',
    },
    footer: {
        alignItems: 'center',
        backgroundColor: colors.background,
        borderTopColor: colors.borderMuted,
        borderTopWidth: 1,
        bottom: 54,
        flexDirection: 'row',
        gap: spacing.md,
        left: 0,
        padding: spacing.md,
        position: 'absolute',
        right: 0,
    },
    secondaryButton: {
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        height: 44,
        justifyContent: 'center',
        width: 112,
    },
    secondaryButtonText: {
        color: colors.text,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    primaryButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        flex: 1,
        height: 44,
        justifyContent: 'center',
    },
    primaryButtonText: {
        color: colors.inputBackground,
        fontSize: typography.caption,
        fontWeight: '900',
    },
});
