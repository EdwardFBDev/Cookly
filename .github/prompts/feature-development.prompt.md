# Feature Development

Implement a feature following the AI Development Framework.

## Objective

Implement ONLY the requested feature.

Do not expand the scope.

---

## Read First

Before coding, review only the required documents.

### Workflow

docs/workflow/AI_DEVELOPMENT_FRAMEWORK.md

docs/workflow/FEATURE_DEVELOPMENT_WORKFLOW.md

### Standards

docs/standards/CODING_STANDARDS.md

docs/standards/PROJECT_STRUCTURE_STANDARD.md

### Project Documents

Read only the documents related to the current feature.

Examples:

- Architecture
- Design System
- ADR
- Navigation
- Screen Specification

### Feature Specification

Read the feature specification.

Example:

specs/<feature>/spec.md

---

## Verify

Before implementation verify:

- Specification is complete.
- Acceptance criteria exist.
- Architecture impact is understood.
- Existing implementation can be reused.

If information is missing, stop and ask.

---

## Implementation Rules

- Respect project architecture.
- Respect Cursor Rules.
- Reuse existing code.
- Keep changes small.
- Modify only related files.
- Do not introduce unnecessary dependencies.
- Do not refactor unrelated code.

---

## Implementation Order

Implement only the layers required.

Recommended order:

1. Types
2. Models
3. Repository
4. Service
5. Use Case
6. Store
7. Hook
8. Components
9. Screen
10. Navigation
11. Tests

---

## Validation

Before finishing verify:

- Specification implemented.
- Acceptance criteria satisfied.
- No duplicated code.
- No architecture violations.
- Code compiles.

---

## Output

Generate production-ready code.

Keep explanations minimal.

Use TODO only for future integrations explicitly defined in the specification.