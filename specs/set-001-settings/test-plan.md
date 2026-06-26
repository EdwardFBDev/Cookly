# SET-001 Settings Test Plan

## Manual Checks

- Start the app and confirm existing onboarding still renders at `/`.
- Confirm existing login still renders at `/login`.
- Navigate to authenticated screens and tap the Profile bottom tab.
- Confirm `/settings` renders.
- Confirm Settings shows profile identity, stats, settings groups, theme toggle, logout action, and version label.
- Tap the back action and confirm the previous route is restored.
- Tap the notification action and confirm `/notifications` renders.
- Tap Home, Inventory, Recipes, and Plan bottom actions and confirm the existing routes render.
- Confirm `/shopping` still renders when opened from planning list generation or direct route.
- Tap Account, Household, Dietary Preferences, Locations, Notifications, About Cookly, and Logout and confirm future-integration feedback appears.
- Toggle Theme and confirm the label/toggle state changes locally.
- Confirm settings content scrolls on small screens without bottom navigation overlap.

## Automated Checks

- Run TypeScript validation when available.
- Check IDE diagnostics for edited files.

## Not Covered

- Real user profile persistence.
- Real household, dietary preference, location, notification preference, or about screens.
- Real theme persistence or app-wide theme switching.
- Real logout/session clearing.
