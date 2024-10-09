import { PlaylistItem } from "@/app/types/playlist";
import { VideoEntity } from "@/app/types/videos";
import { PrismaClient } from '@prisma/client'

export async function storeLink(data: PlaylistItem | VideoEntity, tags: string[], validation: string) {
    const title = data.snippet.title;
    const description = data.snippet.description;
    const author = data.snippet.channelTitle

    const thumbnail = data.snippet.thumbnails.high.url
    const prisma = new PrismaClient()

    const newLink = await prisma.links.create({
        data: {
            // id: cuid(), 
            title,
            description,
            author,
            tags: tags,
            thumbnail: thumbnail,
            validation: validation,
        },
    });

    return newLink;
}