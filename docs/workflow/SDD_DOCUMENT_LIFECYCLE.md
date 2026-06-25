# SDD Document Lifecycle

Version: 1.0

Status: Draft

---

# 1. Purpose

This document defines the lifecycle of every document used in the Spec-Driven Development (SDD) workflow.

It specifies:

* When a document is created.
* Why it exists.
* Who consumes it.
* When it is no longer actively used.

---

# 2. Project Lifecycle

```text
Idea
    ↓
Product
    ↓
Architecture
    ↓
UI / UX
    ↓
Specifications
    ↓
Implementation
    ↓
Testing
    ↓
Release
```

---

# 3. Documentation Lifecycle

## Phase 1 — Product

Purpose:

Define **what** will be built.

Documents:

```text
Project Vision
Scope
Requirements
User Stories
Acceptance Criteria
Roadmap
```

Consumers:

* Product Owner
* Software Architect

---

## Phase 2 — Architecture

Purpose:

Define **how** the solution will be built.

Documents:

```text
Architecture
Data Model
Design System
Navigation
Technology Decisions
ADR
```

Consumers:

* Software Architect
* Technical Lead
* Developers

---

## Phase 3 — UI / UX

Purpose:

Define the user experience.

Documents:

```text
Wireframes
Mockups
Flows
Screen Specifications
```

Consumers:

* UI Engineer
* Frontend Developer
* Mobile Developer

---

## Phase 4 — Feature Specification

Purpose:

Describe one feature.

Each feature contains:

```text
spec.md
tasks.md
acceptance-criteria.md
test-plan.md
```

Consumers:

* AI Agents
* Developers
* QA

---

## Phase 5 — Implementation

Purpose:

Transform specifications into software.

Consumes:

* Feature Spec
* Architecture
* Design System
* Coding Standards

Produces:

* Source Code
* Tests

---

## Phase 6 — Testing

Purpose:

Validate the implementation.

Documents:

```text
Test Plan
Test Results
Bug Reports
```

Consumers:

* QA
* Developers

---

## Phase 7 — Release

Purpose:

Prepare delivery.

Documents:

```text
Release Notes
Deployment Guide
Change Log
```

---

# 4. Active Documents

During implementation, only these documents should normally be loaded into AI:

* Feature Specification
* Architecture
* Design System
* Coding Standards

Everything else should remain outside the working context.

---

# 5. Archived Documents

Documents such as:

* Brainstorming
* Early ideas
* Rejected proposals

Should remain in the repository but should not be included in implementation context.

---

# 6. AI Context Priority

Priority 1

```text
Feature Specification
```

Priority 2

```text
Architecture
```

Priority 3

```text
Design System
```

Priority 4

```text
Coding Standards
```

Priority 5

```text
Related Source Files
```

Avoid loading documents with lower priority unless required.

---

# 7. Lifecycle Summary

| Phase          | Main Output        |
| -------------- | ------------------ |
| Product        | Requirements       |
| Architecture   | Technical Design   |
| UI / UX        | Screen Design      |
| Specification  | Feature Definition |
| Implementation | Source Code        |
| Testing        | Validation         |
| Release        | Deliverable        |

---

# 8. Goal

The purpose of this lifecycle is to minimize AI context while ensuring that every implementation is based on approved documentation.
