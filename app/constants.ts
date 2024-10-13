export const BASE_SEPOLIA_CHAIN_ID = 84532;
export const mintContractAddress = '0x06c7325D2C2CfdEC8Df049e53c963D4420b41A74';
export const mintABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_uri',
        type: 'string',
      },
    ],
    name: 'mintTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

// export const BASE_SEPOLIA_CHAIN_ID = 84532;
// export const mintContractAddress = '0xA3e40bBe8E8579Cd2619Ef9C6fEA362b760dac9f';
// export const mintABI = [
//   {
//     inputs: [
//       {
//         internalType: 'address',
//         name: 'to',
//         type: 'address',
//       },
//     ],
//     name: 'mint',
//     outputs: [],
//     stateMutability: 'public',
//     type: 'function',
//   },
// ] as const;
