import "dotenv/config";
import { google } from "googleapis";
import open from "open";
import express from "express";

const CLIENT_ID = process.env.YT_CLIENT_ID;
const CLIENT_SECRET = process.env.YT_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/oauth2callback";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const app = express();

app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  res.send("✅ Refresh token received! You can close this tab.");
  console.log("\nYour Refresh Token:", tokens.refresh_token);

  server.close(); // Shut down the server after receiving token
});

// Step 1: Launch browser to login
const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: [
    "https://www.googleapis.com/auth/yt-analytics.readonly",
    "https://www.googleapis.com/auth/youtube.force-ssl",
  ],
});

const server = app.listen(3000, () => {
  console.log("\n🔗 Opening browser for authorization...\n");
  open(authUrl);
});
