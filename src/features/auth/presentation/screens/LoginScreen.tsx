import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { colors, radius, spacing, typography } from '@/app/theme';
import { AuthButton } from '@/features/auth/presentation/components/AuthButton';
import { AuthTextInput } from '@/features/auth/presentation/components/AuthTextInput';
import { AuthToggle } from '@/features/auth/presentation/components/AuthToggle';

const emptyAction = () => undefined;

export function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [shouldRememberSession, setShouldRememberSession] = useState(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.select({ ios: 'padding', android: undefined })}
            style={styles.root}
        >
            <StatusBar style="light" />
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.topBar}>
                    <Text style={styles.brand}>Cookly</Text>
                    <Text accessibilityLabel="Cookly menu" style={styles.menuIcon}>
                        []
                    </Text>
                </View>

                <View style={styles.heroGlow} />

                <View style={styles.screenBody}>
                    <View style={styles.logoBadge}>
                        <Text style={styles.logoText}>C</Text>
                    </View>

                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>
                        Your smart pantry and kitchen assistant is ready to help you reduce waste.
                    </Text>

                    <View style={styles.card}>
                        <AuthTextInput
                            accessibilityLabel="Email address"
                            autoCapitalize="none"
                            autoComplete="email"
                            inputMode="email"
                            label="Email Address"
                            leadingIcon="@"
                            onChangeText={setEmail}
                            placeholder="chef@cookly.app"
                            textContentType="emailAddress"
                            value={email}
                        />

                        <AuthTextInput
                            accessibilityLabel="Password"
                            autoCapitalize="none"
                            helperActionLabel="Forgot Password?"
                            label="Password"
                            leadingIcon="#"
                            onChangeText={setPassword}
                            onHelperActionPress={emptyAction}
                            onTrailingActionPress={() => setIsPasswordVisible((value) => !value)}
                            placeholder="********"
                            secureTextEntry={!isPasswordVisible}
                            textContentType="password"
                            trailingActionLabel={isPasswordVisible ? 'Hide' : 'Show'}
                            value={password}
                        />

                        <AuthToggle
                            label="Keep me logged in"
                            onValueChange={setShouldRememberSession}
                            value={shouldRememberSession}
                        />

                        <AuthButton label="Login to Kitchen ->" onPress={emptyAction} />

                        <View style={styles.dividerRow}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>or continue with</Text>
                            <View style={styles.divider} />
                        </View>

                        <View style={styles.socialRow}>
                            <View style={styles.socialButton}>
                                <AuthButton icon="G" label="Google" onPress={emptyAction} variant="outline" />
                            </View>
                            <View style={styles.socialButton}>
                                <AuthButton icon="A" label="Apple" onPress={emptyAction} variant="outline" />
                            </View>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <AuthButton label="Register Now" onPress={emptyAction} variant="link" />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: colors.background,
        flex: 1,
    },
    content: {
        flexGrow: 1,
        minHeight: '100%',
    },
    topBar: {
        alignItems: 'center',
        backgroundColor: '#17120F',
        flexDirection: 'row',
        height: 42,
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
    },
    brand: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '800',
    },
    menuIcon: {
        color: colors.primary,
        fontSize: typography.body,
        fontWeight: '900',
    },
    heroGlow: {
        backgroundColor: colors.primaryMuted,
        borderRadius: radius.pill,
        height: 260,
        left: -40,
        opacity: 0.16,
        position: 'absolute',
        right: -40,
        top: 40,
    },
    screenBody: {
        alignItems: 'center',
        flex: 1,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.md,
        paddingTop: spacing.xl + spacing.sm,
    },
    logoBadge: {
        alignItems: 'center',
        backgroundColor: colors.primaryMuted,
        borderColor: colors.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        height: 48,
        justifyContent: 'center',
        marginBottom: spacing.md,
        width: 48,
    },
    logoText: {
        color: colors.primary,
        fontSize: typography.title,
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
        lineHeight: 20,
        marginBottom: spacing.lg,
        maxWidth: 300,
        textAlign: 'center',
    },
    card: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: spacing.md,
        padding: spacing.lg,
        width: '100%',
    },
    dividerRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.md,
        paddingVertical: spacing.sm,
    },
    divider: {
        backgroundColor: colors.border,
        flex: 1,
        height: 1,
    },
    dividerText: {
        color: colors.textSubtle,
        fontSize: typography.caption,
        fontWeight: '700',
    },
    socialRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    socialButton: {
        flex: 1,
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.xs,
        justifyContent: 'center',
        marginTop: spacing.lg,
    },
    footerText: {
        color: colors.textMuted,
        fontSize: typography.caption,
    },
});
