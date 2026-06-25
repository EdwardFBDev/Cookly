# HOME-001 Dashboard Specification

## Screen Objective

Provide the first authenticated Cookly home flow with three connected screens:

- HOME-001 Dashboard
- HOME-002 Notifications
- HOME-003 Recommendations

The flow gives users an at-a-glance kitchen status, urgent food alerts, and recipe recommendations based on current pantry context.

## User Goal

As a Cookly user, I want to land on a kitchen dashboard after login so I can quickly see what needs attention, review notifications, and discover recipes I can cook with my available ingredients.

## Business Rules

- The dashboard is the authenticated home entry point after login.
- Dashboard content must not directly access database, storage, or external services from UI components.
- Inventory, shopping, meal planning, backend sync, push notifications, favorites persistence, and recipe detail navigation are future integrations until their screens and services exist.
- Notifications are in-app informational alerts in this increment; push notification scheduling is out of scope.
- Recommendations are based on static local presentation data in this increment, with TODOs for future inventory and recipe services.
- Navigation must preserve existing onboarding and login routes.
- The user must be able to move from dashboard to notifications and recommendations.
- Bottom navigation may expose future tabs as disabled placeholder actions until those screens exist.

## Navigation Entry And Exit Points

- Entry point: successful placeholder login navigates to `/home`.
- Dashboard route: `src/app/home.tsx`.
- Notifications route: `src/app/notifications.tsx`.
- Recommendations route: `src/app/recommendations.tsx`.
- Dashboard exits:
  - Header notification action opens `/notifications`.
  - Primary recommendation action opens `/recommendations`.
  - Recipes bottom navigation action opens `/recommendations`.
  - Inventory, plan, and shopping actions show future-integration feedback until routes exist.
- Notifications exits:
  - Bottom Home action opens `/home`.
  - Bottom Recipes action opens `/recommendations`.
- Recommendations exits:
  - Bottom Home action opens `/home`.
  - Header notification action opens `/notifications`.

## Dependencies

- Existing Expo Router stack in `src/app/_layout.tsx`.
- Existing app theme tokens from `src/app/theme`.
- Existing auth screen validation flow for post-login navigation.
- React Native primitives and Expo StatusBar.
- No new runtime or development dependencies.
- Future dependencies:
  - Inventory repository/service.
  - Recipe repository/service.
  - Meal plan repository/service.
  - Shopping list repository/service.
  - Push notification service if enabled later.

## Screen States

- Dashboard default: kitchen summary cards, expiring count, shopping list status, inventory status, meal preview, and recommendation call-to-action render.
- Dashboard future-route action: unavailable inventory, plan, or shopping screens show placeholder feedback.
- Notifications default: urgent expiry notifications, planned meal notification, and shopping reminder render.
- Notifications empty: deferred until real notification data exists.
- Recommendations default: filter chips and recommendation cards render.
- Recommendations missing ingredient state: recommendations can show unavailable ingredients.
- Recommendations expired ingredient state: recommendations can mark action required.
- Favorites action placeholder: favorite toggles show future-integration feedback.

## Acceptance Criteria

- The HOME flow has SDD documents before implementation.
- The app can navigate from placeholder login success to the dashboard.
- Existing onboarding, login, root layout, providers, bootstrap, database infrastructure, and routes are preserved.
- The dashboard screen includes kitchen location, notification entry, recommendation CTA, expiring-soon summary, shopping summary, inventory summary, and meal preview.
- The notifications screen includes expiring, planned meal, and shopping notification sections.
- The recommendations screen includes filter chips and multiple recipe recommendation cards.
- Dashboard, notifications, and recommendations are connected through Expo Router routes.
- Shared HOME components are reused across the three screens where useful.
- Missing backend and future route integrations are marked with TODOs.
- No new dependencies are added.

## Integration Points With Existing Screens

- Integrates with `src/features/auth/presentation/hooks/useLoginScreen.ts` by replacing successful placeholder login feedback with navigation to `/home`.
- Preserves `src/app/index.tsx` as the onboarding entry route.
- Preserves `src/app/login.tsx` as the login route reached from onboarding.
- Adds new routes to the existing hidden-header stack without changing `src/app/_layout.tsx`.
