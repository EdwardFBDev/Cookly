import { MigrationRunner } from '@/infrastructure/database';

export function initializeDatabase(): void {
    MigrationRunner.run();
}