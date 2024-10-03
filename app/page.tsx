// app/page.js
"use client";
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Logout from './components/Logout';

export default function MainPage() {
  const { data: session, status } = useSession();
  const [videos, setVideos] = useState<any[]>();
  const [error, setError] = useState<string>()
  // const [playlistId, setPlaylistId] = useState<string>('');
  const [videoLoading, setVideoLoading] = useState<boolean>(true)

  useEffect(() => {
    // console.log(session.accessTok)
    if (session && status === 'authenticated') {
      setVideoLoading(true)
      fetchVideos()
    }
  }, [session, status]);

  async function fetchVideos() {
    console.log(session)
    const resp = await fetch('/api/youtube/getVideos', {
      headers: {
        Authorization: `Bearer ${(session as any).accessToken}`,
      },
    })
    const data = await resp.json()
    console.log(data)
    if (data.error) {
      setError(data.error)
    }
    else {
      setVideos(data)
    }
    setVideoLoading(false)
  }

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div>
      <h1>Your Uploaded YouTube Videos</h1>
      <ul className='grid grid-cols-4 w-11/12 mx-auto'>
        {
          error && <h1 className='text-red-600'>{error}</h1>
        }
        {
          videos &&
          videos.map((video) => (
            <li key={video.id}>
              <h2>{video.snippet.title}</h2>
              <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            </li>
          ))}
      </ul>
      <Logout />
    </div>
  );
}
