import { describe, expect, it } from "vitest";
import {
  getProject,
  getProjectSlugs,
  getProjects,
} from "@/lib/content";

describe("content/projects", () => {
  it("returns every project with unique slugs", () => {
    const slugs = getProjectSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("orders corp projects before personal ones", () => {
    const types = getProjects().map((p) => p.type);
    const firstPersonal = types.indexOf("personal");
    const lastCorp = types.lastIndexOf("corp");
    if (firstPersonal !== -1 && lastCorp !== -1) {
      expect(lastCorp).toBeLessThan(firstPersonal);
    }
  });

  it("filters by type", () => {
    expect(getProjects("personal").every((p) => p.type === "personal")).toBe(true);
    expect(getProjects("corp").every((p) => p.type === "corp")).toBe(true);
  });

  it("resolves a known slug and rejects an unknown one", () => {
    const slug = getProjectSlugs()[0]!;
    expect(getProject(slug)?.slug).toBe(slug);
    expect(getProject("does-not-exist")).toBeUndefined();
  });

  it("every project has alt text and, when set, a cover under /images", () => {
    for (const p of getProjects()) {
      expect(p.coverAlt.length).toBeGreaterThan(3);
      if (p.cover !== undefined) {
        expect(p.cover.startsWith("/images/")).toBe(true);
      }
    }
  });
});
