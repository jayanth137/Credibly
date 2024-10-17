import { NextResponse } from 'next/server';
import { storeLink } from '@/lib/storeLink'; // Adjust the import based on your file structure
import { PlaylistItem } from "@/app/types/playlist";
import { VideoEntity } from "@/app/types/videos";
import { pinata } from '@/utils/config';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { data, tags, validation, channelDetails } = body;
        // console.log(body);
        if (!data || !validation || !tags || !Array.isArray(tags)) {
            return NextResponse.json({ error: 'Invalid data or tags' }, { status: 400 });
        }


        // creating link
        const newLink = await storeLink(data as PlaylistItem | VideoEntity, tags, validation, channelDetails);

        return NextResponse.json({ cuid: newLink }, { status: 201 });
    } catch (error) {
        // console.error(error.message);
        // if(error.)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
