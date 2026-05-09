# Agent Registry Program

Solana program responsible for persistent AI agent identity.

## Purpose

The Agent Registry stores verified agent profiles that can be used by protocols, wallets, dashboards, and execution systems.

## MVP Responsibilities

- register agent
- store owner wallet
- store metadata URI
- track reputation score
- track completed and failed tasks
- expose agent status

## Initial Account Model

```ts
interface AgentProfile {
  owner: string;
  name: string;
  metadataUri: string;
  reputationScore: number;
  completedTasks: number;
  failedTasks: number;
  paymentAddress: string;
  status: "active" | "paused" | "banned";
}
```

## Build Order

1. Define account model
2. Implement register agent instruction
3. Implement update status instruction
4. Implement task result counters
5. Add tests on Solana devnet
