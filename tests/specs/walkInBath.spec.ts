import { test, expect, getEnv } from '../helpers';
import envData from '../../env.data';


test.describe('Walk-In Bath Landing Page', () => {
    let ENVDATA = envData[getEnv()];

    test.beforeEach(async ({ walkInBathPage }) => {
        await walkInBathPage.navigateToApp(ENVDATA.CAPSLOCK_URL);
    });

    test('Scenario 1: Should Submit Valid ZIP Code', async ({ walkInBathPage }) => {

        await walkInBathPage.fillZipCode('48001');
        const zipCodeValue = await walkInBathPage.getZipCodeValue();

        expect(zipCodeValue).toBe('48001');
        await expect(walkInBathPage.confidentialText).toBeVisible();
        await expect(walkInBathPage.nextButtonFirst).toBeEnabled();
    });

    test('Scenario 2: Should ZIP Code Input Validation', async ({ walkInBathPage }) => {

        const isEmpty = await walkInBathPage.isZipCodeInputEmpty();
        expect(isEmpty).toBe(true);

        await walkInBathPage.fillZipCode('12345');
        const filledValue = await walkInBathPage.getZipCodeValue();
        expect(filledValue).toBe('12345');

        await walkInBathPage.clearZipCode();

        const isEmptyAfterClear = await walkInBathPage.isZipCodeInputEmpty();
        expect(isEmptyAfterClear).toBe(true);
    });

    test('Scenario 3: Should Gallery Navigation Previous and Next', async ({ walkInBathPage }) => {

        const initialImageSrc = await walkInBathPage.getCurrentGalleryImage();
        expect(initialImageSrc).not.toBeNull();

        await walkInBathPage.clickGalleryPrevious();
        await walkInBathPage.waitForGalleryImageChange(initialImageSrc as string);

        const imageAfterPrevious = await walkInBathPage.getCurrentGalleryImage();
        expect(imageAfterPrevious).not.toBe(initialImageSrc);

        await walkInBathPage.clickGalleryNext();
        await walkInBathPage.sliderImage.waitFor({ state: 'visible', timeout: 5000 });

        const imageAfterNext = await walkInBathPage.getCurrentGalleryImage();
        expect(imageAfterNext).toBeDefined();

        await expect(walkInBathPage.galleryPreviousButton).toBeVisible();
        await expect(walkInBathPage.galleryNextButton).toBeVisible();
    });

    test('Scenario 4: Should Reviews Section Expansion - Show More', async ({ walkInBathPage }) => {

        const initialReviewCount = await walkInBathPage.getVisibleReviewCount();
        expect(initialReviewCount).toBeDefined();

        await expect(walkInBathPage.initialReviewText).toBeVisible();
        await expect(walkInBathPage.showMoreButton).toBeVisible();

        await walkInBathPage.clickShowMoreReviews();
        await walkInBathPage.reviewByDenny.waitFor({ state: 'visible', timeout: 5000 });

        const expandedReviewCount = await walkInBathPage.getVisibleReviewCount();
        expect(expandedReviewCount).toEqual(initialReviewCount);

        await expect(walkInBathPage.reviewByDenny).toBeVisible();

        const isShowLessVisible = await walkInBathPage.isShowLessButtonVisible();
        expect(isShowLessVisible).toBe(true);
    });

    test('Scenario 5: Should Page Structure and Content Visibility', async ({ walkInBathPage }) => {

        const pageTitle = await walkInBathPage.getPageTitle();
        expect(pageTitle).toBe('Caps Lock | QA test task');

        const isPricePromiseVisible = await walkInBathPage.isPricePromiseVisible();
        expect(isPricePromiseVisible).toBe(true);

        const isHealthBenefitsVisible = await walkInBathPage.isHealthBenefitsVisible();
        expect(isHealthBenefitsVisible).toBe(true);

        const isWarrantyImageVisible = await walkInBathPage.isWarrantyImageVisible();
        expect(isWarrantyImageVisible).toBe(true);

        const isFooterVisible = await walkInBathPage.isFooterVisible();
        expect(isFooterVisible).toBe(true);

        const isMainHeadingVisible = await walkInBathPage.isMainHeadingVisible();
        expect(isMainHeadingVisible).toBe(true);

        await walkInBathPage.verifyFeatureList([
            'Hydrotherapy & air jets',
            'Targeted back, leg, wrist and foot massaging jets',
            'Fast-drain technology',
            'Heated backrest',
            'Patented leak-free door system',
            'Ultra-low step-in',
            'Extra-wide entry door',
            'Slip-resistant surfaces',
            'easy-to-grip handrails',
            'Bath walls'
        ]);
    });

    test('Scenario 6: Should External Link Validation - CDC Research', async ({ walkInBathPage }) => {

        const isCDCLinkVisible = await walkInBathPage.isCDCLinkVisible();
        expect(isCDCLinkVisible).toBe(true);

        const href = await walkInBathPage.getCDCLinkHref();
        expect(href).toBe(ENVDATA.CDC_LINK_URL);

        await expect(walkInBathPage.cdcResearchLink).toHaveText('CDC research');

        await expect(walkInBathPage.footerCdcText).toBeVisible();
    });

    test('Scenario 7: Multiple ZIP Code Forms on Page', async ({ walkInBathPage }) => {

        const formCount = await walkInBathPage.getZipCodeFormCount();
        expect(formCount).toBeGreaterThanOrEqual(2);

        await walkInBathPage.fillZipCode('48201');

        const firstFormValue = await walkInBathPage.getZipCodeValue();
        expect(firstFormValue).toBe('48201');

        const secondFormValue = await walkInBathPage.getZipCodeValueByIndex(1);
        expect(secondFormValue).toBe('');

        const nextButtonCount = await walkInBathPage.getNextButtonCount();
        expect(nextButtonCount).toBeGreaterThanOrEqual(2);
    });

    test('Scenario 8: Should Make New Requests To Install a Walk-in Bath in Michigan', async ({ walkInBathPage }) => {

        await walkInBathPage.startRequestWithZip('32131');

        await walkInBathPage.selectMotivation();
        await walkInBathPage.selectHomeOwnership();

        await walkInBathPage.fillContactInfo('Test Qa', 'test@mail.com');
        await walkInBathPage.submitPhone('12345678901');

        await expect(walkInBathPage.thankYouHeading).toBeVisible();
    });
});
