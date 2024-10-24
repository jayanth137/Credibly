// 'use client'
// import React, { useEffect, useState } from 'react';
import { Creator, Videos } from '@prisma/client';
import QuizCard from '../../../components/User/quiz/QuizCard';
// import { useRouter } from 'next/router';
// import { useParams } from 'next/navigation';

const page = ({
  data,
  creator
}: {
  data: Videos
  creator: Creator
}) => {
  return (
    <div className="flex justify-center items-center m-auto">
      <QuizCard videoId={data.videoId} name={data.title} author={creator.name} />
    </div>
  );
};

export default page;
