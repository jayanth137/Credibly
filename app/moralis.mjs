import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { NEXT_PUBLIC_MORALIS_API_KEY } from './config';

// Initialize Moralis once and export it for reuse across your app
export async function initializeMoralis() {
  try {
    await Moralis.start({
      apiKey: NEXT_PUBLIC_MORALIS_API_KEY,
    });
    console.log('Moralis initialized');
  } catch (e) {
    console.error('Failed to initialize Moralis:', e);
  }
}

// Function to get filtered NFTs by contract address
export async function getFilteredNFTs(address, contractAddress) {
  try {
    // Ensure Moralis is initialized before making the API call
    await initializeMoralis();

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: EvmChain.BASE_SEPOLIA,
      address: address,
    });

    // Filter NFTs with the given contract address
    const filteredNFTs = response.raw.result.filter(
      (nft) => nft.token_address.toLowerCase() === contractAddress.toLowerCase()
    );

    console.log('Filtered NFTs:', filteredNFTs);

    // Optionally, return as JSON
    return filteredNFTs;
  } catch (e) {
    console.error('Error fetching NFTs:', e);
    return null; // Return null or handle the error appropriately
  }
}
