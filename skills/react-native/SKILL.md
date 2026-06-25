# React Native Skill

## Purpose

Develop maintainable mobile applications using React Native.

## Use When

- Creating screens.
- Creating reusable components.
- Implementing navigation.
- Managing mobile UI.

---

## Principles

- Keep screens small.
- Reuse components.
- Keep UI declarative.
- Separate UI from business logic.

---

## Screen Responsibilities

A screen should:

- Render UI.
- Handle navigation.
- Call hooks.
- Display state.

A screen must not:

- Access databases.
- Call APIs directly.
- Contain business rules.

---

## Component Responsibilities

Components should:

- Be reusable.
- Receive data via props.
- Be stateless whenever possible.

Avoid tightly coupled components.

---

## Hooks

Use hooks for:

- UI state
- User interaction
- Calling use cases
- Consuming stores

Avoid business logic inside hooks.

---

## Styling

- Follow the Design System.
- Reuse theme values.
- Avoid hardcoded values.
- Prefer shared spacing, colors and typography.

---

## Performance

Prefer:

- FlatList
- SectionList
- React.memo when justified
- useMemo only when necessary
- useCallback only when necessary

Avoid premature optimization.

---

## Accessibility

Components should support:

- accessibilityLabel
- accessibilityRole
- Dynamic font scaling when applicable

---

## AI Validation

Before generating code verify:

- Existing component can be reused.
- Design matches approved UI.
- Screen responsibilities are respected.
- Business logic is outside the UI.

---

## Output

Generate production-ready React Native code following project standards.