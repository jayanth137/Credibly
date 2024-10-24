'use server';

import { PrismaClient } from '@prisma/client';
import { FC } from 'react';
import CoursePage from './components/coursePage';
import QuizPage from './components/quizPage';

// import { FC, useEffect, useState } from 'react';

interface Params {
  slug: string[];
}

export default async function page({ params }: { params: Params }) {
  const { slug }: { slug: string[] } = params;
  console.log(slug[1]);
  const prisma = new PrismaClient();

  const course = await prisma.videos.findUnique({
    where: {
      url_creatorId: {
        url: slug[1],
        creatorId: `@${slug[0]}`,
      },
    },
  });
  const creator = await prisma.creator.findUnique({
    where: {
      youtubeId: `@${slug[0]}`,
    }
  })
  console.log(creator)

  if (!course) {
    return (
      <div>
        <p>Invalid URL</p>
      </div>
    );
  }

  const creatorId = slug[0];

  if (slug.length <= 2) {
    return <CoursePage data={course} creator={creator} />;
  } else if (slug[2] == 'quiz') {
    return <QuizPage data={course} creator={creator} />;
  }
}
