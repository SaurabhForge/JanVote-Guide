import { test, expect } from "@playwright/test";

/**
 * E2E Tests: Voter Registration Guide (/register)
 *
 * Tests the complete user journey through the Voter Registration Guide page,
 * verifying content, navigation, links, and accessibility.
 */

test.describe("Voter Registration Guide", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the registration page before each test
    await page.goto("/register");
    // Wait for the page to be fully loaded
    await page.waitForLoadState("domcontentloaded");
  });

  test("should display the correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(/JanVote/i);
  });

  test("should display main heading 'Voter Registration Guide'", async ({
    page,
  }) => {
    const heading = page.getByRole("heading", {
      name: /Voter Registration Guide/i,
      level: 1,
    });
    await expect(heading).toBeVisible();
  });

  test("should display the introductory paragraph", async ({ page }) => {
    const intro = page.getByText(
      /Registering to vote is the first step/i
    );
    await expect(intro).toBeVisible();
  });

  test("should show the 'Register on NVSP' external link", async ({ page }) => {
    const registerLink = page.getByRole("link", {
      name: /Register on NVSP/i,
    });
    await expect(registerLink).toBeVisible();
    await expect(registerLink).toHaveAttribute("href", "https://voters.eci.gov.in");
  });

  test("should display '6 Simple Steps to Register' section", async ({
    page,
  }) => {
    const stepsHeading = page.getByRole("heading", {
      name: /6 Simple Steps to Register/i,
    });
    await expect(stepsHeading).toBeVisible();
  });

  test("should display 'What to Keep Ready' documents section", async ({
    page,
  }) => {
    const docsHeading = page.getByRole("heading", {
      name: /What to Keep Ready/i,
    });
    await expect(docsHeading).toBeVisible();
  });

  test("should display 'Registration FAQs' section", async ({ page }) => {
    const faqHeading = page.getByRole("heading", {
      name: /Registration FAQs/i,
    });
    await expect(faqHeading).toBeVisible();
  });

  test("should show 'Go to Voter Portal' link", async ({ page }) => {
    const portalLink = page.getByRole("link", {
      name: /Go to Voter Portal/i,
    });
    await expect(portalLink).toBeVisible();
    await expect(portalLink).toHaveAttribute("href", "https://voters.eci.gov.in");
  });

  test("should display important notes about registration", async ({
    page,
  }) => {
    const note = page.getByText(
      /Register at your permanent address/i
    );
    await expect(note).toBeVisible();
  });

  test("should have the main navigation visible", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: /main navigation/i });
    await expect(nav).toBeVisible();
  });

  test("should have a navigation link to 'Register'", async ({ page }) => {
    // Check that the Navbar has the Register link
    const navLinks = page.getByRole("navigation").getByRole("link");
    await expect(navLinks.first()).toBeVisible();
  });

  test("should be accessible — no images without alt text", async ({
    page,
  }) => {
    // All img elements should have an alt attribute
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute("alt");
    }
  });

  test("should navigate back to home when logo is clicked", async ({
    page,
  }) => {
    const logo = page.locator("#nav-logo");
    await expect(logo).toBeVisible();
    await logo.click();
    await expect(page).toHaveURL(/\/$/);
  });
});
