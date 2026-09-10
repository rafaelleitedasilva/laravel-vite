import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/validation/contact";

const valid = {
  name: "Rafael Silva",
  email: "rafael@example.com",
  context: "Proposta de projeto",
  message: "Olá, gostaria de conversar sobre uma oportunidade de trabalho.",
};

describe("contactSchema", () => {
  it("accepts a well-formed payload", () => {
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("trims and defaults the honeypot to empty string", () => {
    const result = contactSchema.parse(valid);
    expect(result.company).toBe("");
  });

  it.each([
    ["name", { ...valid, name: "R" }],
    ["email", { ...valid, email: "not-an-email" }],
    ["context", { ...valid, context: "ab" }],
    ["message", { ...valid, message: "curta" }],
  ])("rejects invalid %s", (_field, payload) => {
    expect(contactSchema.safeParse(payload).success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    expect(
      contactSchema.safeParse({ ...valid, company: "ACME" }).success,
    ).toBe(false);
  });
});
