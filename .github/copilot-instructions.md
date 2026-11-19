# Gen-e2 Performance Framework Instructions

## Non-negotiable rules

- TypeScript / Node.js is the core runtime.
- k6 is the first performance engine adapter.
- Do not invent endpoints, credentials, workload values, thresholds, test data or abort limits.
- Every requirement and transaction mapping needs provenance.
- Missing information becomes an open item, not an assumption.
- Candidate APIs remain candidates until owner approval.
- Human approval is mandatory before plan finalisation and execution.
- Reuse the existing Gen-e2 approval, hashing, audit, identity and execution-authorisation implementations.
- Never create a second approval mechanism.
- Generation and validation must re-check the current plan/approval state.
- Secrets must come from runtime environment variables and never be persisted in generated scripts or run evidence.
- Performance evidence must distinguish facts, metrics, hypotheses, recommendations and confirmed root causes.

## Preferred workflow

`/intake` → `/analyse-requirements` → `/build-workload` → `/build-plan` → existing approval → `/generate-k6` → `/validate-k6` → existing execution authorization → `/run-test` → `/analyse-results` → `/report`
