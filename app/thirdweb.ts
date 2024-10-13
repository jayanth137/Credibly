import { createThirdwebClient, getContract } from 'thirdweb';
import { defineChain } from 'thirdweb/chains';

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  clientId: '5b2a52eadbf452f46a07474482abb3cf',
});

// connect to your contract
export const Contract = getContract({
  client,
  chain: defineChain(84532),
  address: '0x06c7325D2C2CfdEC8Df049e53c963D4420b41A74',
});
