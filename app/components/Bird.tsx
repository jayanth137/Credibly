import { prepareContractCall } from 'thirdweb';
import { useSendTransaction } from 'thirdweb/react';
import { createThirdwebClient, getContract } from 'thirdweb';
import { defineChain } from 'thirdweb/chains';

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  clientId: '5b2a52eadbf452f46a07474482abb3cf',
});

// connect to your contract
const contract = getContract({
  client,
  chain: defineChain(84532),
  address: '0x06c7325D2C2CfdEC8Df049e53c963D4420b41A74',
});

const _to = '0x418654B35A7CbB09d2eb374973a7A944A40aE3a5';
const _uri =
  'https://teal-late-haddock-980.mypinata.cloud/ipfs/QmafjNLRebh7Upuez39WqiHLYi5m5mfKSFayYi5Yvrj2t3';
export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method: 'function mintTo(address _to, string _uri) returns (uint256)',
      params: [_to, _uri],
    });
    sendTransaction(transaction);
  };

  return (
    <button onClick={onClick} className="bg-white ">
      Mint
    </button>
  );
}
