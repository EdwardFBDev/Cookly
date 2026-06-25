# Store Development

Implement or update application state management.

## Objective

Create or update a store only when shared state is required.

Do not use global state for local UI state.

---

## Read First

- docs/workflow/AI_DEVELOPMENT_FRAMEWORK.md
- docs/standards/CODING_STANDARDS.md
- Project architecture
- specs/<feature>/spec.md

---

## Verify

Before implementation:

- Store already exists.
- State must be global.
- Logic belongs in store, hook, use case or repository.
- Existing actions can be reused.

---

## Store Rules

A store may contain:

- Shared state
- Simple state transitions
- Loading/error flags
- Current selection

A store must not contain:

- Complex business rules
- Direct database access
- Direct API calls
- UI rendering logic

---

## Implementation

Keep the store:

- Small
- Typed
- Predictable
- Easy to reset

Expose clear actions.

---

## Validation

Verify:

- No duplicated state
- No unnecessary global state
- No data access inside store
- Reset behavior exists when needed

---

## Output

Generate production-ready code.

Keep explanations minimal.