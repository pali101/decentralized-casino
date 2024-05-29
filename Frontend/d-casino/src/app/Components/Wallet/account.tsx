"use client";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import "../../globals.css";
import { useRef, useState, useEffect } from "react";
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";

export function Account() {
  // const [balance, setBalance] = useState(0);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const addressRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleCopyAddress = () => {
    if (addressRef.current) {
      navigator.clipboard.writeText(addressRef.current.innerText);
      // You can add any additional UI feedback here when address is copied
    }
  };

  const balance = useBalance({
    address: address,
    // chainId: arbitrum.id,
  });
  console.log(balance.data?.value);

  useEffect(() => {}, [address]);
  // fetching balance

  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="account-container">
      <div className="avatar">
        {ensAvatar && (
          <img className="avatar-image" alt="ENS Avatar" src={ensAvatar} />
        )}
      </div>
      <div className="details">
        {address && (
          <>
            <div className="address-container">
              <div
                className="address"
                ref={addressRef}
                onClick={handleCopyAddress}
              >
                {ensName ? `${ensName} (${address})` : shortenAddress(address)}
              </div>
              <div className="expand" onClick={handleExpand}>
                {expanded ? <>&#9650;</> : <>&#9660;</>}
              </div>
            </div>
            {expanded && (
              <div className="expanded-details">
                <button className="disconnect-btn" onClick={() => disconnect()}>
                  Disconnect
                </button>
                <div className="balance">
                  {balance.data?.symbol}{" "}
                  {(
                    Number(balance.data?.value) /
                    10 ** Number(balance.data?.decimals)
                  ).toFixed(6)}
                </div>
                <div className="balance">
                  <a href={`https://arbiscan.io/address/${address}`}>View on Arbiscan</a>   
            </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
