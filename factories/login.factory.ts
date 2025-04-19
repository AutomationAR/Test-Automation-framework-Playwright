import { UserLoginModel, UserSignupModel } from '../models/e2e/login.model';
import { faker } from '@faker-js/faker';

export function createFakeLoginUser(): UserLoginModel {
  const userFakeLoginModel: UserLoginModel = {
    email: faker.internet.email({ provider: 'fakerjs.dev' }),
    password: faker.internet.password(),
  };
  return userFakeLoginModel;
}

export function createSignupUser(sex?: 'female' | 'male'): UserSignupModel {
  const name = faker.person.firstName(sex);
  const email = faker.internet.email({ firstName: name, provider: 'fakerjs.dev' });

  const userSignupModel: UserSignupModel = {
    name,
    email,
  };
  return userSignupModel;
}