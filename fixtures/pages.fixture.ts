import { LoginPage } from '../framework/ui/pages/e2e/authentication/login.page';
import { SignupPage } from '../framework/ui/pages/e2e/authentication/signup.page';
import { CartPage } from '../framework/ui/pages/e2e/cart.page';
import { CheckoutPage } from '../framework/ui/pages/e2e/checkout.page';
import { ContactUsPage } from '../framework/ui/pages/e2e/contact-us.page';
import { HomePage } from '../framework/ui/pages/e2e/home.page';
import { PaymentPage } from '../framework/ui/pages/e2e/payment/payment.page';
import { ProductsPage } from '../framework/ui/pages/e2e/products/product.page';
import { TestCasesPage } from '../framework/ui/pages/e2e/test-cases.page';
import { test as pagesTest } from '@playwright/test';

interface Pages {
  cart: CartPage;
  contactUs: ContactUsPage;
  checkout: CheckoutPage;
  home: HomePage;
  login: LoginPage;
  signup: SignupPage;
  payment: PaymentPage;
  products: ProductsPage;
  testCases: TestCasesPage;
}

export const pages = pagesTest.extend<Pages>({
  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  contactUs: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
  checkout: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signup: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  products: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  payment: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  testCases: async ({ page }, use) => {
    await use(new TestCasesPage(page));
  },
});
