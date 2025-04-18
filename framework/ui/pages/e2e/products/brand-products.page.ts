import * as data from '../../../../../test_data/e2e/app.data.json';
import { BasePage } from '../base.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class BrandProducts extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private getHeader(header: string): Locator {
    return this.page.getByRole('heading', { name: `Brand - ${header}`, exact: true });
  }

  async expectBrandProductsPage(brand: string, header: string): Promise<void> {
    await expect(this.page).toHaveURL(`/brand_products/${brand}`);
    await expect(this.page).toHaveTitle(`${data.title.home} - ${header}`);
    await expect(this.getHeader(header)).toBeVisible();
  }
}
