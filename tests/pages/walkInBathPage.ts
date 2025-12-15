import { Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class WalkInBathPage extends BasePage {
    // ZIP Code Form Elements
    zipCodeContainer = this.page.locator('#form-container-1');
    zipCodeInputFirst = this.zipCodeContainer.getByRole('textbox', { name: 'Enter ZIP Code' });
    zipCodeInputAll = this.page.getByRole('textbox', { name: 'Enter ZIP Code' });
    nextButtonFirst = this.page.getByRole('button', { name: 'Next' }).first();
    nextButtonAll = this.page.getByRole('button', { name: 'Next' });
    confidentialText = this.page.locator('text=Safe, Secure and Confidential').first();

    // Gallery Elements
    galleryPreviousButton = this.page.getByRole('button', { name: 'Previous' });
    galleryNextButton = this.page.getByRole('button', { name: 'Next', exact: true });
    sliderImage = this.page.locator('img[alt="slider-img"]').first();
    sliderImages = this.page.locator('img[alt="slider-img"]');

    // Reviews Section
    reviewCards = this.page.locator('div').filter({ has: this.page.locator('img[alt="avatar"]') });
    showMoreButton = this.page.locator('text=Show more').first();
    showLessButton = this.page.locator('text=Show less').first();
    reviewByDenny = this.page.locator('text=Review by Denny');
    initialReviewText = this.page.locator('text=The product has allowed me to have more freedom');

    // Links
    cdcResearchLink = this.page.getByRole('link', { name: 'CDC research' });
    footerCdcText = this.page.locator('text=According to');

    // General Content
    pricePromiseText = this.page.locator('text=Our Price Promice');
    healthBenefitsText = this.page.locator('text=Walk-In Bath Health Benefits');
    warrantyImage = this.page.locator('img[alt="warranty"]');
    footerText = this.page.locator('text=© Caps Lock, 2025. All Rights Reserved.');
    mainHeading = this.page.getByText('Here’s Why So Many Seniors');
    featureList = this.page.locator('ul.blockList_boxFull');
    featureItems = this.featureList.locator('li.blockList__item');

    // Form step 1
    step1 = this.page.locator('#form-container-1');
    independenceOption = this.step1.getByText('Independence');
    safetyOption = this.step1.getByText('Safety');

    // Form step 2
    ownedHouseOption = this.step1.getByText('Owned House / Condo');

    // Contact info
    nameInput = this.step1.getByRole('textbox', { name: 'Enter Your Name' });
    emailInput = this.step1.getByRole('textbox', { name: 'Enter Your Email' });
    phoneInput = this.step1.getByRole('textbox', { name: '(XXX)XXX-XXXX' });

    // Buttons
    nextButton = this.step1.getByRole('button', { name: 'Next ' });
    goToEstimateButton = this.step1.getByRole('button', { name: 'Go To Estimate' });
    submitRequestButton = this.step1.getByRole('button', { name: 'Submit Your Request' });

    // Confirmation
    thankYouHeading = this.page.getByRole('heading', { name: 'Thank you!' });


    async navigateToApp(url: string): Promise<void> {
        await this.page.goto(url, { timeout: 120000, waitUntil: 'networkidle' });
    }

    async fillZipCode(zipCode: string): Promise<void> {
        await this.zipCodeInputFirst.fill(zipCode);
    }

    async getZipCodeValue(): Promise<string> {
        return await this.zipCodeInputFirst.inputValue();
    }


    async clearZipCode(): Promise<void> {
        await this.zipCodeInputFirst.clear();
    }

    async isZipCodeInputEmpty(): Promise<boolean> {
        const value = await this.getZipCodeValue();
        return value.length === 0;
    }

    async getZipCodeValueByIndex(index: number): Promise<string> {
        return await this.zipCodeInputAll.nth(index).inputValue();
    }

    async getZipCodeFormCount(): Promise<number> {
        return await this.zipCodeInputAll.count();
    }

    async getNextButtonCount(): Promise<number> {
        return await this.nextButtonAll.count();
    }

    async clickGalleryNext(): Promise<void> {
        await this.galleryNextButton.scrollIntoViewIfNeeded();
        await this.galleryNextButton.waitFor({ state: 'visible', timeout: 5000 });
        await expect(this.galleryNextButton).toBeEnabled();
        await this.galleryNextButton.click();
        await this.page.waitForTimeout(1000); // Wait for slider transition to complete
    }

    async clickGalleryPrevious(): Promise<void> {
        await this.galleryPreviousButton.click();
    }

    async waitForGalleryImageChange(previousSrc: string): Promise<void> {
        await this.page.waitForFunction(
            (initialSrc) => {
                const currentSlide = document.querySelector('.slick-slide.slick-current img[alt="slider-img"]');
                return currentSlide?.getAttribute('src') !== initialSrc;
            },
            previousSrc,
            { timeout: 5000 }
        );
    }

    async getCurrentGalleryImage(): Promise<string | null> {
        const visibleImage = this.page.locator('.slick-slide.slick-current img[alt="slider-img"]');
        await visibleImage.waitFor({ state: 'visible', timeout: 3000 });
        const src = await visibleImage.getAttribute('src');
        return src;
    }

    async clickShowMoreReviews(): Promise<void> {
        await this.showMoreButton.click();
    }

    async clickShowLessReviews(): Promise<void> {
        await this.showLessButton.click();
    }

    async getVisibleReviewCount(): Promise<number> {
        return await this.reviewCards.count();
    }


    async isShowMoreButtonVisible(): Promise<boolean> {
        return await this.showMoreButton.isVisible();
    }

    async isShowLessButtonVisible(): Promise<boolean> {
        return await this.showLessButton.isVisible();
    }

    async isCDCLinkVisible(): Promise<boolean> {
        return await this.cdcResearchLink.isVisible();
    }

    async getCDCLinkHref(): Promise<string | null> {
        return await this.cdcResearchLink.getAttribute('href');
    }

    async isPricePromiseVisible(): Promise<boolean> {
        return await this.pricePromiseText.isVisible();
    }

    async isHealthBenefitsVisible(): Promise<boolean> {
        return await this.healthBenefitsText.isVisible();
    }

    async isWarrantyImageVisible(): Promise<boolean> {
        return await this.warrantyImage.isVisible();
    }

    async isFooterVisible(): Promise<boolean> {
        return await this.footerText.isVisible();
    }

    async isMainHeadingVisible(): Promise<boolean> {
        return await this.mainHeading.isVisible();
    }

    async isFeatureListVisible(): Promise<boolean> {
        return await this.featureList.isVisible();
    }

    async getFeatureListTexts(): Promise<string[]> {
        await this.featureList.scrollIntoViewIfNeeded();
        await expect.poll(async () => await this.featureItems.count(), { timeout: 5000 }).toBeGreaterThan(0);
        return (await this.featureItems.allTextContents()).map(text => text.trim());
    }

    async verifyFeatureList(expectedFeatures: string[]): Promise<void> {
        const actualFeatures = await this.getFeatureListTexts();
        expect(actualFeatures).toEqual(expectedFeatures);
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async scrollToSection(sectionLocator: Locator): Promise<void> {
        await sectionLocator.scrollIntoViewIfNeeded();
    }

    async startRequestWithZip(zip: string): Promise<void> {
        await this.zipCodeInputFirst.fill(zip);
        await this.nextButton.click();
    }

    async selectMotivation(): Promise<void> {
        await this.independenceOption.click();
        await this.safetyOption.click();
        await this.nextButton.click();
    }

    async selectHomeOwnership(): Promise<void> {
        await this.ownedHouseOption.click();
        await this.nextButton.click();
    }

    async fillContactInfo(name: string, email: string): Promise<void> {
        await expect(this.nameInput).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.goToEstimateButton.click();
    }

    async submitPhone(phone: string): Promise<void> {
        await expect(this.phoneInput).toBeVisible();
        await this.phoneInput.fill(phone);
        await this.submitRequestButton.click();
    }

    async isThankYouVisible(): Promise<boolean> {
        return await this.thankYouHeading.isVisible();
    }
}