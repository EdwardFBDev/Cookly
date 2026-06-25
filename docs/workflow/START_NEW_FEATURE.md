# Start New Feature

## Purpose

This guide defines the standard workflow for implementing a single feature.

---

# Step 1

Select one feature from the roadmap or backlog.

Example:

```text
COOKLY-001 Login
```

---

# Step 2

Read only:

* Feature Specification
* Acceptance Criteria
* Architecture
* Design System
* Related Source Files

Do not load the entire project.

---

# Step 3

Create the feature branch.

Example:

```text
feature/cookly-001-login
```

Git operations remain manual.

---

# Step 4

Open the appropriate prompt.

Examples:

* feature-development
* screen-development
* repository-development
* component-development

---

# Step 5

Identify required layers.

Only implement what the feature requires.

Possible layers:

* Repository
* Use Case
* Store
* Hook
* Component
* Screen
* Navigation

---

# Step 6

Implement one task at a time.

Do not continue if the specification becomes unclear.

---

# Step 7

Validate:

* Acceptance Criteria
* Architecture
* Existing Components
* Existing Stores

---

# Step 8

Execute tests.

Update tests when business logic changes.

---

# Step 9

Run the Code Review prompt.

Resolve all critical issues.

---

# Step 10

Commit manually.

Open Pull Request manually.

---

# Checklist

Before marking the feature as complete verify:

* Specification implemented.
* Acceptance criteria satisfied.
* Tests completed.
* Documentation updated.
* Code review passed.
* Ready for Pull Request.
