// WOLF Protocol — Core Types
// All protocol entities are defined here.

export type AgentStatus = "active" | "paused" | "banned";
export type RiskLevel = "low" | "medium" | "high" | "critical";
export type ExecutionStatus = "approved" | "rejected" | "executed" | "failed";
export type ActionType = "swap" | "monitor" | "market_make" | "rebalance";

export interface AgentProfile {
  id: string;
  owner: string;
  name: string;
  metadataUri: string;
  reputationScore: number;
  completedTasks: number;
  failedTasks: number;
  paymentAddress: string;
  status: AgentStatus;
  createdAt: number;
}

export interface TokenSignalScore {
  tokenAddress: string;
  chain: "solana";
  score: number; // 0–100
  riskLevel: RiskLevel;
  liquidityScore: number;
  holderScore: number;
  volumeScore: number;
  socialScore: number;
  contractRiskScore: number;
  summary: string;
  updatedAt: number;
}

export interface ExecutionRequest {
  agentId: string;
  actionType: ActionType;
  targetToken: string;
  amount?: string;
  maxSlippageBps?: number;
  minSignalScore?: number;
  requireProtectedRoute: boolean;
}

export interface ExecutionResponse {
  status: ExecutionStatus;
  reason: string;
  signature: string | null;
  proofId: string | null;
}

export interface ExecutionProof {
  id: string;
  agentId: string;
  targetToken: string;
  actionType: ActionType;
  status: ExecutionStatus;
  signature: string | null;
  createdAt: number;
}
