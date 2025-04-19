import { ProductReviewModel } from '../models/e2e/product-details.model';
import { faker } from '@faker-js/faker';

export function createProductReview(): ProductReviewModel {
  const productReview = {
    name: faker.person.fullName(),
    email: faker.internet.email({ provider: 'fakerjs.dev' }),
    review: faker.lorem.text(),
  };
  return productReview;
}
