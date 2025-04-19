import * as data from '../../../../test_data/e2e/app.data.json';
import { FooterComponent } from '../../../../components/footer.component';
import { LeftSidebarComponent } from '../../../../components/left-sidebar.component';
import { BasePage } from './base.page';
import { CartPage } from './cart.page';
import { CategoryProductsPage } from './products/category-products.page';
import { ProductsPage } from './products/product.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage extends BasePage {
  [x: string]: any;
  readonly headerFullFledged: Locator;
  private readonly linkViewCart: Locator;
  readonly headerRecommendedItems: Locator;
  private readonly linkAddToCartFromRecommendedItems: Locator;

  readonly leftSidebar: LeftSidebarComponent;
  readonly products: ProductsPage;
  readonly categoryProducts: CategoryProductsPage;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    super(page);
    this.headerFullFledged = page.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' });
    this.linkViewCart = page.getByRole('link', { name: 'View Cart' });
    this.headerRecommendedItems = page.getByRole('heading', { name: 'Recommended items' });
    this.linkAddToCartFromRecommendedItems = page.locator('#recommended-item-carousel').locator('.add-to-cart');

    this.leftSidebar = new LeftSidebarComponent(page);
    this.products = new ProductsPage(page);
    this.categoryProducts = new CategoryProductsPage(page);
    this.footer = new FooterComponent(page);
  }

  async expectHomePage(): Promise<void> {
    await expect.soft(this.page).toHaveURL('/');
    await expect(this.page).toHaveTitle(data.title.home);
  }

  async addFromRecommendedItemsAndViewCart(): Promise<CartPage> {
    await this.linkAddToCartFromRecommendedItems.last().click();
    await this.linkViewCart.click();
    return new CartPage(this.page);
  }
}
