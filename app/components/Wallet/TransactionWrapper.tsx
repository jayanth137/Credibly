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
import { useRouter } from 'next/navigation';

export default function TransactionWrapper({
  address,
  metadataUri,
}: {
  address: Address;
  metadataUri: string;
}) {
  const router = useRouter();
  const contracts = [
    {
      address: mintContractAddress,
      abi: mintABI,
      functionName: 'safeMint',
      args: [address, metadataUri],
    },
  ] as unknown as ContractFunctionParameters[];

  console.log(address); // Check if it's valid
  console.log(metadataUri); // Ensure URI is properly set

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
    console.log('Full error:', JSON.stringify(err, null, 2)); // Log the full error details
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
    alert('NFT minted successfully!');

    setTimeout(() => {
      router.push('/nfts'); // Navigate to the success page
    }, 5000);
  };

  return (
    <div className="flex w-[450px]">
      {/* // @ts-ignore */}
      <Transaction
        contracts={contracts}
        className="w-[450px]"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white] !text-xl" />
        <TransactionStatus className="text-white">
          <TransactionStatusLabel className="text-white" />
          <TransactionStatusAction className="text-white" />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
