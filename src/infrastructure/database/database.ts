import * as SQLite from 'expo-sqlite';

import { APP_CONFIG } from '@/core/config';

export const database = SQLite.openDatabaseSync(APP_CONFIG.databaseName);