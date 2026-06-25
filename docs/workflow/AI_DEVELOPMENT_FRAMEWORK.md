# AI Development Framework

Version: 1.0

Status: Draft

---

# 1. Purpose

The AI Development Framework defines the standard methodology for developing software using Artificial Intelligence, Cursor IDE and Spec-Driven Development (SDD).

The framework is designed for collaborative software projects and aims to create a predictable, scalable and maintainable development process.

This framework is technology-agnostic and can be applied to:

* Mobile applications
* Web applications
* Backend services
* APIs
* Desktop applications

The framework is independent of any specific project.

---

# 2. Objectives

The framework has the following objectives:

* Standardize software development.
* Minimize AI context consumption.
* Encourage reusable components.
* Promote reusable documentation.
* Improve collaboration between developers.
* Reduce implementation errors.
* Keep architecture consistent.
* Produce maintainable software.

---

# 3. Core Principles

## 3.1 Spec First

No implementation starts without an approved specification.

---

## 3.2 Small Context

Only provide AI with the information required to complete the current task.

Avoid sharing the entire project.

---

## 3.3 Feature Driven

Development is performed by feature.

Never develop the entire application in one request.

---

## 3.4 Reuse First

Before creating:

* Components
* Hooks
* Services
* Stores
* Repositories

Always verify whether one already exists.

---

## 3.5 Single Responsibility

Every file should have a single responsibility.

---

## 3.6 Clean Architecture

Business logic must remain independent from UI.

---

## 3.7 Documentation Driven

Documentation is part of the software.

Documentation is updated together with the implementation.

---

## 3.8 Review Before Merge

No feature reaches the main branch without review.

---

# 4. Development Lifecycle

Every project follows the same lifecycle.

```text
Idea
    ↓
Product Analysis
    ↓
Requirements
    ↓
Architecture
    ↓
UI / UX
    ↓
Technical Specification
    ↓
Task Breakdown
    ↓
Implementation
    ↓
Testing
    ↓
Code Review
    ↓
Pull Request
    ↓
Merge
    ↓
Release
```

---

# 5. Framework Layers

The framework is organized into layers.

```text
Methodology

↓

Workflow

↓

Standards

↓

Agents

↓

Skills

↓

Prompt Library

↓

Templates

↓

Project
```

Each layer depends only on the layers above it.

---

# 6. Standard Project Structure

```text
.cursor/
.github/

docs/

specs/

skills/

templates/

src/
```

Purpose:

| Folder    | Purpose                      |
| --------- | ---------------------------- |
| docs      | Documentation                |
| specs     | Feature specifications       |
| skills    | Reusable technical knowledge |
| prompts   | Reusable prompts             |
| templates | Standard templates           |
| src       | Application source code      |

---

# 7. Required Documentation

Every project should include at minimum:

```text
docs/

Product

Architecture

Workflow

Standards

ADR

Roadmap
```

---

# 8. Feature Structure

Each feature should have its own specification.

```text
specs/

feature-name/

spec.md

tasks.md

acceptance-criteria.md

test-plan.md
```

---

# 9. AI Context Strategy

AI should only receive:

* Current feature specification.
* Related architecture.
* Related design system.
* Files to modify.

Avoid sharing:

* Entire repository.
* Unrelated documentation.
* Completed features.

---

# 10. Development Workflow

The standard workflow is:

```text
Select Feature

↓

Read Specification

↓

Read Architecture

↓

Read Design System

↓

Implement Small Tasks

↓

Run Tests

↓

Review

↓

Commit

↓

Pull Request

↓

Merge
```

---

# 11. Git Workflow

```text
main

develop

feature/<ticket>-<feature-name>

fix/<ticket>-description

hotfix/<ticket>-description
```

---

# 12. Coding Principles

Projects developed using this framework should follow:

* SOLID
* DRY
* KISS
* Clean Code
* Clean Architecture
* Feature-Based Architecture (recommended)
* Domain-Driven Design where appropriate

---

# 13. AI Development Rules

AI should never:

* Invent requirements.
* Ignore approved specifications.
* Modify unrelated files.
* Duplicate components.
* Introduce unnecessary libraries.
* Change architecture without approval.

AI should always:

* Explain major technical decisions.
* Reuse existing code.
* Keep implementations small.
* Respect project standards.

---

# 14. Definition of Done

A feature is complete when:

* Specification is implemented.
* Acceptance criteria are satisfied.
* Code follows project architecture.
* Components are reusable.
* No duplicated logic exists.
* Tests were added or updated.
* Documentation is updated.
* Code review passed.
* Pull Request is ready.

---

# 15. Responsibilities

## Product Documentation

Defines what to build.

---

## Architecture

Defines how to build it.

---

## Specifications

Define the implementation requirements.

---

## Tasks

Define implementation order.

---

## AI Agents

Execute specialized responsibilities.

---

## Skills

Provide reusable technical knowledge.

---

## Prompt Library

Provides standardized interactions with AI.

---

# 16. Framework Philosophy

The framework exists to reduce uncertainty.

Developers should spend their time solving business problems rather than deciding:

* Folder structures
* Coding standards
* Development workflow
* Documentation format
* Prompt wording

These decisions should already be defined by the framework.

---

# 17. Future Evolution

This framework is intended to evolve.

New technologies, agents, workflows and templates may be added while maintaining backward compatibility whenever possible.

The framework should improve continuously based on project experience and team feedback.
