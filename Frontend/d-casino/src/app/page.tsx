"use client";
import { ConnectWallet } from "./Components/connectButton";
import "./style.css";
import React, { useState } from "react";  
import { useReadContract, useWriteContract } from "wagmi";
import contractABI from "./utils/wagmiContract/contract.json";

const contractAddress = "0x029a0EE432447F93a516d96fFA5dB19463c7c6D8";

const Dashboard: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<Number>(1);
  const [amount, setAmount] = useState(0);
  const { data: result, isPending, error, writeContract } = useWriteContract();
  const [betResult, setBetResult] = useState(false); // Step 1: Initialize state
   // balance
  const { data: balance, isLoading } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getContractBalance",
  });

  const handleOptionChange = (option: Number) => {
    setSelectedValue(option);
    console.log(option);
  };
 
  // place Bet function
  const placeBet = async () => {
    const numberValue: number = (Number(amount) * (10 ** 18));
    const bigintValue: bigint = BigInt(numberValue);
    // Check if selected value is within the valid range
    if (Number(selectedValue) < 1 || Number(selectedValue) > 6) {
      alert("Invalid selected value");
      return;
    }
  
    // Check if number is less than balance
    if (numberValue > ((Number(balance))/6)) {
      alert("choose a smaller amount");
      return;
    }
  
    // Rest of the code
   
    try {
      const transaction = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "placeBet",
        args: [selectedValue],
        value: bigintValue,
      });
  
      if (!result) {
        throw new Error("Transaction failed");
      }
      console.log("Transaction hash:", result);
  
      // Step 2: Update betResult state based on transaction result
      setBetResult(true); // Assuming a successful transaction means the bet was placed successfully
  
      return result;
    } catch (error) {
      console.error("Error writing to contract:", error);
  
      // Step 2: Update betResult state based on transaction result
      setBetResult(false); // Assuming a failed transaction means the bet failed
  
      return false;
    }
  };
  return (
    <div className="dashboard">
      <nav className="navWrapper">
        <div className="chainDetails">
          <div className="chainText">
            {<ConnectWallet />}
          </div>
        </div>
      </nav>
      <div className="wrapperMain">
        <div className="titleText">
          <h4>Test your intuition</h4>
        </div>
        <div className="inputGroup">
          <div className="flex flex-row justify-between">
            <label htmlFor="" className="paragraphMediumRegular">
              Enter Amount
            </label>
            {isLoading ? (
              <div>Loading...</div>
            ) : balance ? (
              <div> Contract Balance is: {(Number(balance) / 10 ** 18).toString()}</div>
            ) : (
              <div>No contract name found.</div>
            )}
          </div>
          <input className="inputText" type="number" placeholder="0.00" step="0.00001" onChange={(e) => setAmount(Number(e.target.value))} />
        </div>
        <div className="inputGroup">
          <label htmlFor="" className="paragraphMediumRegular">
            Select Number
          </label>
          <div className="optionGroup">
            <div className="option"
                onClick={() => handleOptionChange(1)}>
                1 
            </div>
            <div className="option" onClick={() => handleOptionChange(2)}>
                2
            </div>
            <div className="option" onClick={() => handleOptionChange(3)}>
                3
            </div>
            <div className="option" onClick={() => handleOptionChange(4)}>
                4
            </div>
            <div className="option" onClick={() => handleOptionChange(5)}>
                5
            </div>
            <div className="option" onClick={() => handleOptionChange(6)}>
                6
            </div>
          </div>
        </div>
        <div>
          {isPending && (
            <p>
              Status <span>Transaction pending...</span>
            </p>
          )}
          {error && (
            <p>
              Error: <span>{error.message}</span>
            </p>
          )}
          {result && (
            <p>
              Transaction hash: <span>{result}</span>
            </p>
          )}
        </div>
        <button className="primaryBtn" onClick={placeBet}>
          Try your Luck
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
