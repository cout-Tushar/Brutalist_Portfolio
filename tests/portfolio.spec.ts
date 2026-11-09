import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("recruiter content, architecture, and skills stay accessible", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: "View resume" })).toHaveAttribute(
    "href",
    /drive.google.com/,
  );
  await page.getByRole("button", { name: /Identity/ }).click();
  await expect(page.locator("#flow-detail")).toContainText(
    "Know who is asking.",
  );
  await page.getByRole("button", { name: /Databases/ }).click();
  await expect(page.locator("#skill-content")).toContainText("PostgreSQL");
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
});
test("responsive layout, keyboard menu, and reduced-motion fallback", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator("canvas")).toHaveCount(0);
    if (width === 390) {
      const menu = page.getByRole("button", { name: "Menu +" });
      await menu.click();
      await expect(page.locator("#navigation")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(menu).toBeFocused();
      await expect(page.locator("#navigation")).toBeHidden();
    }
  }
  expect(errors).toEqual([]);
});
test("project controls and verified clipboard command", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Inventory", exact: true }).click();
  await expect(page.locator(".erp-row").first()).toContainText(
    "Material requests",
  );
  await page.getByRole("button", { name: /Explain/ }).click();
  await expect(page.locator(".terminal-description")).toContainText("Groq");
  await page.getByRole("button", { name: "Copy", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Copied", exact: true }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "npm install -g tushar_hammy",
  );
});
