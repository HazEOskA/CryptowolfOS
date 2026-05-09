// WOLF Protocol — MVP Entry Point
// Demonstrates the full protocol flow: Agent → Signal → Execution → Proof

import { registerAgent } from "./registry/agentRegistry.js";
import { getTokenSignal } from "./signal/signalEngine.js";
import { createExecutionRequest } from "./execution/executionEngine.js";
import { listProofsByAgent } from "./proof/proofStore.js";

console.log("=== WOLF Protocol MVP ===\n");

// Step 1: Register an agent
const agent = registerAgent({
  owner: "7xKX..owner_wallet",
  name: "WolfScanner-01",
  metadataUri: "https://wolfprotocol.xyz/agents/wolfscanner-01.json",
  paymentAddress: "9zPY..payment_wallet",
});
console.log("✅ Agent registered:", agent.id, `(${agent.name})`);

// Step 2: Check token signal before executing
const token = "So11111111111111111111111111111111111111112"; // Wrapped SOL
const signal = getTokenSignal(token);
console.log(`\n📡 Signal for ${token.slice(0, 8)}...`);
console.log(`   Score: ${signal.score} | Risk: ${signal.riskLevel}`);
console.log(`   ${signal.summary}`);

// Step 3: Request execution
const response = createExecutionRequest({
  agentId: agent.id,
  actionType: "swap",
  targetToken: token,
  amount: "1.5",
  maxSlippageBps: 50,
  minSignalScore: 40,
  requireProtectedRoute: true,
});
console.log("\n⚡ Execution result:", response.status);
console.log("   Reason:", response.reason);
if (response.signature) console.log("   Signature:", response.signature);
if (response.proofId) console.log("   Proof ID:", response.proofId);

// Step 4: Verify proof was stored
const proofs = listProofsByAgent(agent.id);
console.log(`\n📋 Proofs on file for ${agent.id}: ${proofs.length}`);
