import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function GameContainer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = performance.now();
    const loop = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      // Clear canvas and draw placeholder background
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Simple demo: increment score over time
      setScore((s) => s + delta / 1000);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
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
