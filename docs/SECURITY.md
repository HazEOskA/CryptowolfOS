# WOLF Protocol Security Notes

## Security Philosophy

WOLF Protocol should be designed as infrastructure, not as a hype bot.

The system must block unsafe execution before money moves.

---

## Key Risks

### 1. Bad Agent Behavior

Agents can make poor decisions, hallucinate strategy, or operate outside their intended scope.

Mitigation:

- registry status checks
- permission profiles
- reputation tracking
- task constraints
- execution proof requirements

---

### 2. Bad Token Data

A token can look safe while hiding liquidity traps, fake volume, or coordinated holder behavior.

Mitigation:

- multi-factor scoring
- freshness checks
- critical-risk override rules
- score explanation output

---

### 3. MEV and Transaction Attacks

Transactions can be front-run, sandwiched, or executed with poor routing.

Mitigation:

- max slippage rules
- priority fee policy
- protected execution adapters
- transaction simulation before send

---

### 4. Payment Abuse

Agents may claim completion without doing useful work.

Mitigation:

- execution proof
- task validation
- escrow-based payment
- reputation penalty

---

### 5. Centralized Signal Manipulation

If one scoring service controls all risk results, it becomes a trust bottleneck.

Mitigation:

- transparent scoring categories
- explainable score output
- future multi-oracle design
- signed score attestations

---

## MVP Safety Rules

For the MVP:

1. Never execute if signal score is below threshold.
2. Never execute if agent is inactive.
3. Never execute without bounded slippage.
4. Never mark task complete without proof.
5. Never treat mock scoring as production security.

---

## Non-Goals For MVP

The MVP does not claim to provide full MEV protection, full rug detection, or financial safety.

The MVP proves architecture and workflow only.

---

## Production Requirements

Before real funds are used, the protocol needs:

- smart contract audit
- transaction simulation
- score manipulation testing
- adversarial token testing
- failure-mode testing
- rate limits
- monitoring
- emergency pause mechanism
