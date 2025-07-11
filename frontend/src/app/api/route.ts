import fs from "fs/promises";
import path from "path";

export async function GET() {
  const viewsPath = path.resolve("../backend/analytics.json");
  const file = await fs.readFile(viewsPath, "utf-8");
  const data = JSON.parse(file);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
