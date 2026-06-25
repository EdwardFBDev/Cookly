import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';

type HomeHeaderProps = {
    onNotificationsPress?: () => void;
};

export function HomeHeader({ onNotificationsPress }: HomeHeaderProps) {
    return (
        <View style={styles.header}>
            <View style={styles.locationRow}>
                <Text style={styles.locationPin}>v</Text>
                <Text style={styles.location}>Casa</Text>
            </View>
            {onNotificationsPress ? (
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Open notifications"
                    onPress={onNotificationsPress}
                    style={({ pressed }) => [
                        styles.iconButton,
                        pressed ? styles.iconButtonPressed : null,
                    ]}
                >
                    <Text style={styles.iconText}>!</Text>
                </Pressable>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: spacing.md,
    },
    locationRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.xs,
    },
    locationPin: {
        color: colors.primary,
        fontSize: typography.body,
        fontWeight: '900',
    },
    location: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    iconButton: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderRadius: radius.pill,
        height: 32,
        justifyContent: 'center',
        width: 32,
    },
    iconButtonPressed: {
        backgroundColor: colors.backgroundMuted,
    },
    iconText: {
        color: colors.primary,
        fontSize: typography.label,
        fontWeight: '900',
    },
});
