import { google } from "googleapis";

export async function getOAuth2Client() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.YT_CLIENT_ID,
    process.env.YT_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.YT_REFRESH_TOKEN,
  });

  // Refresh access token
  await oauth2Client.getAccessToken();
  return oauth2Client;
}
