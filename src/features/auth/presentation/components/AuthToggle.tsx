import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';

type AuthToggleProps = {
    label: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
};

export function AuthToggle({ label, value, onValueChange }: AuthToggleProps) {
    return (
        <Pressable
            accessibilityLabel={label}
            accessibilityRole="switch"
            accessibilityState={{ checked: value }}
            onPress={() => onValueChange(!value)}
            style={styles.container}
        >
            <View style={[styles.track, value && styles.trackActive]}>
                <View style={[styles.thumb, value && styles.thumbActive]} />
            </View>
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.sm,
    },
    track: {
        backgroundColor: colors.backgroundMuted,
        borderRadius: radius.pill,
        height: 22,
        justifyContent: 'center',
        paddingHorizontal: 2,
        width: 40,
    },
    trackActive: {
        backgroundColor: colors.primaryMuted,
    },
    thumb: {
        backgroundColor: colors.white,
        borderRadius: radius.pill,
        height: 18,
        width: 18,
    },
    thumbActive: {
        alignSelf: 'flex-end',
    },
    label: {
        color: colors.textMuted,
        fontSize: typography.caption,
    },
});
