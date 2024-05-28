'use client';
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Profile from "./Components/Profile/profile";
import { Account } from "./Components/Wallet/account";
import { WalletOptions } from "./Components/Wallet/WalletOptions";
import { useAccount } from "wagmi";
const queryClient = new QueryClient();

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
