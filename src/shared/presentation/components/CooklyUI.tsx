import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/app/theme';

export type CooklyIconName =
    | 'add'
    | 'back'
    | 'bell'
    | 'catalog'
    | 'check'
    | 'chevron-down'
    | 'chevron-right'
    | 'close'
    | 'drawer'
    | 'edit'
    | 'home'
    | 'info'
    | 'inventory'
    | 'location'
    | 'meal-plan'
    | 'profile'
    | 'recipes'
    | 'search'
    | 'settings'
    | 'shopping'
    | 'warning';

type CooklyIconProps = {
    name: CooklyIconName;
    color?: string;
    size?: number;
};

const ICONS: Record<CooklyIconName, string> = {
    add: '+',
    back: '‹',
    bell: '◌',
    catalog: '◉',
    check: '✓',
    'chevron-down': '⌄',
    'chevron-right': '›',
    close: '×',
    drawer: '☰',
    edit: '✎',
    home: '⌂',
    info: 'ⓘ',
    inventory: '▤',
    location: '⌖',
    'meal-plan': '□',
    profile: '◎',
    recipes: '◉',
    search: '⌕',
    settings: '⚙',
    shopping: '⌁',
    warning: '!',
};

export function CooklyIcon({ color = colors.primary, name, size = typography.subtitle }: CooklyIconProps) {
    return <Text style={[styles.icon, { color, fontSize: size }]}>{ICONS[name]}</Text>;
}

type CooklyCardProps = PropsWithChildren<{
    variant?: 'default' | 'accent' | 'danger';
}>;

export function CooklyCard({ children, variant = 'default' }: CooklyCardProps) {
    return (
        <View
            style={[
                styles.card,
                variant === 'accent' ? styles.cardAccent : null,
                variant === 'danger' ? styles.cardDanger : null,
            ]}
        >
            {children}
        </View>
    );
}

type CooklyButtonProps = {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: CooklyIconName;
    variant?: 'primary' | 'outline' | 'ghost';
};

export function CooklyButton({
    disabled = false,
    fullWidth = false,
    icon,
    label,
    onPress,
    variant = 'primary',
}: CooklyButtonProps) {
    const isPrimary = variant === 'primary';

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={label}
            disabled={disabled}
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                fullWidth ? styles.fullWidth : null,
                isPrimary ? styles.primaryButton : styles.outlineButton,
                variant === 'ghost' ? styles.ghostButton : null,
                pressed ? styles.pressed : null,
                disabled ? styles.disabled : null,
            ]}
        >
            {icon ? <CooklyIcon color={isPrimary ? colors.inputBackground : colors.primary} name={icon} size={14} /> : null}
            <Text style={[styles.buttonText, isPrimary ? styles.primaryButtonText : styles.outlineButtonText]}>
                {label}
            </Text>
        </Pressable>
    );
}

type CooklyIconButtonProps = {
    accessibilityLabel: string;
    icon: CooklyIconName;
    onPress: () => void;
};

export function CooklyIconButton({ accessibilityLabel, icon, onPress }: CooklyIconButtonProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            onPress={onPress}
            style={({ pressed }) => [styles.iconButton, pressed ? styles.iconButtonPressed : null]}
        >
            <CooklyIcon name={icon} size={typography.label} />
        </Pressable>
    );
}

type CooklyTopAppBarProps = {
    currentLocation?: string;
    drawerItems?: CooklyNavigationDrawerItem[];
    filterLabel?: string;
    notificationBadgeVisible?: boolean;
    onBackPress?: () => void;
    onDrawerPress?: () => void;
    onFilterPress?: () => void;
    onLocationPress?: () => void;
    onNotificationPress?: () => void;
    onProfilePress?: () => void;
    profileImageUri?: string;
    profileName?: string;
    locationLabel?: string;
    rightAccessory?: ReactNode;
    title?: string;
};

export function CooklyTopAppBar({
    currentLocation,
    drawerItems,
    filterLabel = 'Filters',
    locationLabel,
    notificationBadgeVisible = true,
    onBackPress,
    onDrawerPress,
    onFilterPress,
    onLocationPress,
    onNotificationPress,
    onProfilePress,
    profileImageUri,
    profileName = 'Chef Cookly',
    rightAccessory,
    title = 'Cookly',
}: CooklyTopAppBarProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const displayLocation = currentLocation ?? locationLabel ?? 'Casa';
    const profileInitials = getProfileInitials(profileName);

    function handleDrawerPress() {
        if (drawerItems) {
            setIsDrawerOpen((isOpen) => !isOpen);
        }

        onDrawerPress?.();
    }

    return (
        <View style={styles.topAppBarStack}>
            <View style={styles.topAppBar}>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={onBackPress ? 'Go back' : 'Open navigation drawer'}
                    onPress={onBackPress ?? handleDrawerPress}
                    style={({ pressed }) => [styles.topBarAction, pressed ? styles.topBarActionPressed : null]}
                >
                    <CooklyIcon name={onBackPress ? 'back' : 'drawer'} size={28} />
                </Pressable>

                <Text style={styles.brandText}>{title}</Text>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Open storage location ${displayLocation}`}
                    onPress={onLocationPress}
                    style={({ pressed }) => [styles.locationSelector, pressed ? styles.topBarActionPressed : null]}
                >
                    <CooklyIcon name="location" size={26} />
                    <Text numberOfLines={1} style={styles.locationText}>{displayLocation}</Text>
                    <CooklyIcon color={colors.textMuted} name="chevron-down" size={16} />
                </Pressable>

                {onNotificationPress ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Open notifications"
                        onPress={onNotificationPress}
                        style={({ pressed }) => [styles.notificationAction, pressed ? styles.topBarActionPressed : null]}
                    >
                        <CooklyIcon color={colors.textMuted} name="bell" size={28} />
                        {notificationBadgeVisible ? <View style={styles.notificationDot} /> : null}
                    </Pressable>
                ) : (
                    <View style={styles.notificationAction} />
                )}

                {onFilterPress ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Open recipe filters"
                        onPress={onFilterPress}
                        style={({ pressed }) => [styles.filterAction, pressed ? styles.topBarActionPressed : null]}
                    >
                        <Text style={styles.filterActionText}>{filterLabel}</Text>
                    </Pressable>
                ) : rightAccessory ? (
                    rightAccessory
                ) : onProfilePress ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Open profile"
                        onPress={onProfilePress}
                        style={({ pressed }) => [styles.profileAction, pressed ? styles.profileActionPressed : null]}
                    >
                        {profileImageUri ? (
                            <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
                        ) : (
                            <Text style={styles.profileInitials}>{profileInitials}</Text>
                        )}
                    </Pressable>
                ) : (
                    <View style={styles.profilePlaceholder} />
                )}
            </View>
            {isDrawerOpen && drawerItems ? (
                <CooklyNavigationDrawer
                    items={drawerItems}
                    onClose={() => setIsDrawerOpen(false)}
                />
            ) : null}
        </View>
    );
}

function getProfileInitials(profileName: string): string {
    const initials = profileName
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');

    return initials || 'CC';
}

type CooklyBottomNavigationTab<T extends string> = {
    key: T;
    label: string;
    icon: CooklyIconName;
    onPress: () => void;
};

type CooklyBottomNavigationProps<T extends string> = {
    activeTab: T;
    tabs: CooklyBottomNavigationTab<T>[];
};

export function CooklyBottomNavigation<T extends string>({ activeTab, tabs }: CooklyBottomNavigationProps<T>) {
    return (
        <View style={styles.bottomBar}>
            {tabs.map((tab) => {
                const isActive = tab.key === activeTab;

                return (
                    <Pressable
                        accessibilityRole="tab"
                        accessibilityLabel={tab.label}
                        accessibilityState={{ selected: isActive }}
                        key={tab.key}
                        onPress={tab.onPress}
                        style={({ pressed }) => [
                            styles.bottomTab,
                            isActive ? styles.bottomTabActive : null,
                            pressed ? styles.pressed : null,
                        ]}
                    >
                        <CooklyIcon
                            color={isActive ? colors.inputBackground : colors.textMuted}
                            name={tab.icon}
                            size={20}
                        />
                        <Text style={[styles.bottomLabel, isActive ? styles.bottomLabelActive : null]}>
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

type CooklyChipProps = {
    active?: boolean;
    label: string;
    onPress?: () => void;
};

export function CooklyChip({ active = false, label, onPress }: CooklyChipProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={label}
            onPress={onPress}
            style={[styles.chip, active ? styles.chipActive : null]}
        >
            <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>{label}</Text>
        </Pressable>
    );
}

type CooklySearchBarProps = {
    placeholder: string;
    onPress: () => void;
};

export function CooklySearchBar({ onPress, placeholder }: CooklySearchBarProps) {
    return (
        <Pressable
            accessibilityRole="search"
            accessibilityLabel={placeholder}
            onPress={onPress}
            style={({ pressed }) => [styles.searchBar, pressed ? styles.searchBarPressed : null]}
        >
            <CooklyIcon color={colors.textSubtle} name="search" size={typography.body} />
            <Text style={styles.searchText}>{placeholder}</Text>
        </Pressable>
    );
}

type CooklyFabProps = {
    label?: string;
    icon?: CooklyIconName;
    onPress: () => void;
};

export function CooklyFab({ icon = 'add', label, onPress }: CooklyFabProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={label ?? 'Create'}
            onPress={onPress}
            style={({ pressed }) => [styles.fab, pressed ? styles.pressed : null]}
        >
            <CooklyIcon color={colors.inputBackground} name={icon} size={typography.subtitle} />
            {label ? <Text style={styles.fabText}>{label}</Text> : null}
        </Pressable>
    );
}

type CooklyNavigationDrawerItem = {
    label: string;
    icon: CooklyIconName;
    active?: boolean;
    meta?: string;
    onPress: () => void;
    sectionLabel?: string;
};

type CooklyNavigationDrawerProps = {
    items: CooklyNavigationDrawerItem[];
    onClose: () => void;
};

export function CooklyNavigationDrawer({ items, onClose }: CooklyNavigationDrawerProps) {
    const slideX = useRef(new Animated.Value(-232)).current;

    useEffect(() => {
        Animated.timing(slideX, {
            duration: 180,
            toValue: 0,
            useNativeDriver: true,
        }).start();
    }, [slideX]);

    return (
        <View style={styles.drawerOverlay} pointerEvents="box-none">
        <Animated.View style={[styles.drawer, { transform: [{ translateX: slideX }] }]}>
            <View style={styles.drawerHeader}>
                <View style={styles.drawerAvatarFrame}>
                    <View style={styles.drawerAvatar}>
                        <CooklyIcon name="profile" size={24} />
                    </View>
                    <View style={styles.drawerEditBadge}>
                        <CooklyIcon color={colors.inputBackground} name="edit" size={10} />
                    </View>
                </View>
                <View style={styles.drawerProfile}>
                    <Text style={styles.drawerName}>Chef Cookly</Text>
                    <Text style={styles.drawerEmail}>cookly@example.com</Text>
                </View>
            </View>
            <View style={styles.drawerDivider} />
            {items.map((item) => (
                <View key={item.label}>
                    {item.sectionLabel ? (
                        <Text style={styles.drawerSectionLabel}>{item.sectionLabel}</Text>
                    ) : null}
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={item.label}
                        onPress={() => {
                            item.onPress();
                            onClose();
                        }}
                        style={({ pressed }) => [
                            styles.drawerItem,
                            item.active ? styles.drawerItemActive : null,
                            pressed ? styles.pressed : null,
                        ]}
                    >
                        <CooklyIcon
                            color={item.active ? colors.inputBackground : colors.textMuted}
                            name={item.icon}
                            size={typography.body}
                        />
                        <Text style={[styles.drawerItemLabel, item.active ? styles.drawerItemLabelActive : null]}>
                            {item.label}
                        </Text>
                        {item.meta ? <Text style={styles.drawerItemMeta}>{item.meta}</Text> : null}
                    </Pressable>
                </View>
            ))}
            <View style={styles.drawerFooter}>
                <Text style={styles.drawerVersionTitle}>Version</Text>
                <Text style={styles.drawerVersion}>v1.0.0</Text>
            </View>
        </Animated.View>
        </View>
    );
}

type CooklyEmptyStateProps = {
    title: string;
    description: string;
    actionLabel?: string;
    onActionPress?: () => void;
};

export function CooklyEmptyState({ actionLabel, description, onActionPress, title }: CooklyEmptyStateProps) {
    return (
        <View style={styles.stateCard}>
            <View style={styles.stateIcon}>
                <CooklyIcon name="inventory" size={32} />
            </View>
            <Text style={styles.stateTitle}>{title}</Text>
            <Text style={styles.stateDescription}>{description}</Text>
            {actionLabel && onActionPress ? (
                <CooklyButton fullWidth label={actionLabel} onPress={onActionPress} />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        fontWeight: '900',
        includeFontPadding: false,
        textAlign: 'center',
    },
    card: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.md,
        borderWidth: 1,
        padding: spacing.md,
    },
    cardAccent: {
        backgroundColor: '#2A2110',
        borderColor: colors.primaryMuted,
    },
    cardDanger: {
        backgroundColor: '#271013',
        borderColor: '#5C2F35',
    },
    button: {
        alignItems: 'center',
        borderRadius: radius.sm,
        flexDirection: 'row',
        gap: spacing.xs,
        justifyContent: 'center',
        minHeight: 48,
        paddingHorizontal: spacing.md,
    },
    fullWidth: {
        alignSelf: 'stretch',
    },
    primaryButton: {
        backgroundColor: colors.primary,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderColor: colors.primary,
        borderWidth: 1,
    },
    ghostButton: {
        borderColor: colors.border,
    },
    pressed: {
        opacity: 0.78,
    },
    disabled: {
        opacity: 0.45,
    },
    buttonText: {
        fontSize: typography.caption,
        fontWeight: '900',
    },
    primaryButtonText: {
        color: colors.inputBackground,
    },
    outlineButtonText: {
        color: colors.primary,
    },
    iconButton: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.pill,
        borderWidth: 1,
        height: 36,
        justifyContent: 'center',
        width: 36,
    },
    iconButtonPressed: {
        backgroundColor: colors.backgroundMuted,
    },
    topAppBarStack: {
        gap: spacing.sm,
        paddingHorizontal: spacing.sm,
        paddingTop: spacing.sm,
        zIndex: 10,
    },
    topAppBar: {
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderColor: colors.borderMuted,
        borderRadius: radius.lg,
        borderWidth: 1,
        flexDirection: 'row',
        gap: spacing.sm,
        minHeight: 55,
        paddingHorizontal: spacing.md,
        shadowColor: colors.black,
        shadowOpacity: 0.24,
        shadowRadius: 8,
    },
    topBarAction: {
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        minWidth: 36,
    },
    topBarActionPressed: {
        opacity: 0.72,
    },
    brandText: {
        color: colors.primary,
        fontSize: 22,
        fontWeight: '900',
    },
    locationSelector: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        gap: spacing.xs,
        justifyContent: 'center',
        minHeight: 44,
        minWidth: 112,
    },
    locationText: {
        color: colors.primary,
        fontSize: 28,
        fontWeight: '900',
        maxWidth: 126,
    },
    notificationAction: {
        alignItems: 'center',
        height: 44,
        justifyContent: 'center',
        minWidth: 34,
    },
    notificationDot: {
        backgroundColor: '#FF4D3E',
        borderRadius: radius.pill,
        height: 12,
        position: 'absolute',
        right: 2,
        top: 4,
        width: 12,
    },
    profileAction: {
        alignItems: 'center',
        backgroundColor: '#2A2110',
        borderColor: colors.border,
        borderRadius: radius.pill,
        borderWidth: 2,
        height: 48,
        justifyContent: 'center',
        overflow: 'hidden',
        width: 48,
    },
    profileActionPressed: {
        opacity: 0.78,
    },
    profileImage: {
        height: '100%',
        width: '100%',
    },
    profileInitials: {
        color: colors.primary,
        fontSize: typography.label,
        fontWeight: '900',
    },
    profilePlaceholder: {
        width: 48,
    },
    filterAction: {
        alignItems: 'center',
        borderColor: colors.primary,
        borderRadius: radius.sm,
        borderWidth: 1,
        minHeight: 40,
        justifyContent: 'center',
        paddingHorizontal: spacing.sm,
    },
    filterActionText: {
        color: colors.primary,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    bottomBar: {
        backgroundColor: colors.backgroundElevated,
        borderRadius: radius.md,
        bottom: spacing.md,
        flexDirection: 'row',
        gap: spacing.sm,
        left: spacing.md,
        padding: spacing.sm,
        position: 'absolute',
        right: spacing.md,
    },
    bottomTab: {
        alignItems: 'center',
        borderRadius: radius.pill,
        flex: 1,
        gap: 2,
        minHeight: 46,
        justifyContent: 'center',
    },
    bottomTabActive: {
        backgroundColor: colors.primary,
    },
    bottomLabel: {
        color: colors.textMuted,
        fontSize: 9,
        fontWeight: '900',
    },
    bottomLabelActive: {
        color: colors.inputBackground,
    },
    chip: {
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.pill,
        borderWidth: 1,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    chipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    chipText: {
        color: colors.textMuted,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    chipTextActive: {
        color: colors.inputBackground,
    },
    searchBar: {
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderColor: colors.borderMuted,
        borderRadius: radius.pill,
        borderWidth: 1,
        flexDirection: 'row',
        gap: spacing.sm,
        minHeight: 48,
        paddingHorizontal: spacing.md,
    },
    searchBarPressed: {
        borderColor: colors.primaryMuted,
    },
    searchText: {
        color: colors.textSubtle,
        flex: 1,
        fontSize: typography.caption,
        fontWeight: '700',
    },
    fab: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        bottom: 92,
        flexDirection: 'row',
        gap: spacing.xs,
        height: 56,
        justifyContent: 'center',
        minWidth: 56,
        paddingHorizontal: spacing.md,
        position: 'absolute',
        right: spacing.md,
    },
    fabText: {
        color: colors.inputBackground,
        fontSize: typography.caption,
        fontWeight: '900',
    },
    drawerOverlay: {
        bottom: -720,
        left: 0,
        position: 'absolute',
        top: 90,
        width: 232,
        zIndex: 30,
    },
    drawer: {
        backgroundColor: '#171412',
        borderColor: colors.borderMuted,
        borderTopRightRadius: radius.md,
        borderBottomRightRadius: radius.md,
        borderWidth: 1,
        minHeight: 680,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
    },
    drawerHeader: {
        gap: spacing.sm,
    },
    drawerAvatarFrame: {
        height: 54,
        width: 54,
    },
    drawerAvatar: {
        alignItems: 'center',
        backgroundColor: '#3A2416',
        borderColor: colors.primaryMuted,
        borderRadius: radius.pill,
        borderWidth: 1,
        height: 48,
        justifyContent: 'center',
        overflow: 'hidden',
        width: 48,
    },
    drawerEditBadge: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        bottom: 2,
        height: 22,
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        width: 22,
    },
    drawerProfile: {
        gap: 2,
    },
    drawerName: {
        color: colors.text,
        fontSize: typography.label,
        fontWeight: '900',
    },
    drawerEmail: {
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: '900',
    },
    drawerDivider: {
        backgroundColor: colors.borderMuted,
        height: 1,
        marginBottom: spacing.lg,
        marginTop: spacing.lg,
    },
    drawerItem: {
        alignItems: 'center',
        borderRadius: radius.pill,
        flexDirection: 'row',
        gap: spacing.sm,
        minHeight: 42,
        paddingHorizontal: spacing.md,
    },
    drawerItemActive: {
        backgroundColor: colors.primary,
    },
    drawerItemLabel: {
        color: colors.text,
        flex: 1,
        fontSize: 12,
        fontWeight: '900',
    },
    drawerItemLabelActive: {
        color: colors.inputBackground,
    },
    drawerItemMeta: {
        color: colors.primary,
        fontSize: typography.label,
        fontWeight: '900',
    },
    drawerSectionLabel: {
        color: colors.textSubtle,
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: spacing.lg,
        marginTop: spacing.xl,
        textTransform: 'uppercase',
    },
    drawerFooter: {
        bottom: spacing.lg,
        position: 'absolute',
    },
    drawerVersionTitle: {
        color: colors.textSubtle,
        fontSize: 10,
        fontWeight: '900',
    },
    drawerVersion: {
        color: colors.text,
        fontSize: 10,
        fontWeight: '900',
    },
    stateCard: {
        alignItems: 'center',
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.borderMuted,
        borderRadius: radius.lg,
        borderWidth: 1,
        gap: spacing.md,
        padding: spacing.lg,
    },
    stateIcon: {
        alignItems: 'center',
        backgroundColor: '#2A2110',
        borderRadius: radius.pill,
        height: 72,
        justifyContent: 'center',
        width: 72,
    },
    stateTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '900',
        textAlign: 'center',
    },
    stateDescription: {
        color: colors.textMuted,
        fontSize: typography.caption,
        lineHeight: 20,
        textAlign: 'center',
    },
});
