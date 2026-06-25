import { useRouter } from 'expo-router';

export function useWelcomeScreen() {
    const router = useRouter();

    function handleGetStarted() {
        // TODO: Persist onboarding completion when user preferences storage exists.
        router.push('/login');
    }

    return {
        handleGetStarted,
    };
}
