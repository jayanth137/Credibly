'use client';
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import TransactionWrapper from '../components/Wallet/TransactionWrapper';
import WalletWrapper from '../components/Wallet/WalletWrapper';

const pinataApiKey = '73c879f180b698a69faa';
const pinataSecretApiKey =
  '0a8396a79ee46480d58adb68a8e6aa202fa8ed27e9795a9a5527e0e26d8b8ed0';

const headers = {
  'Content-Type': 'application/json',
  pinata_api_key: pinataApiKey!,
  pinata_secret_api_key: pinataSecretApiKey!,
};

const contractAddress = '0xCb39Bd9231cE0E0D2501D37Ec13F37678ba03b2C';

const Mint = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [metadataUri, setMetadataUri] = useState('');
  const [isMintCompleted, setIsMintCompleted] = useState(false);
  const { address } = useAccount();

  const score = 100;
  const trueAnswer = 10;
  const falseAnswer = 0;

  const uploadMetadata = async () => {
    const metadata = {
      name: 'Certificate of Achievement',
      description: `This certificate is awarded for achieving a score of ${score}`,
      image:
        'https://ipfs.io/ipfs/QmXnW8kkd9QiJYx6ZCq3Bc6sCJF3M1nQ8fYjpLuSgSr9zm', // Example IPFS image
      attributes: [
        { trait_type: 'Score', value: score },
        { trait_type: 'Correct Answers', value: trueAnswer },
        { trait_type: 'Incorrect Answers', value: falseAnswer },
      ],
    };

    console.log('Uploading metadata to IPFS...');

    try {
      const response = await fetch(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(metadata),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload data to Pinata');
      }

      const result = await response.json();
      console.log('Upload successful:', result);

      const metadataUri = `ipfs://${result.IpfsHash}`;
      console.log('Metadata URI:', metadataUri);
      return metadataUri;
    } catch (error) {
      console.error('Error uploading metadata to IPFS:', error);
      return null;
    }
  };

  const handleMint = async () => {
    setIsMinting(true); // Start minting/loading state

    try {
      const uri = await uploadMetadata();
      if (uri) {
        setMetadataUri(uri); // Store the URI after upload
        // Call your minting function here
        console.log('Minting NFT with URI:', uri);
        // await mintNFT(uri); // Replace this with your minting logic
        setIsMintCompleted(true); // Hide button after successful minting
      }
    } catch (error) {
      console.error('Minting failed:', error);
    } finally {
      setIsMinting(false); // End minting/loading state
    }
  };

  return (
    <div className="flex">
      <div>
        {address ? (
          !isMintCompleted && (
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-xl text-white font-semibold rounded-2xl py-3 shadow-lg transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:scale-105 w-96 active:scale-95 disabled:opacity-50"
              onClick={handleMint}
              disabled={isMinting}
            >
              {isMinting ? 'Minting in progress...' : 'Mint & Upload'}
            </button>
          )
        ) : (
          <WalletWrapper
            className="w-[450px] max-w-full"
            text="Sign in to transact"
          />
        )}
      </div>
      {metadataUri && address && (
        <TransactionWrapper address={address} metadataUri={metadataUri} />
      )}
    </div>
  );
};

export default Mint;
