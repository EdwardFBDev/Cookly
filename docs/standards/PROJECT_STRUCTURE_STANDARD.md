# Project Structure Standard

Version: 1.0

Status: Draft

---

# 1. Purpose

This document defines the standard project structure for all software projects developed using the AI Development Framework.

The goal is to ensure consistency, scalability and maintainability across projects.

This standard is independent of any programming language or framework.

---

# 2. High-Level Structure

Every project should be organized into four major areas:

```text
AI Framework

Project Documentation

Application Source Code

Automation & Quality
```

---

# 3. Recommended Structure

```text
project-root/

.cursor/

.github/

docs/

specs/

skills/

templates/

tests/

src/

README.md

AGENTS.md
```

---

# 4. Folder Responsibilities

## .cursor

Contains Cursor configuration.

Examples:

* Rules
* Commands
* MCP configuration

---

## .github

Contains GitHub-related resources.

Examples:

* Prompt Library
* Pull Request templates
* Issue templates
* GitHub Actions

---

## docs

Contains project documentation.

Suggested structure:

```text
docs/

product/

architecture/

workflow/

standards/

ui-ux/

adr/

roadmap/
```

---

## specs

Contains feature specifications.

Each feature should have its own folder.

Example:

```text
specs/

AUTH-001/

INV-003/

HOME-002/
```

---

## skills

Contains reusable technical knowledge.

Examples:

```text
React

React Native

Expo

SQLite

Testing

Git
```

Skills are technology-focused and reusable across projects.

---

## templates

Reusable templates.

Examples:

* Feature Spec
* ADR
* Pull Request
* User Story
* Test Plan

---

## tests

Contains automated tests.

Suggested organization:

```text
unit/

integration/

e2e/
```

---

## src

Contains application source code.

The internal organization depends on the selected architecture.

---

# 5. Documentation Rules

Documentation must be:

* Version controlled
* Updated together with implementation
* Written in Markdown
* Independent whenever possible

Each document should answer one question only.

---

# 6. Naming Conventions

Folders:

```text
lowercase
```

Markdown:

```text
UPPER_SNAKE_CASE.md
```

Examples:

```text
AI_DEVELOPMENT_FRAMEWORK.md

PROJECT_STRUCTURE_STANDARD.md

FEATURE_DEVELOPMENT_WORKFLOW.md
```

Source files should follow the language conventions.

---

# 7. Project Independence

The framework must never depend on:

* React
* React Native
* Next.js
* Spring Boot
* SQLite

Technology-specific decisions belong to the project documentation.

---

# 8. Reusable Assets

The following assets should be reusable across projects:

* AI Agents
* Skills
* Prompt Library
* Templates
* Rules
* Checklists

Avoid duplicating them inside individual projects.

---

# 9. Documentation Hierarchy

```text
AI Development Framework

↓

Workflow

↓

Standards

↓

Architecture

↓

Specifications

↓

Implementation
```

Higher-level documents define the rules for lower-level documents.

---

# 10. Repository Guidelines

Every repository should include:

* README
* AGENTS
* Documentation
* Specifications
* Tests
* Source code

No project should start implementation without this minimum structure.

---

# 11. Scalability

The project structure should support:

* Individual developers
* Small teams
* Large teams
* Multiple applications
* Monorepos (future)

No restructuring should be required as the project grows.

---

# 12. Future Extensions

Additional folders may be added when justified.

Examples:

```text
scripts/

packages/

examples/

tools/

assets/
```

New folders should have a single, well-defined responsibility.

---

# 13. Summary

The standard project structure exists to:

* Reduce setup time.
* Standardize collaboration.
* Improve discoverability.
* Simplify onboarding.
* Support AI-assisted development.
* Keep projects maintainable over time.
