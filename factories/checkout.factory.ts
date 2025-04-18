import { CheckoutDescModel } from '../test_data/e2e/checkout.model';
import { faker } from '@faker-js/faker';

export function randomDesc(): CheckoutDescModel {
  const description = faker.lorem.text();
  return { description };
}
