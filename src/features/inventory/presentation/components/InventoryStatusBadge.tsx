import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/app/theme';
import { STATUS_LABELS } from '@/features/inventory/application/inventoryContent';
import { InventoryStatus } from '@/features/inventory/domain/InventoryModels';

type InventoryStatusBadgeProps = {
    status: InventoryStatus;
};

export function InventoryStatusBadge({ status }: InventoryStatusBadgeProps) {
    const tone = STATUS_TONES[status];

    return (
        <View style={[styles.badge, { backgroundColor: tone.background, borderColor: tone.border }]}>
            <Text style={[styles.text, { color: tone.text }]}>{STATUS_LABELS[status]}</Text>
        </View>
    );
}

const STATUS_TONES: Record<InventoryStatus, { background: string; border: string; text: string }> = {
    available: {
        background: '#213B25',
        border: '#3A8C40',
        text: '#62D46B',
    },
    'expiring-soon': {
        background: colors.primaryMuted,
        border: colors.primary,
        text: '#F9E35C',
    },
    urgent: {
        background: '#46320C',
        border: '#D58E00',
        text: '#FFAA00',
    },
    expired: {
        background: '#4A2222',
        border: '#D65A5A',
        text: '#FF7777',
    },
    'out-of-stock': {
        background: colors.backgroundMuted,
        border: colors.borderMuted,
        text: colors.textMuted,
    },
};

const styles = StyleSheet.create({
    badge: {
        borderRadius: radius.sm,
        borderWidth: 1,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    text: {
        fontSize: 9,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
});
