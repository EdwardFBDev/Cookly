# Bug Fix

Fix the reported issue without changing unrelated behavior.

## Objective

Resolve the bug while preserving existing functionality.

Do not implement new features.

---

## Read First

- docs/workflow/AI_DEVELOPMENT_FRAMEWORK.md
- docs/standards/CODING_STANDARDS.md
- Project architecture
- Bug report
- Related feature specification

---

## Verify

Before implementing:

- Reproduce the issue.
- Identify the root cause.
- Determine affected files.
- Verify existing tests.

Do not fix symptoms.

Fix the root cause.

---

## Rules

Do:

- Modify only affected files.
- Keep the fix minimal.
- Preserve architecture.
- Reuse existing code.

Do not:

- Refactor unrelated code.
- Introduce new dependencies.
- Change feature behavior.
- Expand the scope.

---

## Validation

Verify:

- Bug is fixed.
- Existing functionality still works.
- No regressions introduced.
- Tests updated when necessary.

---

## Output

Generate production-ready code.

Keep explanations minimal.

Summarize:

- Root cause.
- Files modified.
- Validation performed.