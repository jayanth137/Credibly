// app/page.js
"use client"; // Ensure this is a Client Component

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Login from './components/Login'; // Adjust the path if necessary

export default function MainPage() {
  const { data: session, status } = useSession();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log(session)
    if (session && status === 'authenticated') {
      fetch('/api/youtube')
        .then((res) => {
          console.log(res)
          return res.json()
        })
        .then((data) => setVideos(data));
    }
  }, [session, status]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <Login />; // Show the Login component if not logged in
  }

  return (
    <div>
      <h1>Your Uploaded YouTube Videos</h1>
      {/* <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <h2>{video.snippet.title}</h2>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
          </li>
        ))}
      </ul> */}
      <button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>

    </div>
  );
}
