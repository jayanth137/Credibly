import { Playlist } from '@/app/types/playlist';
import { Video } from '@/app/types/videos';
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis'

export async function GET(request: NextRequest) {
    const accessToken = request.headers.get('Authorization')?.split(' ')[1];
    if (!accessToken) {
        return NextResponse.json({ error: 'No access token provided' }, { status: 401 });
    }

    const youtube = google.youtube({
        version: 'v3',
        auth: process.env.NEXT_PUBLIC_YOUTUBE_API,
    })
    try {
        const response = await youtube.channels.list({
            mine: true,
            part: ['contentDetails', 'snippet', 'brandingSettings'],
            access_token: accessToken
        })
        let ans
        if (response.data.items && response.data.items.length >= 0) {
            ans = {
                youtubeId: response.data.items[0].snippet?.customUrl,
                profile: response.data.items[0].snippet?.thumbnails?.high?.url,
                banner: response.data.items[0].brandingSettings?.image?.bannerExternalUrl
            }
        }
        return NextResponse.json(ans);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

