import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded'): Promise<void> {
        await this.page.waitForLoadState(state);
    }

    async takeScreenshot(name: string): Promise<Buffer> {
        return await this.page.screenshot({ path: `${name}.png` });
    }
}