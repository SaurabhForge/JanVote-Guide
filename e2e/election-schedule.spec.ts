import { test, expect } from "@playwright/test";

/**
 * E2E Tests: Election Schedule (/elections)
 *
 * Tests the complete user journey through the Election Schedule page,
 * verifying content structure, key election data, navigation, and accessibility.
 */

test.describe("Election Schedule", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/elections");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should display the correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(/JanVote/i);
  });

  test("should display main heading 'Election Schedule'", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: /Election Schedule/i,
      level: 1,
    });
    await expect(heading).toBeVisible();
  });

  test("should show the intro text about India's 18th General Election", async ({
    page,
  }) => {
    const intro = page.getByText(/18th General Election/i);
    await expect(intro).toBeVisible();
  });

  test("should display the 'Visit ECI Website' external link", async ({
    page,
  }) => {
    const eciLink = page.getByRole("link", {
      name: /Visit ECI Website/i,
    });
    await expect(eciLink).toBeVisible();
    await expect(eciLink).toHaveAttribute("href", "https://www.eci.gov.in");
  });

  test("should display '2024 Election Key Facts' section", async ({ page }) => {
    const factsHeading = page.getByRole("heading", {
      name: /2024 Election Key Facts/i,
    });
    await expect(factsHeading).toBeVisible();
  });

  test("should display '7-Phase Polling Schedule' section", async ({
    page,
  }) => {
    const phaseHeading = page.getByRole("heading", {
      name: /7-Phase Polling Schedule/i,
    });
    await expect(phaseHeading).toBeVisible();
  });

  test("should display 'Election Timeline' section", async ({ page }) => {
    const timelineHeading = page.getByRole("heading", {
      name: /Election Timeline/i,
    });
    await expect(timelineHeading).toBeVisible();
  });

  test("should show milestone dates in the timeline", async ({ page }) => {
    // The timeline should render milestone events
    // Looking for date-like content or milestone entries
    const timeline = page.locator("[class*='timeline'], [class*='milestone']").first();
    // If no specific class, check for milestone text patterns
    const milestonesArea = page.getByText(/Result|Phase|Announcement|Model Code/i).first();
    await expect(milestonesArea).toBeVisible();
  });

  test("should have working navigation to other pages", async ({ page }) => {
    // Click on 'Register' in the navbar
    const registerNavLink = page.getByRole("navigation").getByRole("link", {
      name: /Register/i,
    });
    await expect(registerNavLink).toBeVisible();
    await registerNavLink.click();
    await expect(page).toHaveURL(/\/register/);
  });

  test("should have the main navigation visible", async ({ page }) => {
    const nav = page.getByRole("navigation");
    await expect(nav).toBeVisible();
  });

  test("should have a footer visible", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should have ECI Website link with security attributes", async ({
    page,
  }) => {
    const eciLink = page.getByRole("link", { name: /Visit ECI Website/i });
    // External links should open in new tab with rel="noopener noreferrer"
    const target = await eciLink.getAttribute("target");
    const rel = await eciLink.getAttribute("rel");
    if (target === "_blank") {
      expect(rel).toContain("noopener");
    }
  });

  test("should be responsive — page content visible on mobile viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const heading = page.getByRole("heading", {
      name: /Election Schedule/i,
      level: 1,
    });
    await expect(heading).toBeVisible();
  });

  test("should not have any console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.reload();
    await page.waitForLoadState("networkidle");
    // Filter out known third-party errors
    const criticalErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("analytics") &&
        !e.includes("gtag")
    );
    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe("Election Schedule — Cross-page Navigation", () => {
  test("should navigate from home to elections page", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Find Elections link in navbar
    const electionsLink = page
      .getByRole("navigation")
      .getByRole("link", { name: /Elections/i });
    await expect(electionsLink).toBeVisible();
    await electionsLink.click();

    await expect(page).toHaveURL(/\/elections/);
    await expect(
      page.getByRole("heading", { name: /Election Schedule/i, level: 1 })
    ).toBeVisible();
  });
});
