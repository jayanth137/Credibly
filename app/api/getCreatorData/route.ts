import { Playlist } from '@/app/types/playlist';
import { Video } from '@/app/types/videos';
import { fetchChannelDescription } from '@/lib/channelDescription';
import { fetchFromPinata } from '@/lib/fetchFromPinata';
import { getCoursesByCreator } from '@/lib/getCoursesByCreator';
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  // // console.log(request.headers)
  const body = await request.json();
  let { youtubeId }: { youtubeId: string } = body;
  // console.log(body);
  if (!youtubeId) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  youtubeId = '@' + youtubeId;
  try {
    // const uploads = await getUploadsId(accessToken)
    // const channelDetails = await getChannelDetails(accessToken)
    const courses: Array<{ cid: string }> = await getCoursesByCreator(
      youtubeId
    );
    let courseData = await Promise.all(
      courses.map(async (item: { cid: string }) => {
        const data = await fetchFromPinata(item.cid);
        return data;
      })
    );

    const description = await fetchChannelDescription(youtubeId);
    // const videos = await getUploadedVideos(channelDetails.uploads)
    // const playlists = await getPlaylists(accessToken)

    return NextResponse.json({
      courseData: courseData,
      channelDetails: description,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function getChannelDetails(accessToken: string) {
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.NEXT_PUBLIC_YOUTUBE_API,
  });
  try {
    const response = await youtube.channels.list({
      mine: true,
      part: ['contentDetails', 'snippet', 'brandingSettings'],
      access_token: accessToken,
    });
    let ans;
    if (response.data.items && response.data.items.length >= 0) {
      ans = {
        youtubeId: response.data.items[0].snippet?.customUrl,
        profile: response.data.items[0].snippet?.thumbnails?.high?.url,
        banner:
          response.data.items[0].brandingSettings?.image?.bannerExternalUrl,
        uploads:
          response.data.items[0].contentDetails?.relatedPlaylists?.uploads,
        name: response.data.items[0].snippet?.title,
        description: response.data.items[0].snippet?.description,
      };
    }
    return ans;
  } catch (error: any) {
    throw new Error(error.msg);
  }
}
