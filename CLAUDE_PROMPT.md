# Claude Implementation Prompt — WOLF Protocol MVP

You are working inside the WOLF Protocol repository.

Your job is to turn the current documentation into a clean MVP codebase.

Do not overbuild.
Do not invent unrelated features.
Do not rename the protocol.
Do not turn this into a generic trading bot.

WOLF Protocol is infrastructure for autonomous AI agent economy on Solana.

It has three layers:

1. Agent Registry
2. Signal Layer
3. Execution Layer

The first working loop must be:

```txt
Agent → Signal → Execution Validation → Proof → Payment
```

---

## Repository Context

Read these files first:

- README.md
- docs/ARCHITECTURE.md
- docs/PROTOCOL.md
- docs/ROADMAP.md
- docs/SECURITY.md

Use them as the source of truth.

---

## Goal

Create a working MVP scaffold with:

- TypeScript SDK
- mock Signal Layer
- mock Execution Layer
- basic Agent Registry module
- simple dashboard-ready API structure
- clear types
- tests for the core protocol flow

This MVP should prove the protocol flow before adding real Solana transactions.

---

## Required Structure

Create or complete this structure:

```txt
wolf-protocol/
├── package.json
├── tsconfig.json
├── README.md
├── docs/
├── src/
│   ├── index.ts
│   ├── types.ts
│   ├── registry/
│   │   └── agentRegistry.ts
│   ├── signal/
│   │   └── signalEngine.ts
│   ├── execution/
│   │   └── executionEngine.ts
│   └── proof/
│       └── proofStore.ts
├── tests/
│   └── protocol-flow.test.ts
├── programs/
│   ├── agent-registry/
│   ├── signal-layer/
│   └── execution-layer/
├── sdk/
│   └── typescript/
├── app/
│   └── dashboard/
└── agents/
    └── examples/
```

---

## Type Definitions

Implement strong TypeScript types for:

```ts
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
  score: number;
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
```

---

## Modules To Implement

### 1. Agent Registry

File:

```txt
src/registry/agentRegistry.ts
```

Functions:

```ts
registerAgent(input): AgentProfile
getAgent(id): AgentProfile | null
setAgentStatus(id, status): AgentProfile
listAgents(): AgentProfile[]
```

Use in-memory storage for MVP.

---

### 2. Signal Engine

File:

```txt
src/signal/signalEngine.ts
```

Functions:

```ts
getTokenSignal(tokenAddress: string): TokenSignalScore
calculateRiskLevel(score: number): RiskLevel
```

Use deterministic mock logic.

Important rule:

- score 0-20 = critical
- score 21-50 = high
- score 51-75 = medium
- score 76-100 = low

---

### 3. Execution Engine

File:

```txt
src/execution/executionEngine.ts
```

Function:

```ts
createExecutionRequest(request: ExecutionRequest): ExecutionResponse
```

Rules:

1. Reject if agent does not exist.
2. Reject if agent is not active.
3. Reject if token signal score is below minSignalScore.
4. Reject if maxSlippageBps is missing for swap actions.
5. If valid, return executed response with mock signature and proof id.

---

### 4. Proof Store

File:

```txt
src/proof/proofStore.ts
```

Functions:

```ts
storeProof(proof): ExecutionProof
getProof(id): ExecutionProof | null
listProofsByAgent(agentId): ExecutionProof[]
```

Use in-memory storage for MVP.

---

## Tests

Create test file:

```txt
tests/protocol-flow.test.ts
```

Test cases:

1. Can register an agent.
2. Can get a token signal score.
3. Rejects execution if agent does not exist.
4. Rejects execution if agent is paused.
5. Rejects execution if token score is below threshold.
6. Rejects swap without maxSlippageBps.
7. Executes valid request.
8. Stores execution proof.

Use Vitest.

---

## package.json

Use:

- TypeScript
- Vitest
- tsx

Scripts:

```json
{
  "dev": "tsx src/index.ts",
  "build": "tsc",
  "test": "vitest run",
  "typecheck": "tsc --noEmit"
}
```

---

## Output Rules

When implementing:

1. Keep code small and clean.
2. Prefer readable functions over clever abstractions.
3. Add comments only where they clarify protocol logic.
4. Do not add real trading execution yet.
5. Do not add private keys, RPC keys, or wallet signing.
6. Do not create fake security claims.
7. Keep MVP local and deterministic.

---

## Final Deliverable

After implementation, provide:

- list of created files
- how to install dependencies
- how to run tests
- what the MVP currently proves
- what should be added next

The goal is not hype.
The goal is a clean first protocol skeleton that can evolve into Solana Anchor programs later.
