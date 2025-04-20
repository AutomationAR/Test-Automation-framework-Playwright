import { ContactUsModel } from '../models/e2e/contact-us.model';

export function createContactUsForm(): ContactUsModel {
  const timestamp = Date.now();

  return {
    name: `Test User ${timestamp}`,
    email: `testuser${timestamp}@example.com`,
    subject: `Test Subject ${timestamp}`,
    message: `This is a test message for contact us form created at ${new Date(timestamp).toISOString()}.\n\nIt is used for automated testing.`,
  };
}
