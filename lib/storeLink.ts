import { PlaylistItem } from "@/app/types/playlist";
import { VideoEntity } from "@/app/types/videos";
import { PrismaClient } from '@prisma/client'
import { pinata } from "@/utils/config";

export async function storeLink(data: PlaylistItem | VideoEntity, tags: string[], validation: string) {
    const title = data.snippet.title;
    const description = data.snippet.description;
    const author = data.snippet.channelTitle
    let itemtype: "playlist" | "video" = data.kind == "youtube#playlist" ? "playlist" : "video"
    let videoId = itemtype == "playlist" ? (data as PlaylistItem).id : (data as VideoEntity).snippet.resourceId.videoId

    const thumbnail = data.snippet.thumbnails.high.url
    // const prisma = new PrismaClient()

    // const newLink = await prisma.links.create({
    //     data: {
    //         // id: cuid(), 
    //         title,
    //         description,
    //         author,
    //         tags: tags,
    //         thumbnail: thumbnail,
    //         validation: validation,
    //         videoId: videoId,
    //         type: itemtype
    //     },
    // });

    const uploadData = await pinata.upload.json({
        title: title,
        description: description,
        author: author,
        tags: tags,
        thumbnail: thumbnail,
        validation: validation,
        videoId: videoId,
        type: itemtype
    }, {
        metadata: {
            name: videoId
        }
    })
    console.log(uploadData)

    return uploadData.cid;
}