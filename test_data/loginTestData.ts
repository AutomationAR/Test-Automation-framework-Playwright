export interface LoginTestData {
    testEmail: string;
    testPassword: string;
    expectedUsername: string;
  }
  
  export const loginTestData: LoginTestData = {
    testEmail: 'ali_existing@test.com',
    testPassword: 'P@ssw0rd123',
    expectedUsername: 'ali_existing' // or whatever is displayed after login
  };
  