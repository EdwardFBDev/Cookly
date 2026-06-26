# SET-001 Settings Specification

## Screen Objective

Provide the authenticated settings/profile screen for Cookly users so they can review account context, household information, dietary preferences, locations, app preferences, and product information from the main app flow.

## User Goal

As a Cookly user, I want a profile settings screen so I can understand my current Cookly account, reach key preference areas, adjust local UI preferences, and sign out when needed.

## Business Rules

- The settings screen must be available from the main authenticated bottom navigation as the Profile tab.
- Existing Home, Inventory, Recipes, Plan, Shopping, onboarding, login, notification, and recommendation routes must remain available.
- Settings content uses static local presentation data in this increment.
- UI components must not directly access database, storage, backend APIs, or authentication services.
- Account editing, household management, dietary preference editing, location management, notification settings, about details, persistent theme preference, and real logout are future integrations.
- Missing integrations must show user feedback and include TODO comments where the integration belongs.
- The local theme toggle may update only in-memory presentation state for this increment.
- Logout must not clear persisted sessions until authentication/session services exist.

## Navigation Entry And Exit Points

- Entry points:
  - Profile tab in the shared authenticated bottom navigation opens `/settings`.
  - Existing profile/avatar actions in planning and shopping screens open `/settings`.
- Settings route: `src/app/settings.tsx`.
- Settings exits:
  - Header back action returns to the previous route when possible.
  - Notification action opens `/notifications`.
  - Bottom Home action opens `/home`.
  - Bottom Inventory action opens `/inventory`.
  - Bottom Recipes action opens `/recipes`.
  - Bottom Plan action opens `/plan`.
  - Settings rows show future-integration feedback until their target screens exist.

## Dependencies

- Existing Expo Router root stack in `src/app/_layout.tsx`.
- Existing app theme tokens from `src/app/theme`.
- Existing shared authenticated bottom navigation component.
- Existing notifications route for the header notification action.
- Existing Home, Inventory, Recipes, and Plan routes for bottom navigation.
- React Native primitives and Expo StatusBar.
- No new runtime or development dependencies.
- Future dependencies:
  - Authentication/session service for real logout.
  - User profile service.
  - Household service.
  - Dietary preferences service.
  - Location repository/service.
  - Notification preferences service.
  - Theme preference persistence.

## Screen States

- Default: profile header, stats, grouped settings rows, theme toggle, logout action, app version, and bottom navigation render.
- Theme toggled: local in-memory theme label and toggle state update.
- Future integration action: account, household, dietary preferences, locations, notifications, about, and logout actions show placeholder feedback.
- Scroll state: content remains reachable on smaller screens without overlapping the bottom navigation.

## Acceptance Criteria

- SET-001 has SDD documents before implementation.
- `/settings` renders the settings/profile screen.
- The shared bottom navigation includes a Profile tab that opens `/settings`.
- Existing `/shopping` route and shopping screen remain available for planning and shopping flows.
- Existing authenticated routes continue to render through the hidden-header stack.
- Settings displays profile name, email, avatar placeholder, edit affordance, cooked recipe count, and tracked item count.
- Settings displays Account, Household, Dietary Preferences, Locations, Theme, Notifications, and About Cookly rows.
- The Theme row has a functional local toggle.
- Logout action is visible and provides future-integration feedback.
- Header back action and notification action are connected.
- Missing backend and future screen integrations are marked with TODOs.
- No new dependencies are added.

## Integration Points With Existing Screens

- Integrates with `HomeBottomNavigation` by replacing the fifth main-tab entry with Profile while preserving the shopping route.
- Integrates with home, inventory, planning, shopping, and recommendation screens through the shared bottom navigation Profile action.
- Integrates with planning and shopping profile/avatar actions by routing them to `/settings`.
- Integrates with `/notifications` through the settings header notification action.
- Preserves existing onboarding, login, root layout, providers, bootstrap, database infrastructure, recipes, inventory, shopping, planning, cooking, and home feature implementations.
