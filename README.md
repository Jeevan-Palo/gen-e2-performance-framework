# Gen-e2 Performance — Recommended Framework

This is an **additive reference framework** derived from the reviewed `perf-harness` PoC and aligned to the existing Gen-e2 Performance architecture.

It is intentionally **not a replacement repository**. The existing Gen-e2 governance, lifecycle, approval, hashing, schema validation, audit, identity and execution-authorisation implementations remain authoritative and should be reused rather than duplicated.

## Design goals

- TypeScript / Node.js engine runtime.
- Engine-neutral core; k6 is the first adapter.
- Evidence-first requirements and provenance.
- BRD/source material stays in `input/`; normalized requirements live in `requirements/`.
- Analysis and clarification questions are persisted separately.
- API/business transaction mapping is a human-reviewable contract.
- Workload values and thresholds are never invented.
- Plan is generated from structured requirements and workload model.
- Existing hardened approval mechanism remains the only approval mechanism.
- Generation and validation consume a freshly revalidated approved plan.
- Execution produces immutable-style run artifacts with engine/version, script version, plan hash, workload, environment and evidence metadata.

## Lifecycle

```text
INPUT
  ↓
REQUIREMENT ANALYSIS
  ↓
PERFORMANCE REQUIREMENTS
  ↓
WORKLOAD MODEL
  ↓
PLAN
  ↓
EXISTING HUMAN APPROVAL GATE
  ↓
GENERATION
  ↓
VALIDATION
  ↓
EXISTING EXECUTION AUTHORISATION / SAFETY GATE
  ↓
EXECUTE
  ↓
OBSERVE
  ↓
ANALYSE
  ↓
REPORT
  ↓
LEARN / HISTORY
```

## What came from the PoC

The PoC's strongest ideas are retained as concepts:

- source evidence and provenance
- `open-items.md`
- environment contract
- API/business transaction catalogue
- `safe_to_load` / side-effect metadata
- requirement → metric traceability
- gradual load execution concept
- run folders with `run.json` and result evidence

The following are deliberately **not** copied:

- Python as the core runtime
- BRD as the canonical internal model
- k6 as the platform architecture
- a second approval implementation
- duplicated policy logic across prompts/skills/tools

## Integration rule

Copy the additive modules into the existing `gen-e2-performance` repository only after reviewing the integration map in `docs/INTEGRATION.md`. Do not overwrite existing M1/M1.1 governance files.
