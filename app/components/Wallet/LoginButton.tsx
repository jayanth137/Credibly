'use client';
import WalletWrapper from './WalletWrapper';

export default function LoginButton() {
  return (
    <WalletWrapper
      className="min-w-[90px] text-yellow-200 bg-[#020335] hover:bg-black  "
      text="Connect wallet"
      withWalletAggregator={true}
    />
  );
}
