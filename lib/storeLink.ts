// import { PlaylistItem } from "@/app/types/playlist";
// import { VideoEntity } from "@/app/types/videos";
// import { PrismaClient } from '@prisma/client'
// import { pinata } from "@/utils/config";

// export async function storeLink(data: PlaylistItem | VideoEntity, tags: string[], validation: string) {
//     const title = data.snippet.title;
//     const description = data.snippet.description;
//     const author = data.snippet.channelTitle
//     let itemtype: "playlist" | "video" = data.kind == "youtube#playlist" ? "playlist" : "video"
//     let videoId = itemtype == "playlist" ? (data as PlaylistItem).id : (data as VideoEntity).snippet.resourceId.videoId

//     const thumbnail = data.snippet.thumbnails.high.url
//     // const prisma = new PrismaClient()

//     // const newLink = await prisma.links.create({
//     //     data: {
//     //         // id: cuid(), 
//     //         title,
//     //         description,
//     //         author,
//     //         tags: tags,
//     //         thumbnail: thumbnail,
//     //         validation: validation,
//     //         videoId: videoId,
//     //         type: itemtype
//     //     },
//     // });

//     const uploadData = await pinata.upload.json({
//         title: title,
//         description: description,
//         author: author,
//         tags: tags,
//         thumbnail: thumbnail,
//         validation: validation,
//         videoId: videoId,
//         type: itemtype
//     }, {
//         metadata: {
//             name: videoId
//         }
//     })
//     console.log(uploadData)

//     return uploadData.cid;
// }



import { PlaylistItem } from '@/app/types/playlist';
import { VideoEntity } from '@/app/types/videos';
import { pinata } from '@/utils/config';

export async function storeLink(
    data: PlaylistItem | VideoEntity,
    tags: string[],
    validation: string
) {
    const title = data.snippet.title;
    const description = data.snippet.description;
    const author = data.snippet.channelTitle;
    let itemtype: 'playlist' | 'video' =
        data.kind == 'youtube#playlist' ? 'playlist' : 'video';
    let videoId =
        itemtype == 'playlist'
            ? (data as PlaylistItem).id
            : (data as VideoEntity).snippet.resourceId.videoId;

    const thumbnail = data.snippet.thumbnails.high.url;

    const jsonData = {
        title,
        description,
        author,
        tags,
        thumbnail,
        validation,
        videoId,
        type: itemtype,
    };

    // Prepare headers for Pinata API
    const pinataApiKey = '73c879f180b698a69faa';
    const pinataSecretApiKey =
        '0a8396a79ee46480d58adb68a8e6aa202fa8ed27e9795a9a5527e0e26d8b8ed0';

    const headers = {
        'Content-Type': 'application/json',
        pinata_api_key: pinataApiKey!,
        pinata_secret_api_key: pinataSecretApiKey!,
    };

    try {
        // Make a POST request directly to Pinata's JSON upload endpoint
        const response = await fetch(
            'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(jsonData),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to upload data to Pinata');
        }

        const result = await response.json();
        console.log('Upload successful:', result);

        const cid = result.IpfsHash;

        return cid;
        // Pinata returns the CID in IpfsHash
    } catch (error) {
        console.error('Error uploading to Pinata:', error);
        throw new Error('Failed to upload data to Pinata');
    }
}