import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';

type OnboardingPrimaryButtonProps = {
    label: string;
    onPress: () => void;
};

export function OnboardingPrimaryButton({ label, onPress }: OnboardingPrimaryButtonProps) {
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
        borderRadius: radius.xl,
        flexDirection: 'row',
        gap: spacing.sm,
        height: 43,
        justifyContent: 'center',
    },
    buttonPressed: {
        backgroundColor: colors.primaryPressed,
    },
    label: {
        color: colors.inputBackground,
        fontSize: typography.label,
        fontWeight: '900',
    },
    arrowStem: {
        backgroundColor: colors.inputBackground,
        height: 2,
        width: 14,
    },
    arrowHead: {
        color: colors.inputBackground,
        fontSize: typography.body,
        fontWeight: '900',
        marginLeft: -12,
    },
});
