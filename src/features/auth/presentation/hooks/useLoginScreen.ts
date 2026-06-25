import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

import {
    LoginValidationErrors,
    validateLoginCredentials,
} from '@/features/auth/application/validateLoginCredentials';

const DEFAULT_EMAIL = 'chef@cookly.app';
const DEFAULT_PASSWORD = 'cooklypass';

export function useLoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState(DEFAULT_EMAIL);
    const [password, setPassword] = useState(DEFAULT_PASSWORD);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errors, setErrors] = useState<LoginValidationErrors>({});

    function handleSubmit() {
        const validation = validateLoginCredentials({
            email,
            password,
            keepLoggedIn,
        });

        setErrors(validation.errors);

        if (!validation.isValid) {
            return;
        }

        // TODO: Replace placeholder navigation with auth use case and persisted session routing.
        router.replace('/home');
    }

    function handleForgotPassword() {
        // TODO: Navigate to password recovery when the route exists.
        Alert.alert('Coming soon', 'Password recovery is not available yet.');
    }

    function handleRegister() {
        // TODO: Navigate to registration when the route exists.
        Alert.alert('Coming soon', 'Registration is not available yet.');
    }

    function handleSocialLogin(provider: 'Google' | 'Apple') {
        // TODO: Connect provider authentication when auth services exist.
        Alert.alert('Coming soon', `${provider} sign-in is not available yet.`);
    }

    return {
        email,
        password,
        keepLoggedIn,
        isPasswordVisible,
        errors,
        setEmail,
        setPassword,
        setKeepLoggedIn,
        togglePasswordVisibility: () => setIsPasswordVisible((value) => !value),
        handleSubmit,
        handleForgotPassword,
        handleRegister,
        handleGoogleLogin: () => handleSocialLogin('Google'),
        handleAppleLogin: () => handleSocialLogin('Apple'),
    };
}
