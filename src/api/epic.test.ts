import { describe, it, expect } from "vitest";
import { epicImageUrl } from "./epic";

describe("epicImageUrl", () => {
  const image = {
    identifier: "20260329004211",
    image: "epic_1b_20260329004211",
    date: "2026-03-29 00:42:11",
    caption: "",
  };

  it("sestaví cestu do archivu z data snímku", () => {
    expect(epicImageUrl(image)).toContain(
      "/EPIC/archive/natural/2026/03/29/png/epic_1b_20260329004211.png",
    );
  });

  it("připojí api_key", () => {
    expect(epicImageUrl(image)).toMatch(/api_key=.+/);
  });
});
