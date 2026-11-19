# Integration Map

## Existing Gen-e2 components to reuse

| Concern | Existing Gen-e2 component | This framework |
|---|---|---|
| Canonical requirement model | `engine/src/requirement/performance-requirement.ts` | Keep existing model authoritative; framework includes a reference-compatible model only |
| Requirement analysis | `engine/src/requirement/analyze-requirement.ts` | Extend existing implementation with evidence/status rules |
| Approval | `engine/src/approval/approval-record.ts` / existing approval gate | **Do not duplicate** |
| Canonical hashing | `engine/src/approval/canonical-hash.ts` | **Do not duplicate** |
| Plan | `engine/src/planning/build-plan.ts` | Extend existing plan only where required |
| Lifecycle | existing state machine | Generation/validation should integrate as additive stages |
| Schema validation | existing schema validator | Reuse |
| Audit | existing audit implementation | Reuse |
| Execution authorisation | existing execution authorisation/gate | Reuse |

## Additive modules

- `engine/src/transaction/*`
- `engine/src/generation/*`
- `engine/src/validation/*`
- `engine/src/execution/run-record.ts`

## Project input layout

```text
projects/<app>/
├── input/                 # Original BRD / source files; never generated
├── requirements/          # Normalized Gen-e2 performance requirements
├── analysis/              # Requirement-analysis output
├── open-items.md          # Outstanding clarification questions
├── transactions/          # Human-reviewable transaction/API mappings
├── environment.yaml       # Target environment contract
├── approval.json          # Existing hardened approval record
├── plan.md                # Existing hashed plan
├── generated/             # Generated engine artifacts
└── runs/                  # Execution evidence
```

## Migration from perf-harness

| perf-harness artifact | Gen-e2 destination |
|---|---|
| `brd.yaml` | `input/` + `requirements/` + `analysis/` |
| `open-items.md` | `open-items.md` |
| `environments.yaml` | `environment.yaml` |
| `api-catalogue.yaml` | `transactions/` |
| `requirement-map.yaml` | requirement evidence / metric mappings |
| `tools/runk6.py` | k6 adapter + existing execution governance |
| `runs/*` | `runs/*` |
| Copilot skills | `.github/skills/` |

## Important

Do not migrate the PoC's approval records, Python execution wrapper, or lifecycle rules as-is. The hardened Gen-e2 governance is the source of truth.
