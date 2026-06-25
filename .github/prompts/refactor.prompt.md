# Code Refactoring

Refactor the existing implementation without changing its external behavior.

## Objective

Improve code quality while preserving functionality.

Do not introduce new features.

---

## Read First

- docs/workflow/AI_DEVELOPMENT_FRAMEWORK.md
- docs/standards/CODING_STANDARDS.md
- Project architecture

---

## Verify

Before refactoring:

- Current behavior is understood.
- Scope is limited.
- Existing tests are available.
- Changes will not affect unrelated features.

If behavior is unclear, stop and ask.

---

## Refactoring Goals

Improve:

- Readability
- Maintainability
- Reusability
- Simplicity

Reduce:

- Code duplication
- Large functions
- Large components
- Deep nesting
- Tight coupling

---

## Rules

Do:

- Keep public behavior unchanged.
- Preserve architecture.
- Reuse existing abstractions.
- Keep commits small.

Do not:

- Add new functionality.
- Change business rules.
- Rename unrelated files.
- Introduce new dependencies without justification.

---

## Validation

Verify:

- Functionality preserved.
- No architecture violations.
- No duplicated code.
- Code is simpler than before.
- Tests still pass.

---

## Output

Generate production-ready refactored code.

Keep explanations minimal.

Summarize:

- What changed.
- Why it improved.
- Any risks identified.