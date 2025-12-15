import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForLoadState(_paramState: string): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async takeScreenshot(name: string): Promise<Buffer> {
        return await this.page.screenshot({ path: `${name}.png` });
    }
}