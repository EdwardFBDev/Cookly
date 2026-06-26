export type SettingsProfile = {
    displayName: string;
    email: string;
    avatarInitials: string;
    stats: SettingsStat[];
};

export type SettingsStat = {
    id: string;
    label: string;
    value: string;
};

export type SettingsItemKey =
    | 'account'
    | 'household'
    | 'dietary-preferences'
    | 'locations'
    | 'theme'
    | 'notifications'
    | 'about';

export type SettingsItem = {
    key: SettingsItemKey;
    title: string;
    description?: string;
    icon: string;
    type: 'link' | 'toggle';
};

export type SettingsSection = {
    id: string;
    items: SettingsItem[];
};

export type SettingsContent = {
    appVersionLabel: string;
    profile: SettingsProfile;
    sections: SettingsSection[];
};
