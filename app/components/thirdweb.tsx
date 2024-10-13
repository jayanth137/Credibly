import { prepareContractCall } from 'thirdweb';
import { useSendTransaction } from 'thirdweb/react';
import { contract } from '../thirdweb';
import type { Address } from 'viem';
import TransactionWrapper from './Wallet/TransactionWrapper';

export default function third({
  address,
  metadataUri,
}: {
  address: Address;
  metadataUri: string;
}) {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method: 'function mintTo(address _to, string _uri) returns (uint256)',
      params: [address, metadataUri],
    });
    sendTransaction(transaction);
  };

  return (
    <div>
      <button className="bg-white" onClick={onClick}>Mint</button>
      <TransactionWrapper address={address} metadataUri={metadataUri} />
    </div>
  );
}
