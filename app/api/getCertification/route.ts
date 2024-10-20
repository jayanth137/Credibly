import { NextResponse } from 'next/server';
import { storeLink } from '@/lib/storeLink'; // Adjust the import based on your file structure
import { PlaylistItem } from "@/app/types/playlist";
import { VideoEntity } from "@/app/types/videos";
import { getCertification } from '@/lib/getCertification';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { cuid } = body;
        console.log(cuid);
        if (!cuid) {
            return NextResponse.json({ error: 'Cuid not provided' }, { status: 400 });
        }

        const courseDetails = await getCertification(cuid)
        if (courseDetails == null) {
            return NextResponse.json({ error: "Invalid link" }, { status: 404 });
        }

        return NextResponse.json(courseDetails, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
