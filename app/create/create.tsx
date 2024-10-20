// @ts-nocheck
'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic for Lottie
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Wallet, Plus, Play } from 'lucide-react';
import { Video, VideoEntity } from '../types/videos';
import { PlaylistItem } from '../types/playlist';
import { signOut, useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import {
  setDataFromPlaylist,
  setDataFromVideo,
  setLink,
} from '@/redux/features/dataSlice';
import { storeLink } from '@/lib/storeLink';
import Lottie from 'react-lottie'; // Importing here will be handled dynamically
import Image from 'next/image';

// Load Lottie dynamically
const DynamicLottie = dynamic(() => import('react-lottie'), { ssr: false });

function Create({
  setCreated,
}: {
  setCreated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [data, setData] = useState<VideoEntity[] | undefined>();
  const [error, setError] = useState<string>();
  const [category, setCategory] = useState<'playlists' | 'videos'>('videos');
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState<VideoEntity | PlaylistItem>();
  const [tags, setTags] = useState<string[]>([]);
  const [tagsString, setTagsString] = useState<string>('');
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.data);

  useEffect(() => {
    if (session && status === 'authenticated') {
      fetchData();
    }
  }, [session, status]);

  useEffect(() => {
    setSelected(undefined);
  }, [category]);

  async function fetchData() {
    const resp = await fetch('/api/youtube/getVideos', {
      headers: {
        Authorization: `Bearer ${(session as any).accessToken}`,
      },
    });
    if (resp.status == 500) {
      signOut({
        callbackUrl: '/',
      });
    }
    const respJson = await resp.json();
    if (respJson.error) {
      setError(respJson.error);
    } else {
      setData(respJson);
    }
  }

  if (!data) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-white flex-col gap-5 text-center">
        <DynamicLottie
          options={{
            animationData: require('@/public/Loader.json'),
            loop: true,
            autoplay: true,
          }}
          height={200}
          width={200}
        />
        <h1 className="font-bold text-xl">Awesome content is Loading...</h1>
      </div>
    );
  }

  async function submitForm() {
    if (!selected) {
      console.log('No video or playlist selected');
      return;
    }

    if (category === 'playlists') {
      dispatch(
        setDataFromPlaylist({ playlist: selected as PlaylistItem, tags: tags })
      );
    } else {
      dispatch(
        setDataFromVideo({ video: selected as VideoEntity, tags: tags })
      );
    }

    try {
      const response = await fetch('/api/getLink/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: selected,
          tags: tags,
          validation: 'quiz',
          channelDetails: data?.channelDetails,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      dispatch(setLink(result.cuid));
      setCreated(true);
      return result.cuid;
    } catch (error) {
      console.log('Failed to save link:', error);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#2a2b5b]/30 backdrop-blur-sm p-6 rounded-lg space-y-6">
          {/* Category Selection */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Select Category</h2>
            <p className="text-red-500 my-4">
              DISCLAIMER: PLEASE ENSURE THAT YOU HAVE TRANSCRIPTS FOR THE VIDEO
              WHICH YOU SELECT OTHERWISE WE COULD NOT GENERATE QUESTIONS FOR THE
              QUIZ.
            </p>
            <p className="text-gray-300 mb-4">
              Do you want to create certification for a playlist or a video?
            </p>
            <RadioGroup
              defaultValue="videos"
              onValueChange={setCategory}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="videos"
                  id="video"
                  className="text-purple-400"
                />
                <Label htmlFor="video">Video</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="playlists"
                  id="playlist"
                  className="text-purple-400"
                />
                <Label htmlFor="playlist">Playlist</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Select Video or Playlist */}
          <div>
            <Label htmlFor="select-video">Select {category}</Label>
            {category === 'playlists' && (
              <Select
                onValueChange={(val) => {
                  setSelected(data.playlists[parseInt(val)]);
                }}
              >
                <SelectTrigger className="w-full mt-1 bg-[#3a3b6b]/50 border-[#4a4b7b]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {data?.playlists.map((item, idx) => (
                    <SelectItem key={idx} value={idx.toString()}>
                      {item.snippet.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {category === 'videos' && (
              <Select
                onValueChange={(val) => {
                  const value = parseInt(val);
                  setSelected(data.videos[value]);
                }}
              >
                <SelectTrigger className="w-full mt-1 bg-[#3a3b6b]/50 border-[#4a4b7b]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {data?.videos.map((item, idx) => (
                    <SelectItem key={idx} value={idx.toString()}>
                      {item.snippet.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Title and Description */}
          <div>
            <Label htmlFor="title">Enter Title</Label>
            <Input
              id="title"
              placeholder="Enter ..."
              className="mt-1 bg-[#3a3b6b]/50 border-[#4a4b7b]"
              value={selected?.snippet.title}
              onChange={(val) =>
                setSelected((prev) => ({
                  ...prev,
                  snippet: { ...prev.snippet, title: val.target.value },
                }))
              }
            />
          </div>
          <div>
            <Label htmlFor="description">Enter Description</Label>
            <Textarea
              value={selected?.snippet.description}
              onChange={(val) =>
                setSelected((prev) => ({
                  ...prev,
                  snippet: { ...prev.snippet, description: val.target.value },
                }))
              }
              id="description"
              placeholder="Enter ..."
              className="mt-1 bg-[#3a3b6b]/50 border-[#4a4b7b]"
            />
          </div>

          {/* Tags */}
          <div>
            <Label>Add Tags</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Input
                value={tagsString}
                onChange={(val) => {
                  const newTags = val.target.value
                    .split(' ')
                    .filter((tag) => tag.trim() !== '');
                  setTags(newTags);
                  setTagsString(val.target.value);
                }}
                placeholder="Enter tags separated by space"
                className="flex-grow bg-[#3a3b6b]/50 border-[#4a4b7b]"
              />
            </div>
          </div>

          {/* Validation Type */}
          <div>
            <Label htmlFor="select-video" className="mt-5">
              Select Validation Type
            </Label>
            <Select>
              <SelectTrigger className="w-full mt-1 bg-[#3a3b6b]/50 border-[#4a4b7b]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="discussion">Discussion</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={submitForm} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Generate Link
          </Button>
        </div>
        <div className="bg-[#2a2b5b]/30 backdrop-blur-sm p-6 rounded-lg space-y-6 text-center">
          <h1 className="text-2xl font-bold">Upload Your content!</h1>
          <Image
            src="/images/Teacher.gif"
            alt="teacher-gif"
            width={350}
            height={350}
            className="mx-auto"
          />
          <div className="flex justify-center">
            <Wallet className="h-12 w-12 text-purple-300" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Create;
