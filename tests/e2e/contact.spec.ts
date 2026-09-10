import { test, expect } from "@playwright/test";

test("shows inline validation errors on empty submit", async ({ page }) => {
  await page.goto("/#contato");
  await page.getByRole("button", { name: /enviar mensagem/i }).click();
  await expect(page.getByText("Informe seu nome.")).toBeVisible();
  await expect(page.getByText("E-mail inválido.")).toBeVisible();
});

test("submits successfully when the API returns ok", async ({ page }) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    }),
  );

  await page.goto("/#contato");
  await page.getByLabel("Nome").fill("Fulano de Tal");
  await page.getByLabel("E-mail").fill("fulano@example.com");
  await page.getByLabel("Assunto").fill("Oportunidade");
  await page
    .getByLabel("Mensagem")
    .fill("Mensagem de teste com tamanho suficiente para passar.");
  await page.getByRole("button", { name: /enviar mensagem/i }).click();

  await expect(page.getByText(/mensagem enviada/i)).toBeVisible();
});

test("surfaces a fallback mailto link when the API fails", async ({ page }) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, error: "send_failed" }),
    }),
  );

  await page.goto("/#contato");
  await page.getByLabel("Nome").fill("Fulano de Tal");
  await page.getByLabel("E-mail").fill("fulano@example.com");
  await page.getByLabel("Assunto").fill("Oportunidade");
  await page
    .getByLabel("Mensagem")
    .fill("Mensagem de teste com tamanho suficiente para passar.");
  await page.getByRole("button", { name: /enviar mensagem/i }).click();

  await expect(page.getByRole("link", { name: /abrir e-mail/i })).toBeVisible();
});
