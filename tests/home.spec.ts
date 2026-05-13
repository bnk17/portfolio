import { test, expect } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('navigation links are present', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'About' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible()
})
