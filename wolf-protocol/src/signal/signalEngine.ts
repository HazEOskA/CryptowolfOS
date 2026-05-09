// WOLF Protocol — Layer 2: Signal Engine
// Scores tokens before agent execution. Deterministic mock for MVP.

import { TokenSignalScore, RiskLevel } from "../types.js";

export function calculateRiskLevel(score: number): RiskLevel {
  if (score <= 20) return "critical";
  if (score <= 50) return "high";
  if (score <= 75) return "medium";
  return "low";
}

// Deterministic score derived from token address string.
// Real implementation will query on-chain data + external APIs.
function deterministicScore(tokenAddress: string): number {
  let hash = 0;
  for (let i = 0; i < tokenAddress.length; i++) {
    hash = (hash * 31 + tokenAddress.charCodeAt(i)) & 0xffffffff;
  }
  // Map to 1–100 range, avoiding 0
  return (Math.abs(hash) % 100) + 1;
}

export function getTokenSignal(tokenAddress: string): TokenSignalScore {
  const base = deterministicScore(tokenAddress);

  // Sub-scores derived from base with slight offsets for realism
  const liquidityScore = Math.min(100, Math.max(1, base + 5));
  const holderScore = Math.min(100, Math.max(1, base - 8));
  const volumeScore = Math.min(100, Math.max(1, base + 2));
  const socialScore = Math.min(100, Math.max(1, base - 3));
  const contractRiskScore = Math.min(100, Math.max(1, base + 1));

  const score = Math.round(
    (liquidityScore + holderScore + volumeScore + socialScore + contractRiskScore) / 5
  );

  const riskLevel = calculateRiskLevel(score);

  const summaries: Record<RiskLevel, string> = {
    low: "Token appears safe. Liquidity healthy, holder distribution normal.",
    medium: "Moderate risk. Proceed with caution and reasonable position sizing.",
    high: "High risk detected. Unusual wallet behavior or thin liquidity.",
    critical: "Do not execute. Likely scam or rug-pull pattern detected.",
  };

  return {
    tokenAddress,
    chain: "solana",
    score,
    riskLevel,
    liquidityScore,
    holderScore,
    volumeScore,
    socialScore,
    contractRiskScore,
    summary: summaries[riskLevel],
    updatedAt: Date.now(),
  };
}
