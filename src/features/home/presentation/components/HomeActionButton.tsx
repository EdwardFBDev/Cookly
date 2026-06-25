import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, typography } from '@/app/theme';

type HomeActionButtonProps = {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'outline';
};

export function HomeActionButton({
    label,
    onPress,
    variant = 'primary',
}: HomeActionButtonProps) {
    const isOutline = variant === 'outline';

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={label}
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                isOutline ? styles.outlineButton : styles.primaryButton,
                pressed ? styles.pressed : null,
            ]}
        >
            <Text style={[styles.label, isOutline ? styles.outlineLabel : null]}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: radius.pill,
        height: 40,
        justifyContent: 'center',
    },
    primaryButton: {
        backgroundColor: colors.primary,
    },
    outlineButton: {
        borderColor: colors.border,
        borderWidth: 1,
    },
    pressed: {
        opacity: 0.78,
    },
    label: {
        color: colors.inputBackground,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    outlineLabel: {
        color: colors.primary,
    },
});
