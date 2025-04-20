import * as data from '../../../../test_data/e2e/app.data.json';
import { ContactUsModel } from '../../../../models/e2e/contact-us.model';
import { BasePage } from './base.page';
import { expect, type Locator, type Page } from '@playwright/test';

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
    // Use data-qa, name, or input types for more stable selectors
    const nameField = this.page.locator('input[name="name"]');
    const emailField = this.page.locator('input[data-qa="email"]');
    const subjectField = this.page.locator('input[name="subject"]');
    const messageField = this.page.locator('textarea[name="message"]');
    const fileUploadField = this.page.locator('input[type="file"]');
    const submitButton = this.page.locator('input[name="submit"]');
  
    await nameField.waitFor({ state: 'visible' });
    await nameField.fill(form.name);
  
    await emailField.waitFor({ state: 'visible' });
    await emailField.fill(form.email);
  
    await subjectField.waitFor({ state: 'visible' });
    await subjectField.fill(form.subject);
  
    await messageField.waitFor({ state: 'visible' });
    await messageField.fill(form.message);
  
    await fileUploadField.waitFor({ state: 'visible' });
    await fileUploadField.setInputFiles('./test_data/images/image.jpg');

     // Confirm fields are filled correctly
    await expect(nameField).toHaveValue(form.name);
    await expect(emailField).toHaveValue(form.email);
    await expect(subjectField).toHaveValue(form.subject);
    await expect(messageField).toHaveValue(form.message);

    await submitButton.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);
    await submitButton.click();
    await this.page.waitForTimeout(500);
  }
}
