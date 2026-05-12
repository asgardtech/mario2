import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Basic player model
interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
}

export function GameContainer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const playerRef = useRef<Player | null>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const speed = 200; // pixels per second

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize player in the center
    playerRef.current = {
      x: canvas.width / 2 - 15,
      y: canvas.height / 2 - 15,
      width: 30,
      height: 30,
      dx: 0,
      dy: 0,
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    let lastTime = performance.now();
    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000; // convert to seconds
      lastTime = time;

      // Update player velocity based on keys
      const p = playerRef.current;
      if (p) {
        const accel = speed;
        if (keysRef.current.has("ArrowLeft") || keysRef.current.has("a")) {
          p.dx -= accel;
        }
        if (keysRef.current.has("ArrowRight") || keysRef.current.has("d")) {
          p.dx += accel;
        }
        if (keysRef.current.has("ArrowUp") || keysRef.current.has("w")) {
          p.dy -= accel;
        }
        if (keysRef.current.has("ArrowDown") || keysRef.current.has("s")) {
          p.dy += accel;
        }

        // Apply simple friction
        p.dx *= 0.9;
        p.dy *= 0.9;

        // Update position
        p.x += p.dx * delta;
        p.y += p.dy * delta;

        // Clamp to canvas bounds
        p.x = Math.max(0, Math.min(p.x, canvas.width - p.width));
        p.y = Math.max(0, Math.min(p.y, canvas.height - p.height));
      }

      // Clear canvas and draw background
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw player
      if (p) {
        ctx.fillStyle = "#f00";
        ctx.fillRect(p.x, p.y, p.width, p.height);
      }

      // Update score over time
      setScore((s) => s + delta * 10);

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      <canvas ref={canvasRef} width={800} height={600} className="bg-black" />
      <div className="absolute top-0 left-0 p-2 text-white flex">
        <span>Score: {score.toFixed(0)}</span>
        <span className="ml-4">Lives: {lives}</span>
      </div>
    </div>
  );
}
