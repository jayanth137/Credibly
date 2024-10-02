// app/api/youtube/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
    const accessToken = request.headers.get('Authorization')?.split(' ')[1]; // Get the access token from the headers

    if (!accessToken) {
        return NextResponse.json({ error: 'No access token provided' }, { status: 401 });
    }

    try {
        const response = await fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&mine=true', {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Use the access token to authenticate the request
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        return NextResponse.json(data.items); // Return the fetched video items
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    <iframe width="725" height="408" src="https://www.youtube.com/embed/x88IXGWoJNU" title="tired of naming vids" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
}
