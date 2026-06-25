import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';

type AuthTextInputProps = TextInputProps & {
    label: string;
    helperActionLabel?: string;
    onHelperActionPress?: () => void;
    leadingIcon?: string;
    trailingActionLabel?: string;
    onTrailingActionPress?: () => void;
};

export function AuthTextInput({
    label,
    helperActionLabel,
    onHelperActionPress,
    leadingIcon,
    trailingActionLabel,
    onTrailingActionPress,
    style,
    ...inputProps
}: AuthTextInputProps) {
    return (
        <View style={styles.container}>
            <View style={styles.labelRow}>
                <Text style={styles.label}>{label}</Text>
                {helperActionLabel && onHelperActionPress ? (
                    <Pressable
                        accessibilityLabel={helperActionLabel}
                        accessibilityRole="button"
                        onPress={onHelperActionPress}
                    >
                        <Text style={styles.helperAction}>{helperActionLabel}</Text>
                    </Pressable>
                ) : null}
            </View>

            <View style={styles.inputShell}>
                {leadingIcon ? <Text style={styles.leadingIcon}>{leadingIcon}</Text> : null}
                <TextInput
                    placeholderTextColor={colors.textSubtle}
                    selectionColor={colors.primary}
                    style={[styles.input, style]}
                    {...inputProps}
                />
                {trailingActionLabel && onTrailingActionPress ? (
                    <Pressable
                        accessibilityLabel={trailingActionLabel}
                        accessibilityRole="button"
                        hitSlop={spacing.sm}
                        onPress={onTrailingActionPress}
                    >
                        <Text style={styles.trailingAction}>{trailingActionLabel}</Text>
                    </Pressable>
                ) : null}
            </View>
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
    helperAction: {
        color: colors.primary,
        fontSize: typography.caption,
        fontWeight: '700',
    },
    inputShell: {
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        flexDirection: 'row',
        minHeight: 42,
        paddingHorizontal: spacing.sm,
    },
    leadingIcon: {
        color: colors.textMuted,
        fontSize: typography.body,
        fontWeight: '700',
        marginRight: spacing.sm,
        width: 24,
    },
    input: {
        color: colors.text,
        flex: 1,
        fontSize: typography.label,
        minHeight: 40,
        paddingVertical: 0,
    },
    trailingAction: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '700',
        marginLeft: spacing.sm,
    },
});
