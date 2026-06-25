# Repository Development

Implement or update a Repository following the project architecture.

## Objective

Implement the data access layer.

The repository must encapsulate all persistence or external communication.

Business logic must never exist in a repository.

---

## Read First

### Workflow

docs/workflow/AI_DEVELOPMENT_FRAMEWORK.md

### Standards

docs/standards/CODING_STANDARDS.md

### Architecture

Read the project architecture related to data persistence.

### Feature Specification

specs/<feature>/spec.md

---

## Verify

Before implementation:

- Repository already exists.
- Interface already exists.
- Existing implementation can be extended.
- Required models are available.

If reuse is possible, update instead of creating.

---

## Responsibilities

A repository may:

- Read data.
- Write data.
- Update data.
- Delete data.
- Query external sources.
- Map data models.

A repository must not:

- Validate business rules.
- Make UI decisions.
- Contain presentation logic.

---

## Repository Rules

Keep repositories:

- Small.
- Predictable.
- Testable.
- Focused on one aggregate or entity.

---

## Error Handling

Handle data source errors.

Return consistent results.

Do not expose implementation details.

---

## Validation

Verify:

- Architecture respected.
- No business logic.
- Existing interfaces reused.
- Error handling implemented.

---

## Output

Generate production-ready code.

Keep explanations minimal.