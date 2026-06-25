# Expo Router Skill

## Purpose

Implement navigation using Expo Router following project architecture.

## Use When

- Creating routes.
- Adding screens.
- Managing navigation.
- Organizing route groups.

---

## Principles

- Navigation belongs in the `app/` directory.
- Business logic belongs in `src/`.
- Keep routing declarative.
- Use route groups to organize features.

---

## Responsibilities

Expo Router is responsible for:

- Navigation
- Layouts
- Route groups
- Deep linking

Expo Router must not contain:

- Business logic
- Database access
- API implementation

---

## Route Organization

Use route groups when appropriate.

Example:

```text
app/

(auth)/
(tabs)/
(modals)/

+not-found.tsx
_layout.tsx
```

---

## Screen Files

Each route should:

- Render the corresponding screen.
- Delegate logic to hooks.
- Keep implementation minimal.

Example:

```tsx
export default function HomeRoute() {
  return <HomeScreen />;
}
```

---

## Navigation

Prefer:

- router.push()
- router.replace()
- router.back()

Avoid navigation logic inside reusable components.

---

## Layouts

Use layouts for:

- Authentication
- Tabs
- Shared navigation
- Providers

Avoid business logic inside layouts.

---

## Deep Linking

Routes should support deep linking whenever possible.

Keep URLs predictable.

---

## AI Validation

Before generating code verify:

- Route already exists.
- Correct route group is used.
- Screen already exists.
- Navigation follows project conventions.

---

## Output

Generate production-ready Expo Router code following project standards.