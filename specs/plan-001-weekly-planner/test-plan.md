# PLAN-001 Weekly Planner Test Plan

## Manual Checks

- Start the app and confirm the onboarding screen still renders at `/`.
- Confirm login still renders at `/login`.
- Navigate to `/home` and tap the Plan bottom navigation action; confirm `/plan` renders.
- Navigate to `/inventory` and tap the Plan bottom navigation action; confirm `/plan` renders.
- Confirm the weekly planner shows the location, title, date range, day selector, breakfast, lunch, dinner, and generate list action.
- Confirm breakfast shows an empty planned-meal slot.
- Confirm lunch and dinner show planned meal cards with cook time, serving count, and ingredient availability status.
- Tap a planned meal card and confirm the existing recipe detail screen opens.
- Tap Add in an empty meal slot and confirm the recipe catalog opens.
- Open `/plan/empty` and confirm the empty planning state renders.
- Tap Start Planning and confirm `/plan` renders.
- Tap Browse Popular Recipes and confirm `/recipes` renders.
- Tap future shopping, profile, notification, Auto-Shopping, and Zero Waste actions and confirm future-integration feedback appears.

## Automated Checks

- Run TypeScript validation when available.
- Check IDE diagnostics for edited files.

## Not Covered

- Persisted meal plans.
- Calendar date calculations beyond the static starter week.
- Real household or profile data.
- Shopping-list creation.
- Backend recipe or inventory synchronization.
