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
    const expectedHeader = data.checkout.yourDeliveryAddress.trim();
    const actualHeader = (await this.headerDeliveryAddress.textContent())?.trim();
    expect(actualHeader).toBe(expectedHeader);
  
    const expectedAddress = `${address.firstName} ${address.lastName} ${address.company} ${address.address} ${address.address2} ${address.city} ${address.state} ${address.zipCode} ${address.country} ${address.phoneNumber}`
      .replace(/\s+/g, ' ')
      .trim();
  
    const fullText = (await this.deliveryAddressLocator.textContent())?.replace(/\s+/g, ' ').trim();
    const addressOnly = fullText?.replace(expectedHeader, '').trim();
  
    expect.soft(addressOnly).toContain(expectedAddress);
  }

  async checkDeliveryInvoice(address: UserSignupAddressInfoModel): Promise<void> {
    const expectedHeader = data.checkout.yourDeliveryInvoice.trim();
    const actualHeader = (await this.headerDeliveryInvoice.textContent())?.trim();
    expect(actualHeader).toBe(expectedHeader);
  
    const expectedAddress = `${address.firstName} ${address.lastName} ${address.company} ${address.address} ${address.address2} ${address.city} ${address.state} ${address.zipCode} ${address.country} ${address.phoneNumber}`
      .replace(/\s+/g, ' ')
      .trim();
  
    const fullText = (await this.invoiceAddressLocator.textContent())?.replace(/\s+/g, ' ').trim();
    const addressOnly = fullText?.replace(expectedHeader, '').trim();
  
    expect.soft(addressOnly).toContain(expectedAddress);
  }

  async fillDescription(desc: CheckoutDescModel): Promise<void> {
    await this.fieldDescription.fill(desc.description);
  }

  async clickPlaceOrder(): Promise<PaymentPage> {
    await this.buttonPlaceOrder.click();
    return new PaymentPage(this.page);
  }
}
