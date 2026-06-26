import { CooklyTopAppBar } from '@/shared/presentation/components/CooklyUI';

type HomeHeaderProps = {
    onNotificationsPress?: () => void;
};

export function HomeHeader({ onNotificationsPress }: HomeHeaderProps) {
    return <CooklyTopAppBar locationLabel="Casa" onNotificationPress={onNotificationsPress} title="Cookly" />;
}
