# Component Development

Implement a reusable UI component.

## Objective

Create or update a reusable component.

Before creating a new component, verify that one does not already exist.

---

## Read First

### Workflow

docs/workflow/AI_DEVELOPMENT_FRAMEWORK.md

### Standards

docs/standards/CODING_STANDARDS.md

### Design System

Read only the relevant Design System documentation.

### Feature Specification

Read:

specs/<feature>/spec.md

---

## Verify

Before implementation:

- Search for an existing component.
- Verify if it can be extended.
- Verify naming consistency.

Only create a new component when reuse is not possible.

---

## Component Rules

The component should:

- Have a single responsibility.
- Be reusable.
- Receive data through props.
- Avoid business logic.
- Avoid direct API or database access.
- Avoid global state unless required.

---

## Component Structure

Implement only what is required.

Typical structure:

- Component
- Props
- Styles
- Tests (if applicable)

---

## Naming

Use PascalCase.

Examples:

Button

RecipeCard

InventoryItem

LocationSelector

---

## Validation

Verify:

- Reusable.
- No duplicated functionality.
- Matches Design System.
- Accessible.
- Responsive when applicable.

---

## Output

Generate production-ready code.

Keep explanations minimal.