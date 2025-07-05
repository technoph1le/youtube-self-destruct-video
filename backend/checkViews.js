import { google } from "googleapis";
import fs from "fs/promises";
import path from "path";
import { getOAuth2Client } from "./oauth2.js";
import config from "./config.json" assert { type: "json" };

const viewsPath = path.resolve("./views.json");

async function checkAndUpdate() {
  const auth = await getOAuth2Client();
  const youtube = google.youtube("v3");

  const res = await youtube.videos.list({
    auth,
    part: "statistics",
    id: config.videoId,
  });

  const views = parseInt(res.data.items[0].statistics.viewCount);
  console.log(`[${new Date().toISOString()}] Views: ${views}`);

  // Update views.json
  await fs.writeFile(viewsPath, JSON.stringify({ views }, null, 2));

  if (views >= config.targetViews) {
    if (config.mode === "private") {
      await youtube.videos.update({
        auth,
        part: "status",
        requestBody: {
          id: config.videoId,
          status: { privacyStatus: "private" },
        },
      });
    } else if (config.mode === "delete") {
      await youtube.videos.delete({ auth, id: config.videoId });
    }
    console.log(`🎯 Target hit. Video is now ${config.mode}d.`);
  }
}

checkAndUpdate().catch(console.error);
