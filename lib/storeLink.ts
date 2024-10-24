// @ts-nocheck
import { PlaylistItem } from '@/app/types/playlist';
import { VideoEntity } from '@/app/types/videos';
import { PrismaClient } from '@prisma/client';
import { json } from 'stream/consumers';

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
        videoId: jsonData.videoId,
        url: url,
        description: jsonData.description,
        tags: jsonData.tags,
        title: jsonData.title,
        thumbnail: jsonData.thumbnail,
        validation: jsonData.validation,
        type: jsonData.type,
        creatorId: channelDetails.youtubeId,
      },
    });
    // console.log(video);

    return video.creatorId.slice(1) + '/' + video.url;
    // Pinata returns the CID in IpfsHash
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
