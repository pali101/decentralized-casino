import { http, createConfig } from 'wagmi';
import { base, mainnet, optimism, polygon, arbitrum, ronin } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, base, polygon, optimism, arbitrum, ronin],
  ssr: true,
  connectors: [
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [ronin.id]: http(),
  },
});
