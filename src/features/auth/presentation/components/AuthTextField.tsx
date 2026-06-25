import { ReactNode } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';

type AuthTextFieldProps = TextInputProps & {
    label: string;
    leadingIcon: ReactNode;
    error?: string;
    trailingLabel?: string;
    onTrailingPress?: () => void;
    inputActionLabel?: string;
    onInputActionPress?: () => void;
};

export function AuthTextField({
    label,
    leadingIcon,
    error,
    trailingLabel,
    onTrailingPress,
    inputActionLabel,
    onInputActionPress,
    style,
    ...inputProps
}: AuthTextFieldProps) {
    return (
        <View style={styles.container}>
            <View style={styles.labelRow}>
                <Text style={styles.label}>{label}</Text>
                {trailingLabel ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={trailingLabel}
                        onPress={onTrailingPress}
                    >
                        <Text style={styles.trailingLabel}>{trailingLabel}</Text>
                    </Pressable>
                ) : null}
            </View>

            <View style={[styles.inputShell, error ? styles.inputShellError : null]}>
                <View style={styles.iconSlot}>{leadingIcon}</View>
                <TextInput
                    {...inputProps}
                    placeholderTextColor={colors.textSubtle}
                    style={[styles.input, style]}
                />
                {inputActionLabel ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={inputActionLabel}
                        onPress={onInputActionPress}
                        style={styles.inputAction}
                    >
                        <Text style={styles.inputActionText}>{inputActionLabel}</Text>
                    </Pressable>
                ) : null}
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.sm,
    },
    labelRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '700',
    },
    trailingLabel: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: '800',
    },
    inputShell: {
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        flexDirection: 'row',
        minHeight: 40,
        paddingHorizontal: spacing.sm,
    },
    inputShellError: {
        borderColor: '#D9674F',
    },
    iconSlot: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 26,
    },
    input: {
        color: colors.text,
        flex: 1,
        fontSize: typography.label,
        paddingVertical: spacing.sm,
    },
    inputAction: {
        paddingHorizontal: spacing.xs,
        paddingVertical: spacing.xs,
    },
    inputActionText: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '800',
    },
    error: {
        color: '#F08A74',
        fontSize: typography.caption,
        lineHeight: 16,
    },
});
