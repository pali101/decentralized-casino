"use client";
import React, { useState } from "react";
import { Connector, useConnect } from "wagmi";
import "../../globals.css";

export function WalletOptions() {
  const { connectors, connect } = useConnect();
  const [showOptions, setShowOptions] = useState(false);

  const handleConnectClick = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const handleOptionClick = (connector) => {
    setShowOptions(false);
    connect({ connector });
  };

  return (
    <div className="account-container">
      <div className="container">
        <button onClick={handleConnectClick} className="connectButton">
          Connect
        </button>
        {showOptions && (
          <div className="buttonWrapper">
            <select
              onChange={(e) =>
                handleOptionClick(
                  connectors.find(
                    (connector) => connector.uid === e.target.value
                  )
                )
              }
            >
               {" "}
              {connectors.map((connector) => (
                <option key={connector.uid} value={connector.uid}>
                        {connector.name}   {" "}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
