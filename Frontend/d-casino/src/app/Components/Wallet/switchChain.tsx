import { useSwitchChain } from "wagmi";

export default function ChainSelect() {
  const { chains, switchChain } = useSwitchChain();

  return (
    <div>
      <select onChange={(e) => switchChain({ chainId: parseInt(e.target.value) })}>
        {chains.map((chain) => (
          <option key={chain.id} value={chain.id}>
            {chain.name}
          </option>
        ))}
      </select>
    </div>
  );
}