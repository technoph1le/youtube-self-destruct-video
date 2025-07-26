# YouTube Self-Destruct Video

This YouTube video will be deleted once the channel reaches 4000 watch hours. Why 4000? Well, it's just a random number and no, it has nothing to do with monetization xD.

![YouTube thumbnail](/thumbnail.png)

<div>
<a href="https://www.youtube.com/watch?v=n_9akba9up8" target="_blank">
  <img src="https://img.shields.io/static/v1?label=&message=Watch%20on%20YouTube&labelColor=FFFFFF&color=FF0000&style=for-the-badge&logo=youtube&logoColor=FF0000" alt="Watch on YouTube">
</a>
<div>

## How I did it?

The main script is located in the `/backend/autoDeleteVideo.js` file. We first need access to the YouTube Analytics API to check the channel's watch hours and YouTube Data API to authenticate and delete the video on my channel.

Also, I've set up GitHub Actions that does all of it for me once every 3 days. What about authenticating? Well, it's thanks to this file: `/backend/getRefreshToken.js`. It's only run once to sign in with the account and get the refresh token manually and then you don't need that file anymore. Because, we only care about the refresh token for this line of code for automatic authentication:

```js
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
```

Once the GitHub Actions have run, it'll also generate a JSON file in the `/frontend/analytics.json` folder, which I've used to set up a small [landing page](https://youtube-self-destruct-video.vercel.app/) to show the data.

Here's a couple of useful resources if you want to dive deeper:

- [YouTube Data API for videos](https://developers.google.com/youtube/v3/docs/videos)
- [YouTube Analytics API](https://developers.google.com/youtube/analytics/reference)

## Some TODO works

- [x] Make a YouTube video, duh
- [x] Fix the frontend
- [x] Add a proper README
