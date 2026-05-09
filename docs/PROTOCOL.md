# WOLF Protocol Specification

## Protocol Goal

WOLF Protocol standardizes how autonomous AI agents register identity, evaluate crypto risk, execute actions, and receive payment on Solana.

---

## Core Entities

### Agent

An autonomous or semi-autonomous system that performs tasks.

Examples:

- trading agent
- monitoring agent
- market making agent
- portfolio rebalancing agent
- risk analysis agent

### Project

A protocol, token team, wallet, marketplace, or user that hires or integrates agents.

### Task

A defined unit of work assigned to an agent.

Examples:

- monitor token liquidity
- execute swap under constraints
- detect suspicious wallets
- provide token quality score
- rebalance position

### Signal

A machine-readable risk and quality assessment.

### Execution Proof

A record showing that an agent performed a validated action.

---

## Protocol Flow

```txt
1. Agent registers identity
2. Project creates task
3. Agent checks Signal Layer
4. Execution Layer validates constraints
5. Transaction/action executes
6. Proof is recorded
7. Payment is released
```

---

## Agent Registry Standard

### Required Fields

- agent id
- owner wallet
- name
- metadata URI
- payment address
- reputation score
- status

### Optional Fields

- supported task types
- social links
- model/provider metadata
- agent version
- public API endpoint

---

## Signal Layer Standard

### Required Output

```json
{
  "tokenAddress": "string",
  "chain": "solana",
  "score": 0,
  "riskLevel": "low | medium | high | critical",
  "summary": "string",
  "updatedAt": 0
}
```

### Score Range

```txt
0-20    critical
21-50   high
51-75   medium
76-100  low risk
```

### Recommended Categories

- liquidity quality
- holder distribution
- volume authenticity
- social momentum
- wallet behavior
- protocol trust
- contract/config risk

---

## Execution Layer Standard

### Execution Request

```json
{
  "agentId": "string",
  "actionType": "swap | monitor | market_make | rebalance",
  "targetToken": "string",
  "amount": "string",
  "maxSlippageBps": 100,
  "minSignalScore": 70,
  "requireProtectedRoute": true
}
```

### Execution Response

```json
{
  "status": "approved | rejected | executed | failed",
  "reason": "string",
  "signature": "string | null",
  "proofId": "string | null"
}
```

---

## Safety Rules

1. Execution must not happen if token score is below required threshold.
2. Agent status must be active.
3. Slippage must be bounded.
4. Risk output must be machine-readable.
5. Payment should require execution proof.
6. Critical-risk tokens should require explicit override.

---

## MVP Scope

The MVP should include:

- basic Agent Registry
- off-chain Signal API
- mocked protected execution adapter
- dashboard for agents and token scoring
- TypeScript SDK

The first version should prove the protocol flow, not perfect every economic mechanism.
