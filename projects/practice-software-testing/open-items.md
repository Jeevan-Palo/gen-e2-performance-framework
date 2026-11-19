# Open Items

Outstanding items for `practice-software-testing`. Nothing below may be resolved by assumption — each must be confirmed by a source document, an owner decision, or explicit approval. See `analysis/intake-notes.md` for full source evidence and references.

## Blocking (safety / execution authorisation)
- The BRD (`input/Practice_Software_Testing_Performance_BRD_Sample.docx`, Section 12) states: no load, stress, spike or endurance test may run against the public shared service (`https://practicesoftwaretesting.com/`) without explicit written authorisation from the service owner. Until confirmed, only low-rate discovery/smoke checks against the public target are in scope.
- The BRD is itself DRAFT — NOT APPROVED (Section 18: all approval roles listed as TBD/Pending). No plan derived from it may be treated as approved.
- Document status note: this BRD describes itself as a fictional training document, not an official requirement from the site owner.

## Open questions requiring owner input (BRD Section 16, verbatim)
1. Who is the authorised application/service owner for this demonstration environment?
2. Is performance testing permitted against the public hosted service? If yes, what are the written limits and approved test windows?
3. Can an isolated deployment be provided for load, stress and spike testing?
4. Are the sample response-time and error-rate targets acceptable, or should this exercise be baseline-only?
5. What are the expected normal and peak concurrent users and transaction rates?
6. Which browser journeys and API operations are business-critical?
7. What authentication, rate limits, pagination defaults and test-account rules apply?
8. Which cart/checkout/payment steps are safe to exercise, and what is the permitted stopping point?
9. What monitoring data can be accessed, and who can provide it?
10. What cleanup/reset procedure is available for test data?

## Environment (`environment.yaml`)
- Execution limits (`max_vus`, `max_duration_minutes`) are not yet known — the BRD's Section 10 workload profile is explicitly labelled illustrative/unapproved, not a confirmed limit.
- Monitoring access (`monitoring.enabled`) is not yet known — Section 13 notes application/infra telemetry is only available "where access is provided".
- No `credentials_env_vars` identified yet; test account provisioning is an open question (Section 16, Q7).
- Whether public-service load testing is permitted at all, and under what written limits, is unresolved (Section 16, Q2).

## Performance targets and workload
- All Section 9 NFR targets (PST-NFR-001..008) and the Section 10 workload profile are explicitly marked by the source as sample/proposed values requiring owner approval — they must not be used as pass/fail gates or as execution limits until confirmed.
- `/analyse-requirements` has normalized these into `requirements/performance-requirements.yaml` (8 requirements, all status `NEEDS_CLARIFICATION`; 0 `READY`). See `analysis/requirement-analysis.md` for the full status table and rationale. Three additional clarification questions were raised:
  1. What does "approved peak load" mean numerically for PST-NFR-001..006, and who approves it?
  2. Are the sample thresholds acceptable as real targets, or should the exercise run baseline-only with no pass/fail gate?
  3. For PST-NFR-008, what is the specific monitoring signal and abort threshold for "no sustained service outage"?

## Business transactions
- No transaction/API mapping has been produced yet. Candidate transactions are listed in `analysis/intake-notes.md` (CAND-T1..T3); they remain candidates until owner approval, and actual endpoint sequences still need to be derived from the current OpenAPI spec at `https://api.practicesoftwaretesting.com/api/documentation`.

## Approval
- No plan has been built or approved yet. Human approval is mandatory before plan finalisation and execution.
