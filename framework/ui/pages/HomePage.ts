import { Page } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.automationexercise.com/');
  }

  async goToProductsPage() {
    await this.page.click('a[href="/products"]');
    await this.page.waitForSelector('#search_product');
  }

  async searchProduct(product: string) {
    await this.page.fill('#search_product', product);
    await this.page.click('#submit_search');
  }

  async isSearchResultVisible() {
    return this.page.isVisible('.features_items');
  }
}