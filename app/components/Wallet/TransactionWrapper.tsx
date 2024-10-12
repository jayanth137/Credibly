'use client';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
import type { Address, ContractFunctionParameters } from 'viem';
import {
  BASE_SEPOLIA_CHAIN_ID,
  mintABI,
  mintContractAddress,
} from '../../constants';

export default function TransactionWrapper({ address }: { address: Address }) {
  const nftMetadataURI = 'https://example.com/nft-metadata';
  const contracts = [
    {
      address: mintContractAddress,
      abi: mintABI,
      functionName: 'mintTo',
      args: [address, nftMetadataURI],
    },
  ] as unknown as ContractFunctionParameters[];

  console.log(address); // Check if it's valid
  console.log(nftMetadataURI); // Ensure URI is properly set

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
    console.log('Full error:', JSON.stringify(err, null, 2)); // Log the full error details
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
  };

  return (
    <div className="flex w-[450px]">
      <Transaction
        contracts={contracts}
        className="w-[450px]"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]" />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
