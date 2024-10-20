'use client';
import React, { useEffect, useState } from 'react';
import { getFilteredNFTs } from '../moralis.mjs';
import { useAccount } from 'wagmi';

// Define the structure of the NFT's metadata
interface NFTMetadata {
  name?: string;
  description?: string;
  image?: string;
  attributes?: { trait_type: string; value: string }[];
}

// Define the structure of the NFT object
interface NFT {
  token_address: string;
  token_id: string;
  contract_type: string;
  owner_of: string;
  block_number: string;
  block_number_minted: string;
  token_uri?: string;
  metadata?: string; // raw metadata as a string
  verified_collection?: boolean;
}

const NFTComponent = () => {
  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>([]); // Specify the type of state as NFT[]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  console.log('Current account address:', address);

  useEffect(() => {
    const fetchNFTData = async () => {
      const address = '0x576cf2f590Dc2A0E3a0883d7B63ca306D4Da2b6F';
      const contractAddress = '0xd2d5b17f9a0c65115a849ee0ced25f225bf53aca';

      try {
        const nfts = await getFilteredNFTs(address, contractAddress);
        if (Array.isArray(nfts) && nfts.length > 0) {
          setFilteredNFTs(nfts); // Set the fetched NFTs
        } else {
          setError('No NFTs found');
        }
      } catch (e) {
        setError('Error fetching NFTs');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTData();
  }, []);

  if (loading) return <p>Loading NFTs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {filteredNFTs.length > 0 ? (
        filteredNFTs.map((nft, index) => {
          // Initialize metadata with a default structure
          let metadata: NFTMetadata = {};
          try {
            if (nft.metadata) {
              metadata = JSON.parse(nft.metadata); // Parse the metadata JSON string
            }
          } catch (error) {
            console.error('Error parsing metadata:', error);
          }

          return (
            <div
              key={index}
              className="max-w-xs rounded-lg overflow-hidden shadow-md bg-white p-4"
            >
              {/* NFT Image */}
              <img
                className="w-full h-48 object-cover mb-4"
                src={metadata.image || 'placeholder-image-url'} // Provide a fallback placeholder URL
                alt={metadata.name || 'NFT Image'}
              />

              {/* NFT Name */}
              <div className="font-bold text-lg mb-2">
                {metadata.name || 'Unnamed NFT'}
              </div>

              {/* NFT Description */}
              <p className="text-gray-700 text-sm mb-4">
                {metadata.description || 'No description available'}
              </p>

              {/* NFT Attributes */}
              <div className="text-sm">
                {metadata.attributes && metadata.attributes.length > 0 ? (
                  metadata.attributes.map((attribute, index) => (
                    <div key={index} className="text-xs mb-1">
                      <span className="font-semibold">
                        {attribute.trait_type}:{' '}
                      </span>
                      {attribute.value || 'N/A'}
                    </div>
                  ))
                ) : (
                  <p>No attributes available</p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p>No NFTs available</p>
      )}
    </div>
  );
};

export default NFTComponent;
