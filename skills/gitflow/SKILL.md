# GitFlow Skill

## Purpose

Manage source code using GitFlow.

## Use When

- Starting a feature.
- Fixing bugs.
- Preparing releases.
- Creating Pull Requests.

---

## Branch Strategy

Main branches:

- main
- develop

Supporting branches:

- feature/*
- fix/*
- hotfix/*
- release/*

---

## Branch Naming

Use:

feature/<ticket>-<feature-name>

fix/<ticket>-<description>

hotfix/<ticket>-<description>

release/<version>

Examples:

feature/cookly-001-login

feature/cookly-021-inventory

fix/cookly-104-navigation

release/v1.0.0

---

## Development Flow

1. Update develop.
2. Create feature branch.
3. Implement feature.
4. Commit small changes.
5. Open Pull Request.
6. Code Review.
7. Merge into develop.

---

## Commits

Commits should:

- Be small.
- Be atomic.
- Represent one logical change.

Format:

<TICKET>: <short description>

Examples:

COOKLY-001: implement login screen

COOKLY-015: add inventory repository

---

## Pull Requests

Every PR should include:

- Feature summary
- Related ticket
- Testing performed
- Screenshots (if UI changed)

---

## Merge Rules

Before merging verify:

- Review approved.
- Tests passed.
- Documentation updated.
- No merge conflicts.

---

## AI Validation

Before suggesting Git commands verify:

- Correct branch.
- Correct target branch.
- Correct commit scope.
- No unrelated changes staged.

---

## Manual Git Operations

The AI must never automatically execute:

- git add
- git commit
- git push
- git merge
- git rebase
- git cherry-pick

The AI may recommend Git commands, but execution is always initiated manually by the developer unless explicitly requested.

---

## Output

Recommend GitFlow commands and workflow following project standards.