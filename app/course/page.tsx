import React from 'react';
import CourseInfo from '../components/User/coursePage/CourseInfo';
import PriceInfo from '../components/User/coursePage/PriceInfo';

const page = () => {
  return (
    <div className="flex  px-40 justify-center items-center h-screen bg-gradient-to-r from-[#022E56] via-[#045140] to-[#01032]">
      <div className="    w-2/3 px-6">
        <CourseInfo />
      </div>

      <div className="  px-6 w-1/2">
        <PriceInfo />
      </div>
    </div>
  );
};

export default page;
