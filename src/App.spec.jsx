import { test, expect } from '@playwright/experimental-ct-react';

test.describe("Main Page", () => {
  test('test', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('test@test.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('Testing123*');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: '2027' }).click();
    await page.getByText('Error: Enter a valid age').isVisible();
    await page.locator('.dismiss').click();
    await page.getByRole('button', { name: '2020' }).click();
    await page.getByText('Error: You must be over 13').isVisible();
    await page.locator('.dismiss').click();
    await page.getByRole('button', { name: 'Simulate Async Error' }).click();
    await page.getByText('Error: Failed to fetch').isVisible();
    await page.locator('.dismiss').click();
  });
})