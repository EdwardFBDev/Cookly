import { ReactNode, useEffect } from 'react';

import { initializeApp } from '@/app/bootstrap/initializeApp';

type AppProvidersProps = {
    children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
    useEffect(() => {
        initializeApp();
    }, []);

    return children;
}