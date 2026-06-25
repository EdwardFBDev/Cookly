import { MigrationRunner } from '@/infrastructure/database';

export function initializeDatabase() {
    MigrationRunner.run();
}