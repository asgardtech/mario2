import { Route, Routes, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GameContainer } from "@/components/GameContainer";

function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight">Mario</h1>
      <p className="text-muted-foreground max-w-prose text-center">
        a mario like game in the browser
      </p>
      <Button asChild>
        <Link to="/game">Start Game</Link>
      </Button>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<GameContainer />} />
    </Routes>
  );
}
