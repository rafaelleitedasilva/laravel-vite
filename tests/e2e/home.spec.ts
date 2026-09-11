import { test, expect } from "@playwright/test";

test("home renders all sections with a single h1", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toHaveCount(1);
  for (const id of [
    "sobre",
    "experiencia",
    "formacao",
    "habilidades",
    "trabalhos",
    "contato",
  ]) {
    await expect(page.locator(`section#${id}`)).toBeVisible();
  }
});

test("home content is server-rendered (present without JS)", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Rafael");
  await expect(page.getByRole("button", { name: /Fluit/ })).toBeVisible();
  await context.close();
});

test("clicking a project opens a modal on the same page (no navigation)", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Fluit/ }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Fluit" })).toBeVisible();
  await expect(page).toHaveURL(/\/$/); // still on home

  await page.getByRole("button", { name: "Fechar" }).click();
  await expect(dialog).toBeHidden();
});

test("project modal closes with Escape and restores focus to the card", async ({
  page,
}) => {
  await page.goto("/");
  const card = page.getByRole("button", { name: /Jotion/ });
  await card.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(card).toBeFocused();
});

test("project filter narrows the grid", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pessoal", exact: true }).click();
  await expect(page.getByRole("button", { name: /BlogText/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Fluit/ })).toHaveCount(0);
});

test("cards stay visually visible (not stuck at opacity 0) across repeated filter switches", async ({
  page,
}) => {
  // Regression test: StaggerGroup's whileInView only fires once per mount —
  // switching filters back and forth used to leave later cards permanently
  // at opacity 0 (present in the DOM, invisible). toBeVisible() alone does
  // NOT catch this (Playwright's visibility check ignores opacity), so this
  // asserts the actual computed opacity.
  await page.goto("/");
  for (const label of ["Corporativo", "Pessoal", "Todos", "Pessoal", "Corporativo"]) {
    await page.getByRole("button", { name: label, exact: true }).click();
    const cards = page.locator('button[aria-haspopup="dialog"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i)).toHaveCSS("opacity", "1");
    }
  }
});

test("mobile menu opens and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("header CTA is hidden below the lg breakpoint (only the hamburger shows)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  await expect(
    page.locator("header").getByRole("link", { name: "Fale comigo" }),
  ).toBeHidden();
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeVisible();
});

test("content and interactions still work with prefers-reduced-motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("h1")).toContainText("Rafael");
  await expect(page.getByRole("button", { name: /Fluit/ })).toBeVisible();

  await page.getByRole("button", { name: /Fluit/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});
