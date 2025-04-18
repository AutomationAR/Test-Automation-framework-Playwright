import { BasePage } from '../base.page';
import { HomePage } from '../home.page';
import { type Locator, type Page } from '@playwright/test';

export class DeleteAccountPage extends BasePage {
  readonly headerAccountDeleted: Locator;
  private readonly buttonContinue: Locator;

  constructor(page: Page) {
    super(page);
    this.headerAccountDeleted = page.getByTestId('account-deleted');
    this.buttonContinue = page.getByTestId('continue-button');
  }

  async clickContinue(): Promise<HomePage> {
    await this.buttonContinue.click();
    return new HomePage(this.page);
  }
}
