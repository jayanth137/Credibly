'use client'
import React, { useEffect, useState } from 'react';
import QuizCard from '../../../components/User/quiz/QuizCard';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';

const page = () => {
  const { slug } = useParams();
  const [error, setError] = useState<string>()
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
  useEffect(() => {
    fetchCertification()
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
    console.log(responseData)
    setData(responseData)

  }
  if (error) {
    return <p>Error: {error}</p>
  }
  if (!data) {
    return <p>Loading...</p>
  }
  return (
    <div className="flex justify-center items-center m-auto">
      <QuizCard videoId={data.videoId} />
    </div>
  );
};

export default page;
