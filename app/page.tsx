'use client';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import { redirect } from 'next/navigation';
import Logout from './components/Logout';
import Link from 'next/link';
import Logo from '@/components/logo';
import Image from 'next/image';
import logo from '../app/assets/logo.svg';

export default function Component() {
  const { data: session, status } = useSession();
  const [videos, setVideos] = useState<any[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (session) console.log(session);
  }, [session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-[85vh] text-white overflow-hidden flex flex-col justify-center items-center mx-auto w-full">
      <main className="flex flex-col md:flex-row items-start py-20 justify-evenly md:px-8 lg:px-16 w-10/12 mx-auto z-10">
        <div
          className="md:w-2/5 space-y-6 text-center md:text-left mb-8 md:mb-0 
          transform opacity-0 translate-x-[-50px] animate-fadeInLeft delay-400ms"
        >
          <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
            <Image src={logo} width={50} height={50} alt="logo" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Credibily
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
            Watch, Validate, and Mint
            <br />
            Your <span className='text-orange-600'>
              Success
            </span>
          </h2>

          <div className="flex flex-row sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start pt-4">
            <Button variant={'outline'} size={'lg'} className="text-white bg-transparent border-white border-2 text-lg px-6 py-4">
              Mint Certificate
            </Button>
            <Link href={'/login'}>
              <Button
                variant="default"
                size={'lg'}
                className="border-white hover:bg-white/10 bg-white text-black hover:text-white text-lg px-6 py-4"
              >
                Join as a creator
              </Button>
            </Link>
          </div>
        </div>
        <div
          className="md:w-2/5 relative 
          transform opacity-0 translate-x-[50px] animate-fadeInRight delay-600ms"
        >
          <div className="rounded-3xl p-4 md:p-6 max-w-md mx-auto bg-white/10 backdrop-blur-sm rotate-[5deg]">
            <Image
              src={require('@/public/image 1.svg')}
              alt="Lion NFT"
              className="w-full h-auto rounded-2xl rotate-[-5deg]"
            />
          </div>
          <div
            className="absolute -bottom-8 -left-8 w-24 h-24 md:w-28 md:h-28 
            transform opacity-0 scale-0 animate-fadeInScale delay-800ms"
          >
            {/* <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJQeJyzgAzTEVqXiGe90RGBFhfp_4RcJJMQ&s"
              alt="NFT Icon"
              className="w-full h-full object-cover"
            /> */}
          </div>
        </div>
      </main>
      <Image src={require('@/public/brain.svg')} alt='right bottom' className='absolute bottom-0 right-0' />
      <Image src={require('@/public/lines.svg')} alt='left bottom' className='absolute bottom-0 left-0 -z-10' />
      <div className='w-[60rem] h-[60rem] bg-[radial-gradient(circle,rgba(255,255,255,0.25)_0%,rgba(222,231,233,0)_60%)] z-0 absolute -top-20 -left-20 rounded-full'>
      </div>
      {/* <div className='w-[60rem] h-[60rem] bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,rgba(222,231,233,0)_60%)] z-20 absolute bottom-0 right-20 rounded-full'>
      </div> */}
    </div>
  );
}
