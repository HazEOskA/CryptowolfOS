# Architecture Decision Log

This file stores important project decisions.

AI tools, contributors, and future sessions must treat this file as project memory.

---

## Decision 001 — Architecture First

Status: accepted

WOLF Protocol must be developed architecture-first.

Order:

```txt
Architecture → Management → Prompt → AI Execution → Validation → Documentation
```

Reason:

AI-generated work without architectural control creates inconsistent systems.

---

## Decision 002 — Three Core Layers

Status: accepted

WOLF Protocol has three core layers:

```txt
Agent Registry
Signal Layer
Execution Layer
```

Reason:

This separates identity, intelligence, and execution.

---

## Decision 003 — MVP Uses Mock Execution

Status: accepted

The first MVP will not perform real trades or wallet signing.

It will use deterministic mock execution to prove the protocol flow.

Reason:

Real funds, private keys, and mainnet routing should not be added before the architecture, tests, and security model are stable.

---

## Decision 004 — Signal Layer Blocks Unsafe Execution

Status: accepted

Execution must check the Signal Layer before approving actions.

If token score is below the required threshold, execution must be rejected.

Reason:

The protocol must prove that risk intelligence can control agent behavior.

---

## Decision 005 — Each Layer Must Be Composable

Status: accepted

Each layer should be useful independently.

Examples:

- wallet uses Signal Layer only
- marketplace uses Agent Registry only
- bot uses Execution Layer only
- full system uses all layers

Reason:

Composable layers create stronger adoption paths and prevent monolithic architecture.

---

## Decision 006 — AI Does Not Own System Truth

Status: accepted

AI can generate code, docs, tests and ideas.

AI cannot silently change the architecture.

Major system changes must update architecture docs and this decision log.

Reason:

The project needs deterministic memory and decision continuity.
