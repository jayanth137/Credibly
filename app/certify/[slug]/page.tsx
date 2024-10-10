'use client'
import { FC, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Wallet, Play, Copy, User, CheckCircle, Check } from "lucide-react"
import PriceInfo from '@/app/components/User/coursePage/PriceInfo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Params {
    slug: string;
}

const SlugPage: FC<{ params: Params }> = ({ params }) => {
    const { slug } = params;
    const [data, setData] = useState<{
        author: string,
        createdAt: string,
        description: string,
        id: string,
        tags: string[],
        thumbnail: string,
        title: string,
        validation: string,
        updatedAt: string,
        videoId: string
    }>()
    const [origin, setOrigin] = useState<string>()
    const [error, setError] = useState<string>()
    const [copied, setCopied] = useState<boolean>(false)
    useEffect(() => {
        fetchCertification()
        setOrigin(window.location.origin)
    }, [])
    async function fetchCertification() {
        const resp = await fetch('/api/getCertification/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cuid: slug })
        })
        if (resp.status != 200) {
            setError('Invalid link provided')
            return
        }
        const responseData = await resp.json()
        // console.log(responseData)
        setData(responseData)

    }

    if (error) {
        return <p>Error: {error}</p>
    }
    if (!data) {
        return <p>Loading...</p>
    }
    return (
        <div className="min-h-screen text-white">
            <main className="mx-auto px-4 py-8 md:py-12 w-10/12 ">
                <div className=" p-6 rounded-lg w-full mx-auto">

                    <div className="flex flex-col md:flex-row justify-evenly ">
                        <div className="space-y-6">
                            <div className="relative aspect-video bg-[#3a3b6b] rounded-lg overflow-hidden">
                                <img
                                    src={data.thumbnail}
                                    alt="Course thumbnail"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Button variant="outline" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                                        <Play className="h-6 w-6" />
                                    </Button>
                                </div>
                            </div>

                            {/* <div className="flex items-center space-x-2">
                                <User className="w-5 h-5 text-gray-400" />
                                <span className="font-semibold">Author: {data.author}</span>
                            </div> */}
                            <div className='space-y-4'>
                                <h1 className="text-2xl font-bold text-white mb-4">
                                    {data.title}
                                </h1>
                                <div className="flex items-center justify-between ">
                                    <div>
                                        <div className=" flex items-center justify-center backdrop-blur-lg bg-white/10 rounded-lg border border-white/20 shadow-lg p-2 px-3 ">
                                            <Avatar className="w-12 h-12">
                                                <AvatarImage
                                                    src="https://github.com/shadcn.png"
                                                    alt="@shadcn"
                                                />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>{' '}
                                            <p className="text-white">
                                                Total enrolled : <span>40</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className=" flex backdrop-blur-lg gap-4 bg-white/10 rounded-lg border border-white/20 shadow-lg p-2">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>{' '}
                                        <div className='flex items-center'>
                                            <p className="text-white">{data.author}</p>
                                            {/* <p className="text-white">1.1 mil Subcribers</p> */}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-white/80">{data.description}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span className="font-semibold">Validation Type: {data.validation}</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <PriceInfo validation={data.validation} />
                        </div>
                    </div>
                </div>
            </main>
            <footer className="text-center py-4">
                <p className="text-sm text-gray-400">By Credibly</p>
            </footer>
        </div>
    );
};

export default SlugPage;
