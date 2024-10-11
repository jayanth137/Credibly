'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Wallet, Plus, Play } from "lucide-react"
import { Video, VideoEntity } from '../types/videos'
import { PlaylistItem } from '../types/playlist'
import { signOut, useSession } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { setDataFromPlaylist, setDataFromVideo, setLink } from '@/redux/features/dataSlice'
import { storeLink } from '@/lib/storeLink'
import Lottie from 'react-lottie'
import Image from 'next/image'

function Create({ setCreated }) {

    const [data, setData] = useState<{
        videos: VideoEntity[],
        playlists: PlaylistItem[]
    } | undefined>()
    const [error, setError] = useState<string>()
    const [category, setCategory] = useState<'playlists' | 'videos'>('videos')
    const { data: session, status } = useSession();
    const [selected, setSelected] = useState<VideoEntity | PlaylistItem>()
    const [tags, setTags] = useState<string[]>([])
    const [tagsString, setTagsString] = useState<string>('')
    const dispatch = useAppDispatch()
    const selector = useAppSelector(state => state.data)

    useEffect(() => {
        // console.log(session.accessTok)
        if (session && status === 'authenticated') {
            console.log(session)
            fetchData()
        }
    }, [session, status]);

    useEffect(() => {
        setSelected(undefined)
    }, [category])
    // useEffect(() => {
    //     console.log(selected)
    // }, [selected])
    async function fetchData() {
        const resp = await fetch('/api/youtube/getVideos', {
            headers: {
                Authorization: `Bearer ${(session as any).accessToken}`,
            },
        })
        if (resp.status == 500) {
            signOut({
                callbackUrl: '/',
            })
        }
        const respJson = await resp.json()
        if (respJson.error) {
            setError(respJson.error)
        }
        else {
            setData(respJson)
            // console.log(resp.jso)
            // setSelected(respJson.videos[0])
        }
        // console.log(data)
    }
    if (!data) {

        return <div className='h-screen w-full flex items-center justify-center text-white flex-col gap-5 text-center'>
            <Lottie options={{
                animationData: require('@/public/Loader.json'),
                loop: true,
                autoplay: true,
            }}
                height={200}
                width={200}
            />
            <h1 className='font-bold text-xl'>Awesome content is Loading...</h1>
        </div>
    }
    async function submitForm() {
        console.log(selected)
        if (category == 'playlists') {
            dispatch(setDataFromPlaylist({ playlist: selected, tags: tags }))
        }
        else {
            dispatch(setDataFromVideo({ video: selected, tags: tags }))
        }
        console.log(selector)
        try {
            const response = await fetch('/api/getLink/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: selected, tags: tags, validation: 'quiz' }),
            });
            console.log(response)
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            console.log('New Link CUID:', result.cuid);
            dispatch(setLink(result.cuid))
            setCreated(true)
            return result.cuid;
        } catch (error) {
            console.log('Failed to save link:', error);
        }
    }

    return (
        <main className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#2a2b5b]/30 backdrop-blur-sm p-6 rounded-lg space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Select Category</h2>
                        <p className='text-red-500 my-4'>DISCLAIMER: PLEASE ENSURE THAT YOU HAVE TRANSCRIPTS FOR THE VIDEO WHICH YOU SELECT OTHERWISE WE COULD NOT GENERATE QUESTIONS FOR THE QUIZ.</p>
                        <p className="text-gray-300 mb-4">Do you want to create certification for a playlist or a video?</p>
                        <RadioGroup defaultValue="videos" onValueChange={setCategory} className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="videos" id="video" className="text-purple-400" />
                                <Label htmlFor="video">Video</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="playlists" id="playlist" className="text-purple-400" />
                                <Label htmlFor="playlist">Playlist</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <Label htmlFor="select-video">Select {category}</Label>
                        {
                            category == 'playlists' &&
                            <Select onValueChange={(val) => {
                                setSelected(data.playlists[parseInt(val)])
                                console.log(selected)
                            }}>
                                <SelectTrigger className="w-full mt-1 bg-[#3a3b6b]/50 border-[#4a4b7b]">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent >
                                    {
                                        category == 'playlists' &&
                                        data?.playlists.map((item, idx) => {
                                            return <SelectItem key={idx} value={idx.toString()} >{item.snippet.title}</SelectItem>
                                        })
                                    }
                                </SelectContent>
                            </Select>
                        }
                        {
                            category == 'videos' &&
                            <Select onValueChange={(val) => {
                                const value = parseInt(val)
                                console.log(value)
                                console.log(data.videos[value])
                                setSelected(data.videos[value])
                                console.log(selected)
                            }}>
                                <SelectTrigger className="w-full mt-1 bg-[#3a3b6b]/50 border-[#4a4b7b]">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent >
                                    {
                                        category == 'videos' &&
                                        data?.videos.map((item, idx) => {
                                            return <SelectItem key={idx} value={idx.toString()} >{item.snippet.title}</SelectItem>
                                        })
                                    }
                                </SelectContent>
                            </Select>
                        }
                        {/* <Select onValueChange={(val) => {
                            const value = parseInt(val)
                            const selectedValue = data[category][value]
                            console.log(selectedValue)
                            console.log(selectedValue)
                            setSelected(selectedValue)
                            console.log(selected)
                        }}>
                            <SelectTrigger className="w-full mt-1 bg-[#3a3b6b]/50 border-[#4a4b7b]">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent >
                                {
                                    data &&
                                    data[category].map((item, idx) => {
                                        return <SelectItem key={idx} value={idx.toString()} >{item.snippet.title}</SelectItem>
                                    })
                                }
                            </SelectContent>
                        </Select> */}
                    </div>
                    <div>
                        <Label htmlFor="title">Enter Title</Label>
                        <Input id="title" placeholder="Enter ..." className="mt-1 bg-[#3a3b6b]/50 border-[#4a4b7b]" value={selected?.snippet.title} onChange={(val) => setSelected((prev) => {
                            return { ...prev, snippet: { ...prev.snippet, title: val.target.value } }
                        })} />
                    </div>
                    <div>
                        <Label htmlFor="description">Enter Description</Label>
                        <Textarea value={selected?.snippet.description} onChange={(val) => setSelected((prev) => {
                            return { ...prev, snippet: { ...prev.snippet, description: val.target.value } }
                        })} id="description" placeholder="Enter ..." className="mt-1 bg-[#3a3b6b]/50 border-[#4a4b7b]" />
                    </div>
                    <div>
                        <Label>Add Tags</Label>
                        <div className="flex items-center space-x-2 mt-1">
                            {/* <Button variant="outline" size="icon" className="bg-[#3a3b6b]/50 border-[#4a4b7b] hover:bg-[#4a4b7b]/50">
                                <Plus className="h-4 w-4" />
                            </Button> */}
                            <Input value={tagsString} onChange={(val) => {
                                const newTags = val.target.value.split(' ').filter(tag => tag.trim() !== '')
                                setTags(newTags)
                                setTagsString(val.target.value)
                            }} placeholder="Enter tags separated by space" className="flex-grow bg-[#3a3b6b]/50 border-[#4a4b7b]" />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="select-video" className='mt-5'>Select Validation Type</Label>
                        <Select>
                            <SelectTrigger className="w-full mt-1 bg-[#3a3b6b]/50 border-[#4a4b7b]">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="quiz">Quiz</SelectItem>
                                <SelectItem value="github" disabled>Github Extraction{" (coming soon)"}</SelectItem>
                                <SelectItem value="p2p" disabled>Peer to Peer{" (coming soon)"}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="bg-[#2a2b5b]/30 backdrop-blur-sm p-6 rounded-lg space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">{selected?.snippet.title}</h2>
                        <div className="relative aspect-video bg-[#3a3b6b] rounded-lg overflow-hidden">
                            <img
                                src={selected ? selected.snippet.thumbnails.high.url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3zZp15odxBOqO5n9rTcpSViEJSnQ3Pufegg&s'}
                                alt="Video thumbnail"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* <Button variant="outline" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                                    <Play className="h-6 w-6" />
                                </Button> */}
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-300">{selected?.snippet.description}</p>
                    <div>
                        <Label>Tags:</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {/* <Button variant="outline" className="rounded-full bg-[#3a3b6b]/50 border-[#4a4b7b] hover:bg-[#4a4b7b]/50">Tag 1</Button>
                            <Button variant="outline" className="rounded-full bg-[#3a3b6b]/50 border-[#4a4b7b] hover:bg-[#4a4b7b]/50">Tag 2</Button> */}
                            {
                                tags.map((tag, idx) => {
                                    return <Button key={idx} variant="outline" className="rounded-full bg-[#3a3b6b]/50 border-[#4a4b7b] hover:bg-[#4a4b7b]/50">{tag}</Button>
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <Label>Validation Type : Quiz based</Label>
                    </div>
                    <Button onClick={submitForm} className="w-full bg-white text-[#1a1b3b] hover:bg-gray-200">Create Course</Button>
                    <p className="text-center text-sm text-gray-300">By Credibly</p>
                </div>
            </div>
        </main>
    )
}

export default Create