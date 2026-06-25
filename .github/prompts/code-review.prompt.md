# Code Review

Review the current implementation.

## Objective

Detect issues before commit or Pull Request.

---

## Read First

- docs/standards/CODING_STANDARDS.md
- Project architecture
- specs/<feature>/spec.md

---

## Review Checklist

Verify:

- Feature matches the spec.
- Acceptance criteria are satisfied.
- Architecture is respected.
- No unrelated files were modified.
- No duplicated logic.
- No unnecessary dependencies.
- No business logic inside UI.
- No direct data access from UI.
- Naming is consistent.
- Error handling is present.
- Tests were added or justified.

---

## Output

Return:

1. Critical issues
2. Suggested improvements
3. Approval status

Use this format:

```text
Status: Approved / Changes Required

Critical Issues:
- ...

Suggested Improvements:
- ...

Notes:
- ...
```

Keep the review concise.