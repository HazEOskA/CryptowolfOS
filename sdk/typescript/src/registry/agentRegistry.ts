// WOLF Protocol — Layer 1: Agent Registry
// Each agent gets a persistent on-chain identity (mock in-memory for MVP).

import { AgentProfile, AgentStatus } from "../types.js";

// In-memory store. Will be replaced by Solana program account reads.
const agents = new Map<string, AgentProfile>();

let idCounter = 1;

function generateId(): string {
  return `agent_${String(idCounter++).padStart(4, "0")}`;
}

export interface RegisterAgentInput {
  owner: string;
  name: string;
  metadataUri: string;
  paymentAddress: string;
}

export function registerAgent(input: RegisterAgentInput): AgentProfile {
  const agent: AgentProfile = {
    id: generateId(),
    owner: input.owner,
    name: input.name,
    metadataUri: input.metadataUri,
    paymentAddress: input.paymentAddress,
    reputationScore: 100,
    completedTasks: 0,
    failedTasks: 0,
    status: "active",
    createdAt: Date.now(),
  };

  agents.set(agent.id, agent);
  return agent;
}

export function getAgent(id: string): AgentProfile | null {
  return agents.get(id) ?? null;
}

export function setAgentStatus(id: string, status: AgentStatus): AgentProfile {
  const agent = agents.get(id);
  if (!agent) throw new Error(`Agent not found: ${id}`);
  agent.status = status;
  return agent;
}

export function listAgents(): AgentProfile[] {
  return Array.from(agents.values());
}

// Used by tests to reset state between runs
export function _resetRegistry(): void {
  agents.clear();
  idCounter = 1;
}
