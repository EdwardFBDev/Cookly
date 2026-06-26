import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/app/theme';
import { HomeBottomNavigation } from '@/features/home/presentation/components/HomeBottomNavigation';
import {
    SettingsItem,
    SettingsProfile,
    SettingsSection,
} from '@/features/settings/domain/SettingsModels';
import { useSettingsScreen } from '@/features/settings/presentation/hooks/useSettingsScreen';
import {
    CooklyIcon,
    CooklyIconName,
    CooklyTopAppBar,
} from '@/shared/presentation/components/CooklyUI';

export function SettingsScreen() {
    const screen = useSettingsScreen();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <CooklyTopAppBar
                    onBackPress={screen.goBack}
                    onNotificationPress={screen.goNotifications}
                    title="Settings"
                />

                <ProfileSummary onEditProfile={screen.handleEditProfile} profile={screen.profile} />

                {screen.sections.map((section) => (
                    <SettingsSectionCard
                        isDarkThemeEnabled={screen.isDarkThemeEnabled}
                        key={section.id}
                        onItemPress={screen.handleSettingsItemPress}
                        section={section}
                    />
                ))}

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Logout"
                    onPress={screen.handleLogout}
                    style={styles.logoutButton}
                >
                    <CooklyIcon color="#F0A5AD" name="close" size={typography.caption} />
                    <Text style={styles.logoutText}>Logout</Text>
                </Pressable>

                <Text style={styles.version}>{screen.appVersionLabel}</Text>
            </ScrollView>

            <HomeBottomNavigation
                activeTab="profile"
                onHomePress={screen.goHome}
                onInventoryPress={screen.goInventory}
                onPlanPress={screen.goPlan}
                onProfilePress={screen.goProfile}
                onRecipesPress={screen.goRecipes}
                onShoppingPress={screen.goShopping}
            />
        </SafeAreaView>
    );
}

type ProfileSummaryProps = {
    profile: SettingsProfile;
    onEditProfile: () => void;
};

function ProfileSummary({ onEditProfile, profile }: ProfileSummaryProps) {
    return (
        <View style={styles.profileBlock}>
            <View style={styles.avatarFrame}>
                <View style={styles.avatar}>
                    <CooklyIcon name="profile" size={typography.subtitle} />
                </View>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Edit profile"
                    onPress={onEditProfile}
                    style={styles.editButton}
                >
                    <CooklyIcon color={colors.inputBackground} name="edit" size={12} />
                </Pressable>
            </View>
            <Text style={styles.profileName}>{profile.displayName}</Text>
            <Text style={styles.profileEmail}>{profile.email}</Text>

            <View style={styles.statsRow}>
                {profile.stats.map((stat) => (
                    <View key={stat.id} style={styles.statCard}>
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

type SettingsSectionCardProps = {
    isDarkThemeEnabled: boolean;
    section: SettingsSection;
    onItemPress: (item: SettingsItem) => void;
};

function SettingsSectionCard({ isDarkThemeEnabled, onItemPress, section }: SettingsSectionCardProps) {
    return (
        <View style={styles.sectionCard}>
            {section.items.map((item, index) => (
                <SettingsRow
                    isDarkThemeEnabled={isDarkThemeEnabled}
                    isLast={index === section.items.length - 1}
                    item={item}
                    key={item.key}
                    onPress={() => onItemPress(item)}
                />
            ))}
        </View>
    );
}

type SettingsRowProps = {
    isDarkThemeEnabled: boolean;
    isLast: boolean;
    item: SettingsItem;
    onPress: () => void;
};

function SettingsRow({ isDarkThemeEnabled, isLast, item, onPress }: SettingsRowProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={item.title}
            onPress={onPress}
            style={[styles.row, isLast ? styles.lastRow : null]}
        >
            <View style={styles.rowIcon}>
                <SettingsItemIcon item={item} />
            </View>
            <View style={styles.rowBody}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                {item.description ? <Text style={styles.rowDescription}>{item.description}</Text> : null}
            </View>
            {item.type === 'toggle' ? (
                <View style={[styles.toggleTrack, isDarkThemeEnabled ? styles.toggleTrackActive : null]}>
                    <View style={[styles.toggleKnob, isDarkThemeEnabled ? styles.toggleKnobActive : null]} />
                </View>
            ) : (
                <CooklyIcon color={colors.textMuted} name="chevron-right" size={typography.label} />
            )}
        </Pressable>
    );
}

function SettingsItemIcon({ item }: { item: SettingsItem }) {
    const icons: Record<SettingsItem['key'], CooklyIconName> = {
        about: 'info',
        account: 'profile',
        'dietary-preferences': 'recipes',
        household: 'home',
        locations: 'location',
        notifications: 'bell',
        theme: 'settings',
    };

    return <CooklyIcon name={icons[item.key]} size={typography.caption} />;
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
        flex: 1,
    },
    content: {
        gap: spacing.md,
        padding: spacing.md,
        paddingBottom: 112,
    },
    profileBlock: {
        alignItems: 'center',
        gap: spacing.xs,
        paddingTop: spacing.lg,
    },
    avatarFrame: {
        borderColor: colors.primary,
        borderRadius: radius.pill,
        borderWidth: 2,
        height: 72,
        marginBottom: spacing.sm,
        padding: 3,
        width: 72,
    },
    avatar: {
        alignItems: 'center',
        backgroundColor: '#3A2416',
        borderRadius: radius.pill,
        flex: 1,
        justifyContent: 'center',
    },
    editButton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        bottom: -2,
        height: 24,
        justifyContent: 'center',
        position: 'absolute',
        right: -2,
        width: 24,
    },
    profileName: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    profileEmail: {
        color: colors.textMuted,
        fontSize: typography.caption,
    },
    statsRow: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: spacing.lg,
        width: '100%',
    },
    statCard: {
        alignItems: 'center',
        backgroundColor: '#4C3B19',
        borderRadius: radius.sm,
        flex: 1,
        minHeight: 58,
        paddingVertical: spacing.sm,
    },
    statValue: {
        color: colors.primary,
        fontSize: typography.subtitle,
        fontWeight: '900',
    },
    statLabel: {
        color: colors.text,
        fontSize: 9,
        fontWeight: '800',
        marginTop: spacing.xs,
        textTransform: 'uppercase',
    },
    sectionCard: {
        backgroundColor: colors.backgroundElevated,
        borderRadius: radius.md,
        overflow: 'hidden',
    },
    row: {
        alignItems: 'center',
        borderBottomColor: colors.borderMuted,
        borderBottomWidth: 1,
        flexDirection: 'row',
        gap: spacing.md,
        minHeight: 62,
        paddingHorizontal: spacing.md,
    },
    lastRow: {
        borderBottomWidth: 0,
    },
    rowIcon: {
        alignItems: 'center',
        height: 24,
        justifyContent: 'center',
        width: 24,
    },
    rowBody: {
        flex: 1,
    },
    rowTitle: {
        color: colors.text,
        fontSize: typography.caption,
    },
    rowDescription: {
        color: colors.textMuted,
        fontSize: 10,
        marginTop: 2,
    },
    toggleTrack: {
        alignItems: 'center',
        backgroundColor: colors.backgroundMuted,
        borderRadius: radius.pill,
        height: 22,
        justifyContent: 'center',
        paddingHorizontal: 3,
        width: 42,
    },
    toggleTrackActive: {
        backgroundColor: colors.primary,
    },
    toggleKnob: {
        alignSelf: 'flex-start',
        backgroundColor: colors.textSubtle,
        borderRadius: radius.pill,
        height: 14,
        width: 14,
    },
    toggleKnobActive: {
        alignSelf: 'flex-end',
        backgroundColor: colors.inputBackground,
    },
    logoutButton: {
        alignItems: 'center',
        backgroundColor: '#271013',
        borderColor: '#5C2F35',
        borderRadius: radius.sm,
        borderWidth: 1,
        flexDirection: 'row',
        gap: spacing.sm,
        justifyContent: 'center',
        minHeight: 80,
        marginTop: spacing.md,
    },
    logoutText: {
        color: '#F0A5AD',
        fontSize: typography.caption,
        fontWeight: '900',
    },
    version: {
        color: colors.textSubtle,
        fontSize: 10,
        textAlign: 'center',
    },
});
