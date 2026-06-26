import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/app/theme';
import {
    CooklyEmptyState,
    CooklyTopAppBar,
} from '@/shared/presentation/components/CooklyUI';

export function FeatureInProgressScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ title?: string }>();
    const title = params.title ? String(params.title) : 'Feature';

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <View style={styles.content}>
                <CooklyTopAppBar onBackPress={router.back} title="Cookly" />
                <CooklyEmptyState
                    actionLabel="Back to Home"
                    description={`${title} is part of Cookly's roadmap and will be connected when its feature spec is approved.`}
                    onActionPress={() => router.push('/home')}
                    title="Feature in Progress"
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
        flex: 1,
    },
    content: {
        flex: 1,
        gap: spacing.lg,
        padding: spacing.md,
    },
});
