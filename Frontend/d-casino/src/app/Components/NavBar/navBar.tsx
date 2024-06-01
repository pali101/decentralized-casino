"use client";
import "../../style.css";
import React, { useState } from "react";
import logo from "../../../../public/Logo.png";
import { ConnectWallet } from "./connectButton";

export default function NavBar() {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "Home"
  );
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    localStorage.setItem("activeTab", tabName);
  }


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
      <div className="connectBtn text-white">
      <ConnectWallet />
      </div>
    </div>
  );
}
