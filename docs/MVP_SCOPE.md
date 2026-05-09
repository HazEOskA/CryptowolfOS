# MVP Scope

This document defines what the first WOLF Protocol MVP must prove.

The MVP is not a full production protocol.
It is the smallest clean version of the system that proves the core architecture.

---

## MVP Goal

Prove this loop:

```txt
Agent → Signal → Execution Validation → Proof → Payment
```

The first MVP can use mock execution and in-memory storage.
The architecture must remain compatible with future Solana Anchor programs.

---

## In Scope

### 1. Agent Registry

Required:

- register agent
- get agent by id
- list agents
- update agent status
- store basic reputation fields

Storage:

- in-memory for MVP
- future: Solana account model

---

### 2. Signal Layer

Required:

- return deterministic token score
- calculate risk level
- block unsafe execution based on score threshold
- return score explanation

Storage:

- mock deterministic engine for MVP
- future: live data engine and signed attestations

---

### 3. Execution Layer

Required:

- validate agent existence
- validate agent status
- validate token score threshold
- validate slippage rules for swap actions
- return mock execution signature
- create proof id

Storage:

- in-memory for MVP
- future: on-chain proof account

---

### 4. Proof Store

Required:

- store proof
- get proof by id
- list proofs by agent

---

### 5. Tests

Required tests:

- agent registration
- token signal generation
- execution rejection for missing agent
- execution rejection for paused agent
- execution rejection for low score
- execution rejection for swap without slippage
- valid execution
- proof storage

---

## Out Of Scope For MVP

Do not add yet:

- real trading
- wallet signing
- private key handling
- mainnet execution
- token launch mechanics
- advanced dashboard
- staking
- slashing
- protocol token
- real MEV routing
- paid marketplace

These belong to later phases.

---

## MVP Success Criteria

The MVP is successful when:

1. The TypeScript project builds.
2. Tests pass.
3. Agent can be registered.
4. Token can be scored.
5. Execution can be approved or rejected by rules.
6. Proof can be stored after valid execution.
7. The code matches the architecture docs.

---

## Development Rule

If a feature does not help prove the core loop, it should not enter the MVP.
