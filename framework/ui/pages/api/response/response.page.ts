import { CreateAccountBodyApiModel } from '../../../../../models/api/authentication/create-account.model';
import { ProductApiModel } from '../../../../../models/api/products/products.model';
import { APIResponse, expect } from '@playwright/test';

export class ResponseApiPage {
  checkResponseStatus(response: APIResponse, code: number = 200): void {
    expect.soft(response.status(), 'Unexpected status code').toBe(code);
  }

  checkResponseStatuses(response: APIResponse, code: number = 200): void {
    expect.soft(response.ok(), 'Response not OK').toBeTruthy();
    expect.soft(response.status(), 'Unexpected status code').toBe(code);
  }

  checkResponseCode(responseBody: CreateAccountBodyApiModel, code: number): void {
    expect.soft(responseBody.responseCode, 'Unexpected response code in body').toBe(code);
  }

  checkResponseMessage(responseBody: CreateAccountBodyApiModel, message: string): void {
    expect.soft(responseBody.message, 'Unexpected message in response body').toBe(message);
  }

  checkProductDetails(responseBody: ProductApiModel, expected: ProductApiModel): void {
    expect(responseBody.id).toBe(expected.id);
    expect(responseBody.name).toBe(expected.name);
    expect(responseBody.price).toBe(expected.price);
    expect(responseBody.brand).toBe(expected.brand);
    expect(responseBody.category).toBeTruthy();
    expect(responseBody.category.category).toBe(expected.category.category);
    expect(responseBody.category.usertype.usertype).toBe(expected.category.usertype.usertype);
  }
}