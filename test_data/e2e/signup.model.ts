export interface UserSignupBasicInfoModel {
  password: string;
  day: string;
  month: string;
  year: string;
}

export interface UserSignupAddressInfoModel {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
}

//? API
export interface CreateUserAPIModel {
  name: 'ali_existing';
  email: 'ali_existing@test.com';
  password: 'P@ssw0rd123';
  title: 'asdfgh';
  day: 15;
  month: '0ct';
  year: '1995';
  firstName: 'ali';
  lastName: 'raza';
  company: string;
  address: 'asdfgh';
  address2: string;
  country: 'pakistan';
  state: 'punjab';
  city: 'lahore';
  zipCode: '12345';
  phoneNumber: '098765432';
}
