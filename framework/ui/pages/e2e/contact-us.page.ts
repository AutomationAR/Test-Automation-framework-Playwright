import * as data from '../../../../test_data/e2e/app.data.json';
import { ContactUsModel } from '../../../../test_data/e2e/contact-us.model';
import { BasePage } from './base.page';
import { type Locator, type Page } from '@playwright/test';

export class ContactUsPage extends BasePage {
  readonly header: Locator;
  private readonly fieldName: Locator;
  private readonly fieldEmail: Locator;
  private readonly fieldSubject: Locator;
  private readonly fieldMessage: Locator;
  private readonly fieldFileUpload: Locator;
  private readonly buttonSubmit: Locator;
  readonly alertMessage: Locator;
  readonly buttonBackHome: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole('heading', { name: data.contactUs.header });
    this.fieldName = page.getByTestId('name');
    this.fieldEmail = page.getByTestId('email');
    this.fieldSubject = page.getByTestId('subject');
    this.fieldMessage = page.getByTestId('message');
    this.fieldFileUpload = page.locator('input[name="upload_file"]');
    this.buttonSubmit = page.getByTestId('submit-button');
    this.alertMessage = page.locator('#contact-page').locator('.alert-success');
    this.buttonBackHome = page.locator('.btn-success');
  }

  async fillContactUs(form: ContactUsModel): Promise<void> {
    await this.fieldName.fill(form.name);
    await this.fieldEmail.fill(form.email);
    await this.fieldSubject.fill(form.subject);
    await this.fieldMessage.fill(form.message);
    await this.fieldFileUpload.setInputFiles('./e2e/assets/images/image.jpg');
    await this.buttonSubmit.click();
  }
}
