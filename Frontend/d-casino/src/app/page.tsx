'use client';
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./Components/navBar";
const queryClient = new QueryClient();

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <NavBar />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
