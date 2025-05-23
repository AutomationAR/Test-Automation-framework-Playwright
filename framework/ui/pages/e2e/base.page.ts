import * as data from '../../../../test_data/e2e/app.data.json';
import { ScrollHelper } from '../../../../helpers/scroll.helper';
import { type Locator, type Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;
  private readonly titleHandler: Locator;
  private readonly buttonConsent: Locator;
  readonly buttonAcceptDialog: Locator;
  private readonly buttonScrollUp: Locator;

  protected constructor(page: Page) {
    this.page = page;
    this.titleHandler = page.getByText(data.cookies.title);
    this.buttonConsent = page.getByRole('button', { name: data.cookies.consent });
    this.buttonAcceptDialog = page.getByRole('button', { name: 'Submit' });
    this.buttonScrollUp = page.locator('#scrollUp');
  }

  async goTo(url: string = '/'): Promise<void> {
    await this.page.goto(url);
  }

  async catchHandler(): Promise<void> {
    await this.page.addLocatorHandler(this.titleHandler, async () => {
      await this.buttonConsent.click();
    });
  }

  async catchDialog(): Promise<void> {
    this.page.on('dialog', (dialog) => {
      console.log('Dialog message: ', dialog.message());
      console.log('Type of dialog: ', dialog.type());
      dialog.accept();
    });
  }

  async scrollDownPage(): Promise<void> {
    await ScrollHelper.scrollDownPage(this.page);
  }

  async scrollUpPage(): Promise<void> {
    await ScrollHelper.scrollUpPage(this.page);
  }

  async clickScrollUpArrow(): Promise<void> {
    await this.buttonScrollUp.click();
  }

  async takeScreenShot(screenShotName: string): Promise<void> {
    await this.page.screenshot({ path: `./e2e/download/ui/home/${screenShotName}.png` });
  }

  async giveMeSmallSecond(timeout: number = 200): Promise<void> {
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(timeout);
  }
}
