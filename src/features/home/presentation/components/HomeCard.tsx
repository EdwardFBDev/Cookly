import { PropsWithChildren } from 'react';

import { CooklyCard } from '@/shared/presentation/components/CooklyUI';

type HomeCardProps = PropsWithChildren<{
    variant?: 'default' | 'accent' | 'danger';
}>;

export function HomeCard({ children, variant = 'default' }: HomeCardProps) {
    return <CooklyCard variant={variant}>{children}</CooklyCard>;
}
