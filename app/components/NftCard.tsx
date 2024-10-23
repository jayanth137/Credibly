'use client'
import React, { useEffect, useState } from 'react';
import { getFilteredNFTs } from '../moralis.mjs';
import { useAccount } from 'wagmi';
import PopUp from '../nfts/popup';
import Loader from '../components/Loader';
import NoNFTsFound from '../components/NoNFTsFound';

interface NFTMetadata {
  name?: string;
  description?: string;
  image?: string;
  attributes?: { trait_type: string; value: string }[];
}

interface NFT {
  token_address: string;
  token_id: string;
  contract_type: string;
  owner_of: string;
  block_number: string;
  block_number_minted: string;
  token_uri?: string;
  metadata?: string;
  verified_collection?: boolean;
}

const NFTcard = () => {
  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const fetchNFTData = async () => {
      if (!address) return;

      const contractAddress = '0xd2d5b17f9a0c65115a849ee0ced25f225bf53aca';

      try {
        const nfts = await getFilteredNFTs(address, contractAddress);
        if (Array.isArray(nfts) && nfts.length > 0) {
          setFilteredNFTs(nfts);
        } else {
          setFilteredNFTs([]);
        }
      } catch (e) {
        setError('Error fetching NFTs');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    const loaderTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    fetchNFTData();

    return () => clearTimeout(loaderTimeout);
  }, [address]);

  if (loading) return <Loader />;
  if (error) return <PopUp message={error} label="Oops Error" onClose={() => setError(null)} />;
  if (!isConnected) return <NoNFTsFound walletError />;

  return (
    <div className="px-40 items-center justify-evenly gap-6">
      {filteredNFTs.length > 0 ? (
        <>
          <h1 className="text-4xl font-bold font-serif text-center text-white mb-8">
            User Achievements
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {filteredNFTs.map((nft, index) => {
              let metadata: NFTMetadata = {};
              try {
                if (nft.metadata) {
                  metadata = JSON.parse(nft.metadata);
                }
              } catch (error) {
                console.error('Error parsing metadata:', error);
              }
              return (
                <div
                  key={index}
                  className="max-w-xs rounded-lg overflow-hidden shadow-md bg-white p-4"
                >
                  <img
                    className="w-full h-48 object-cover mb-4"
                    src={metadata.image || 'placeholder-image-url'}
                    alt={metadata.name || 'NFT Image'}
                  />
                  <p className="text-gray-700 text-sm mb-4">
                    {metadata.description || 'No description available'}
                  </p>
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
            })}
          </div>
        </>
      ) : (
        <NoNFTsFound />
      )}
    </div>
  );
};

export default NFTcard;
