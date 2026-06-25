# Feature Development Workflow

Version: 1.0

Status: Draft

---

# 1. Purpose

This document defines the standard workflow for implementing a software feature using the AI Development Framework.

Every feature must follow this workflow.

---

# 2. Development Workflow

```text
Select Feature
    ↓
Read Specification
    ↓
Review Architecture
    ↓
Review Design System
    ↓
Break Down Tasks
    ↓
Implementation
    ↓
Testing
    ↓
Code Review
    ↓
Commit
    ↓
Pull Request
    ↓
Merge
```

---

# 3. Step 1 - Select Feature

A feature must originate from one of the following:

* Product Backlog
* Sprint Backlog
* Bug Report
* Technical Debt
* Improvement Request

Every feature must have a unique identifier.

Example:

```text
COOKLY-001
AUTH-004
INV-012
```

---

# 4. Step 2 - Review Documentation

Before writing code, review only the required documents.

Required:

* Feature Specification
* Acceptance Criteria
* Architecture
* Design System (if UI changes)
* Related ADR (if applicable)

Do not load unrelated documentation.

---

# 5. Step 3 - Create Feature Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/<ticket>-<feature-name>
```

Example:

```bash
feature/cookly-001-login
```

---

# 6. Step 4 - Break Down Tasks

Split the feature into small implementation tasks.

Example:

* Create screen
* Create store
* Create repository
* Implement use case
* Add navigation
* Add tests

Each task should be independently testable.

---

# 7. Step 5 - Implementation

Implement one task at a time.

Rules:

* Do not implement unrelated requirements.
* Reuse existing components.
* Keep commits small.
* Respect project architecture.
* Follow coding standards.

---

# 8. Step 6 - Testing

Run all relevant tests.

Minimum validation:

* Feature works.
* Existing functionality still works.
* Acceptance criteria are satisfied.

---

# 9. Step 7 - Code Review

Before committing, verify:

* No duplicated code.
* No unnecessary complexity.
* No architecture violations.
* No unrelated changes.

If available, execute the Code Review Agent.

---

# 10. Step 8 - Commit

Commit only completed work.

Example:

```bash
git add .

git commit -m "COOKLY-001: implement login feature"
```

---

# 11. Step 9 - Pull Request

Every feature must be merged through a Pull Request.

Checklist:

* Feature completed
* Tests executed
* Documentation updated
* Ready for review

---

# 12. Definition of Done

A feature is complete when:

* Specification implemented
* Acceptance criteria satisfied
* Tests completed
* Documentation updated
* Code reviewed
* Pull Request approved

---

# 13. AI Context Strategy

When using AI, provide only:

* Current feature specification
* Architecture documents
* Design System (if needed)
* Files being modified

Avoid providing the entire project.

---

# 14. Expected Deliverables

Every completed feature should produce:

* Source code
* Updated tests
* Updated documentation
* Pull Request
* Review comments resolved

---

# 15. Workflow Summary

```text
Feature
    ↓
Specification
    ↓
Architecture Review
    ↓
Task Breakdown
    ↓
Implementation
    ↓
Testing
    ↓
Review
    ↓
Commit
    ↓
Pull Request
    ↓
Merge
```
