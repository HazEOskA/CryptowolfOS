// WOLF Protocol — MVP Entry Point
// Demonstrates the full protocol flow: Agent → Signal → Execution → Proof

import { registerAgent } from "./registry/agentRegistry.js";
import { getTokenSignal } from "./signal/signalEngine.js";
import { createExecutionRequest } from "./execution/executionEngine.js";
import { listProofsByAgent } from "./proof/proofStore.js";

console.log("=== WOLF Protocol MVP ===\n");

const agent = registerAgent({
  owner: "7xKX..owner_wallet",
  name: "WolfScanner-01",
  metadataUri: "https://wolfprotocol.xyz/agents/wolfscanner-01.json",
  paymentAddress: "9zPY..payment_wallet",
});
console.log("Agent registered:", agent.id, `(${agent.name})`);

const token = "So11111111111111111111111111111111111111112";
const signal = getTokenSignal(token);
console.log(`Signal for ${token.slice(0, 8)}...`);
console.log(`Score: ${signal.score} | Risk: ${signal.riskLevel}`);
console.log(signal.summary);

const response = createExecutionRequest({
  agentId: agent.id,
  actionType: "swap",
  targetToken: token,
  amount: "1.5",
  maxSlippageBps: 50,
  minSignalScore: 40,
  requireProtectedRoute: true,
});
console.log("Execution result:", response.status);
console.log("Reason:", response.reason);
if (response.signature) console.log("Signature:", response.signature);
if (response.proofId) console.log("Proof ID:", response.proofId);

const proofs = listProofsByAgent(agent.id);
console.log(`Proofs on file for ${agent.id}: ${proofs.length}`);

export * from "./types.js";
export * from "./registry/agentRegistry.js";
export * from "./signal/signalEngine.js";
export * from "./execution/executionEngine.js";
export * from "./proof/proofStore.js";
