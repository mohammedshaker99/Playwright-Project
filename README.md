# Playwright Tests

End-to-end tests for the shopping application using Playwright and TypeScript.

## Requirements

- Node.js LTS
- npm

## Install

```bash
npm install
npx playwright install
```

## Run tests

```bash
npm test
```

Run tests with the browser visible:

```bash
npm run test:headed
```

The test suite runs against Chromium, Firefox, and WebKit. HTML reports are generated in `playwright-report/`.

To open the latest report:

```bash
npm run report
```

## Project structure

- `tests/Pages/` contains page objects and the page object manager.
- `tests/Specs/` contains login and checkout scenarios.
- `tests/test-data/` contains test input data.
- `.github/workflows/playwright.yml` runs the tests in GitHub Actions.
