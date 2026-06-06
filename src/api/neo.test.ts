import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { fetchNeoFeed } from "./neo";

const DATE = "2026-06-06";

const sampleFeed = {
  element_count: 2,
  near_earth_objects: {
    [DATE]: [
      {
        id: "1",
        name: "(2024 AB)",
        is_potentially_hazardous_asteroid: false,
        estimated_diameter: {
          meters: { estimated_diameter_min: 100, estimated_diameter_max: 140 },
        },
        close_approach_data: [{ miss_distance: { lunar: "2.1" } }],
      },
      {
        id: "2",
        name: "(2025 QR7)",
        is_potentially_hazardous_asteroid: true,
        estimated_diameter: {
          meters: { estimated_diameter_min: 300, estimated_diameter_max: 320 },
        },
        close_approach_data: [{ miss_distance: { lunar: "0.8" } }],
      },
    ],
  },
};

function mockFetch(body: unknown, ok = true, status = 200) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok, status, json: async () => body })),
  );
}

describe("fetchNeoFeed", () => {
  afterEach(() => vi.unstubAllGlobals());

  beforeEach(() => mockFetch(sampleFeed));

  it("vrací počet a řadí objekty od nejbližšího průletu", async () => {
    const feed = await fetchNeoFeed(DATE);
    expect(feed.count).toBe(2);
    expect(feed.objects.map((o) => o.name)).toEqual(["2025 QR7", "2024 AB"]);
  });

  it("mapuje nebezpečný objekt na status 'caution' / 'Sledovat'", async () => {
    const { objects } = await fetchNeoFeed(DATE);
    expect(objects[0]).toMatchObject({
      name: "2025 QR7",
      status: "caution",
      statusLabel: "Sledovat",
      distanceLd: "0.8 LD",
      diameterM: 310,
    });
  });

  it("mapuje bezpečný objekt na status 'safe' / 'Bezpečný'", async () => {
    const { objects } = await fetchNeoFeed(DATE);
    expect(objects[1]).toMatchObject({
      name: "2024 AB",
      status: "safe",
      statusLabel: "Bezpečný",
      distanceLd: "2.1 LD",
      diameterM: 120,
    });
  });

  it("vrací prázdné pole, když pro den nejsou data", async () => {
    mockFetch({ element_count: 0, near_earth_objects: {} });
    const feed = await fetchNeoFeed(DATE);
    expect(feed.objects).toEqual([]);
  });

  it("vyhodí chybu při HTTP 429", async () => {
    mockFetch({}, false, 429);
    await expect(fetchNeoFeed(DATE)).rejects.toThrow(/limit/i);
  });
});
