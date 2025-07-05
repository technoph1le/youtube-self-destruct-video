import fs from "fs/promises";
import path from "path";

export async function GET(request: Request) {
  const viewsPath = path.resolve("../backend/views.json");
  const file = await fs.readFile(viewsPath, "utf-8");
  const data = JSON.parse(file);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
