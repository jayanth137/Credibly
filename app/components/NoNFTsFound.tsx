import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const NoNFTsFound = () => {

    const handleRedirect = () => {
        // no routre in this file, route without router
        window.location.href = '/courses';
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-800 to-blue-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl text-white font-bold mb-4">No NFTs Found</h2>
            <p className="text-lg text-gray-300 mb-8 text-center">
                It looks like you don't have any NFTs yet. Explore our courses to learn and earn!
            </p>
            <motion.button
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={handleRedirect}
            >
                Go to Courses
            </motion.button>
        </motion.div>
    );
};

export default NoNFTsFound;
