import { NextResponse } from 'next/server';
import { storeLink } from '@/lib/storeLink'; // Adjust the import based on your file structure
import { PlaylistItem } from '@/app/types/playlist';
import { VideoEntity } from '@/app/types/videos';
import { pinata } from '@/utils/config';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, tags, validation, channelDetails } = body;

    // Validate the request body
    if (!data || !validation || !tags || !Array.isArray(tags)) {
      return NextResponse.json(
        { error: 'Invalid data or tags' },
        { status: 400 }
      );
    }

    // Create the new link
    const newLink = await storeLink(
      data as PlaylistItem | VideoEntity,
      tags,
      validation,
      channelDetails
    );

    return NextResponse.json({ cuid: newLink }, { status: 201 });
  } catch (error) {
    // Narrowing the error type
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
}
