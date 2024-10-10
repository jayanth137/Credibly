'use client'
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Wallet, Play, Copy, User, CheckCircle, Check } from "lucide-react"
import Logo from '@/components/logo';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
        <div className="min-h-screen bg-gradient-to-br from-[#1a1b3b] to-[#2a2b5b] text-white">
            <header className="flex justify-between items-center p-4 md:p-6 bg-[#2a2b5b]/50 backdrop-blur-sm">
                <Logo />
                <Button variant="outline" className="bg-[#3a3b6b]/50 text-white hover:bg-[#4a4b7b]/50 backdrop-blur-sm">
                    <Wallet className="w-4 h-4 mr-2" />
                    Wallet Name
                </Button>
            </header>
            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="bg-[#2a2b5b]/30 backdrop-blur-sm p-6 rounded-lg w-full max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Certification Details</h1>

                    <div className="grid md:grid-cols-2 gap-6">
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

                            <div className="flex items-center space-x-2">
                                <User className="w-5 h-5 text-gray-400" />
                                <span className="font-semibold">Author: {data.author}</span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span className="font-semibold">Validation Type: {data.validation}</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">{data.title}</h2>
                                <p className="text-gray-300">
                                    {data.description}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Tags:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        data.tags.map((tag, idx) => {
                                            return <Button key={idx} variant="outline" className="rounded-full bg-[#3a3b6b]/50 hover:bg-[#4a4b7b]/50">{tag}</Button>
                                        })
                                    }
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Public Link:</h3>
                                <div className="flex items-center space-x-2 bg-[#3a3b6b]/50 rounded-md p-2">
                                    <Input
                                        value={`${origin}/certify/${data.id}`}
                                        readOnly
                                        className="flex-grow bg-transparent border-none text-white"
                                    />
                                    <CopyToClipboard text={`${origin}/certify/${data.id}`}>
                                        <Button onClick={() => setCopied(true)} variant="outline" size="icon" className="bg-[#4a4b7b]/50 hover:bg-[#5a5b8b]/50">
                                            {
                                                !copied &&
                                                <Copy className="h-4 w-4" />
                                            }
                                            {
                                                copied &&
                                                <Check className='h-4 w-4' />
                                            }
                                        </Button>
                                    </CopyToClipboard>
                                </div>
                            </div>
                            <div>
                                <Button size="icon" className="w-full bg-white text-black hover:bg-gray-400 mb-4">Enroll Now</Button>
                            </div>
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
