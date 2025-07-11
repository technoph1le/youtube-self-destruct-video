"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [watchHours, setWatchHours] = useState(0);
  const target = 1000000;

  useEffect(() => {
    fetch("/analytics.json")
      .then((res) => res.json())
      .then((data) => setWatchHours(data.watchHours));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">🔥 Countdown to Disappear</h1>
      <p className="mt-4 text-xl">
        This video will be removed at{" "}
        <strong>{target.toLocaleString()} watchHours</strong>
      </p>
      <p className="mt-8 text-3xl">
        Current watchHours: {watchHours.toLocaleString()}
      </p>
      <p className="mt-2 text-lg">
        {watchHours >= target ? "✅ Gone!" : "👀 Still live"}
      </p>
    </main>
  );
}
