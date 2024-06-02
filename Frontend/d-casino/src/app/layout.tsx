"use client";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum, base, goerli, sepolia } from "wagmi/chains";
import { WagmiProvider } from "wagmi";
// import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum,sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </head>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "#7b3fe4",
              accentColorForeground: "black",
              borderRadius: "small",
              fontStack: "system",
              overlayBlur: "small",
            })}
          >
            <body>{children}</body>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </html>
  );
}
