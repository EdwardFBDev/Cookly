# Start New Project

## Purpose

This guide defines the standard process for starting a new software project using the AI Development Framework.

---

# Phase 1 — Project Setup

Create the project repository.

Clone or copy the AI Development Framework.

Verify the following structure exists:

```text
.cursor/
.github/
docs/
skills/
templates/
```

---

# Phase 2 — Product Definition

Complete:

* Project Vision
* Scope
* Functional Requirements
* Non-Functional Requirements
* Business Rules
* User Stories
* Acceptance Criteria
* MVP Definition

No code should be written during this phase.

---

# Phase 3 — Architecture

Define:

* Software Architecture
* Data Model
* Project Structure
* Design System
* Navigation
* ADRs

Approve the architecture before implementation.

---

# Phase 4 — UI / UX

Create:

* Wireframes
* Mockups
* User Flows

The approved design becomes the UI source of truth.

---

# Phase 5 — Feature Planning

Create one specification folder per feature.

Example:

```text
specs/

AUTH-001/

INV-001/

HOME-001/
```

Each feature should contain:

* spec.md
* tasks.md
* acceptance-criteria.md
* test-plan.md

---

# Phase 6 — Development

Implement one feature at a time.

Follow:

* Cursor Rules
* Skills
* Prompt Library

Never implement multiple features in one request.

---

# Phase 7 — Review

Before merging:

* Review code.
* Execute tests.
* Update documentation.

---

# Phase 8 — Release

Prepare:

* Release Notes
* Version Tag
* Deployment

---

# Checklist

Before starting development verify:

* Product approved.
* Architecture approved.
* UI approved.
* First feature specification completed.
