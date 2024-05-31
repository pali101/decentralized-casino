import { useSignMessage } from "wagmi";
import ReadContract from "../Profile/readContract";
export default function HomePage() {
  const { signMessage } = useSignMessage();
  return (
    <div>
      <h1>Home</h1>
      <button className="text-white" onClick={() => signMessage({ message: "Verify your Identity" })}>
        Sign message
      </button>
      <ReadContract />
    </div>
  );
}
