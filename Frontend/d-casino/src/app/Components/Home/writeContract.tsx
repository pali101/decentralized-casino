import { useWriteContract } from "wagmi";
import contractABI from '../../utils/wagmiContract/contract.json';

const contractAddress = "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2";

export default function WriteContract() {
  const { data: hash,isPending, error, writeContract } = useWriteContract();
 

  const handleWrite = async () => {
    try {
      const txHash = await  writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'mint',
        // args: ['0xA5e2693c33f1b474e6205b6b5c7A5A98c5F02810 ', '0x1234567890123456789012345678901234567890', '1000000000000000000'],
      })
      console.log('Transaction hash:', txHash);
    } catch (error) {
      console.error('Error writing to contract:', error);
    }
  };
  {
    if (isPending) {
      return <div className="text-white">Transaction pending...</div>;}
 

  if (error) {
    return <div className="text-white">Error: {error.message}</div>;
  }

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleWrite}>
      Write to Contract
    </button>
  );
}
}