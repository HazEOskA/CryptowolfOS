# Architecture Rules

WOLF Protocol is built architecture-first.

In AI systems, architecture is more important than prompting.

A prompt can generate output, but architecture decides whether the output belongs in the system, how it connects, what it is allowed to change, and how it can be verified.

---

## Core Principle

The model proposes.
The architecture decides.

No feature should be added only because it sounds useful.
Every feature must fit the system.

---

## Required Questions Before Code

Before implementing anything, answer:

1. Which layer owns this feature?
2. What problem does it solve?
3. What are its inputs?
4. What are its outputs?
5. What can fail?
6. What depends on it?
7. What does it depend on?
8. Can it work as an independent module?

If the answers are unclear, the feature is not ready.

---

## Protocol Layers

```txt
Execution Layer
Signal Layer
Agent Registry
```

A feature must belong to one of these layers or be clearly marked as:

- SDK
- dashboard
- integration
- research
- tooling

If it does not fit anywhere, it should stay outside the main protocol.

---

## Layer Ownership

### Agent Registry

Owns:

- agent identity
- owner wallet reference
- reputation
- task history
- payment identity
- agent status

Does not own:

- token scoring
- execution routing
- dashboard logic

### Signal Layer

Owns:

- token scoring
- protocol scoring
- risk categories
- signal explanations
- score freshness

Does not own:

- agent identity
- transaction routing
- payment settlement

### Execution Layer

Owns:

- execution validation
- transaction preparation
- routing policy
- proof creation
- settlement flow

Does not own:

- identity management
- score calculation
- unrelated strategy logic

---

## AI Development Rule

AI can help write code, docs, tests and ideas.

But AI must not silently change the architecture.

Every major change must update the relevant architecture document first.

Required order:

```txt
Architecture decision
↓
Interface definition
↓
Implementation
↓
Tests
↓
Documentation update
```

---

## MVP Rule

The MVP must prove this loop:

```txt
Agent → Signal → Execution Validation → Proof → Payment
```

Do not add advanced features until this loop works cleanly.

---

## Composability Rule

Each layer should be useful alone.

Examples:

```txt
A wallet can use only Signal Layer.
A bot can use only Execution Layer.
A marketplace can use only Agent Registry.
A full agent system can use all three.
```

---

## Final Rule

Architecture is the product.
Code is the implementation of the architecture.
