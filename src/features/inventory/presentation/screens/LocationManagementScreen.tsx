import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { HomeBottomNavigation } from '@/features/home/presentation/components/HomeBottomNavigation';
import { InventoryLocation } from '@/features/inventory/domain/InventoryModels';
import { useLocationManagementScreen } from '@/features/inventory/presentation/hooks/useLocationManagementScreen';

export function LocationManagementScreen() {
    const screen = useLocationManagementScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Pressable accessibilityRole="button" onPress={screen.navigation.goInventory}>
                        <Text style={styles.headerIcon}>{'<'}</Text>
                    </Pressable>
                    <Text style={styles.headerTitle}>Inventory</Text>
                    <Text style={styles.headerIcon}>...</Text>
                </View>

                <View style={styles.titleRow}>
                    <View>
                        <Text style={styles.title}>Storage Locations</Text>
                        <Text style={styles.subtitle}>Manage your pantry and kitchen spaces.</Text>
                    </View>
                    <Pressable
                        accessibilityRole="button"
                        onPress={screen.handleAddLocation}
                        style={styles.createButton}
                    >
                        <Text style={styles.createButtonText}>+ Create</Text>
                    </Pressable>
                </View>

                {screen.error ? <Text style={styles.errorText}>{screen.error}</Text> : null}

                <View style={styles.locationList}>
                    {screen.locationSummaries.map((location) => (
                        <View
                            key={location.id}
                            style={[
                                styles.locationCard,
                                screen.selectedLocation === location.id ? styles.locationCardActive : null,
                            ]}
                        >
                            <Pressable
                                accessibilityRole="button"
                                onPress={() => screen.handleSelectLocation(location.id)}
                                style={styles.locationMain}
                            >
                                <View style={styles.locationIcon}>
                                    <Text style={styles.locationIconText}>{location.name.charAt(0)}</Text>
                                </View>
                                <View style={styles.locationInfo}>
                                    <Text style={styles.locationName}>{location.name}</Text>
                                    <Text style={styles.locationMeta}>
                                        {location.itemCount} {location.itemCount === 1 ? 'item' : 'items'}
                                    </Text>
                                </View>
                                <Text style={styles.chevron}>{'>'}</Text>
                            </Pressable>

                            <View style={styles.locationActions}>
                                <Pressable
                                    accessibilityRole="button"
                                    onPress={() => screen.handleSelectLocation(location.id)}
                                    style={styles.secondaryAction}
                                >
                                    <Text style={styles.secondaryActionText}>Use Location</Text>
                                </Pressable>
                                <Pressable
                                    accessibilityRole="button"
                                    onPress={() => screen.requestDeleteLocation(location.id)}
                                    style={styles.deleteAction}
                                >
                                    <Text style={styles.deleteActionText}>Delete</Text>
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {screen.deleteTargetSummary && screen.relocationTarget ? (
                <DeleteLocationModal
                    itemCount={screen.deleteTargetSummary.itemCount}
                    locationName={screen.deleteTargetSummary.name}
                    onCancel={screen.cancelDelete}
                    onComplete={screen.completeLocationDelete}
                    relocationTarget={screen.relocationTarget}
                />
            ) : null}

            <HomeBottomNavigation
                activeTab="inventory"
                onHomePress={screen.navigation.goHome}
                onInventoryPress={screen.navigation.goInventory}
                onPlanPress={screen.navigation.goPlan}
                onRecipesPress={screen.navigation.goRecipes}
                onShoppingPress={screen.navigation.goShopping}
            />
        </SafeAreaView>
    );
}

type DeleteLocationModalProps = {
    itemCount: number;
    locationName: string;
    onCancel: () => void;
    onComplete: () => void;
    relocationTarget: InventoryLocation;
};

function DeleteLocationModal({
    itemCount,
    locationName,
    onCancel,
    onComplete,
    relocationTarget,
}: DeleteLocationModalProps) {
    return (
        <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>Delete '{locationName}'?</Text>
                <Text style={styles.modalSubtitle}>Requires item relocation</Text>

                <View style={styles.transferRoute}>
                    <Text style={styles.transferText}>{locationName}</Text>
                    <Text style={styles.transferArrow}>{'->'}</Text>
                    <Text style={styles.transferText}>{relocationTarget}</Text>
                </View>

                <View style={styles.progressCard}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressText}>Transferring {itemCount} items...</Text>
                        <Text style={styles.progressText}>75%</Text>
                    </View>
                    <View style={styles.progressTrack}>
                        <View style={styles.progressFill} />
                    </View>
                </View>

                <View style={styles.modalActions}>
                    <Pressable accessibilityRole="button" onPress={onCancel} style={styles.modalCancel}>
                        <Text style={styles.modalCancelText}>Cancel</Text>
                    </Pressable>
                    <Pressable accessibilityRole="button" onPress={onComplete} style={styles.modalComplete}>
                        <Text style={styles.modalCompleteText}>Completing...</Text>
                    </Pressable>
                </View>
            </View>
        </View>
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
        paddingBottom: 116,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.md,
    },
    headerIcon: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    headerTitle: {
        color: colors.primary,
        flex: 1,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    titleRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    createButton: {
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    createButtonText: {
        color: colors.inputBackground,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    errorText: {
        color: '#FF7777',
        fontSize: typography.caption,
        fontWeight: '800',
    },
    locationList: {
        gap: spacing.md,
    },
    locationCard: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: spacing.md,
        padding: spacing.md,
    },
    locationCardActive: {
        borderColor: colors.primary,
    },
    locationMain: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.md,
    },
    locationIcon: {
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderRadius: radius.pill,
        height: 42,
        justifyContent: 'center',
        width: 42,
    },
    locationIconText: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    locationInfo: {
        flex: 1,
    },
    locationName: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    locationMeta: {
        color: colors.textMuted,
        fontSize: typography.caption,
        marginTop: spacing.xs,
    },
    chevron: {
        color: colors.textMuted,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    locationActions: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    secondaryAction: {
        alignItems: 'center',
        borderColor: colors.borderMuted,
        borderRadius: radius.sm,
        borderWidth: 1,
        flex: 1,
        paddingVertical: spacing.sm,
    },
    secondaryActionText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    deleteAction: {
        alignItems: 'center',
        borderColor: '#8F4A4A',
        borderRadius: radius.sm,
        borderWidth: 1,
        flex: 1,
        paddingVertical: spacing.sm,
    },
    deleteActionText: {
        color: '#FF9B9B',
        fontSize: typography.caption,
        fontWeight: '900',
    },
    modalBackdrop: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        bottom: 0,
        justifyContent: 'center',
        left: 0,
        padding: spacing.lg,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    modalCard: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.lg,
        borderWidth: 1,
        gap: spacing.md,
        padding: spacing.lg,
        width: '100%',
    },
    modalTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    modalSubtitle: {
        color: colors.textMuted,
        fontSize: typography.caption,
    },
    transferRoute: {
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: spacing.md,
    },
    transferText: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    transferArrow: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    progressCard: {
        backgroundColor: colors.backgroundMuted,
        borderRadius: radius.sm,
        gap: spacing.sm,
        padding: spacing.md,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressText: {
        color: colors.primary,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    progressTrack: {
        backgroundColor: colors.inputBackground,
        borderRadius: radius.pill,
        height: 6,
        overflow: 'hidden',
    },
    progressFill: {
        backgroundColor: colors.primary,
        height: '100%',
        width: '75%',
    },
    modalActions: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    modalCancel: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingVertical: spacing.md,
    },
    modalCancelText: {
        color: colors.textMuted,
        fontSize: typography.label,
        fontWeight: '900',
    },
    modalComplete: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        flex: 1,
        justifyContent: 'center',
        paddingVertical: spacing.md,
    },
    modalCompleteText: {
        color: colors.inputBackground,
        fontSize: typography.label,
        fontWeight: '900',
    },
});
