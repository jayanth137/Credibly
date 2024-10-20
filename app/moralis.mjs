import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';

// Initialize Moralis once and export it for reuse across your app
export async function initializeMoralis() {
  try {
    await Moralis.start({
      apiKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjhiMjNjMDhmLTYzOTQtNGNjMi04MDIxLWZlMGY1NzI0NTdjNiIsIm9yZ0lkIjoiNDEyNTg5IiwidXNlcklkIjoiNDIzOTk4IiwidHlwZUlkIjoiMTgxODRmYzMtZGY2MS00OTQzLWE0MGMtNzBhODE0OGVmMDBhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mjk0MTc0MTYsImV4cCI6NDg4NTE3NzQxNn0.d3fxP2mNl244khjG3nMN-GN1yEvdhDGzRrX0oD-GfVQ',
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
