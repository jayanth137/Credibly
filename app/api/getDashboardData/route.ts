// @ts-nocheck

import { Playlist } from '@/app/types/playlist';
import { Video } from '@/app/types/videos';
import { fetchFromPinata } from '@/lib/fetchFromPinata';
import { getCoursesByCreator } from '@/lib/getCoursesByCreator';
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

interface Course {
  cid: string; // Add other properties if needed
}

export async function GET(request: NextRequest) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  // console.log(request.headers)
  if (!accessToken) {
    return NextResponse.json(
      { error: 'No access token provided' },
      { status: 401 }
    );
  }

  try {
    // const uploads = await getUploadsId(accessToken)
    const channelDetails = await getChannelDetails(accessToken);
    const courses = await getCoursesByCreator(
      channelDetails?.youtubeId as string
    );
    let courseData = await Promise.all(
      courses.map(async (item: Course) => {
        const data = await fetchFromPinata(item.cid);
        return data;
      })
    );
    // const videos = await getUploadedVideos(channelDetails.uploads)
    // const playlists = await getPlaylists(accessToken)

    return NextResponse.json({
      courseData: courseData,
      channelDetails: channelDetails,
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
