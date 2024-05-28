"use client";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import "../../globals.css";
import { useRef } from "react";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const addressRef = useRef(null);

  const handleCopyAddress = () => {
    if (addressRef.current) {
      navigator.clipboard.writeText(addressRef.current.innerText);
      // You can add any additional UI feedback here when address is copied
    }
  };

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
            <div
              className="address"
              ref={addressRef}
              onClick={handleCopyAddress}
            >
              {ensName
                ? `${ensName} (${shortenAddress(address)})`
                : shortenAddress(address)}
              <span className="copy-icon">📋</span>
            </div>
            <div className="disconnect-container">
              <button className="disconnect-btn" onClick={() => disconnect()}>
                Disconnect
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
