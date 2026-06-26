import { StatusBar } from 'expo-status-bar';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';
import { CookingDeductionResult } from '@/features/cooking/domain/CookingModels';
import {
    CookingButton,
    CookingHeader,
    CookingNotice,
    CookingPreparingState,
    CookingProgress,
    CookingScreenShell,
    MissingCookingRecipeState,
} from '@/features/cooking/presentation/components/CookingFlowComponents';
import { useCookingSuccessScreen } from '@/features/cooking/presentation/hooks/useCookingSuccessScreen';
import { CooklyIcon, CooklyTopAppBar } from '@/shared/presentation/components/CooklyUI';

export function CookingSuccessScreen() {
    const screen = useCookingSuccessScreen();
    const { navigation, recipe, session } = screen;

    if (!recipe) {
        return <MissingCookingRecipeState onRecipeCatalogPress={navigation.goRecipeCatalog} />;
    }

    if (!session) {
        return <CookingPreparingState />;
    }

    return (
        <CookingScreenShell>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <CookingHeader title="Cooking Success" />
                <CookingProgress currentStep={3} label="Success" />

                <CooklyTopAppBar title="Cookly" />

                <ImageBackground
                    imageStyle={styles.successImage}
                    source={{ uri: recipe.imageUrl }}
                    style={[styles.successHero, { backgroundColor: recipe.accentColor }]}
                >
                    <View style={styles.heroScrim} />
                    <View style={styles.checkBadge}>
                        <CooklyIcon name="check" size={42} />
                    </View>
                </ImageBackground>

                <View style={styles.messageGroup}>
                    <Text style={styles.title}>Enjoy your meal!</Text>
                    <Text style={styles.subtitle}>
                        Your inventory at <Text style={styles.primaryText}>Casa</Text> has been updated where
                        Cookly could match ingredients.
                    </Text>
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Ingredients Deducted</Text>
                    <View style={styles.resultList}>
                        {screen.deductionResults.map((result) => (
                            <DeductionRow key={result.ingredientId} result={result} />
                        ))}
                    </View>
                </View>

                {screen.deductionResults.some((result) => !result.wasApplied) ? (
                    <CookingNotice
                        text="Some recipe ingredients did not have a confident inventory match. They were kept in the summary for future repository-backed matching."
                        title="Inventory match pending"
                    />
                ) : null}

                <View style={styles.actionGroup}>
                    <CookingButton label="Return Home" onPress={navigation.goHome} />
                    <CookingButton label="View Inventory" onPress={navigation.goInventory} variant="outline" />
                </View>
            </ScrollView>
        </CookingScreenShell>
    );
}

type DeductionRowProps = {
    result: CookingDeductionResult;
};

function DeductionRow({ result }: DeductionRowProps) {
    return (
        <View style={styles.resultRow}>
            <View style={styles.resultIcon}>
                <CooklyIcon color={colors.textMuted} name="inventory" size={12} />
            </View>
            <View style={styles.resultBody}>
                <Text style={styles.resultName}>{result.name}</Text>
                {!result.wasApplied ? <Text style={styles.resultWarning}>Match pending</Text> : null}
            </View>
            <Text style={styles.resultQuantity}>- {result.quantityLabel}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        gap: spacing.md,
        padding: spacing.md,
        paddingBottom: spacing.lg,
    },
    successHero: {
        alignItems: 'center',
        alignSelf: 'center',
        height: 194,
        justifyContent: 'center',
        overflow: 'hidden',
        width: '72%',
    },
    successImage: {
        borderRadius: 0,
    },
    heroScrim: {
        backgroundColor: colors.black,
        bottom: 0,
        left: 0,
        opacity: 0.35,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    checkBadge: {
        alignItems: 'center',
        borderColor: colors.primary,
        borderRadius: radius.pill,
        borderWidth: 4,
        height: 68,
        justifyContent: 'center',
        transform: [{ rotate: '-10deg' }],
        width: 68,
    },
    messageGroup: {
        alignItems: 'center',
        gap: spacing.sm,
    },
    title: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    subtitle: {
        color: colors.textMuted,
        fontSize: typography.caption,
        lineHeight: 20,
        maxWidth: 260,
        textAlign: 'center',
    },
    primaryText: {
        color: colors.primary,
        fontWeight: '900',
    },
    summaryCard: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: spacing.md,
        padding: spacing.md,
    },
    summaryTitle: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    resultList: {
        gap: spacing.sm,
    },
    resultRow: {
        alignItems: 'center',
        borderBottomColor: colors.borderMuted,
        borderBottomWidth: 1,
        flexDirection: 'row',
        gap: spacing.sm,
        minHeight: 46,
        paddingBottom: spacing.sm,
    },
    resultIcon: {
        alignItems: 'center',
        backgroundColor: colors.backgroundMuted,
        borderRadius: radius.sm,
        height: 28,
        justifyContent: 'center',
        width: 28,
    },
    resultBody: {
        flex: 1,
    },
    resultName: {
        color: colors.text,
        fontSize: typography.caption,
        fontWeight: '800',
    },
    resultWarning: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '800',
        marginTop: 2,
    },
    resultQuantity: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '800',
    },
    actionGroup: {
        gap: spacing.sm,
    },
});
