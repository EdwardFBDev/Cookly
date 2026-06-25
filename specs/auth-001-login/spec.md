# AUTH-001 Login Specification

## Screen Objective

Provide the Cookly login screen as the authentication entry point for returning users.

The screen introduces the Cookly brand, collects email and password credentials, and exposes navigation affordances for account recovery, registration, and future social sign-in providers.

## User Goal

As a returning Cookly user, I want to enter my credentials and start a kitchen session so I can access my smart pantry and kitchen assistant.

## Business Rules

- Email address is required before attempting login.
- Password is required before attempting login.
- Email must use a valid email-like format before attempting login.
- Password input must be hidden by default and can be toggled visible by the user.
- Keep-me-logged-in is a user preference captured on the screen, but persistence is deferred until authentication storage exists.
- Login submission must not access APIs, databases, secure storage, or backend services directly from the UI.
- Social authentication, password recovery, registration, and post-login home navigation are future integrations until their routes and services exist.

## Navigation Entry And Exit Points

- Entry point: `src/app/index.tsx` renders `LoginScreen`.
- Layout: `src/app/_layout.tsx` provides the root Expo Router stack with hidden headers.
- Exit point after successful backend authentication: TODO route to the authenticated Cookly home screen when available.
- Forgot password exit point: TODO route to password recovery when available.
- Register exit point: TODO route to registration when available.
- Social sign-in exit points: TODO provider flows for Google and Apple when available.

## Dependencies

- React Native primitives.
- Expo Router route entry through the existing index route.
- Existing app theme tokens from `src/app/theme`.
- No new runtime or development dependencies.
- No database dependency for this screen.

## Screen States

- Empty: email and password fields are empty.
- Editing: user enters email or password.
- Password hidden: password characters are masked.
- Password visible: password characters are visible after user toggles visibility.
- Keep logged in enabled: local switch state is on.
- Keep logged in disabled: local switch state is off.
- Validation error: missing or invalid input is shown inline.
- Submitting placeholder: login action validates inputs and shows a future-integration message because backend authentication is not implemented yet.

## Acceptance Criteria

- The app index route renders the AUTH-001 login screen.
- The screen visually matches the provided Cookly login design direction using existing theme tokens.
- The screen includes brand header, welcome copy, email field, password field, forgot password action, keep-me-logged-in control, primary login action, social sign-in actions, and registration action.
- Email validation prevents empty or invalid email submission.
- Password validation prevents empty password submission.
- Password visibility can be toggled.
- Keep-me-logged-in can be toggled.
- Login submission is handled through feature presentation/application code, not directly in the route.
- Backend, social auth, password recovery, registration, and authenticated navigation gaps are marked with TODOs.
- Existing app bootstrap, database initialization, root layout, and route files are preserved unless strictly required.

## Integration Points With Existing Screens

- Integrates with the existing `src/app/index.tsx` route, which already imports `LoginScreen`.
- Preserves the existing root layout and provider bootstrap.
- Does not add new authenticated screens, auth routes, stores, repositories, or services in this scope.
