import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';

type AuthPrimaryButtonProps = {
    label: string;
    onPress: () => void;
};

export function AuthPrimaryButton({ label, onPress }: AuthPrimaryButtonProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={label}
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                pressed ? styles.buttonPressed : null,
            ]}
        >
            <Text style={styles.label}>{label}</Text>
            <View style={styles.arrowStem} />
            <Text style={styles.arrowHead}>{'>'}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.md,
        flexDirection: 'row',
        gap: spacing.sm,
        height: 41,
        justifyContent: 'center',
    },
    buttonPressed: {
        backgroundColor: colors.primaryPressed,
    },
    label: {
        color: colors.inputBackground,
        fontSize: typography.caption,
        fontWeight: '800',
    },
    arrowStem: {
        backgroundColor: colors.inputBackground,
        height: 2,
        width: 13,
    },
    arrowHead: {
        color: colors.inputBackground,
        fontSize: typography.body,
        fontWeight: '800',
        marginLeft: -12,
    },
});
