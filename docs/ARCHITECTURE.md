# Architecture

```text
                         ┌─────────────────────┐
                         │ Source Inputs       │
                         │ BRD / meeting /     │
                         │ technical docs      │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Requirement Analysis│
                         │ evidence + status   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Performance         │
                         │ Requirements        │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┴──────────────┐
                    ▼                              ▼
          ┌─────────────────┐             ┌─────────────────┐
          │ Workload Model  │             │ Transactions    │
          │ source-bound    │             │ human approved  │
          └────────┬────────┘             └────────┬────────┘
                   └───────────────┬──────────────┘
                                   ▼
                         ┌─────────────────────┐
                         │ Test Plan           │
                         │ hashed/versioned    │
                         └──────────┬──────────┘
                                    ▼
                         EXISTING APPROVAL GATE
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Engine Adapter      │
                         │ k6 first            │
                         └──────────┬──────────┘
                                    ▼
                         ┌─────────────────────┐
                         │ Independent         │
                         │ Validation          │
                         └──────────┬──────────┘
                                    ▼
                       EXISTING EXECUTION GATE
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Run + Evidence      │
                         └─────────────────────┘
```

## Separation of concerns

### Core domain

Requirements, workload, transactions and plans are engine-neutral.

### Adapter layer

The adapter translates an approved plan into a specific engine artifact.

### Governance

Approval and execution authorization remain centralized in the existing Gen-e2 implementation.

### Evidence

Every stage keeps provenance so later analysis can distinguish facts, metrics, AI hypotheses, recommendations and confirmed root causes.
