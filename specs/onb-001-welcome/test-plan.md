# ONB-001 Welcome Test Plan

## Manual Checks

- Start the app and confirm the welcome screen renders from the index route.
- Confirm the welcome screen displays Cookly branding, hero treatment, headline, supporting copy, benefit cards, primary action, and social proof copy.
- Tap Get Started and confirm the app navigates to the existing login screen.
- Confirm the login screen behavior from AUTH-001 is preserved after navigation.
- Confirm app bootstrap still initializes without visible navigation regressions.

## Automated Checks

- Run TypeScript validation when available.
- Check IDE diagnostics for edited files.

## Not Covered

- Onboarding completion persistence.
- Registration onboarding route.
- Backend, database, or analytics integration.
- Remote hero image or CMS-driven onboarding content.
