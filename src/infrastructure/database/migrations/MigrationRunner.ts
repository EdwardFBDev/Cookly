import type { SQLiteDatabase } from 'expo-sqlite';

import { database } from '../database';
import type { Migration } from './Migration';
import { migrations } from './migrationRegistry';

const CREATE_SCHEMA_MIGRATIONS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS schema_migrations (
    version INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

type AppliedMigrationRow = {
    version: number;
};

export class MigrationRunner {
    constructor(
        private readonly db: SQLiteDatabase = database,
        private readonly registeredMigrations: readonly Migration[] = migrations,
    ) {}

    static run(): void {
        new MigrationRunner().run();
    }

    run(): void {
        this.createMigrationTable();
        this.validateMigrationRegistry();

        const appliedVersions = this.getAppliedMigrationVersions();
        const pendingMigrations = this.getPendingMigrations(appliedVersions);

        pendingMigrations.forEach((migration) => {
            this.applyMigration(migration);
        });
    }

    private createMigrationTable(): void {
        this.db.execSync(CREATE_SCHEMA_MIGRATIONS_TABLE_SQL);
    }

    private validateMigrationRegistry(): void {
        const versions = new Set<number>();

        this.registeredMigrations.forEach((migration) => {
            if (!Number.isInteger(migration.version) || migration.version < 1) {
                throw new Error(`Invalid migration version: ${migration.version}`);
            }

            if (versions.has(migration.version)) {
                throw new Error(`Duplicate migration version: ${migration.version}`);
            }

            versions.add(migration.version);
        });
    }

    private getAppliedMigrationVersions(): Set<number> {
        const rows = this.db.getAllSync<AppliedMigrationRow>(
            'SELECT version FROM schema_migrations;',
        );

        return new Set(rows.map((row) => row.version));
    }

    private getPendingMigrations(appliedVersions: Set<number>): Migration[] {
        return [...this.registeredMigrations]
            .sort((current, next) => current.version - next.version)
            .filter((migration) => !appliedVersions.has(migration.version));
    }

    private applyMigration(migration: Migration): void {
        this.db.withTransactionSync(() => {
            migration.up(this.db);
            this.db.runSync(
                'INSERT INTO schema_migrations (version, name) VALUES (?, ?);',
                [migration.version, migration.name],
            );
        });
    }
}