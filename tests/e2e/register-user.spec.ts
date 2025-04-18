import { test, expect } from '@playwright/test';

test('Test Case 1: Register User', async ({ page }) => {
  // 1. Launch browser and navigate to URL
  await page.goto('http://automationexercise.com');

  // 2. Verify that home page is visible successfully
  //await expect(page).toHaveURL(/automationexercise\.com/);
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

  // 3. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 4. Verify 'New User Signup!' is visible
  await expect(page.locator('text=New User Signup!')).toBeVisible();

  // 5. Enter name and email address
  await page.fill('input[data-qa="signup-name"]', 'Ali TestUser');
  const email = `ali${Date.now()}@test.com`; // unique email
  await page.fill('input[data-qa="signup-email"]', email);

  // 6. Click 'Signup' button
  await page.click('button[data-qa="signup-button"]');

  // 7. Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await expect(page.locator('text=Enter Account Information')).toBeVisible();

  // 8. Fill details: Title, Name, Email, Password, Date of birth
  await page.check('#id_gender1'); // Title
  await page.fill('#password', 'P@ssw0rd123');
  await page.selectOption('#days', '15');
  await page.selectOption('#months', '5');
  await page.selectOption('#years', '1995');

  // 9. Check newsletter and offers
  await page.check('#newsletter');
  await page.check('#optin');

  // 10. Fill rest of the personal information
  await page.fill('#first_name', 'Ali');
  await page.fill('#last_name', 'Raza');
  await page.fill('#company', 'TestCo');
  await page.fill('#address1', '123 Main St');
  await page.fill('#address2', 'Suite 100');
  await page.selectOption('#country', 'Canada');
  await page.fill('#state', 'Ontario');
  await page.fill('#city', 'Toronto');
  await page.fill('#zipcode', 'M1M1M1');
  await page.fill('#mobile_number', '1234567890');

  // 11. Click 'Create Account' button
  await page.click('button[data-qa="create-account"]');

  // 12. Verify that 'ACCOUNT CREATED!' is visible
  await expect(page.locator('text=Account Created!')).toBeVisible();

  // 13. Click 'Continue' button
  await page.click('a[data-qa="continue-button"]');

  // 14. Verify 'Logged in as username' is visible
  await expect(page.locator('text=Logged in as Ali TestUser')).toBeVisible();

  // 15. Click 'Delete Account' button
  await page.click('a[href="/delete_account"]');

  // 16. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue'
  await expect(page.locator('text=Account Deleted!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
