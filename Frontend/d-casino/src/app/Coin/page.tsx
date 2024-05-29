'use client';
import { useEffect } from "react";
import NavBar from "../Components/NavBar/navBar";
import CoinPage from "./coin";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeTab", "Coin");
    }
  }, []);

  return (
    <>
      <NavBar />
      <CoinPage/>
    </>
  );
}