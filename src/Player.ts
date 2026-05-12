export class Player {
  x: number;
  y: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
  private speed: number;
  private canvasWidth: number;
  private canvasHeight: number;
  private sprite: HTMLImageElement;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = 30;
    this.height = 30;
    this.speed = 200; // pixels per second
    this.x = canvasWidth / 2 - this.width / 2;
    this.y = canvasHeight / 2 - this.height / 2;
    this.dx = 0;
    this.dy = 0;
    this.sprite = new Image();
    this.sprite.src = new URL("../assets/player.png", import.meta.url).href;
  }

  update(delta: number, keys: Set<string>) {
    const accel = this.speed;
    if (keys.has("ArrowLeft") || keys.has("a")) {
      this.dx -= accel;
    }
    if (keys.has("ArrowRight") || keys.has("d")) {
      this.dx += accel;
    }
    if (keys.has("ArrowUp") || keys.has("w")) {
      this.dy -= accel;
    }
    if (keys.has("ArrowDown") || keys.has("s")) {
      this.dy += accel;
    }

    // Apply friction
    this.dx *= 0.9;
    this.dy *= 0.9;

    // Update position
    this.x += this.dx * delta;
    this.y += this.dy * delta;

    // Clamp to canvas bounds
    this.x = Math.max(0, Math.min(this.x, this.canvasWidth - this.width));
    this.y = Math.max(0, Math.min(this.y, this.canvasHeight - this.height));
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.sprite.complete) {
      ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = "#f00";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
