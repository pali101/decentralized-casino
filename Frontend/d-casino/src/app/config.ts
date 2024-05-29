import { http, createConfig } from 'wagmi';
import {  mainnet, goerli, sepolia, optimism, polygon, arbitrum } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum],
  ssr: true,
  connectors: [
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
});
