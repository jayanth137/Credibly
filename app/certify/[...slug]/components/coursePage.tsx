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

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Lottie from 'react-lottie';
import { Pay, PayButton, PayStatus } from '@coinbase/onchainkit/pay';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Params {
  slug: string;
}

export default function Page({
  data,
  creatorId,
}: {
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
  };
  creatorId: {
    creatorId: string;
  };
}) {
  const pathname = usePathname();
  const [origin, setOrigin] = useState<string>();
  const [error, setError] = useState<string>();
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    console.log('Current pathname:', pathname); // Log the pathname to the console
  }, [pathname]);

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
      <main className="mx-auto px-4 py-8 md:py-12 w-10/12">
        <div className="p-6 rounded-lg w-8/12 mx-auto">
          <div className="flex flex-col md:flex-row justify-evenly">
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
                    <div className="flex items-center justify-center backdrop-blur-lg bg-white/10 rounded-lg border border-white/20 shadow-lg p-2 px-3">
                      <p className="text-white">
                        Total enrolled: <span>40</span>
                      </p>
                    </div>
                  </div>
                  <Link href={`/creator/@${creatorId}`}>
                    <div className="flex backdrop-blur-lg gap-4 bg-white/10 rounded-lg border border-white/20 shadow-lg p-2">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-concept-285140929.jpg"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center">
                        <p className="text-white">{data.author}</p>
                      </div>
                    </div>
                  </Link>
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
                <button
                  className="flex w-1/2 items-center justify-center gap-2 bg-[#3a3b6b] p-2 py-3 rounded-lg"
                  onClick={() => {
                    window.location.href = pathname + '/quiz';
                  }}
                >
                  Skip Payment for Testing
                </button>
              </div>

              {/* New Section: Redirect to Creator's Page */}
              <div className="mt-6">
                <Link href={`/creator/@${creatorId}`}>
                  <button className="w-full bg-black p-2 rounded-lg text-white hover:bg-black-700">
                    View More Courses by {data.author}
                  </button>
                </Link>
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
}
