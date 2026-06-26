import { SettingsContent } from '@/features/settings/domain/SettingsModels';

export function getSettingsContent(): SettingsContent {
    // TODO: Replace static profile and preference content with user, household, and settings services.
    return {
        appVersionLabel: 'v2.4.1 (Stable Build)',
        profile: {
            avatarInitials: 'CC',
            displayName: 'Chef Cookly',
            email: 'chef.cookly@culinary.app',
            stats: [
                {
                    id: 'recipes-cooked',
                    label: 'Recipes Cooked',
                    value: '42',
                },
                {
                    id: 'items-tracked',
                    label: 'Items Tracked',
                    value: '124',
                },
            ],
        },
        sections: [
            {
                id: 'profile',
                items: [
                    {
                        key: 'account',
                        title: 'Account',
                        description: '',
                        icon: 'profile',
                        type: 'link',
                    },
                    {
                        key: 'household',
                        title: 'Household',
                        description: '4 people',
                        icon: 'home',
                        type: 'link',
                    },
                    {
                        key: 'dietary-preferences',
                        title: 'Dietary Preferences',
                        description: 'Vegetarian',
                        icon: 'recipes',
                        type: 'link',
                    },
                    {
                        key: 'locations',
                        title: 'Locations',
                        description: 'Casa, Oficina',
                        icon: 'location',
                        type: 'link',
                    },
                ],
            },
            {
                id: 'preferences',
                items: [
                    {
                        key: 'theme',
                        title: 'Theme',
                        description: 'Dark',
                        icon: 'settings',
                        type: 'toggle',
                    },
                    {
                        key: 'notifications',
                        title: 'Notifications',
                        icon: 'bell',
                        type: 'link',
                    },
                    {
                        key: 'about',
                        title: 'About Cookly',
                        icon: 'info',
                        type: 'link',
                    },
                ],
            },
        ],
    };
}
