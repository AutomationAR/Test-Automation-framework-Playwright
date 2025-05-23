import { DeleteAccountPage } from '../framework/ui/pages/e2e/authentication/delete-account.page';
import { LoginPage } from '../framework/ui/pages/e2e/authentication/login.page';
import { BasePage } from '../framework/ui/pages/e2e/base.page';
import { CartPage } from '../framework/ui/pages/e2e/cart.page';
import { ContactUsPage } from '../framework/ui/pages/e2e/contact-us.page';
import { HomePage } from '../framework/ui/pages/e2e/home.page';
import { ProductsPage } from '../framework/ui/pages/e2e/products/product.page';
import { TestCasesPage } from '../framework/ui/pages/e2e/test-cases.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class HeaderComponent extends BasePage {
  private readonly home: Locator;
  private readonly products: Locator;
  private readonly cart: Locator;
  private readonly signLogin: Locator;
  private readonly deleteAccount: Locator;
  private readonly testCases: Locator;
  private readonly apiTesting: Locator;
  private readonly videoTutorials: Locator;
  private readonly contactUs: Locator;
  private readonly logout: Locator;

  constructor(page: Page) {
    super(page);
    this.home = page.getByRole('link', { name: 'Home' });
    this.products = page.getByRole('link', { name: 'Products' });
    this.cart = page.getByRole('link', { name: 'Cart' });
    this.signLogin = page.getByRole('link', { name: 'Signup / Login' });
    this.deleteAccount = page.getByRole('link', { name: 'Delete Account' });
    this.testCases = page.getByRole('link', { name: 'Test Cases', exact: true });
    this.apiTesting = page.getByRole('link', { name: 'API Testing' });
    this.videoTutorials = page.getByRole('link', { name: 'Video Tutorials' });
    this.contactUs = page.getByRole('link', { name: 'Contact us' });
    this.logout = page.getByRole('link', { name: 'Logout' });
  }

  private getLoggedUser(username: string): Locator {
    return this.page.getByRole('listitem').filter({ hasText: `Logged in as ${username}` });
  }

  async openHomePage(): Promise<HomePage> {
    await this.home.click();
    return new HomePage(this.page);
  }

  async openProductsPage(): Promise<ProductsPage> {
    await this.products.click();
    return new ProductsPage(this.page);
  }

  async openCartPage(): Promise<CartPage> {
    await this.cart.click();
    return new CartPage(this.page);
  }

  async openSignupLoginPage(): Promise<LoginPage> {
    await this.signLogin.click();
    return new LoginPage(this.page);
  }

  async clickDeleteAccount(): Promise<DeleteAccountPage> {
    await this.deleteAccount.click();
    return new DeleteAccountPage(this.page);
  }

  async openTestCasesPage(): Promise<TestCasesPage> {
    await this.testCases.click();
    return new TestCasesPage(this.page);
  }

  async openContactUsPage(): Promise<ContactUsPage> {
    await this.contactUs.click();
    return new ContactUsPage(this.page);
  }

  async clickLogout(): Promise<LoginPage> {
    await this.logout.click();
    return new LoginPage(this.page);
  }

  async expectLoggedUser(username: string): Promise<void> {
    await expect.soft(this.getLoggedUser(username)).toBeVisible();
  }
}