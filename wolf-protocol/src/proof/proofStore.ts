// WOLF Protocol — Proof Store
// Stores execution proofs. Enables automated payment settlement.

import { ExecutionProof } from "../types.js";

// In-memory store. Will be replaced by Solana program account reads.
const proofs = new Map<string, ExecutionProof>();

export function storeProof(proof: ExecutionProof): ExecutionProof {
  proofs.set(proof.id, proof);
  return proof;
}

export function getProof(id: string): ExecutionProof | null {
  return proofs.get(id) ?? null;
}

export function listProofsByAgent(agentId: string): ExecutionProof[] {
  return Array.from(proofs.values()).filter((p) => p.agentId === agentId);
}

// Used by tests to reset state between runs
export function _resetProofStore(): void {
  proofs.clear();
}
