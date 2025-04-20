import { CreateAccountApiModel } from '../../../models/api/authentication/create-account.model';
import { faker } from '@faker-js/faker';

export function createAccountApi(): CreateAccountApiModel {
  const timestamp = Date.now();
  return {
    name: `TestUser${timestamp}`,
    email: `testuser${timestamp}@example.com`,
    password: 'Test@1234',
    title: 'Mr',
    birth_date: '01',
    birth_month: '01',
    birth_year: '1990',
    firstname: 'Test',
    lastname: 'User',
    company: 'TestCo',
    address1: '123 Main St',
    address2: 'Apt 4',
    country: 'Canada',
    zipcode: '12345',
    state: 'Ontario',
    city: 'Toronto',
    mobile_number: '1234567890'
  };
}

export function updateAccountApi(): CreateAccountApiModel {
  const updateAccount: CreateAccountApiModel = {
    name: faker.internet.username(),
    email: faker.internet.email({ provider: 'bugcatcher.dev' }).toLowerCase(),
    password: faker.internet.password({ length: 20 }),
    title: 'Mr',
    birth_date: faker.number.int({ min: 1, max: 31 }).toString(),
    birth_month: faker.date.month(),
    birth_year: faker.number.int({ min: 1900, max: 2021 }).toString(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress({ useFullAddress: true }),
    address2: faker.location.secondaryAddress(),
    country: faker.location.country(),
    zipcode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: faker.phone.number(),
  };
  return updateAccount;
}
