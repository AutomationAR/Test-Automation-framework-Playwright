import { test, expect } from '@playwright/test';

test('Test Case 2: Login User with correct email and password', async ({ page }) => {
  const testEmail = 'ali_existing@test.com';
  const testPassword = 'P@ssw0rd123';
  const expectedUsername = 'ali_existing'; // or whatever is displayed after login

  await page.goto('http://automationexercise.com');
  await expect(page).toHaveURL(/automationexercise\.com/);
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

  await page.click('a[href="/login"]');
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();

  await page.fill('input[data-qa="login-email"]', testEmail);
  await page.fill('input[data-qa="login-password"]', testPassword);
  await page.click('button[data-qa="login-button"]');

  // Debug: print post-login page content if test fails
  await page.waitForTimeout(2000);
  const bodyText = await page.locator('body').innerText();
  console.log('Post-login body content:\n', bodyText);

  // Try matching full expected username
  const userWelcomeLocator = page.locator(`text=Logged in as ${expectedUsername}`);
  await expect(userWelcomeLocator).toBeVisible({ timeout: 10000 });

  await page.click('a[href="/delete_account"]');
  await expect(page.locator('h2:has-text("Account Deleted!")')).toBeVisible();
});