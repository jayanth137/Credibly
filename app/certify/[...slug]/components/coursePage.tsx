'use client';
import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Wallet,
    Play,
    Copy,
    User,
    CheckCircle,
    Check,
    Loader,
} from 'lucide-react';
import PriceInfo from '@/app/components/User/coursePage/PriceInfo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Lottie from 'react-lottie';
import { Pay, PayButton, PayStatus } from '@coinbase/onchainkit/pay';

interface Params {
    slug: string;
}

export default function page({ data }: {
    data: {
        author: string;
        createdAt: string;
        description: string;
        id: string;
        tags: string[];
        thumbnail: string;
        title: string;
        validation: string;
        updatedAt: string;
        videoId: string;
    }
}) {
    // const { slug } = params;
    // const [data, setData] = useState<{
    //     author: string;
    //     createdAt: string;
    //     description: string;
    //     id: string;
    //     tags: string[];
    //     thumbnail: string;
    //     title: string;
    //     validation: string;
    //     updatedAt: string;
    //     videoId: string;
    // }>();
    const [origin, setOrigin] = useState<string>();
    const [error, setError] = useState<string>();
    const [copied, setCopied] = useState<boolean>(false);
    // useEffect(() => {
    //     fetchCertification()
    //     setOrigin(window.location.origin)
    // }, [])
    // async function fetchCertification() {
    //     const resp = await fetch('/api/getCertification/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ cuid: slug })
    //     })
    //     if (resp.status != 200) {
    //         setError('Invalid link provided')
    //         return
    //     }
    //     const responseData = await resp.json()
    //     // console.log(responseData)
    //     setData(responseData)

    // }

    // useEffect(() => {
    //     fetchCertification();
    //     setOrigin(window.location.origin);
    // }, [slug]);
    // async function fetchCertification() {
    //     try {
    //         // Use the slug as the CID to fetch data from IPFS
    //         // const ipfsResp = await fetch(`https://gateway.pinata.cloud/ipfs/${slug}`);

    //         if (ipfsResp.status !== 200) {
    //             setError('Failed to fetch data from IPFS');
    //             return;
    //         }

    //         // Parse the IPFS data
    //         const ipfsData = await ipfsResp.json();
    //         console.log('IPFS data:', ipfsData);

    //         // Set the data to state
    //         setData(ipfsData);
    //     } catch (err) {
    //         setError('Failed to fetch certification data.');
    //         console.error('Error fetching certification:', err);
    //     }
    // }

    if (error) {
        return <p>Error: {error}</p>;
    }
    if (!data) {
        return (
            <div className="h-screen w-full flex items-center justify-center text-white flex-col gap-5 text-center">
                <Lottie
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
    return (
        <div className="min-h-screen text-white">
            <main className="mx-auto px-4 py-8 md:py-12 w-10/12 ">
                <div className=" p-6 rounded-lg w-8/12 mx-auto">
                    <div className="flex flex-col md:flex-row justify-evenly ">
                        <div className="space-y-6">
                            <div className="relative aspect-video bg-[#3a3b6b] rounded-lg overflow-hidden">
                                <img
                                    src={data.thumbnail}
                                    alt="Course thumbnail"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center"></div>
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-2xl font-bold text-white mb-4">
                                    {data.title}
                                </h1>
                                <div className="flex items-center justify-between ">
                                    <div>
                                        <div className=" flex items-center justify-center backdrop-blur-lg bg-white/10 rounded-lg border border-white/20 shadow-lg p-2 px-3 ">
                                            <p className="text-white">
                                                Total enrolled : <span>40</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className=" flex backdrop-blur-lg gap-4 bg-white/10 rounded-lg border border-white/20 shadow-lg p-2">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage
                                                src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-concept-285140929.jpg"
                                                alt="@shadcn"
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>{' '}
                                        <div className="flex items-center">
                                            <p className="text-white">{data.author}</p>
                                            {/* <p className="text-white">1.1 mil Subcribers</p> */}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-white/80">{data.description}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span className="font-semibold">
                                    Validation Type: {data.validation}
                                </span>
                            </div>
                            <div className="flex flex-col w-full justify-center items-center space-x-2">
                                <Pay
                                    productId="374c9013-bb66-4bdd-ac79-fc64c4ca1665"
                                    className="w-1/2"
                                >
                                    <PayButton coinbaseBranded />
                                    <PayStatus />
                                </Pay>
                                {/* <button className="flex w-1/2 items-center justify-center gap-2 bg-[#3a3b6b] p-2 py-3 rounded-lg" onClick={() => {
                                    window.location.href = `/certify/${slug}/quiz`
                                }} >
                                    GO AHEAD WITH TEST{' '}
                                </button> */}
                            </div>
                        </div>

                        {/* <div className="space-y-6">
                            <PriceInfo validation={data.validation} />
                        </div> */}
                    </div>
                </div>
            </main>
            <footer className="text-center py-4">
                <p className="text-sm text-gray-400">By Credibly</p>
            </footer>
        </div>
    );
};

