import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';

type WelcomeBenefitCardProps = {
    icon: string;
    title: string;
    description: string;
};

export function WelcomeBenefitCard({ icon, title, description }: WelcomeBenefitCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.sm,
        borderWidth: 1,
        flex: 1,
        minHeight: 95,
        padding: spacing.sm,
    },
    icon: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
        marginBottom: spacing.sm,
    },
    title: {
        color: colors.text,
        fontSize: typography.caption,
        fontWeight: '900',
        marginBottom: 2,
    },
    description: {
        color: colors.textMuted,
        fontSize: 11,
        fontWeight: '700',
        lineHeight: 15,
    },
});
