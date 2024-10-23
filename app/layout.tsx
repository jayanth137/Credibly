import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './styles.css';
import AuthProvider from './AuthProvider';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import ReduxProvider from './ReduxProvider';
import '@rainbow-me/rainbowkit/styles.css';

import '@coinbase/onchainkit/styles.css';

import dynamic from 'next/dynamic';

const OnchainProviders = dynamic(
  () => import('./components/Wallet/OnchainProviders'),
  {
    ssr: false,
  }
);


const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Credibly',
  description: 'Watch, pause and mint success.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-[#020234] to-[#252c6a]`}
      >
        <AuthProvider>
          <ReduxProvider>
            <OnchainProviders>
              <Navbar />
              {children}
            </OnchainProviders>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
