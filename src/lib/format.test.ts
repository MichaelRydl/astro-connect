import { describe, it, expect } from "vitest";
import { formatCzDate, formatCzShort, todayIso } from "./format";

describe("formatCzDate", () => {
  it("formátuje ISO datum do dlouhého českého tvaru", () => {
    const out = formatCzDate("2026-03-29");
    expect(out).toContain("29");
    expect(out).toContain("března");
    expect(out).toContain("2026");
  });

  it("zvládá datum s časem (formát EPIC)", () => {
    expect(formatCzDate("2026-03-29 11:22:33")).toContain("března");
  });
});

describe("formatCzShort", () => {
  it("vrací den.měsíc. bez dvojité tečky", () => {
    expect(formatCzShort("2026-03-29")).toBe("29.3.");
  });

  it("zvládá datum EPIC s časem", () => {
    expect(formatCzShort("2026-12-01 00:00:00")).toBe("1.12.");
  });
});

describe("todayIso", () => {
  it("vrací YYYY-MM-DD", () => {
    expect(todayIso()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
