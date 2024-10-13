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
    fetchCertification();
  }, []);
  async function fetchCertification() {
    try {
      // Use the slug as the CID to fetch data from IPFS
      const ipfsResp = await fetch(`https://gateway.pinata.cloud/ipfs/${slug}`);

      if (ipfsResp.status !== 200) {
        setError('Failed to fetch data from IPFS');
        return;
      }

      // Parse the IPFS data
      const ipfsData = await ipfsResp.json();
      console.log('IPFS data:', ipfsData);

      // Set the data to state
      setData(ipfsData);
    } catch (err) {
      setError('Failed to fetch certification data.');
      console.error('Error fetching certification:', err);
    }
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
  )
};

export default page;
