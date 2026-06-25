# HOME-001 Dashboard Test Plan

## Manual Checks

- Start the app and confirm the onboarding screen still renders at `/`.
- Tap Get Started and confirm login still renders at `/login`.
- Submit the default valid placeholder login and confirm `/home` renders.
- Confirm the dashboard shows the kitchen status cards and Today's Meals section.
- Tap the dashboard notification action and confirm `/notifications` renders.
- Tap dashboard recommendation actions and confirm `/recommendations` renders.
- Confirm bottom Home navigation returns to `/home`.
- Confirm bottom Recipes navigation opens `/recommendations`.
- Tap Inventory, Plan, and Shopping bottom actions and confirm future-integration feedback appears.
- Confirm notification and recommendation content scrolls on small screens.

## Automated Checks

- Run TypeScript validation when available.
- Check IDE diagnostics for edited files.

## Not Covered

- Real authentication.
- Persisted session routing.
- Inventory, recipe, meal plan, shopping list, and notification repositories.
- Push notifications.
- Recipe details.
- Favorites persistence.
