import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import {
    IngredientCategory,
    IngredientUnit,
    InventoryLocation,
} from '@/features/inventory/domain/InventoryModels';
import { useEditIngredientScreen } from '@/features/inventory/presentation/hooks/useEditIngredientScreen';

type EditIngredientScreenProps = {
    ingredientId: string;
};

export function EditIngredientScreen({ ingredientId }: EditIngredientScreenProps) {
    const screen = useEditIngredientScreen(ingredientId);

    if (!screen.ingredient) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar style="light" />
                <View style={styles.missingContainer}>
                    <Text style={styles.missingTitle}>Ingredient not found</Text>
                    <Text style={styles.missingText}>This ingredient cannot be edited right now.</Text>
                    <Pressable
                        accessibilityRole="button"
                        onPress={screen.navigation.goInventory}
                        style={styles.primaryButton}
                    >
                        <Text style={styles.primaryButtonText}>Back to Inventory</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Pressable accessibilityRole="button" onPress={screen.navigation.goBack}>
                        <Text style={styles.headerIcon}>{'<'}</Text>
                    </Pressable>
                    <Text style={styles.title}>Edit Ingredient</Text>
                    <Text style={styles.headerIcon}>...</Text>
                </View>

                <View style={styles.hero}>
                    <Text style={styles.heroTitle}>{screen.ingredient.name}</Text>
                    <Text style={styles.heroSubtitle}>Ingredient Detail</Text>
                    <View style={styles.cameraButton}>
                        <Text style={styles.cameraText}>C</Text>
                    </View>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Ingredient Name</Text>
                    <TextInput
                        onChangeText={(value) => screen.updateForm('name', value)}
                        style={styles.input}
                        value={screen.form.name}
                    />
                </View>

                <View style={styles.formRow}>
                    <View style={styles.formColumn}>
                        <Text style={styles.label}>Quantity</Text>
                        <TextInput
                            keyboardType="decimal-pad"
                            onChangeText={(value) => screen.updateForm('quantity', value)}
                            style={styles.input}
                            value={screen.form.quantity}
                        />
                    </View>
                    <View style={styles.formColumn}>
                        <Text style={styles.label}>Unit</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.chipRow}>
                                {screen.units.map((unit) => (
                                    <ChoiceChip<IngredientUnit>
                                        isActive={screen.form.unit === unit}
                                        key={unit}
                                        label={unit}
                                        onPress={(value) => screen.updateForm('unit', value)}
                                        value={unit}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.formRow}>
                    <View style={styles.formColumn}>
                        <Text style={styles.label}>Category</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.chipRow}>
                                {screen.categories.map((category) => (
                                    <ChoiceChip<IngredientCategory>
                                        isActive={screen.form.category === category.key}
                                        key={category.key}
                                        label={category.label}
                                        onPress={(value) => screen.updateForm('category', value)}
                                        value={category.key}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.formColumn}>
                        <Text style={styles.label}>Location</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.chipRow}>
                                {screen.locations.map((location) => (
                                    <ChoiceChip<InventoryLocation>
                                        isActive={screen.form.location === location}
                                        key={location}
                                        label={location}
                                        onPress={(value) => screen.updateForm('location', value)}
                                        value={location}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Storage Area</Text>
                    <TextInput
                        onChangeText={(value) => screen.updateForm('storageArea', value)}
                        style={styles.input}
                        value={screen.form.storageArea}
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Expiration Date</Text>
                    <TextInput
                        onChangeText={(value) => screen.updateForm('expirationDate', value)}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor={colors.textSubtle}
                        style={styles.input}
                        value={screen.form.expirationDate}
                    />
                </View>

                {screen.error ? <Text style={styles.errorText}>{screen.error}</Text> : null}

                <Pressable
                    accessibilityRole="button"
                    onPress={screen.handleUpdate}
                    style={styles.updateButton}
                >
                    <Text style={styles.updateButtonText}>Update Ingredient</Text>
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    onPress={screen.handleDelete}
                    style={styles.deleteButton}
                >
                    <Text style={styles.deleteButtonText}>Delete Ingredient</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

type ChoiceChipProps<Value extends string> = {
    isActive: boolean;
    label: string;
    onPress: (value: Value) => void;
    value: Value;
};

function ChoiceChip<Value extends string>({ isActive, label, onPress, value }: ChoiceChipProps<Value>) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={() => onPress(value)}
            style={[styles.choiceChip, isActive ? styles.choiceChipActive : null]}
        >
            <Text style={[styles.choiceChipText, isActive ? styles.choiceChipTextActive : null]}>
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
        flex: 1,
    },
    content: {
        gap: spacing.md,
        padding: spacing.md,
        paddingBottom: spacing.xl,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerIcon: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    title: {
        color: colors.primary,
        flex: 1,
        fontSize: typography.subtitle,
        fontWeight: '900',
        marginLeft: spacing.lg,
    },
    hero: {
        backgroundColor: '#2D241E',
        borderRadius: radius.md,
        justifyContent: 'flex-end',
        minHeight: 154,
        padding: spacing.md,
    },
    heroTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    heroSubtitle: {
        color: colors.primary,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    cameraButton: {
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderRadius: radius.pill,
        height: 32,
        justifyContent: 'center',
        position: 'absolute',
        right: spacing.md,
        top: spacing.md,
        width: 32,
    },
    cameraText: {
        color: colors.text,
        fontWeight: '900',
    },
    fieldGroup: {
        gap: spacing.sm,
    },
    formRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    formColumn: {
        flex: 1,
        gap: spacing.sm,
    },
    label: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    input: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.sm,
        borderWidth: 1,
        color: colors.text,
        fontSize: typography.label,
        minHeight: 48,
        paddingHorizontal: spacing.md,
    },
    chipRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    choiceChip: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.sm,
        borderWidth: 1,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
    },
    choiceChipActive: {
        borderColor: colors.primary,
    },
    choiceChipText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    choiceChipTextActive: {
        color: colors.primary,
    },
    errorText: {
        color: '#FF7777',
        fontSize: typography.caption,
        fontWeight: '800',
    },
    updateButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
        justifyContent: 'center',
        minHeight: 48,
    },
    updateButtonText: {
        color: colors.inputBackground,
        fontSize: typography.label,
        fontWeight: '900',
    },
    deleteButton: {
        alignItems: 'center',
        borderColor: '#8F4A4A',
        borderRadius: radius.sm,
        borderWidth: 1,
        justifyContent: 'center',
        minHeight: 48,
    },
    deleteButtonText: {
        color: '#FF9B9B',
        fontSize: typography.label,
        fontWeight: '900',
    },
    missingContainer: {
        alignItems: 'center',
        flex: 1,
        gap: spacing.md,
        justifyContent: 'center',
        padding: spacing.lg,
    },
    missingTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    missingText: {
        color: colors.textMuted,
        fontSize: typography.label,
        textAlign: 'center',
    },
    primaryButton: {
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    primaryButtonText: {
        color: colors.inputBackground,
        fontSize: typography.label,
        fontWeight: '900',
    },
});
