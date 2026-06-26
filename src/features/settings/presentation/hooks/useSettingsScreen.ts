import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { getSettingsContent } from '@/features/settings/application/settingsContent';
import { SettingsItem } from '@/features/settings/domain/SettingsModels';

export function useSettingsScreen() {
    const router = useRouter();
    const content = getSettingsContent();
    const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(true);

    function showFutureIntegration(featureName: string) {
        // TODO: Route to real settings flows when account, preferences, and session services exist.
        Alert.alert('Coming soon', `${featureName} will be connected in a future task.`);
    }

    function goBack() {
        if (router.canGoBack()) {
            router.back();
            return;
        }

        router.replace('/home');
    }

    function handleSettingsItemPress(item: SettingsItem) {
        if (item.key === 'theme') {
            setIsDarkThemeEnabled((currentValue) => !currentValue);
            return;
        }

        showFutureIntegration(item.title);
    }

    return {
        appVersionLabel: content.appVersionLabel,
        goHome: () => router.push('/home'),
        goInventory: () => router.push('/inventory'),
        goNotifications: () => router.push('/notifications'),
        goPlan: () => router.push('/plan'),
        goProfile: () => router.push('/settings'),
        goRecipes: () => router.push('/recipes'),
        goShopping: () => router.push('/shopping'),
        goBack,
        handleEditProfile: () => showFutureIntegration('Profile editing'),
        handleLogout: () => showFutureIntegration('Logout'),
        handleSettingsItemPress,
        isDarkThemeEnabled,
        profile: content.profile,
        sections: content.sections.map((section) => ({
            ...section,
            items: section.items.map((item) =>
                item.key === 'theme'
                    ? {
                          ...item,
                          description: isDarkThemeEnabled ? 'Dark' : 'Light',
                      }
                    : item,
            ),
        })),
    };
}
