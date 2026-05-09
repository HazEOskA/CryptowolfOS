# AI Project Workflow

This is the default workflow for every serious AI-assisted project.

The order is not optional.

```txt
Architecture
↓
Management
↓
Prompt
↓
AI Execution
↓
Validation
↓
Documentation
```

---

## 1. Architecture

Architecture comes first.

Before writing code or asking AI to generate anything, define the system.

Required questions:

- What are we building?
- What problem does it solve?
- What are the core layers?
- What belongs inside the system?
- What stays outside?
- What are the inputs and outputs?
- What can fail?
- What must not be changed by AI automatically?

Architecture decides the shape of the project.

---

## 2. Management

Management turns architecture into controlled work.

This includes:

- task breakdown
- roadmap
- priorities
- scope control
- version planning
- issue tracking
- decision logs
- progress checkpoints

Management prevents the project from becoming a pile of random generated files.

---

## 3. Prompt

Prompt is not the brain of the project.

Prompt is the instruction layer that tells AI how to work inside the architecture.

A good prompt must include:

- project goal
- architecture rules
- allowed scope
- forbidden changes
- expected output
- testing requirements
- documentation requirements

AI should receive structure, not vague inspiration.

---

## 4. AI Execution

AI writes code, docs, tests, examples and drafts.

AI does not own the system truth.

AI execution must follow:

- existing architecture
- current roadmap
- defined interfaces
- safety rules
- test requirements

If AI output conflicts with architecture, architecture wins.

---

## 5. Validation

Every output must be checked.

Validation includes:

- does it fit the architecture?
- does it solve the correct task?
- does it break existing modules?
- does it pass tests?
- does it add unnecessary complexity?
- does documentation match the change?

No validation means no trust.

---

## 6. Documentation

Every important change should leave a trace.

Update:

- architecture docs
- roadmap
- protocol docs
- README
- decision notes
- prompts

Documentation keeps the project memory stable.

---

## Core Rule

```txt
Architecture manages AI.
Prompt controls AI.
AI executes work.
Validation protects the project.
```

---

## Working Principle

For serious projects, never start from code.

Start from the system.
Then manage the system.
Then prompt the AI.
Then let AI execute inside defined boundaries.
