import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { OnboardingPrimaryButton } from '@/features/onboarding/presentation/components/OnboardingPrimaryButton';
import { WelcomeBenefitCard } from '@/features/onboarding/presentation/components/WelcomeBenefitCard';
import { useWelcomeScreen } from '@/features/onboarding/presentation/hooks/useWelcomeScreen';

export function WelcomeScreen() {
    const welcome = useWelcomeScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.heroImage} accessibilityRole="image">
                    <View style={styles.heroGlow} />
                    <View style={styles.herbCluster}>
                        <Text style={styles.herbText}>***</Text>
                        <Text style={styles.herbText}>***</Text>
                        <Text style={styles.herbText}>***</Text>
                    </View>
                    <View style={[styles.jar, styles.jarLarge]}>
                        <View style={styles.jarLid} />
                        <View style={styles.jarFill} />
                    </View>
                    <View style={[styles.jar, styles.jarSmall]}>
                        <View style={styles.jarLid} />
                        <View style={styles.jarFillMuted} />
                    </View>
                    <View style={styles.board}>
                        <View style={styles.tomato} />
                        <View style={[styles.tomato, styles.tomatoSmall]} />
                    </View>
                    <View style={styles.heroShadow} />
                </View>

                <View style={styles.brandRow}>
                    <Text style={styles.logoMark}>{'><'}</Text>
                    <Text style={styles.brandName}>Cookly</Text>
                </View>

                <Text style={styles.title}>Hello, Chef!</Text>
                <Text style={styles.subtitle}>
                    Master your kitchen with smart food planning. Reduce waste, save money,
                    and discover recipes based on what you already have.
                </Text>

                <View style={styles.benefitRow}>
                    <WelcomeBenefitCard
                        icon="[=]"
                        title="Live Inventory"
                        description="Track ingredients in real-time."
                    />
                    <WelcomeBenefitCard
                        icon="AI"
                        title="AI Matching"
                        description="Recipes that use what's expiring."
                    />
                </View>

                <OnboardingPrimaryButton
                    label="Get Started"
                    onPress={welcome.handleGetStarted}
                />

                <Text style={styles.socialProof}>
                    Join 10,000+ home cooks saving time and food.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
        flex: 1,
    },
    content: {
        flexGrow: 1,
        padding: spacing.md,
        paddingTop: spacing.xl,
    },
    heroImage: {
        backgroundColor: '#17130F',
        borderRadius: radius.sm,
        height: 315,
        justifyContent: 'flex-end',
        marginBottom: spacing.lg,
        overflow: 'hidden',
    },
    heroGlow: {
        backgroundColor: colors.primaryMuted,
        borderRadius: radius.pill,
        height: 210,
        opacity: 0.28,
        position: 'absolute',
        right: -70,
        top: -30,
        width: 210,
    },
    herbCluster: {
        alignItems: 'center',
        bottom: 68,
        left: 120,
        position: 'absolute',
        zIndex: 3,
    },
    herbText: {
        color: '#72B52F',
        fontSize: typography.display,
        fontWeight: '900',
        lineHeight: 24,
    },
    jar: {
        backgroundColor: 'rgba(242, 238, 232, 0.18)',
        borderColor: 'rgba(242, 238, 232, 0.45)',
        borderRadius: radius.sm,
        borderWidth: 1,
        justifyContent: 'flex-end',
        overflow: 'hidden',
        position: 'absolute',
    },
    jarLarge: {
        bottom: 62,
        height: 96,
        left: 38,
        width: 74,
    },
    jarSmall: {
        bottom: 62,
        height: 62,
        right: 100,
        width: 58,
    },
    jarLid: {
        backgroundColor: '#C96D32',
        height: 5,
        position: 'absolute',
        top: 7,
        width: '100%',
    },
    jarFill: {
        backgroundColor: '#9B6A2E',
        height: 34,
    },
    jarFillMuted: {
        backgroundColor: '#6E4E28',
        height: 24,
    },
    board: {
        backgroundColor: '#5A351B',
        borderRadius: radius.pill,
        bottom: 46,
        height: 12,
        position: 'absolute',
        right: 62,
        width: 110,
        zIndex: 2,
    },
    tomato: {
        backgroundColor: '#B84424',
        borderRadius: radius.pill,
        height: 14,
        position: 'absolute',
        right: 30,
        top: -9,
        width: 14,
    },
    tomatoSmall: {
        height: 10,
        right: 46,
        top: -6,
        width: 10,
    },
    heroShadow: {
        backgroundColor: 'rgba(0, 0, 0, 0.56)',
        bottom: 0,
        height: 55,
        position: 'absolute',
        width: '100%',
    },
    brandRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.sm,
        justifyContent: 'center',
        marginBottom: spacing.md,
    },
    logoMark: {
        color: colors.primary,
        fontSize: typography.title,
        fontWeight: '900',
    },
    brandName: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    title: {
        color: colors.text,
        fontSize: typography.title,
        fontWeight: '900',
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        color: colors.textMuted,
        fontSize: typography.label,
        lineHeight: 22,
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
    benefitRow: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    socialProof: {
        color: colors.textMuted,
        fontSize: 11,
        fontWeight: '800',
        marginTop: spacing.md,
        textAlign: 'center',
    },
});
