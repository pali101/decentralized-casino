'use client';
import './globals.css';
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <head><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link></head>
      <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <body >{children}</body>  c
      </QueryClientProvider>
    </WagmiProvider>
    </html>
  );
}
