# Feature Development Skill

## Purpose

Guide the implementation of one feature using Spec-Driven Development.

## Use When

- Creating a new feature.
- Updating an existing feature.
- Breaking a feature into tasks.
- Validating feature scope.

## Inputs

- Feature spec.
- Acceptance criteria.
- Related architecture.
- Related design system.
- Existing source files.

## Process

1. Read the feature spec.
2. Identify scope.
3. Identify required layers.
4. Reuse existing code.
5. Implement task by task.
6. Validate acceptance criteria.
7. Add or update tests.
8. Prepare for code review.

## Required Layers

Use only the layers needed:

- Types
- Models
- Repository
- Service
- Use Case
- Store
- Hook
- Component
- Screen
- Navigation
- Test

## Rules

- Do not implement without spec.
- Do not expand scope.
- Do not modify unrelated files.
- Do not duplicate components.
- Do not add dependencies without approval.

## Output

- Working implementation.
- Updated tests when needed.
- Notes for review.