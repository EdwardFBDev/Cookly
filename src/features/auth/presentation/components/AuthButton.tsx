import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';

type AuthButtonVariant = 'primary' | 'outline' | 'link';

type AuthButtonProps = {
    label: string;
    onPress: () => void;
    variant?: AuthButtonVariant;
    icon?: string;
    accessibilityLabel?: string;
};

export function AuthButton({
    label,
    onPress,
    variant = 'primary',
    icon,
    accessibilityLabel,
}: AuthButtonProps) {
    return (
        <Pressable
            accessibilityLabel={accessibilityLabel ?? label}
            accessibilityRole="button"
            onPress={onPress}
            style={({ pressed }) => [
                styles.base,
                styles[variant],
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.content}>
                {icon ? <Text style={styles.icon}>{icon}</Text> : null}
                <Text style={[styles.label, styles[`${variant}Label`]]}>{label}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        borderRadius: radius.md,
        justifyContent: 'center',
        minHeight: 48,
    },
    primary: {
        backgroundColor: colors.primary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderColor: colors.border,
        borderWidth: 1,
        minHeight: 42,
    },
    link: {
        minHeight: 20,
        paddingHorizontal: spacing.xs,
    },
    pressed: {
        opacity: 0.82,
    },
    content: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.sm,
        justifyContent: 'center',
    },
    icon: {
        color: colors.text,
        fontSize: typography.caption,
        fontWeight: '700',
    },
    label: {
        fontSize: typography.caption,
        fontWeight: '700',
    },
    primaryLabel: {
        color: colors.primaryMuted,
    },
    outlineLabel: {
        color: colors.text,
        fontWeight: '600',
    },
    linkLabel: {
        color: colors.primary,
    },
});
