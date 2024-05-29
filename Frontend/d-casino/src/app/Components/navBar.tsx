"use client";
import ChainSelect from "./Wallet/switchChain";
import { Account } from "./Wallet/account";
import { WalletOptions } from "./Wallet/WalletOptions";
import { useAccount } from "wagmi";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default function NavBar() {
  return (
    <>
      <ChainSelect />
      <ConnectWallet />
    </>
  );
}
