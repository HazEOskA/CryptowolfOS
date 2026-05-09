# WOLF Protocol Architecture

## Overview

WOLF Protocol is a three-layer infrastructure system for autonomous AI agents operating on Solana.

The protocol separates identity, intelligence, and execution into independent but composable layers.

```txt
User / Protocol / Project
        ↓
AI Agent
        ↓
Agent Registry
        ↓
Signal Layer
        ↓
Execution Layer
        ↓
Solana
```

---

## Design Principle

Each layer must be useful alone.

This prevents the protocol from becoming a closed monolith and allows third-party builders to adopt only the part they need.

---

## Layer 1 — Agent Registry

The Agent Registry provides persistent agent identity.

### Responsibilities

- register agent
- store owner wallet
- store metadata URI
- track reputation
- track task count
- expose agent status
- support payment address

### Initial Data Model

```ts
interface AgentProfile {
  id: string;
  owner: string;
  name: string;
  metadataUri: string;
  reputationScore: number;
  completedTasks: number;
  failedTasks: number;
  paymentAddress: string;
  status: "active" | "paused" | "banned";
  createdAt: number;
}
```

---

## Layer 2 — Signal Layer

The Signal Layer produces token and protocol quality intelligence.

### Responsibilities

- score tokens
- score protocols
- detect suspicious liquidity
- detect holder concentration
- detect fake volume patterns
- detect abnormal wallet flows
- return machine-readable risk output

### Initial Score Model

```ts
interface TokenSignalScore {
  tokenAddress: string;
  chain: "solana";
  score: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  liquidityScore: number;
  holderScore: number;
  volumeScore: number;
  socialScore: number;
  contractRiskScore: number;
  summary: string;
  updatedAt: number;
}
```

---

## Layer 3 — Execution Layer

The Execution Layer prepares and routes transactions with safety constraints.

### Responsibilities

- validate action before execution
- check Signal Layer before routing
- prepare transaction
- apply priority fee logic
- support MEV-aware routing
- return proof of execution
- trigger settlement

### Initial Execution Model

```ts
interface ExecutionRequest {
  agentId: string;
  actionType: "swap" | "monitor" | "market_make" | "rebalance";
  targetToken: string;
  amount?: string;
  maxSlippageBps?: number;
  minSignalScore?: number;
  requireProtectedRoute: boolean;
}
```

---

## MVP Architecture

The first version should not overbuild.

### MVP Components

- Anchor program for Agent Registry
- TypeScript Signal API
- Execution adapter mock
- Dashboard UI
- Agent SDK

### MVP Flow

```txt
Register Agent
     ↓
Request Token Score
     ↓
Create Execution Request
     ↓
Validate Score Threshold
     ↓
Submit Mock Protected Execution
     ↓
Store Execution Proof
```

---

## Future Architecture

Later versions can add:

- real MEV routing integrations
- agent marketplace
- staking / slashing
- protocol fee engine
- task escrow contracts
- reputation oracle
- cross-chain agent support
