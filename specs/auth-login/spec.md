# AUTH-Login Specification

## Objective

Implement the Cookly login screen as the authentication entry point for the app.

The screen presents the Cookly brand, email and password inputs, a persistent-session toggle, primary login action, social login entry points, and links to password recovery and registration.

## Business Rules

- The screen collects email and password values locally.
- Password input is masked by default and can be toggled visible.
- The "Keep me logged in" option is local UI state only for this screen.
- The login action must not perform real authentication until an authentication use case is defined.
- Forgot password, registration, Google login, and Apple login are navigation/action entry points only.
- UI must not access APIs, database, storage, repositories, or services directly.

## Navigation

- Route: app index route (`/`).
- Entry point: `src/app/index.tsx` renders `LoginScreen`.
- Future routes, not implemented in this scope:
  - Forgot password
  - Register
  - Google OAuth
  - Apple Sign In

## Dependencies

- React Native primitives.
- Existing app theme tokens from `src/app/theme`.
- Existing Expo Router root layout.
- No new runtime dependency is required.

## Screen States

- Idle: default screen with empty or editable fields.
- Editing: email and password text inputs are focused/updated.
- Password visible: password text is temporarily unmasked.
- Remember me enabled: local toggle is active.

Out of scope:

- Loading authentication request.
- Authentication errors.
- Remote validation.
- Persisting session preference.

## Scope

Included:

- Screen layout and styling.
- Local UI state.
- Input accessibility labels.
- Reusable screen-level auth components.
- Integration with the app index route.

Excluded:

- Authentication use cases.
- Repositories or services.
- Persistent storage.
- New navigation destinations.
- Form validation beyond native keyboard/input behavior.
