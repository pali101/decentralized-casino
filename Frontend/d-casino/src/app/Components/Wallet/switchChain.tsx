import { useSwitchChain } from "wagmi";
import "../../style.css";

export default function ChainSelect() {
  const { chains, switchChain } = useSwitchChain();

  return (
    <div className="select-wrapper">
      <select
        id="chain"
        className="inputText"
        onChange={(e) => switchChain({ chainId: parseInt(e.target.value) })}
      >
        {chains.map((chain) => (
          <option key={chain.id} value={chain.id}>
            {chain.name}
          </option>
        ))}
      </select>
      <div className="dropdown-icon">
        <i className="material-icons">expand_more</i>
      </div>
    </div>
  );
}
