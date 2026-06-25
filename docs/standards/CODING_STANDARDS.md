# Coding Standards

Version: 1.0

Status: Draft

---

# 1. Purpose

This document defines the coding standards that every software project developed with the AI Development Framework must follow.

The objective is to ensure:

* Readability
* Maintainability
* Consistency
* Scalability
* Reusability

---

# 2. General Principles

All code should follow:

* SOLID
* DRY (Don't Repeat Yourself)
* KISS (Keep It Simple)
* YAGNI (You Aren't Gonna Need It)
* Clean Code

---

# 3. File Responsibilities

Each file should have a single responsibility.

Avoid files that:

* Mix UI and business logic.
* Contain unrelated functions.
* Grow excessively.

Recommended:

* < 300 lines per file.
* Split large files into smaller modules.

---

# 4. Function Guidelines

Functions should:

* Perform one task.
* Have descriptive names.
* Minimize side effects.
* Return predictable results.

Avoid deeply nested logic.

---

# 5. Component Guidelines

Components should:

* Be reusable.
* Be composable.
* Receive data through props.
* Avoid business logic.

Screens orchestrate.

Components render.

---

# 6. Business Logic

Business rules must not exist inside:

* Screens
* Pages
* UI Components

Business logic belongs in:

* Use Cases
* Services
* Domain Layer

---

# 7. Data Access

UI must never access:

* Database
* API
* Storage

directly.

Use repositories or services.

---

# 8. State Management

Global state should contain only shared application state.

Local UI state should remain inside components whenever possible.

Avoid unnecessary global state.

---

# 9. Reuse First

Before creating:

* Component
* Hook
* Utility
* Service
* Repository

Search for an existing implementation.

Duplicate code is prohibited unless justified.

---

# 10. Naming Conventions

Folders

```text
lowercase
```

Components

```text
PascalCase
```

Hooks

```text
useSomething
```

Functions

```text
camelCase
```

Constants

```text
UPPER_SNAKE_CASE
```

Types

```text
PascalCase
```

Interfaces

```text
PascalCase
```

Enums

```text
PascalCase
```

---

# 11. Comments

Code should be self-explanatory.

Use comments only when explaining:

* Business decisions.
* Complex algorithms.
* Temporary workarounds.

Never comment obvious code.

---

# 12. Error Handling

Errors should:

* Be handled explicitly.
* Provide meaningful messages.
* Never fail silently.

Avoid empty catch blocks.

---

# 13. Imports

Group imports in this order:

1. External libraries
2. Internal modules
3. Relative imports

Remove unused imports.

Avoid circular dependencies.

---

# 14. Dependencies

Before adding a new dependency verify:

* Can the existing stack solve the problem?
* Is the dependency actively maintained?
* Is it necessary?

Do not introduce libraries without technical justification.

---

# 15. Testing

Business logic should be testable.

Tests should prioritize:

* Use Cases
* Services
* Utilities

Avoid testing implementation details.

---

# 16. Performance

Prefer:

* Simple solutions.
* Lazy loading when applicable.
* Memoization only when justified.
* Efficient rendering.

Do not optimize prematurely.

---

# 17. Security

Never:

* Hardcode secrets.
* Commit credentials.
* Trust client input.
* Expose sensitive information.

Always validate external data.

---

# 18. Documentation

Every important architectural decision should be documented.

When introducing:

* New pattern
* New dependency
* New architecture

Update the corresponding documentation.

---

# 19. AI Rules

AI must:

* Respect project architecture.
* Respect approved specifications.
* Reuse existing code.
* Modify only requested files.
* Avoid unnecessary refactoring.

AI must never:

* Invent requirements.
* Create duplicate components.
* Change architecture without approval.
* Introduce unrelated changes.

---

# 20. Definition of Quality

Code is considered high quality when it is:

* Correct
* Readable
* Testable
* Maintainable
* Reusable
* Consistent
* Documented
