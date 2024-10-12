'use client';
import React, { useState } from 'react';
import { PinataSDK } from 'pinata';
import { useAccount } from 'wagmi';
import TransactionWrapper from '../components/Wallet/TransactionWrapper';
import WalletWrapper from '../components/Wallet/WalletWrapper';

const pinata = new PinataSDK({
  pinataJwt:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxNmUyNWQ1Ni0yOWIxLTRjMzgtOGIyMC04NWRkNzEwOTdkNWIiLCJlbWFpbCI6ImpheWFudGguc21zLmluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjNjRjNmY4NWY2NmVmODBlMGU3ZSIsInNjb3BlZEtleVNlY3JldCI6ImM1YzFlMjUyMTg2MWVlY2Q5MDAwNzQ5NTg3OGI3OGMxZjJkZTQ1ZDI3Yzc2NjkzZjE2Zjg3YTY5ZjNiMDEwMWMiLCJleHAiOjE3NTY0OTkyNTJ9.rqb8oQ9loccRQM1OunlUVmjEIWqB4RAFEzNPUuRQCIE',
  pinataGateway: 'teal-late-haddock-980.mypinata.cloud',
});

const contractAddress = '0xCb39Bd9231cE0E0D2501D37Ec13F37678ba03b2C';

const page = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [metadataUri, setMetadataUri] = useState('');
  const { address } = useAccount();

  const score = 100;
  const trueAnswer = 10;
  const falseAnswer = 0;
  const uploadMetadata = async () => {
    const metadata = {
      name: 'Certificate of Achievement',
      description: `This certificate is awarded for achieving a score of ${score}`,
      image:
        'https://ipfs.io/ipfs/QmXnW8kkd9QiJYx6ZCq3Bc6sCJF3M1nQ8fYjpLuSgSr9zm',
      attributes: [
        { trait_type: 'Score', value: score },
        { trait_type: 'Correct Answers', value: trueAnswer },
        { trait_type: 'Incorrect Answers', value: falseAnswer },
      ],
    };

    console.log('Uploading metadata to IPFS...');
    console.log('Metadata:', metadata);

    try {
      // Convert metadata to a Blob and then to a File
      const file = new File([JSON.stringify(metadata)], 'metadata.json', {
        type: 'application/json',
      });

      // Upload file to Pinata
      const upload = await pinata.upload.file(file);

      // Get the IPFS hash of the uploaded file
      const metadataUri = `ipfs://${upload.IpfsHash}`;
      console.log('Metadata URI:', metadataUri);
      return metadataUri;
    } catch (error) {
      console.error('Error uploading metadata to IPFS:', error);
    }
  };

  return (
    <div className="flex">
      <div>
        <button className="bg-white  p-4">Mint</button>
      </div>
      <div>
        {' '}
        {address ? (
          <TransactionWrapper address={address} />
        ) : (
          <WalletWrapper
            className="w-[450px] max-w-full"
            text="Sign in to transact"
          />
        )}
      </div>
    </div>
  );
};

export default page;
