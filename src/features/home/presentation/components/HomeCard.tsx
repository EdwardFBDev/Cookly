import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/app/theme';

type HomeCardProps = PropsWithChildren<{
    variant?: 'default' | 'accent' | 'danger';
}>;

export function HomeCard({ children, variant = 'default' }: HomeCardProps) {
    return (
        <View
            style={[
                styles.card,
                variant === 'accent' ? styles.accentCard : null,
                variant === 'danger' ? styles.dangerCard : null,
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.backgroundElevated,
        borderRadius: radius.md,
        padding: spacing.md,
    },
    accentCard: {
        backgroundColor: '#39231F',
    },
    dangerCard: {
        backgroundColor: '#3A2025',
    },
});
