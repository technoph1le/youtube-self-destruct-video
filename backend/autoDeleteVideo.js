import "dotenv/config";
import fs from "fs/promises";
import { google } from "googleapis";

const CLIENT_ID = process.env.YT_CLIENT_ID;
const CLIENT_SECRET = process.env.YT_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.YT_REFRESH_TOKEN;
const VIDEO_ID = process.env.YT_VIDEO_ID;
const CHANNEL_ID = process.env.YT_CHANNEL_ID;
const TARGET_HOURS = 4000;

// ---- OAuth setup ----
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "http://localhost:3000/oauth2callback"
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const youtubeAnalytics = google.youtubeAnalytics("v2");
const youtube = google.youtube("v3");

function getFormattedDate(date) {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}

async function getWatchTimeHours() {
  const startDate = "2020-12-28"; // channel start
  const endDate = getFormattedDate(new Date()); // today

  console.log(`📅 Checking from ${startDate} to ${endDate}`);

  const res = await youtubeAnalytics.reports.query({
    auth: oauth2Client,
    ids: `channel==${CHANNEL_ID}`,
    metrics: "estimatedMinutesWatched",
    startDate,
    endDate,
  });

  const minutes = res.data.rows?.[0]?.[0] || 0;
  const hours = (minutes / 60).toFixed(2);
  console.log(`📊 Lifetime watch time: ${hours} hours.`);

  return hours;
}

async function saveAnalyticsJson(watchHours, isDeleted) {
  const data = {
    watchHours: Number(watchHours),
    targetHours: TARGET_HOURS,
    isVideoDeleted: isDeleted,
    lastChecked: new Date().toISOString(),
  };
  await fs.writeFile(
    "../frontend/public/analytics.json",
    JSON.stringify(data, null, 2)
  );
  console.log("✅ analytics.json updated");
}

async function deleteIfWatchTimeMet() {
  const hours = await getWatchTimeHours();
  if (hours >= TARGET_HOURS) {
    console.log("🎯 Goal met! Deleting video...");
    await youtube.videos.delete({
      auth: oauth2Client,
      id: VIDEO_ID,
    });
    console.log("🧨 Video deleted!");
    await saveAnalyticsJson(hours, true);
  } else {
    console.log(
      `⏳ Not enough watch time yet. (${hours}/${TARGET_HOURS} hours)`
    );
    await saveAnalyticsJson(hours, false);
  }
}

deleteIfWatchTimeMet().catch(console.error);
