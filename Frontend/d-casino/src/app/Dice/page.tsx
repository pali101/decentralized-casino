'use client';
import { useEffect } from "react";
import NavBar from "../Components/NavBar/navBar";
import DicePage from "./dice";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeTab", "Dice");
    }
  }, []);

  return (
    <>
      <NavBar />
      <DicePage/>
    </>
  );
}