import * as data from '../../../../test_data/e2e/app.data.json';
import { CheckoutDescModel } from '../../../../models/e2e/checkout.model';
import { UserSignupAddressInfoModel } from '../../../../models/e2e/signup.model';
import { BasePage } from './base.page';
import { PaymentPage } from './payment/payment.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class CheckoutPage extends BasePage {
  private readonly deliveryAddressLocator: Locator;
  private readonly headerDeliveryAddress: Locator;
  private readonly invoiceAddressLocator: Locator;
  private readonly headerDeliveryInvoice: Locator;
  private readonly fieldDescription: Locator;
  private readonly buttonPlaceOrder: Locator;

  constructor(page: Page) {
    super(page);
    this.deliveryAddressLocator = page.locator('#address_delivery');
    this.headerDeliveryAddress = this.deliveryAddressLocator.locator('.page-subheading');
    this.invoiceAddressLocator = page.locator('#address_invoice');
    this.headerDeliveryInvoice = this.invoiceAddressLocator.locator('.page-subheading');
    this.fieldDescription = page.locator('textarea');
    this.buttonPlaceOrder = page.getByRole('link', { name: 'Place Order' });
  }

  async checkDeliveryAddress(address: UserSignupAddressInfoModel): Promise<void> {
    const strAddress = `Mrs. ${address.firstName} ${address.lastName} ${address.company} ${address.address} ${address.address2} ${address.city} ${address.state} ${address.zipCode} ${address.country} ${address.phoneNumber}`;
    await expect(this.headerDeliveryAddress).toContainText(data.checkout.yourDeliveryAddress);
    await expect.soft(this.deliveryAddressLocator).toContainText(strAddress);
  }

  async checkDeliveryInvoice(address: UserSignupAddressInfoModel): Promise<void> {
    const strAddress = `Mrs. ${address.firstName} ${address.lastName} ${address.company} ${address.address} ${address.address2} ${address.city} ${address.state} ${address.zipCode} ${address.country} ${address.phoneNumber}`;
    await expect(this.headerDeliveryInvoice).toContainText(data.checkout.yourDeliveryInvoice);
    await expect.soft(this.invoiceAddressLocator).toContainText(strAddress);
  }

  async fillDescription(desc: CheckoutDescModel): Promise<void> {
    await this.fieldDescription.fill(desc.description);
  }

  async clickPlaceOrder(): Promise<PaymentPage> {
    await this.buttonPlaceOrder.click();
    return new PaymentPage(this.page);
  }
}
