# AUTH-001 Login Test Plan

## Manual Checks

- Start the app and confirm the login screen renders from the index route.
- Confirm the email and password inputs accept text.
- Submit with an empty email and confirm inline validation appears.
- Submit with an invalid email and confirm inline validation appears.
- Submit with an empty password and confirm inline validation appears.
- Toggle password visibility and confirm password masking changes.
- Toggle keep-me-logged-in and confirm the switch changes state.
- Tap forgot password, Google, Apple, and register actions and confirm future-integration feedback appears.
- Confirm existing app bootstrap still initializes without visible navigation changes.

## Automated Checks

- Run TypeScript validation when available.
- Check IDE diagnostics for edited files.

## Not Covered

- Backend authentication.
- Secure credential persistence.
- Social authentication provider flows.
- Password recovery route.
- Registration route.
- Authenticated home route.
