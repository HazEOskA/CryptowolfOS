// WOLF Protocol — Layer 3: Execution Engine
// Validates and routes agent transactions. Guard layer before on-chain execution.

import { ExecutionRequest, ExecutionResponse, ExecutionStatus } from "../types.js";
import { getAgent } from "../registry/agentRegistry.js";
import { getTokenSignal } from "../signal/signalEngine.js";
import { storeProof } from "../proof/proofStore.js";

function generateSignature(): string {
  return "mock_sig_" + Math.random().toString(36).slice(2, 18);
}

function generateProofId(): string {
  return "proof_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
}

function reject(reason: string): ExecutionResponse {
  return { status: "rejected", reason, signature: null, proofId: null };
}

export function createExecutionRequest(request: ExecutionRequest): ExecutionResponse {
  // Rule 1: Agent must exist
  const agent = getAgent(request.agentId);
  if (!agent) {
    return reject(`Agent not found: ${request.agentId}`);
  }

  // Rule 2: Agent must be active
  if (agent.status !== "active") {
    return reject(`Agent is ${agent.status}. Only active agents can execute.`);
  }

  // Rule 3: Token signal score must meet minimum threshold
  const signal = getTokenSignal(request.targetToken);
  const minScore = request.minSignalScore ?? 50;
  if (signal.score < minScore) {
    return reject(
      `Token signal too low: ${signal.score} (required: ${minScore}). Risk: ${signal.riskLevel}. ${signal.summary}`
    );
  }

  // Rule 4: Swap actions require maxSlippageBps
  if (request.actionType === "swap" && request.maxSlippageBps === undefined) {
    return reject("Swap actions require maxSlippageBps to be set.");
  }

  // All checks passed — execute
  const signature = generateSignature();
  const proofId = generateProofId();

  storeProof({
    id: proofId,
    agentId: request.agentId,
    targetToken: request.targetToken,
    actionType: request.actionType,
    status: "executed",
    signature,
    createdAt: Date.now(),
  });

  return {
    status: "executed",
    reason: "Execution approved and proof stored.",
    signature,
    proofId,
  };
}
