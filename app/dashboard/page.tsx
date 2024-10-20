'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ChevronDown, ExternalLink, Instagram, Linkedin, Link as LinkIcon, Twitter } from 'lucide-react'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Dynamically import the Lottie component to avoid SSR issues
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

type CourseData = {
    title: string;
    description: string;
    author: string;
    tags: string[];
    thumbnail: string;
    validation: string;
    videoId: string;
    type: string;
};

type ChannelDetails = {
    youtubeId: string;
    profile: string;
    banner: string;
    uploads: string;
    name: string;
    description: string;
};

type ResponseData = {
    courseData: CourseData[];
    channelDetails: ChannelDetails;
};

export default function Component() {
    const [data, setData] = useState<ResponseData>()
    const [error, setError] = useState<string>()
    const { data: session, status } = useSession();

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        if (session && status === 'authenticated') {
            console.log(session)
            fetchData()
        }
    }, [session, status]);

    async function fetchData() {
        const resp = await fetch('/api/getDashboardData', {
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
        } else {
            setData(respJson)
        }
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

    return (
        <div className="min-h-screen bg-[#1E1B4B] text-white">
            <main className="flex flex-col md:flex-row p-4 md:p-6 space-y-6 md:space-y-0 md:space-x-6">
                <aside className="md:w-1/3 lg:w-1/4 space-y-6">
                    <div className="relative w-48 h-48 mx-auto">
                        <Image
                            src={data.channelDetails.profile}
                            alt="Profile"
                            width={192}
                            height={192}
                            className="rounded-full"
                        />
                        <div className="absolute bottom-0 right-0 bg-[#1E1B4B] p-2 rounded-full">
                            <ExternalLink className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-sm text-center">
                        {data.channelDetails.description}
                    </p>
                    <Link href={'https://youtube.com/' + data.channelDetails.youtubeId} target='_blank' className="w-full bg-[#2D2A77] hover:bg-[#3D3A87] py-2 rounded-md flex items-center justify-center space-x-2">
                        <LinkIcon className="w-4 h-4" />
                        <span>Go to Channel</span>
                    </Link>
                    <div className="grid grid-cols-2 gap-4">
                        {[{ label: 'Courses', value: '18+' }, { label: 'Mints', value: '1800+' }].map((item, index) => (
                            <div key={index} className="bg-[#2D2A77] p-2 rounded-md text-center">
                                <div className="text-xl font-bold">{item.value}</div>
                                <div className="text-xs">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </aside>
                <section className="md:w-2/3 lg:w-3/4 space-y-6">
                    <h2 className="text-2xl font-bold">COURSES BY CREATOR</h2>
                    <div className="grid md:grid-cols-2 gap-10 m-5">
                        {data.courseData.map((item, idx) => (
                            <div key={idx} className="bg-[#2D2A77] rounded-lg overflow-hidden">
                                <div className="p-4 space-y-2">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <Image
                                        src={item.thumbnail}
                                        alt="Course thumbnail"
                                        width={400}
                                        height={200}
                                        className="w-full object-cover"
                                    />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">+15000 Enrolled</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                        <span>{item.validation}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
