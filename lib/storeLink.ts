// @ts-nocheck
import { PlaylistItem } from '@/app/types/playlist';
import { VideoEntity } from '@/app/types/videos';
import { PrismaClient } from '@prisma/client';

export async function storeLink(
  data: PlaylistItem | VideoEntity,
  tags: string[],
  validation: string,
  channelDetails: {
    youtubeId: string | undefined;
    profile: string | undefined;
    banner: string | undefined;
    uploads: string | undefined;
    name: string;
  }
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
  const url = data.snippet.title.replaceAll(/\s/g, '_');

  try {
    // if url already exists then return old url
    const prisma = new PrismaClient();
    const videoExists = await prisma.videos.findUnique({
      where: {
        url_creatorId: {
          url: url,
          creatorId: channelDetails.youtubeId as string,
        },
      },
    });
    if (videoExists) {
      return videoExists.creatorId.slice(1) + '/' + videoExists.url;
    }

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
    // console.log('Upload successful:', result);

    const cid = result.IpfsHash;

    // const resp = await prisma.creator.create({
    //     data: {
    //         name: channelDetails.name as string,
    //         youtubeId: channelDetails.youtubeId as string,
    //     }
    // })

    // console.log('channel details: ', channelDetails)
    const creator = await prisma.creator.findUnique({
      where: {
        youtubeId: channelDetails.youtubeId,
      },
    });
    // console.log(creator);
    if (!creator) {
      await prisma.creator.create({
        data: {
          name: channelDetails.name as string,
          youtubeId: channelDetails.youtubeId as string,
        },
      });
    }

    const video = await prisma.videos.create({
      data: {
        cid: cid,
        url: url,
        creatorId: channelDetails.youtubeId,
      },
    });
    console.log(video);

    return video.creatorId.slice(1) + '/' + video.url;
    // Pinata returns the CID in IpfsHash
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
