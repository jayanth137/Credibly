import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import LoginButton from './Wallet/LoginButton';

interface NoNFTsFoundProps {
  walletError?: boolean;
}

const NoNFTsFound = ({ walletError = false }: NoNFTsFoundProps) => {
  const router = useRouter();
  const { address } = useAccount();

  const handleRedirect = () => {
    router.push('/courses');
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center  h-full  p-8 rounded-lg "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl text-white font-bold mb-4">
        {walletError ? 'Wallet Not Connected' : 'No NFTs Found'}
      </h2>
      <p className="text-lg text-gray-300 mb-8 text-center">
        {walletError
          ? 'Please connect your wallet to view NFTs.'
          : "It looks like you don't have any NFTs yet. Explore our courses to learn and earn!"}
      </p>
      {walletError ? (
        <LoginButton />
      ) : (
        <motion.button
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={handleRedirect}
        >
          Go to Courses
        </motion.button>
      )}
    </motion.div>
  );
};

export default NoNFTsFound;
