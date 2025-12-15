# Walk-In Bath Landing Page - Automated Test Suite

## Overview

This directory contains comprehensive automated tests for the Walk-In Bath landing page (`test-qa.capslock.global`) using **Playwright** and the **Page Object Model (POM)** design pattern.

## Files

- **`walkInBath.spec.ts`** - Main test suite with 7 critical test scenarios
- **`pages/walkInBathPage.ts`** - Page Object Model class encapsulating all page interactions
- **`helpers/fixturesPage.ts`** - File with fixtures

## Test Scenarios Implemented

### ✅ Scenario 1: Submit Valid ZIP Code
Verifies that the ZIP code form accepts valid input and the form is properly configured for submission.

### ✅ Scenario 2: ZIP Code Input Validation
Tests input field behavior, ensuring it can be filled, cleared, and maintains correct states.

### ✅ Scenario 3: Gallery Navigation (Previous/Next)
Validates image gallery slider functionality with previous and next navigation buttons.

### ✅ Scenario 4: Reviews Section Expansion
Tests the "Show more" functionality that expands the reviews section with additional customer testimonials.

### ✅ Scenario 5: Page Structure and Content Visibility
Verifies all critical page sections are visible and properly rendered (Price Promise, Health Benefits, Warranty, Footer).

### ✅ Scenario 6: External Link Validation
Confirms the CDC Research external link exists, has correct href, and is clickable.

### ✅ Scenario 7: Multiple ZIP Code Forms
Ensures the page contains multiple independent ZIP code forms that work correctly.

### ✅ Scenario 8: Should Make New Requests To Install a Walk-in Bath in Michigan
Ensures the user can throw forms that work correctly.

## Defects Found

### 🐛 DEFECT: Typo in "Price Promise" Section
- **Severity**: Low (UI/Copy)
- **Issue**: Text reads "Our Price **Promice**" instead of "Our Price **Promise**"
- **Location**: Warranty information section
- **Impact**: Affects credibility and professionalism
- **Recommendation**: Correct spelling in source content

## Page Object Model

The `WalkInBathPage` class provides clean, maintainable access to all page elements:

```typescript
// Example usage: 
test('Scenario 1: ', async ({ walkInBathPage }) => {}); // we use fixtures
await page.navigateToApp();
await page.clickShowMoreReviews();
```

### Key Methods:
- Navigation: `navigateToApp()`
- Gallery: `clickGalleryNext()`, `clickGalleryPrevious()`, `getCurrentGalleryImage()`
- Reviews: `clickShowMoreReviews()`, `getVisibleReviewCount()`, `getReviewText()`
- Links: `clickCDCLink()`, `getCDCLinkHref()`
- Content: `isPricePromiseVisible()`, `isHealthBenefiktsVisible()`, `isWarrantyImageVisible()`, `isFooterVisible()`

## Running Tests

### Preparing the environment  

1. Install [Node.js](https://nodejs.org/en/)
2. Install PlayWright: `npx playwright install`
3. Run: `npm install`

### Run all tests:
```bash
npx playwright test
```

### Run specific test file:
```bash
npx playwright test tests/walkInBath.spec.ts
```

### Run specific test scenario:
```bash
npx playwright test -g "Submit Valid ZIP Code"
```

### Run with UI mode (recommended):
```bash
npx playwright test --ui
```

### Debug mode:
```bash
npx playwright test --debug
```

### View test report:
```bash
npx playwright show-report
```

## Browser Compatibility

Tests run on:
- Chromium (Desktop Chrome) 

## Page Information

- **URL**: https://test-qa.capslock.global
- **Title**: Caps Lock | QA test task
- **Key Sections**: Hero, Features, Health Benefits, Gallery, Reviews, Forms, Workflow

## Test Maintenance

The test suite uses reliable selectors that target semantic attributes:
- Locators by role (button, link, textbox)
- Locators by text content
- Locators by attributes (name, alt)
- Minimal reliance on CSS selectors or XPath

This approach makes tests resilient to styling changes while remaining maintainable.

## Strategic Coverage
The 8 test scenarios were selected based on **risk assessment and user journey analysis**:

1. **ZIP Code Submission (Scenarios 1, 2, 7)** - Core conversion funnel
   - The ZIP code input is the primary call-to-action for lead capture
   - Multiple forms indicate different page sections attempting conversion
   - Validating input behavior prevents form submission failures

2. **Gallery Navigation (Scenario 3)** - Dynamic UI validation
   - Interactive elements are prone to JavaScript failures
   - Gallery carousel is visually prominent and essential for product understanding
   - Tests verify both navigation directions and state management

3. **Reviews Expansion (Scenario 4)** - Social proof engagement
   - Review visibility directly impacts conversion rates
   - "Show more" functionality tests dynamic content rendering
   - Verifies smooth state transitions without breaking layout

4. **Content Visibility (Scenario 5)** - Page integrity checks
   - Ensures all marketing sections load correctly (Price Promise, Health Benefits, Warranty)
   - Detects broken images or missing critical content
   - Validates page structure and responsive behavior

5. **External Link Validation (Scenario 6)** - Trust and compliance
   - CDC research link validates credibility claims
   - Tests href attribute accuracy (important for tracking/redirects)
   - Ensures external links don't break user flow

6. **Form Workflow (Scenario 8)** - End-to-end conversion path
   - Complete user journey from interest to lead submission
   - Tests multiple form steps (motivation, ownership, contact info)
   - Validates success confirmation display


## Scalability & Maintainability Improvements

### 1. **Configuration-Driven Environment Handling**
- Move environment URLs and configurations to `config.env.ts`
- Support running same tests against multiple environments
- **Benefit**: Test QA, Staging, and Production with one codebase