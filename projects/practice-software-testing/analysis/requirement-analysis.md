# Requirement Analysis — practice-software-testing

Produced by `/analyse-requirements`, consuming `analysis/intake-notes.md` (source evidence) and the engine's `analyzeRequirements()` (`engine/src/requirement/analyze-requirement.ts`) as the mechanical baseline. Output: `requirements/performance-requirements.yaml` (validated against `schemas/performance-requirement.schema.json`).

## Normalized requirements and status

All 8 requirements are sourced from BRD Section 9 (Non-Functional / Performance Requirements). Each is structurally complete (metric, target, evidence all present), so the engine's field-presence check alone returns `READY` for every one of them. That mechanical result is **not** sufficient here and has been overridden:

| ID | Transaction | Metric | Target | Engine (field-presence) | Final status | Why overridden |
|---|---|---|---|---|---|---|
| PST-NFR-001 | CAND-T1 | response_time P95 | 2000ms | READY | **NEEDS_CLARIFICATION** | BRD labels this row "PROPOSED – sample value; owner approval required" |
| PST-NFR-002 | CAND-T1 | response_time P95 | 2000ms | READY | **NEEDS_CLARIFICATION** | same |
| PST-NFR-003 | CAND-T2 | response_time P95 | 2500ms | READY | **NEEDS_CLARIFICATION** | same |
| PST-NFR-004 | CAND-T2 | response_time P95 | 2500ms | READY | **NEEDS_CLARIFICATION** | same |
| PST-NFR-005 | CAND-T3 | response_time P95 | 2000ms | READY | **NEEDS_CLARIFICATION** | same |
| PST-NFR-006 | CAND-T3 | response_time P95 | 2500ms | READY | **NEEDS_CLARIFICATION** | same |
| PST-NFR-007 | SYSTEM | error_rate | <1% | READY | **NEEDS_CLARIFICATION** | same |
| PST-NFR-008 | SYSTEM | availability | no sustained outage | READY | **NEEDS_CLARIFICATION** | BRD states the monitoring/abort rule for this row is not yet defined |

Reasoning for the override: the framework's non-negotiable rules state that "candidate APIs remain candidates until owner approval" and missing information "becomes an open item, not an assumption." The BRD itself labels every one of these values as unapproved (`confirmationStatus: UNCONFIRMED` is recorded on each requirement's evidence). Treating a self-declared sample value as `READY` would let an unapproved number silently become a pass/fail gate later in the pipeline, which the source document explicitly prohibits (BRD Acceptance Criteria AC-05). None of these requirements may be used to build a plan or workload model until the owner confirms or replaces the values.

`loadCondition` for PST-NFR-001..006 is recorded as "approved peak load (not yet defined)" — the BRD never defines what counts as "approved peak load"; this is itself an open item (see below).

## Functional business requirements (BRD Section 8) — not separately modelled here

PST-BR-001..007 are functional/scope statements (e.g. "visitors shall be able to search for products") without an independent performance metric. They are not duplicated as `PerformanceRequirement` entries; instead they are the justification for the candidate transactions (`analysis/intake-notes.md`) that PST-NFR-001..007 are quantified against. Forcing them into the metric schema would require inventing a metric/target they don't state.

PST-BR-008 ("performance test executions shall be traceable... run record contains plan, script/version, workload, environment, timestamps and results") is a process/governance requirement already satisfied by the existing, reused `engine/src/execution/run-record.ts` contract — no new requirement entry or new mechanism is needed for it.

## Assumptions and constraints
- All candidate transaction IDs (`CAND-T1`, `CAND-T2`, `CAND-T3`) are provisional, defined in `analysis/intake-notes.md`; they are not yet an approved transaction/API catalogue (`transactions/` is still empty).
- `SYSTEM` is used as `transactionId` for the two requirements that are cross-cutting (API-wide error rate, overall availability) rather than tied to one journey, per the existing `transactionId: string | 'SYSTEM'` convention in `engine/src/requirement/performance-requirement.ts`.
- No numeric value in `requirements/performance-requirements.yaml` has been altered from what the BRD states; only the `status` field reflects this analysis's judgment that none are yet approved.

## Contradictions
- None identified between requirements. (The BRD is internally consistent about labelling its own NFR table as unapproved sample data.)

## Clarification questions (requirement-specific, in addition to the BRD's own Section 16 list already in `open-items.md`)
1. For PST-NFR-001..006: what does "approved peak load" mean numerically (concurrent users / request rate), and who approves it?
2. For PST-NFR-001..007: are the stated sample thresholds (2.0s/2.5s p95, <1% error rate) acceptable as real targets, or should this exercise run baseline-only with no pass/fail gate (per BRD Section 16, Q4)?
3. For PST-NFR-008: what is the specific monitoring signal and abort threshold that defines "no sustained service outage"?

## Summary
- Ready: 0
- Needs clarification: 8
- Missing: 0
- Not applicable: 0

No performance requirement in this project is currently `READY`. The plan (`/build-workload`, `/build-plan`) cannot be finalised or approved against these requirements until the clarification questions above and the BRD's own Section 16 questions are answered by the business/environment owner.
