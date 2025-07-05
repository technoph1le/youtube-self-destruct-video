"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [views, setViews] = useState(0);
  const target = 1000000;

  useEffect(() => {
    fetch("/api/views")
      .then((res) => res.json())
      .then((data) => setViews(data.views));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">🔥 Countdown to Disappear</h1>
      <p className="mt-4 text-xl">
        This video will be removed at{" "}
        <strong>{target.toLocaleString()} views</strong>
      </p>
      <p className="mt-8 text-3xl">Current Views: {views.toLocaleString()}</p>
      <p className="mt-2 text-lg">
        {views >= target ? "✅ Gone!" : "👀 Still live"}
      </p>
    </main>
  );
}
