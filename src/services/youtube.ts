import { google } from "googleapis";
import * as key from "./youtube_key.json";

const youtubeService = google.youtube('v3');

export async function getChannel() {
  const auth = new google.auth.JWT(
    key.client_email,
    undefined,
    key.private_key,
    "https://www.googleapis.com/auth/youtube.readonly",
    undefined,
  );
  const credential = await auth.authorize();
  console.log(credential);

  const res = await youtubeService.channels.list({
    auth,
    part: ["snippet,contentDetails,statistics"],
    id: ["UCnrvn64IsKNr69ep-yFjhwA"],
  });

  return res.data.items![0]!;
}