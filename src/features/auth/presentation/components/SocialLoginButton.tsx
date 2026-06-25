import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';

type SocialLoginButtonProps = {
    provider: 'Google' | 'Apple';
    onPress: () => void;
};

export function SocialLoginButton({ provider, onPress }: SocialLoginButtonProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Continue with ${provider}`}
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                pressed ? styles.buttonPressed : null,
            ]}
        >
            <View style={styles.iconBox}>
                <Text style={styles.iconText}>{provider === 'Google' ? 'G' : 'A'}</Text>
            </View>
            <Text style={styles.label}>{provider}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        gap: spacing.sm,
        height: 41,
        justifyContent: 'center',
    },
    buttonPressed: {
        backgroundColor: colors.backgroundMuted,
    },
    iconBox: {
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderRadius: 2,
        height: 17,
        justifyContent: 'center',
        width: 17,
    },
    iconText: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '900',
    },
    label: {
        color: colors.text,
        fontSize: typography.caption,
        fontWeight: '600',
    },
});
