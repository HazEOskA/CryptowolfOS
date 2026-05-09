// WOLF Protocol — Basic Flow Example

import {
  registerAgent,
  getTokenSignal,
  createExecutionRequest,
  getProof,
} from "../src/index.js";

const agent = registerAgent({
  owner: "owner_wallet",
  name: "WolfExampleAgent",
  metadataUri: "https://example.com/agent.json",
  paymentAddress: "payment_wallet",
});

const tokenAddress = "So11111111111111111111111111111111111111112";
const signal = getTokenSignal(tokenAddress);

console.log("Agent:", agent);
console.log("Signal:", signal);

const execution = createExecutionRequest({
  agentId: agent.id,
  actionType: "swap",
  targetToken: tokenAddress,
  amount: "1.0",
  maxSlippageBps: 50,
  minSignalScore: 1,
  requireProtectedRoute: true,
});

console.log("Execution:", execution);

if (execution.proofId) {
  const proof = getProof(execution.proofId);
  console.log("Proof:", proof);
}
