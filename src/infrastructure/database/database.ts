import * as SQLite from 'expo-sqlite';

import { APP_CONFIG } from '@/core/config';

export type CooklyDatabase = SQLite.SQLiteDatabase;

export const database: CooklyDatabase = SQLite.openDatabaseSync(APP_CONFIG.databaseName);