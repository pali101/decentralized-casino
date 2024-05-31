import { useReadContract } from "wagmi";
import contractABI from '../../utils/wagmiContract/contract.json';

const contractAddress = "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2";

export default function ReadContract() {
  const { data: balance, isLoading } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'balanceOf',
    args: ['0x40D17dAdcDE03776F1bCb27297c108A788c59Edc'],
  });

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (balance) {
    console.log(balance);
    return <div className="text-white">Balance is : {balance.toString()}</div>;
  }

  return <div className="text-white">No contract name found.</div>;
}