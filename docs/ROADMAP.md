# WOLF Protocol Roadmap

## Phase 0 — Foundation

Goal: create a clear protocol base.

- define core concept
- create repository structure
- write architecture docs
- write protocol specification
- define MVP scope
- define safety assumptions

Status: in progress

---

## Phase 1 — MVP Prototype

Goal: prove the full agent workflow.

### Deliverables

- Agent Registry mock or Anchor starter
- Signal Layer TypeScript API
- token score mock engine
- Execution Layer adapter mock
- dashboard prototype
- SDK functions:
  - registerAgent
  - getAgent
  - getTokenSignal
  - createExecutionRequest
  - submitExecutionProof

### Success Criteria

- agent can be registered
- token can receive score
- execution request can be validated
- unsafe token can be blocked
- proof can be stored

---

## Phase 2 — Solana Devnet

Goal: move core registry and proof logic on-chain.

### Deliverables

- Anchor Agent Registry program
- task proof account model
- basic payment escrow
- devnet deployment
- CLI scripts
- integration tests

### Success Criteria

- agent identity exists on devnet
- task proof can be recorded
- payment can be simulated
- SDK can read/write protocol data

---

## Phase 3 — Real Signal Engine

Goal: replace mock scoring with real data sources.

### Possible Inputs

- liquidity data
- holder distribution
- DEX volume
- wallet behavior
- token age
- social signals
- protocol metadata

### Success Criteria

- score updates from live data
- risk reasons are explainable
- score can be consumed by agents

---

## Phase 4 — Protected Execution

Goal: add real execution integrations.

### Deliverables

- Solana transaction builder
- routing adapter
- priority fee module
- slippage guard
- protected route interface

### Success Criteria

- execution request produces valid transaction
- transaction obeys risk constraints
- execution proof links to signature

---

## Phase 5 — Ecosystem

Goal: turn WOLF Protocol into a platform.

### Deliverables

- agent marketplace
- project task board
- public API
- protocol fee model
- reputation analytics
- third-party integrations

---

## Build Rule

Do not overbuild before proving the loop.

The first working loop is:

```txt
Agent → Signal → Execution Validation → Proof → Payment
```
