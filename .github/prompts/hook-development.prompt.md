# Hook Development

Create or update a reusable hook.

## Objective

Use hooks to orchestrate UI state, feature actions and data loading.

Do not place business rules inside hooks.

---

## Read First

- docs/workflow/AI_DEVELOPMENT_FRAMEWORK.md
- docs/standards/CODING_STANDARDS.md
- Project architecture
- specs/<feature>/spec.md

---

## Verify

Before implementation:

- Existing hook can be reused.
- State belongs in the hook, not global store.
- Business logic belongs in a use case.
- Data access belongs in a repository.

---

## Hook Rules

A hook may contain:

- UI orchestration
- Local state
- Loading/error state
- Calls to use cases
- Calls to stores

A hook must not contain:

- Business rules
- SQL
- API implementation
- Complex data mapping
- UI rendering

---

## Validation

Verify:

- Hook has one responsibility.
- Hook is reusable when possible.
- No duplicated logic.
- No direct data access.

---

## Output

Generate production-ready code.

Keep explanations minimal.