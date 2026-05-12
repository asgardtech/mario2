import { Player } from "../Player";

describe("Player movement and bounds", () => {
  const canvasWidth = 800;
  const canvasHeight = 600;
  const player = new Player(canvasWidth, canvasHeight);

  test("initial position center", () => {
    expect(player.x).toBeCloseTo(canvasWidth / 2 - 15);
    expect(player.y).toBeCloseTo(canvasHeight / 2 - 15);
  });

  test("move right and clamp", () => {
    const keys = new Set<string>(["ArrowRight"]);
    player.update(1, keys);
    // After one second, dx should be 180 (200 * 0.9), x increased by 180
    expect(player.dx).toBeCloseTo(180);
    expect(player.x).toBeCloseTo(canvasWidth / 2 - 15 + 180);
  });

  test("clamp to right edge", () => {
    const keys = new Set<string>(["ArrowRight"]);
    // Move player close to right edge
    player.x = canvasWidth - player.width - 1;
    player.dx = 100;
    player.update(0.1, keys); // small delta
    expect(player.x).toBeLessThanOrEqual(canvasWidth - player.width);
  });
});
