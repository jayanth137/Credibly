export const BASE_SEPOLIA_CHAIN_ID = 84532;
export const mintContractAddress = '0xD2D5B17f9a0c65115A849EE0ceD25F225bf53Aca';
export const mintABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
    ],
    name: 'safeMint',
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
