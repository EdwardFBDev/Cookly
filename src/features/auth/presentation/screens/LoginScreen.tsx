import { StatusBar } from 'expo-status-bar';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { AuthPrimaryButton } from '@/features/auth/presentation/components/AuthPrimaryButton';
import { AuthTextField } from '@/features/auth/presentation/components/AuthTextField';
import { SocialLoginButton } from '@/features/auth/presentation/components/SocialLoginButton';
import { useLoginScreen } from '@/features/auth/presentation/hooks/useLoginScreen';

export function LoginScreen() {
    const login = useLoginScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <Text style={styles.appName}>Cookly</Text>
                        <Text style={styles.headerIcon}>[]</Text>
                    </View>

                    <View style={styles.hero}>
                        <View style={styles.logoCircle}>
                            <Text style={styles.logoText}>||</Text>
                        </View>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>
                            Your smart pantry and kitchen assistant is ready to help you reduce waste.
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <AuthTextField
                            autoCapitalize="none"
                            autoComplete="email"
                            error={login.errors.email}
                            keyboardType="email-address"
                            label="Email Address"
                            leadingIcon={<Text style={styles.fieldIcon}>@</Text>}
                            onChangeText={login.setEmail}
                            placeholder="chef@cookly.app"
                            textContentType="emailAddress"
                            value={login.email}
                        />

                        <AuthTextField
                            autoCapitalize="none"
                            autoComplete="password"
                            error={login.errors.password}
                            inputActionLabel={login.isPasswordVisible ? 'HIDE' : 'SHOW'}
                            label="Password"
                            leadingIcon={<Text style={styles.fieldIcon}>#</Text>}
                            onChangeText={login.setPassword}
                            onInputActionPress={login.togglePasswordVisibility}
                            onTrailingPress={login.handleForgotPassword}
                            placeholder="Password"
                            secureTextEntry={!login.isPasswordVisible}
                            textContentType="password"
                            trailingLabel="Forgot Password?"
                            value={login.password}
                        />

                        <Pressable
                            accessibilityRole="switch"
                            accessibilityState={{ checked: login.keepLoggedIn }}
                            accessibilityLabel="Keep me logged in"
                            onPress={() => login.setKeepLoggedIn(!login.keepLoggedIn)}
                            style={styles.keepLoggedInRow}
                        >
                            <View
                                style={[
                                    styles.toggleTrack,
                                    login.keepLoggedIn ? styles.toggleTrackOn : null,
                                ]}
                            >
                                <View
                                    style={[
                                        styles.toggleThumb,
                                        login.keepLoggedIn ? styles.toggleThumbOn : null,
                                    ]}
                                />
                            </View>
                            <Text style={styles.keepLoggedInLabel}>Keep me logged in</Text>
                        </Pressable>

                        <AuthPrimaryButton label="Login to Kitchen" onPress={login.handleSubmit} />

                        <View style={styles.dividerRow}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>or continue with</Text>
                            <View style={styles.divider} />
                        </View>

                        <View style={styles.socialRow}>
                            <SocialLoginButton provider="Google" onPress={login.handleGoogleLogin} />
                            <SocialLoginButton provider="Apple" onPress={login.handleAppleLogin} />
                        </View>
                    </View>

                    <View style={styles.registerRow}>
                        <Text style={styles.registerText}>Don't have an account?</Text>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Register now"
                            onPress={login.handleRegister}
                        >
                            <Text style={styles.registerLink}>Register Now</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        paddingBottom: spacing.xl,
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#18120D',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    appName: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    headerIcon: {
        color: colors.primary,
        fontSize: typography.label,
        fontWeight: '900',
    },
    hero: {
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingTop: 40,
    },
    logoCircle: {
        alignItems: 'center',
        backgroundColor: colors.primaryMuted,
        borderRadius: radius.pill,
        height: 43,
        justifyContent: 'center',
        marginBottom: spacing.md,
        width: 43,
    },
    logoText: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    title: {
        color: colors.text,
        fontSize: typography.title,
        fontWeight: '900',
        marginBottom: spacing.xs,
    },
    subtitle: {
        color: colors.textMuted,
        fontSize: typography.caption,
        lineHeight: 18,
        textAlign: 'center',
    },
    card: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.sm,
        borderWidth: 1,
        gap: spacing.md,
        marginHorizontal: spacing.md,
        marginTop: spacing.lg,
        padding: 20,
    },
    fieldIcon: {
        color: colors.textMuted,
        fontSize: typography.label,
        fontWeight: '900',
    },
    keepLoggedInRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.sm,
    },
    toggleTrack: {
        backgroundColor: colors.backgroundMuted,
        borderRadius: radius.pill,
        height: 20,
        justifyContent: 'center',
        paddingHorizontal: 2,
        width: 38,
    },
    toggleTrackOn: {
        backgroundColor: colors.primaryMuted,
    },
    toggleThumb: {
        backgroundColor: colors.white,
        borderRadius: radius.pill,
        height: 16,
        width: 16,
    },
    toggleThumbOn: {
        alignSelf: 'flex-end',
    },
    keepLoggedInLabel: {
        color: colors.textMuted,
        fontSize: typography.caption,
    },
    dividerRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: spacing.md,
    },
    divider: {
        backgroundColor: colors.border,
        flex: 1,
        height: 1,
    },
    dividerText: {
        color: colors.textSubtle,
        fontSize: 11,
        fontWeight: '700',
    },
    socialRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    registerRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.xs,
        justifyContent: 'center',
        marginTop: spacing.lg,
    },
    registerText: {
        color: colors.textMuted,
        fontSize: typography.caption,
    },
    registerLink: {
        color: colors.primary,
        fontSize: typography.caption,
        fontWeight: '900',
    },
});
