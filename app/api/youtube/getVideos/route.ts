import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const accessToken = request.headers.get('Authorization')?.split(' ')[1];
    if (!accessToken) {
        return NextResponse.json({ error: 'No access token provided' }, { status: 401 });
    }

    try {
        const uploads = await getPlaylistId(accessToken)
        const videos = await getPlaylistVideos(uploads)

        return NextResponse.json(videos);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

async function getPlaylistId(accessToken: string) {
    const resp = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=${process.env.NEXT_PUBLIC_YOUTUBE_API}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    const data = await resp.json()
    // console.log(JSON.stringify(data))
    if (data.error) {
        throw new Error(data.error.message)
    }
    const uploadPlaylist = data.items[0].contentDetails.relatedPlaylists.uploads
    return uploadPlaylist
}

async function getPlaylistVideos(playlistId: string) {
    // console.log("playlistId = " + playlistId)
    const resp = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${process.env.NEXT_PUBLIC_YOUTUBE_API}`)

    const data = await resp.json()
    // console.log(data)
    if (data.error) {
        throw new Error(JSON.stringify({ error: true, msg: "Either you have no public videos or your channel is not accessible." }))
    }
    return data.items
}
