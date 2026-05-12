import { useEffect, useRef, useState } from "react";
import { useInput } from "../Input";
import { Player } from "../Player";

export function GameContainer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const playerRef = useRef<Player | null>(null);
  const keysRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create player instance
    playerRef.current = new Player(canvas.width, canvas.height);

    // Setup input handling
    useInput(keysRef);

    let lastTime = performance.now();
    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const p = playerRef.current;
      if (p) {
        p.update(delta, keysRef.current);
      }

      // Clear canvas and draw background
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw player
      if (p) {
        p.draw(ctx);
      }

      // Update score over time (10 points per second)
      setScore((s) => s + delta * 10);

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return () => {};
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
