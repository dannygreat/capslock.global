import { test as base, expect } from '@playwright/test';
import { WalkInBathPage } from '../pages';

type TestFixtures = {
    walkInBathPage: WalkInBathPage;
};

export const test = base.extend<TestFixtures>({
    walkInBathPage: async ({ page }, use) => {
        await use(new WalkInBathPage(page));
    },
});

export { expect };