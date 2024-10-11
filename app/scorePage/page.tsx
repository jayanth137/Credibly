import React from 'react';
import mrDuck from '@/app/assets/mrDuck.svg';

const Page: React.FC = () => {
    return (
        <div className="h-screen bg-gradient-to-br from-[#1a1b3b] to-[#000031] text-white overflow-hidden flex justify-evenly items-center ">
            <div className='bg-slate-600 p-4 rounded-3xl space-y-6 '>
                <img src={mrDuck.src} alt="mr duck" className="mb-4  object-contain w-[473px] h-[277px]" />
                <button className='w-full py-3 bg-[#000031] hover:bg-[#12123d] rounded-lg transition-colors'>Mint Your Achievement</button>
            </div>
            <div className='flex flex-col items-center justify-center text-center'>
                <h3 className='w-24 h-24 bg-[#E5B622] rounded-full flex justify-center items-center font-bold text-4xl '>74</h3>
                <h2>You have successfully completed </h2>
                <div>
                    <h2>Achievement Level :</h2>
                    <h2>Gold</h2>
                </div>
                <h2>Number of correct answers : 15</h2>
                <h2>Number of wrong answers : 5 </h2>
                <h2>Total number of question : 20 </h2>
            </div>
        </div>
    );
};

export default Page;
