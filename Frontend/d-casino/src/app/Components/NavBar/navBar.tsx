"use client";
import "../../style.css";
import React, { useState, useRef } from "react";
import ChainSelect from "../Wallet/switchChain";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import logo from "../../../../public/JIDOLogo.png";

export default function NavBar() {
  const [showOptions, setShowOptions] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "Home"
  );

  // wagmi hooks
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { isConnected } = useAccount();
  const handleOptionClick = (connector) => {
    setShowOptions(false);
    connect({ connector });
  };
  // const handleCopyAddress = () => {
  //   if (addressRef.current) {
  //     navigator.clipboard.writeText(addressRef.current.innerText);
  //     // You can add any additional UI feedback here when address is copied
  //   }
  // };
  //  short Address
  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    localStorage.setItem("activeTab", tabName);
  };

  const balance = useBalance({
    address: address,
    // chainId: arbitrum.id,
  });
  return (
    <div className="nav">
      <div className="navMenu">
        <div className="logo">
          <img src={logo.src} alt="" />
        </div>
        <div className="menuItems">
          <a
            href="./"
            className={activeTab === "Home" ? "activeItem" : "inactiveItem"}
            onClick={() => handleTabChange("Home")}
          >
            Home
          </a>
          <a
            href="./Dice"
            className={activeTab === "Dice" ? "activeItem" : "inactiveItem"}
            onClick={() => handleTabChange("Dice")}
          >
            Dice Game
          </a>
          <a
            href="./Coin"
            className={activeTab === "Coin" ? "activeItem" : "inactiveItem"}
            onClick={() => handleTabChange("Coin")}
          >
            Coin Game
          </a>
        </div>
      </div>
      <div>
        {" "}
        <ChainSelect />
      </div>
      {isConnected ? (
        <>
          <button className="profile" onClick={() => setExpanded(!expanded)}>
            <div className="userInfo">
              <p className="largeCaption1Medium">{shortenAddress(address)}</p>
              <div className="expand">
                {expanded ? <>&#9650;</> : <>&#9660;</>}
              </div>
            </div>
          </button>
          {expanded && (
            <button className="logoutButton">
              <div className="userInfo">
                <button className="logoutButton" onClick={() => disconnect()}>
                  Disconnect
                </button>
                <h1 className="largeCaption1Medium">
                  Balance: {balance.data?.symbol}{" "}
                  {(
                    Number(balance.data?.value) /
                    10 ** Number(balance.data?.decimals)
                  ).toFixed(6)}
                </h1>
                <a href={`https://arbiscan.io/address/${address}`}>
                  View on Arbiscan
                </a>
              </div>
            </button>
          )}
        </>
      ) : (
        <>
          <button
            className="profile"
            onClick={() => setShowOptions(!showOptions)}
          >
            <div className="userInfo">
              <p className="largeCaption1Medium">Connect</p>
            </div>
          </button>
          {showOptions && (
            <button className="logoutButton">
              <div className="userInfo">
                {showOptions && (
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
                )}
              </div>
            </button>
          )}
        </>
      )}
    </div>
  );
}
