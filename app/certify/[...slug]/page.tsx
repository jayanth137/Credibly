'use server';

import { PrismaClient } from "@prisma/client";
import { FC } from "react";
import CoursePage from './components/coursePage'
import QuizPage from './components/quizPage'

// import { FC, useEffect, useState } from 'react';

interface Params {
  slug: string[];
}

export default async function page({ params }: { params: Params }) {
  // console.log(slug)
  // const [data, setData] = useState<{
  //   author: string;
  //   createdAt: string;
  //   description: string;
  //   id: string;
  //   tags: string[];
  //   thumbnail: string;
  //   title: string;
  //   validation: string;
  //   updatedAt: string;
  //   videoId: string;
  // }>();
  // const [origin, setOrigin] = useState<string>();
  // const [error, setError] = useState<string>();
  // const [copied, setCopied] = useState<boolean>(false);

  // useEffect(() => {
  //   fetchCertification();
  //   setOrigin(window.location.origin);
  // }, [slug]);
  // async function fetchCertification() {
  //   try {
  //     // Use the slug as the CID to fetch data from IPFS
  //     // const ipfsResp = await fetch(`https://gateway.pinata.cloud/ipfs/${slug}`);

  //     if (ipfsResp.status !== 200) {
  //       setError('Failed to fetch data from IPFS');
  //       return;
  //     }

  //     // Parse the IPFS data
  //     const ipfsData = await ipfsResp.json();
  //     console.log('IPFS data:', ipfsData);

  //     // Set the data to state
  //     setData(ipfsData);
  //   } catch (err) {
  //     setError('Failed to fetch certification data.');
  //     console.error('Error fetching certification:', err);
  //   }
  // }
  const { slug }: { slug: string[] } = params;
  console.log(slug[1])
  const prisma = new PrismaClient()

  const cid = await prisma.videos.findUnique({
    where: {
      url_creatorId: {
        url: slug[1],
        creatorId: `@${slug[0]}`
      }
    }
  })
  const ipfsResp = await fetch(`https://gateway.pinata.cloud/ipfs/${cid?.cid}`);

  console.log(ipfsResp)

  if (ipfsResp.status !== 200) {
    return (
      <div>
        <p>Invalid URL</p>
      </div>
    )
  }

  // Parse the IPFS data
  const ipfsData = await ipfsResp.json();
  console.log('IPFS data:', ipfsData);



  console.log(cid)

  if (slug.length <= 2) {
    return <CoursePage data={ipfsData} />
  }

  else if (slug[2] == 'quiz') {
    return <QuizPage data={ipfsData} />
  }

};
