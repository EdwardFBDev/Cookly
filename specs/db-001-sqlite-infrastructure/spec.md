# DB-001 SQLite Infrastructure Specification

## Objective

Implement the Cookly SQLite infrastructure foundation for offline-first persistence.

The infrastructure must open the local Expo SQLite database, define a versioned migration contract, register available migrations, and provide an initialization entry point that runs pending migrations.

## Architecture Rules

- The implementation belongs to the infrastructure layer.
- Application bootstrap may call database initialization.
- No UI code may access SQLite directly.
- No repositories, services, use cases, stores, hooks, or feature logic are included in this scope.
- No business rules are included in migrations or database setup.

## Dependencies

- Use the existing `expo-sqlite` dependency.
- Use TypeScript.
- Do not add runtime or development dependencies.

## Migration Strategy

- Migrations are versioned and immutable once released.
- Each migration has a unique numeric version and a descriptive name.
- The migration runner executes only migrations that have not been recorded.
- Applied migrations are stored in `schema_migrations`.
- The registry is intentionally empty until `V001_INITIAL` is implemented.

## Scope

Included:

- SQLite database opening.
- Database initialization entry point.
- Migration type contract.
- Migration runner.
- Migration registry.
- Database infrastructure exports.

Excluded:

- SQL for `V001_INITIAL`.
- Business tables.
- Repositories.
- Feature data access.
- UI changes.
- Synchronization logic.
