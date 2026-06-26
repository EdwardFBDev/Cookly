import { CooklyButton } from '@/shared/presentation/components/CooklyUI';

type HomeActionButtonProps = {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'outline';
};

export function HomeActionButton({
    label,
    onPress,
    variant = 'primary',
}: HomeActionButtonProps) {
    return <CooklyButton fullWidth label={label} onPress={onPress} variant={variant} />;
}
