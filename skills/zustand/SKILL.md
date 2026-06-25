# Zustand Skill

## Purpose

Manage shared application state using Zustand.

## Use When

- State is shared across multiple screens.
- State must persist during the application lifecycle.
- Multiple components consume the same data.

Do not use Zustand for local UI state.

---

## Principles

- One store per domain.
- Keep stores small.
- Keep stores predictable.
- Keep stores focused.

---

## Store Responsibilities

A store may contain:

- Shared state
- Simple actions
- Loading state
- Error state
- Current selection

A store must not contain:

- Business rules
- SQL
- API implementation
- Complex calculations
- UI rendering

---

## Recommended Structure

Store

↓

Actions

↓

Selectors

↓

Persistence (if required)

---

## State Design

Store only:

- Current user
- Session
- Active location
- Filters
- Preferences
- Shared collections

Avoid storing:

- Derived data
- Temporary form values
- Component-specific state

---

## Actions

Actions should:

- Be small.
- Update state only.
- Call use cases when necessary.
- Remain predictable.

---

## Persistence

Persist only when required.

Examples:

- Authentication
- User preferences
- Theme
- Language

Avoid persisting temporary state.

---

## Validation

Before creating a store verify:

- Shared state is required.
- Existing store cannot be extended.
- Local component state is insufficient.

---

## AI Validation

Before generating code verify:

- Store already exists.
- State belongs in Zustand.
- No business logic is added.
- No direct data access exists.

---

## Output

Generate production-ready Zustand stores following project architecture.