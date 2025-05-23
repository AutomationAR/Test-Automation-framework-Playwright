import { BasePage } from '../base.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class CategoryProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getHeaderName(header: string): Locator {
    return this.page.getByRole('heading', { name: header });
  }

  async expectCategoryProductsPage(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveURL(/category_products/);
    await expect(this.page).toHaveTitle(expectedTitle);
  }
}