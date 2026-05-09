# WOLF Protocol TypeScript SDK

TypeScript SDK and MVP protocol engine for WOLF Protocol.

This module contains the first executable version of the protocol flow:

```txt
Agent Registry → Signal Layer → Execution Layer → Proof Store
```

---

## Install

```bash
npm install
```

---

## Run MVP demo

```bash
npm run dev
```

---

## Run tests

```bash
npm test
```

---

## Typecheck

```bash
npm run typecheck
```

---

## Build

```bash
npm run build
```

---

## Current MVP Modules

```txt
src/
├── registry/
│   └── agentRegistry.ts
├── signal/
│   └── signalEngine.ts
├── execution/
│   └── executionEngine.ts
├── proof/
│   └── proofStore.ts
├── types.ts
└── index.ts
```

---

## Core Functions

### Agent Registry

- `registerAgent()`
- `getAgent()`
- `setAgentStatus()`
- `listAgents()`

### Signal Layer

- `getTokenSignal()`
- `calculateRiskLevel()`

### Execution Layer

- `createExecutionRequest()`

### Proof Store

- `storeProof()`
- `getProof()`
- `listProofsByAgent()`

---

## MVP Safety Rules

The execution engine rejects requests when:

1. agent does not exist
2. agent is not active
3. token signal score is below the required threshold
4. swap request has no `maxSlippageBps`

Successful execution stores a proof object.

---

## Next Build Targets

1. replace in-memory stores with Solana-backed accounts
2. replace mock signal engine with real data sources
3. add execution adapters for real transaction routes
4. add SDK client wrapper
5. add Anchor program integration
