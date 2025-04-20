// utils/userFactory.ts
export function generateUser() {
    const random = Math.floor(Math.random() * 10000);
    return {
      name: `User${random}`,
      email: `user${random}@test.com`
    };
  }