# SQLite Skill

## Purpose

Implement local persistence using SQLite.

## Use When

- Creating local database tables.
- Creating repositories.
- Reading or writing local data.
- Implementing offline-first behavior.

---

## Principles

- SQLite is accessed only through repositories.
- UI must never execute SQL.
- Business logic must not live in SQL queries.
- Use migrations for schema changes.

---

## Responsibilities

SQLite layer may contain:

- Tables
- Queries
- Transactions
- Migrations
- Data mapping

SQLite layer must not contain:

- UI logic
- Business rules
- Navigation logic
- Global state logic

---

## Repository Flow

```text
Screen
↓
Hook
↓
Use Case
↓
Repository Interface
↓
SQLite Repository
↓
SQLite
```

---

## Migrations

Every schema change must be handled through migrations.

Migrations should be:

- Versioned
- Repeatable
- Safe
- Documented when needed

---

## Transactions

Use transactions when multiple writes must succeed or fail together.

Examples:

- Cooking confirmation
- Inventory consumption
- Shopping list generation

---

## Validation

Before writing SQLite code verify:

- Table exists.
- Repository exists.
- Query belongs in data layer.
- Business rule belongs in use case.

---

## Output

Generate production-ready SQLite code through repositories.