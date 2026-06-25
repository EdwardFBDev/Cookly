# Clean Architecture Skill

## Purpose

Apply Clean Architecture consistently across the project.

## Use When

- Creating a new feature.
- Refactoring.
- Designing project architecture.
- Reviewing code.

---

## Layers

```text
Presentation
    ↓
Application
    ↓
Domain
    ↓
Infrastructure
```

Dependencies always point inward.

---

## Responsibilities

### Presentation

Responsible for:

- Screens
- Components
- Navigation
- UI state

Must not contain:

- Business rules
- Database access
- API implementation

---

### Application

Responsible for:

- Use Cases
- Application services
- Workflow orchestration

Must not contain:

- UI rendering
- Persistence implementation

---

### Domain

Responsible for:

- Entities
- Value Objects
- Business Rules
- Interfaces

Must remain independent of frameworks.

---

### Infrastructure

Responsible for:

- Database
- APIs
- Storage
- External services

Must implement domain interfaces.

---

## Dependency Rule

Allowed:

```text
Presentation
    ↓
Application
    ↓
Domain

Infrastructure
    ↓
Domain
```

Not allowed:

- Domain → UI
- Domain → Database
- Application → UI

---

## AI Validation

Before generating code verify:

- Correct layer.
- Correct responsibility.
- No layer violations.
- Existing implementation reused.

---

## Rules

- Business logic belongs in Domain/Application.
- Data access belongs in Infrastructure.
- UI only renders and orchestrates.
- Prefer interfaces over concrete implementations.
- Keep layers independent.

---

## Output

Generate code that respects Clean Architecture.

Keep responsibilities clearly separated.