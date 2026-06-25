import { StatusBar } from 'expo-status-bar';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import {
    IngredientCategory,
    IngredientUnit,
    InventoryLocation,
} from '@/features/inventory/domain/InventoryModels';
import { useAddIngredientScreen } from '@/features/inventory/presentation/hooks/useAddIngredientScreen';

export function AddIngredientScreen() {
    const screen = useAddIngredientScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flex}
            >
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Pressable accessibilityRole="button" onPress={screen.navigation.goInventory}>
                            <Text style={styles.closeText}>x</Text>
                        </Pressable>
                        <Text style={styles.title}>New Ingredient</Text>
                        <Pressable
                            accessibilityRole="button"
                            onPress={() => screen.updateForm('expirationDate', '')}
                        >
                            <Text style={styles.helpText}>?</Text>
                        </Pressable>
                    </View>

                    <View style={styles.hero}>
                        <Text style={styles.heroKicker}>Inventory Detail</Text>
                        <Text style={styles.heroTitle}>Essentials Entry</Text>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Ingredient Name</Text>
                        <TextInput
                            onChangeText={(value) => screen.updateForm('name', value)}
                            placeholder="e.g., Organic Chicken Breast"
                            placeholderTextColor={colors.textSubtle}
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
                                placeholder="0.00"
                                placeholderTextColor={colors.textSubtle}
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

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Category</Text>
                        <View style={styles.chipWrap}>
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
                    </View>

                    <View style={styles.fieldGroup}>
                        <View style={styles.optionalRow}>
                            <Text style={styles.label}>Expiration Date</Text>
                            <Text style={styles.optionalText}>Optional</Text>
                        </View>
                        <TextInput
                            onChangeText={(value) => screen.updateForm('expirationDate', value)}
                            placeholder="YYYY-MM-DD"
                            placeholderTextColor={colors.textSubtle}
                            style={styles.input}
                            value={screen.form.expirationDate}
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Storage Location</Text>
                        <View style={styles.locationGrid}>
                            {screen.locations.map((location) => (
                                <LocationCard
                                    isActive={screen.form.location === location}
                                    key={location}
                                    location={location}
                                    onPress={(value) => screen.updateForm('location', value)}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Storage Area</Text>
                        <TextInput
                            onChangeText={(value) => screen.updateForm('storageArea', value)}
                            placeholder="e.g., Refrigerator"
                            placeholderTextColor={colors.textSubtle}
                            style={styles.input}
                            value={screen.form.storageArea}
                        />
                    </View>

                    {screen.error ? <Text style={styles.errorText}>{screen.error}</Text> : null}

                    <Pressable
                        accessibilityRole="button"
                        onPress={screen.handleSave}
                        style={styles.saveButton}
                    >
                        <Text style={styles.saveButtonText}>Save Ingredient</Text>
                    </Pressable>

                    <Pressable
                        accessibilityRole="button"
                        onPress={screen.navigation.goInventory}
                        style={styles.cancelButton}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
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

type LocationCardProps = {
    isActive: boolean;
    location: InventoryLocation;
    onPress: (location: InventoryLocation) => void;
};

function LocationCard({ isActive, location, onPress }: LocationCardProps) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={() => onPress(location)}
            style={[styles.locationCard, isActive ? styles.locationCardActive : null]}
        >
            <Text style={[styles.locationIcon, isActive ? styles.locationTextActive : null]}>
                {location.charAt(0)}
            </Text>
            <Text style={[styles.locationText, isActive ? styles.locationTextActive : null]}>
                {location}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
        flex: 1,
    },
    flex: {
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
        marginLeft: spacing.lg,
    },
    helpText: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    hero: {
        backgroundColor: '#30241B',
        borderRadius: radius.lg,
        minHeight: 106,
        justifyContent: 'flex-end',
        padding: spacing.md,
    },
    heroKicker: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    heroTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    fieldGroup: {
        gap: spacing.sm,
    },
    label: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    input: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        color: colors.text,
        fontSize: typography.label,
        minHeight: 48,
        paddingHorizontal: spacing.md,
    },
    formRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    formColumn: {
        flex: 1,
        gap: spacing.sm,
    },
    chipRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    chipWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    choiceChip: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.pill,
        borderWidth: 1,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    choiceChipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    choiceChipText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    choiceChipTextActive: {
        color: colors.inputBackground,
    },
    optionalRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    optionalText: {
        color: colors.primary,
        fontSize: 9,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    locationGrid: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    locationCard: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.md,
        borderWidth: 1,
        flex: 1,
        gap: spacing.sm,
        minHeight: 86,
        justifyContent: 'center',
    },
    locationCardActive: {
        backgroundColor: colors.primaryMuted,
        borderColor: colors.primary,
    },
    locationIcon: {
        color: colors.textMuted,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    locationText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    locationTextActive: {
        color: colors.primary,
    },
    errorText: {
        color: '#FF7777',
        fontSize: typography.caption,
        fontWeight: '800',
    },
    saveButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        justifyContent: 'center',
        minHeight: 48,
    },
    saveButtonText: {
        color: colors.inputBackground,
        fontSize: typography.label,
        fontWeight: '900',
    },
    cancelButton: {
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    cancelButtonText: {
        color: colors.textMuted,
        fontSize: typography.label,
        fontWeight: '900',
    },
});
