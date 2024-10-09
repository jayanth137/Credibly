import { Label } from '@radix-ui/react-label';
import React from 'react';

const Card = {
  title: 'Introduction to Web3 & Blockchain',
  Modules: [
    'Introduction to Web3 & Blockchain',
    'What is Blockchain',
    'What is Web3',
    'How to use Web3',
    'How to use Blockchain',
    'Advanced Web3 Applications',
    'Blockchain Security',
    'Smart Contracts',
    'Decentralized Applications (dApps)',
    'Cryptocurrency & Transactions',
    'Web3 Wallets',
    'Future of Web3 & Blockchain',
  ],
  Duration: '10 hours',
  Videos: '12 video lectures',
};

const PriceInfo = () => {
  return (
    <div className="backdrop-blur-lg bg-white/10 rounded-lg border border-white/20 shadow-lg p-6 max-w-sm">
      {/* Course Title */}
      <h3 className="text-2xl font-bold text-white mb-4">{Card.title}</h3>

      {/* Course Modules */}
      <div className="mb-4">
        <Label htmlFor="course-modules" className="text-lg text-white">
          Modules
        </Label>
        <ul className="list-disc list-inside text-white/80 space-y-1 mt-2">
          {Card.Modules.map((module, index) => (
            <li key={index}>{module}</li>
          ))}
        </ul>
      </div>

      {/* Course Duration */}
      <div className="mb-4 space-y-1">
        <Label htmlFor="course-duration" className="text-lg text-white">
          Course Duration
        </Label>
        <p className="text-white/80">{Card.Duration}</p>
      </div>

      {/* Number of Videos */}
      <div className="space-y-1 mb-6">
        <Label htmlFor="course-videos" className="text-lg text-white">
          Number of Videos
        </Label>
        <p className="text-white/80">{Card.Videos}</p>
      </div>

      {/* Enroll Button */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
        Enroll Now
      </button>
    </div>
  );
};

export default PriceInfo;
