// @ts-nocheck
import React from 'react';
import Mint from '../components/Mint';

const page = () => {
  const contractAddress = '0xD2D5B17f9a0c65115A849EE0ceD25F225bf53Aca';
  async function getNFTMetadata(contractAddress, tokenId) {
    const metadata = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
    console.log(metadata);
  }

  // Example usage:
  getNFTMetadata('0xContractAddress', 'TokenID');

  return (
    <div>
      hello
      <Mint />
    </div>
  );
};

export default page;
