import { NextResponse } from 'next/server';
import { storeLink } from '@/lib/storeLink'; // Adjust the import based on your file structure
import { PlaylistItem } from "@/app/types/playlist";
import { VideoEntity } from "@/app/types/videos";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { data, tags, validation } = body;
        console.log(data);
        if (!data || !validation || !tags || !Array.isArray(tags)) {
            return NextResponse.json({ error: 'Invalid data or tags' }, { status: 400 });
        }

        const newLink = await storeLink(data as PlaylistItem | VideoEntity, tags, validation);

        return NextResponse.json({ cuid: newLink.id }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
