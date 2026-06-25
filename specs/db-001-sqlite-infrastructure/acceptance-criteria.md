# DB-001 SQLite Infrastructure Acceptance Criteria

- [x] The infrastructure opens the Cookly SQLite database using Expo SQLite.
- [x] Database initialization can be called from app bootstrap without UI involvement.
- [x] A reusable `Migration` contract defines version, name, and execution behavior.
- [x] A migration registry exists and contains no SQL migrations yet.
- [x] The migration runner creates or verifies the migration tracking table.
- [x] The migration runner executes only pending registered migrations.
- [x] Applied migrations are recorded after successful execution.
- [x] Migration execution is version ordered.
- [x] The implementation contains no business logic.
- [x] The implementation contains no repositories, features, hooks, stores, or UI.
- [x] No new dependencies are added.
