import { Playlist } from '@/app/types/playlist';
import { Video } from '@/app/types/videos';
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const accessToken = request.headers.get('Authorization')?.split(' ')[1];
    if (!accessToken) {
        return NextResponse.json({ error: 'No access token provided' }, { status: 401 });
    }

    try {
        // const uploads = await getUploadsId(accessToken)
        const channelDetails = await getChannelDetails(accessToken)
        const videos = await getUploadedVideos(channelDetails.uploads)
        const playlists = await getPlaylists(accessToken)

        return NextResponse.json({
            videos: videos,
            playlists: playlists,
            channelDetails: channelDetails,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// async function getUploadsId(accessToken: string) {
//     const resp = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=${process.env.NEXT_PUBLIC_YOUTUBE_API}`, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//     })
//     const data = await resp.json()
//     // console.log(JSON.stringify(data))
//     if (data.error) {
//         throw new Error(data.error.message)
//     }
//     const validData: Channel = data
//     const uploadPlaylist = validData.items[0].contentDetails.relatedPlaylists.uploads
//     return uploadPlaylist
// }

async function getUploadedVideos(playlistId: string) {
    // console.log("playlistId = " + playlistId)
    const resp = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${process.env.NEXT_PUBLIC_YOUTUBE_API}`)

    const data = await resp.json()
    // console.log(data)
    if (data.error) {
        throw new Error("Either you have no public videos or your channel is not accessible.")
    }
    const validData: Video = data
    return validData.items
}

async function getPlaylists(accessToken: string) {
    const resp = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&key=${process.env.NEXT_PUBLIC_YOUTUBE_API}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    const data = await resp.json()
    // console.log(JSON.stringify(data))
    if (data.error) {
        throw new Error(data.error.message)
    }
    const validData: Playlist = data
    const uploadPlaylist = validData.items
    return uploadPlaylist
}

async function getChannelDetails(accessToken: string) {

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
                banner: response.data.items[0].brandingSettings?.image?.bannerExternalUrl,
                uploads: response.data.items[0].contentDetails?.relatedPlaylists?.uploads,
                name: response.data.items[0].snippet?.title
            }
        }
        return ans;
    } catch (error: any) {
        throw new Error(error.msg)
    }
}