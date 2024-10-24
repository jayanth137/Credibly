// @ts-ignore

'use client';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { base } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { NEXT_PUBLIC_CDP_API_KEY } from '../../config';
import { useWagmiConfig } from '../../wagmi';
import { createPortal } from 'react-dom';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

function ModalPortal({ children }: Props) {
  // Ensure the modal renders at the top level of the DOM with a higher z-index
  return createPortal(
    <div >{children}</div>,
    document.body // Render it outside of the normal component tree
  );
}

function OnchainProviders({ children }: Props) {
  const wagmiConfig = useWagmiConfig();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={NEXT_PUBLIC_CDP_API_KEY}
          chain={base as any}
        >
          <ModalPortal>
            <RainbowKitProvider modalSize="compact">
              {children}
            </RainbowKitProvider>
          </ModalPortal>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
