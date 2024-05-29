'use client';
import NavBar from "./Components/NavBar/navBar";
import HomePage from "./Components/Home/home";
export default function Home() {
  localStorage.setItem("activeTab", "Home");
  return (
    <>
        <NavBar />
        <HomePage />
        </>
  );
}
