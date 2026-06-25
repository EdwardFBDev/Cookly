# AUTH-Login Test Plan

## Manual Checks

- Open the app index route and confirm the login screen renders without the missing module error.
- Confirm the screen remains readable on a narrow mobile viewport.
- Enter text into the email and password fields.
- Toggle password visibility and confirm the password mask changes.
- Toggle "Keep me logged in" and confirm the visual state changes.
- Confirm primary, social, forgot password, and register actions are visible and do not crash.

## Automated Checks

- Run TypeScript validation when available.
- Check IDE diagnostics for edited files.

## Not Covered

- Real authentication.
- Session persistence.
- Forgot password flow.
- Registration flow.
- Social provider authentication.
