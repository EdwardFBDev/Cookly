import { PropsWithChildren, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import {
    CooklyIcon,
    CooklyButton as DesignSystemButton,
} from '@/shared/presentation/components/CooklyUI';

type CookingScreenShellProps = PropsWithChildren<{
    footer?: ReactNode;
}>;

export function CookingScreenShell({ children, footer }: CookingScreenShellProps) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>{children}</View>
            {footer}
        </SafeAreaView>
    );
}

type CookingHeaderProps = {
    title: string;
    onBackPress?: () => void;
    rightLabel?: string;
};

export function CookingHeader({ onBackPress, rightLabel, title }: CookingHeaderProps) {
    return (
        <View accessibilityLabel={title} style={styles.header}>
            {onBackPress ? (
                <Pressable accessibilityRole="button" onPress={onBackPress} style={styles.iconButton}>
                    <CooklyIcon color={colors.text} name="close" size={typography.label} />
                </Pressable>
            ) : (
                <View style={styles.iconButton} />
            )}
            <View style={styles.headerTitleGroup}>
                <Text style={styles.eyebrow}>Cooking Wizard</Text>
                <Text style={styles.brand}>Cookly</Text>
            </View>
            <Text style={styles.rightLabel}>{rightLabel}</Text>
        </View>
    );
}

type CookingProgressProps = {
    currentStep: number;
    label: string;
    nextLabel?: string;
};

export function CookingProgress({ currentStep, label, nextLabel }: CookingProgressProps) {
    return (
        <View style={styles.progressWrapper}>
            <View style={styles.progressLabels}>
                <Text style={styles.progressCurrent}>Step {currentStep}: {label}</Text>
                {nextLabel ? <Text style={styles.progressNext}>Next: {nextLabel}</Text> : null}
            </View>
            <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${(currentStep / 3) * 100}%` }]} />
            </View>
        </View>
    );
}

type CookingButtonProps = {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'outline';
};

export function CookingButton({ disabled = false, label, onPress, variant = 'primary' }: CookingButtonProps) {
    return (
        <DesignSystemButton
            disabled={disabled}
            fullWidth
            label={label}
            onPress={onPress}
            variant={variant}
        />
    );
}

type CookingNoticeProps = {
    title: string;
    text: string;
};

export function CookingNotice({ text, title }: CookingNoticeProps) {
    return (
        <View style={styles.notice}>
            <CooklyIcon name="info" size={typography.label} />
            <View style={styles.noticeBody}>
                <Text style={styles.noticeTitle}>{title}</Text>
                <Text style={styles.noticeText}>{text}</Text>
            </View>
        </View>
    );
}

type MissingCookingRecipeStateProps = {
    onRecipeCatalogPress: () => void;
};

export function MissingCookingRecipeState({ onRecipeCatalogPress }: MissingCookingRecipeStateProps) {
    return (
        <CookingScreenShell>
            <View style={styles.missingState}>
                <Text style={styles.missingTitle}>Recipe not found</Text>
                <Text style={styles.missingText}>
                    This cooking session needs a valid recipe from the local catalog.
                </Text>
                <CookingButton label="Back to Recipes" onPress={onRecipeCatalogPress} />
            </View>
        </CookingScreenShell>
    );
}

export function CookingPreparingState() {
    return (
        <CookingScreenShell>
            <View style={styles.missingState}>
                <Text style={styles.missingTitle}>Preparing cooking session</Text>
                <Text style={styles.missingText}>Cookly is loading your recipe ingredients.</Text>
            </View>
        </CookingScreenShell>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        borderBottomColor: colors.borderMuted,
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    iconButton: {
        alignItems: 'center',
        height: 38,
        justifyContent: 'center',
        width: 38,
    },
    headerTitleGroup: {
        alignItems: 'center',
        flex: 1,
    },
    eyebrow: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.8,
        textTransform: 'uppercase',
    },
    brand: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    rightLabel: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '800',
        width: 62,
    },
    progressWrapper: {
        gap: spacing.xs,
    },
    progressLabels: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressCurrent: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    progressNext: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '800',
    },
    progressTrack: {
        backgroundColor: colors.borderMuted,
        borderRadius: radius.pill,
        height: 5,
        overflow: 'hidden',
    },
    progressFill: {
        backgroundColor: colors.primary,
        height: '100%',
    },
    notice: {
        alignItems: 'flex-start',
        backgroundColor: '#2A2110',
        borderColor: colors.primaryMuted,
        borderRadius: radius.md,
        borderWidth: 1,
        flexDirection: 'row',
        gap: spacing.sm,
        padding: spacing.md,
    },
    noticeBody: {
        flex: 1,
        gap: 2,
    },
    noticeTitle: {
        color: colors.text,
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    noticeText: {
        color: colors.textMuted,
        fontSize: 11,
        lineHeight: 16,
    },
    missingState: {
        alignItems: 'center',
        flex: 1,
        gap: spacing.md,
        justifyContent: 'center',
        padding: spacing.lg,
    },
    missingTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    missingText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        lineHeight: 20,
        textAlign: 'center',
    },
});
