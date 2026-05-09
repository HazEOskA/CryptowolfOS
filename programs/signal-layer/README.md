# Signal Layer

Risk and quality intelligence layer for crypto agents.

## Purpose

The Signal Layer gives AI agents a machine-readable risk score before they execute an action.

## MVP Inputs

- liquidity quality
- holder distribution
- volume quality
- token age
- social momentum
- abnormal wallet behavior
- protocol trust

## MVP Output

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

## Build Order

1. Start with mock scoring engine
2. Add rule-based risk categories
3. Connect public data sources
4. Add explainable score output
5. Add signed score attestation later
