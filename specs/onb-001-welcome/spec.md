# ONB-001 Welcome Specification

## Screen Objective

Provide the Cookly welcome screen as the first onboarding entry point for new and returning users.

The screen communicates Cookly's core value proposition, highlights key benefits, and offers a clear path into the existing authentication flow.

## User Goal

As a Cookly user, I want to understand what the app helps me do and continue into the app flow so I can start planning my kitchen setup.

## Business Rules

- The welcome screen is the app's default index route.
- The primary action must move the user into the existing login flow.
- The screen must not access authentication, database, local storage, or backend services directly.
- The screen must preserve existing login behavior and all app bootstrap behavior.
- Onboarding completion persistence is deferred until an onboarding store or user preference repository exists.
- Benefit cards are static marketing content for this screen and must not imply live backend connectivity.

## Navigation Entry And Exit Points

- Entry point: `src/app/index.tsx` renders `WelcomeScreen`.
- Layout: `src/app/_layout.tsx` provides the root Expo Router stack with hidden headers.
- Primary exit point: Get Started navigates to `/login`, which renders the preserved `LoginScreen`.
- Future exit point: TODO route directly into registration when registration onboarding exists.

## Dependencies

- React Native primitives.
- Expo Router navigation through the existing root stack.
- Existing app theme tokens from `src/app/theme`.
- Existing `AUTH-001 LoginScreen` as the next connected screen.
- No new runtime or development dependencies.
- No database dependency for this screen.

## Screen States

- Default: static welcome content is visible.
- Pressed primary action: button press feedback is visible while the press is active.
- Navigation pending: route transition to `/login` is delegated to Expo Router.
- Future onboarding state: TODO persist whether the user has completed onboarding when storage exists.

## Acceptance Criteria

- The app index route renders the ONB-001 welcome screen.
- The existing AUTH-001 login screen remains available.
- The Get Started primary action navigates to the existing login screen.
- The welcome screen includes Cookly branding, hero imagery treatment, headline, supporting copy, benefit cards, primary action, and social proof copy.
- The screen uses existing Cookly theme tokens where available.
- The screen does not access backend, database, local storage, or authentication services directly.
- Missing onboarding persistence and registration integration are marked with TODOs.
- Existing app bootstrap, database initialization, root layout, and login feature files are preserved unless strictly required.

## Integration Points With Existing Screens

- Replaces the index route's rendered screen from `LoginScreen` to `WelcomeScreen`.
- Adds `/login` as an explicit route for the existing `LoginScreen`.
- Preserves the existing root layout and provider bootstrap.
- Does not add stores, repositories, services, or backend integration in this scope.
