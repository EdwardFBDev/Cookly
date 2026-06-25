# Testing Skill

## Purpose

Implement automated tests that validate business behavior.

## Use When

- Creating a new feature.
- Fixing bugs.
- Refactoring.
- Adding business logic.

---

## Principles

- Test behavior, not implementation.
- Keep tests deterministic.
- Keep tests independent.
- Keep tests easy to read.

---

## Testing Pyramid

Priority:

1. Unit Tests
2. Integration Tests
3. End-to-End Tests

Prefer more unit tests than E2E tests.

---

## What to Test

Prioritize:

- Use Cases
- Business Rules
- Repositories
- Services
- Utilities
- Data Mapping
- Validation

Avoid testing implementation details.

---

## What Not to Test

Avoid testing:

- Styling
- Layout
- Private methods
- Framework internals

---

## Test Structure

Use:

Arrange

↓

Act

↓

Assert

Each test should verify one behavior.

---

## Naming

Test names should describe behavior.

Examples:

```text
shouldCreateInventory()

shouldReturnRecipesOrderedByCompatibility()

shouldRejectExpiredIngredient()
```

---

## Mocks

Mock only external dependencies.

Examples:

- API
- Database
- File System
- Time
- Network

Do not mock business logic.

---

## Coverage

Focus on:

- Critical paths
- Error scenarios
- Edge cases
- Business rules

Do not pursue 100% coverage at the expense of quality.

---

## AI Validation

Before generating tests verify:

- Acceptance criteria covered.
- Existing tests reused.
- Behavior clearly defined.
- Tests remain deterministic.

---

## Output

Generate readable, maintainable and production-ready automated tests.