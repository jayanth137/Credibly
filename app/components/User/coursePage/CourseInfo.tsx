import Image from 'next/image';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const course = {
  image: '/app/assets/download.jpeg', // You can replace this with a valid image path or URL
  title: 'Mastering Blockchain Technology',
  description:
    'Lorem ipsum dolor sit amet consectetur. Vel sed sollicitudin aliquam et neque. Eget quisque amet euismod ultrices aenean sagittis porttitor. Vel etiam curabitur nibh vestibulum pellentesque. Tellus curabitur a ullamcorper id sagittis commodo ut. Eu arcu condimentum placerat pharetra amet viverra lacus arcu. Faucibus malesuada laoreet adipiscing non et neque in ultrices. Viverra neque est sed nunc. Aliquet lorem pulvinar nulla ornare. Integer lacus netus commodo vulputate non aliquet id.Sem urna tortor ultrices lectus magna odio praesent semper lobortis. Aliquet arcu semper fringilla hendrerit suscipit tincidunt diam eu. ',
};

const CourseInfo = () => {
  return (
    <div>
      <div className="backdrop-blur-lg bg-white/10 rounded-lg border border-white/20 shadow-lg m-4 p-6 ">
        <Image src={course.image} alt={course.title} width="100" height="100" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              {course.title}
            </h1>
            <div className=" flex items-center justify-center backdrop-blur-lg     bg-white/10 rounded-lg border border-white/20 shadow-lg w-40 ">
              <Avatar className="w-4 h-4">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>{' '}
              <p className="text-white">
                Total enrolled : <span>40</span>
              </p>
            </div>
          </div>

          <div className=" flex backdrop-blur-lg     bg-white/10 rounded-lg border border-white/20 shadow-lg p-2">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>{' '}
            <div>
              <p className="text-white">Harikaet Singh</p>
              <p className="text-white">1.1 mil Subcribers</p>
            </div>
          </div>
        </div>

        <p className="text-white/80">{course.description}</p>
      </div>
      <div className="p-2">
        <h5 className="text-white/80 font-bold text-xl">
          More from the Channel
        </h5>
      </div>
    </div>
  );
};

export default CourseInfo;
