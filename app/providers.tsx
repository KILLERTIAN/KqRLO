'use client';

import dynamic from 'next/dynamic';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const WagmiProvider = dynamic(
  () => import('wagmi').then((mod) => mod.WagmiProvider),
  { ssr: false }
);

const RainbowKitProvider = dynamic(
  () => import('@rainbow-me/rainbowkit').then((mod) => mod.RainbowKitProvider),
  { ssr: false }
);

// ✅ Official X Layer Testnet with OKB icon
const xLayerTestnet = defineChain({
  id: 195,
  name: 'X Layer Testnet',
  network: 'xlayertest',
  iconUrl: 'https://static.okx.cab/cdn/wallet/logo/okb_22400.png',
//   , 'https://static.okx.com/cdn/wallet/logo/okb.png'], 
  iconBackground: '#FF6600',  // OKX orange for contrast
  nativeCurrency: { name: 'OKB', symbol: 'OKB', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://testrpc.xlayer.tech',
        'https://xlayertestrpc.okx.com',
        'https://195.rpc.thirdweb.com',
      ],
    },
    public: {
      http: ['https://testrpc.xlayer.tech', 'https://195.rpc.thirdweb.com'],
    },
  },
  blockExplorers: {
    default: { name: 'X Layer Explorer', url: 'https://www.okx.com/web3/explorer/xlayer-test' },
  },
  testnet: true,
});

const xLayerMainnet = defineChain({
  id: 196,
  name: 'X Layer',
  network: 'xlayer',
  iconUrl: 'https://static.okx.cab/cdn/wallet/logo/okb_22400.png',
  iconBackground: '#FF6600',
  nativeCurrency: { name: 'OKB', symbol: 'OKB', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://rpc.xlayer.tech',
        'https://xlayerrpc.okx.com',
        'https://196.rpc.thirdweb.com',
      ],
    },
    public: {
      http: ['https://rpc.xlayer.tech', 'https://196.rpc.thirdweb.com'],
    },
  },
  blockExplorers: {
    default: { name: 'X Layer Explorer', url: 'https://www.okx.com/web3/explorer/xlayer' },
  },
  testnet: false,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const config = getDefaultConfig({
    appName: 'ZK Identity Verification',
    projectId: '7a026d961241ea662d0e403720f0552d',
    chains: [xLayerTestnet, xLayerMainnet],
    ssr: true,
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
