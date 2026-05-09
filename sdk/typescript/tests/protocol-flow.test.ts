// WOLF Protocol — Protocol Flow Tests
// Covers all 8 required MVP test cases.

import { describe, it, expect, beforeEach } from "vitest";
import { registerAgent, getAgent, setAgentStatus, _resetRegistry } from "../src/registry/agentRegistry.js";
import { getTokenSignal, calculateRiskLevel } from "../src/signal/signalEngine.js";
import { createExecutionRequest } from "../src/execution/executionEngine.js";
import { getProof, listProofsByAgent, _resetProofStore } from "../src/proof/proofStore.js";

const HIGH_SCORE_TOKEN = "So11111111111111111111111111111111111111112";

beforeEach(() => {
  _resetRegistry();
  _resetProofStore();
});

describe("1. Agent Registration", () => {
  it("can register an agent and retrieve it", () => {
    const agent = registerAgent({
      owner: "ownerWallet123",
      name: "TestAgent",
      metadataUri: "https://example.com/agent.json",
      paymentAddress: "paymentWallet123",
    });

    expect(agent.id).toBeDefined();
    expect(agent.name).toBe("TestAgent");
    expect(agent.status).toBe("active");
    expect(agent.reputationScore).toBe(100);

    const fetched = getAgent(agent.id);
    expect(fetched).not.toBeNull();
    expect(fetched?.id).toBe(agent.id);
  });
});

describe("2. Token Signal Score", () => {
  it("returns a valid signal score for any token address", () => {
    const signal = getTokenSignal(HIGH_SCORE_TOKEN);

    expect(signal.tokenAddress).toBe(HIGH_SCORE_TOKEN);
    expect(signal.chain).toBe("solana");
    expect(signal.score).toBeGreaterThanOrEqual(1);
    expect(signal.score).toBeLessThanOrEqual(100);
    expect(["low", "medium", "high", "critical"]).toContain(signal.riskLevel);
    expect(signal.summary).toBeTruthy();
  });

  it("maps scores to correct risk levels", () => {
    expect(calculateRiskLevel(10)).toBe("critical");
    expect(calculateRiskLevel(20)).toBe("critical");
    expect(calculateRiskLevel(21)).toBe("high");
    expect(calculateRiskLevel(50)).toBe("high");
    expect(calculateRiskLevel(51)).toBe("medium");
    expect(calculateRiskLevel(75)).toBe("medium");
    expect(calculateRiskLevel(76)).toBe("low");
    expect(calculateRiskLevel(100)).toBe("low");
  });
});

describe("3. Rejects execution if agent does not exist", () => {
  it("returns rejected status for unknown agent", () => {
    const result = createExecutionRequest({
      agentId: "agent_9999",
      actionType: "monitor",
      targetToken: HIGH_SCORE_TOKEN,
      requireProtectedRoute: false,
    });

    expect(result.status).toBe("rejected");
    expect(result.reason).toMatch(/not found/i);
    expect(result.signature).toBeNull();
    expect(result.proofId).toBeNull();
  });
});

describe("4. Rejects execution if agent is paused", () => {
  it("returns rejected status for paused agent", () => {
    const agent = registerAgent({
      owner: "owner",
      name: "PausedAgent",
      metadataUri: "https://example.com",
      paymentAddress: "pay",
    });

    setAgentStatus(agent.id, "paused");

    const result = createExecutionRequest({
      agentId: agent.id,
      actionType: "monitor",
      targetToken: HIGH_SCORE_TOKEN,
      requireProtectedRoute: false,
    });

    expect(result.status).toBe("rejected");
    expect(result.reason).toMatch(/paused/i);
  });
});

describe("5. Rejects execution if token score is below threshold", () => {
  it("rejects when minSignalScore is set higher than token score", () => {
    const agent = registerAgent({
      owner: "owner",
      name: "StrictAgent",
      metadataUri: "https://example.com",
      paymentAddress: "pay",
    });

    const result = createExecutionRequest({
      agentId: agent.id,
      actionType: "monitor",
      targetToken: HIGH_SCORE_TOKEN,
      minSignalScore: 999,
      requireProtectedRoute: false,
    });

    expect(result.status).toBe("rejected");
    expect(result.reason).toMatch(/signal too low/i);
  });
});

describe("6. Rejects swap without maxSlippageBps", () => {
  it("rejects swap action when maxSlippageBps is missing", () => {
    const agent = registerAgent({
      owner: "owner",
      name: "SwapAgent",
      metadataUri: "https://example.com",
      paymentAddress: "pay",
    });

    const result = createExecutionRequest({
      agentId: agent.id,
      actionType: "swap",
      targetToken: HIGH_SCORE_TOKEN,
      minSignalScore: 1,
      requireProtectedRoute: false,
    });

    expect(result.status).toBe("rejected");
    expect(result.reason).toMatch(/maxSlippageBps/i);
  });
});

describe("7. Executes valid request", () => {
  it("returns executed status with signature and proofId", () => {
    const agent = registerAgent({
      owner: "owner",
      name: "ValidAgent",
      metadataUri: "https://example.com",
      paymentAddress: "pay",
    });

    const result = createExecutionRequest({
      agentId: agent.id,
      actionType: "swap",
      targetToken: HIGH_SCORE_TOKEN,
      amount: "1.0",
      maxSlippageBps: 50,
      minSignalScore: 1,
      requireProtectedRoute: true,
    });

    expect(result.status).toBe("executed");
    expect(result.signature).not.toBeNull();
    expect(result.proofId).not.toBeNull();
  });
});

describe("8. Stores execution proof", () => {
  it("proof is retrievable after successful execution", () => {
    const agent = registerAgent({
      owner: "owner",
      name: "ProofAgent",
      metadataUri: "https://example.com",
      paymentAddress: "pay",
    });

    const result = createExecutionRequest({
      agentId: agent.id,
      actionType: "rebalance",
      targetToken: HIGH_SCORE_TOKEN,
      minSignalScore: 1,
      requireProtectedRoute: false,
    });

    expect(result.proofId).not.toBeNull();

    const proof = getProof(result.proofId!);
    expect(proof).not.toBeNull();
    expect(proof?.agentId).toBe(agent.id);
    expect(proof?.status).toBe("executed");

    const agentProofs = listProofsByAgent(agent.id);
    expect(agentProofs.length).toBe(1);
  });
});
