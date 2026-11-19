# Intake Notes — practice-software-testing

Source: `input/Practice_Software_Testing_Performance_BRD_Sample.docx` (Document ID `PST-BRD-PERF-001`, version `0.1`, status **DRAFT — NOT APPROVED**, prepared 2026-11-18).

This is a source-evidence extraction only (the `INPUT` lifecycle stage). It does not assign `READY` / `MISSING` / `NEEDS_CLARIFICATION` status to individual requirements — that normalization happens in `/analyse-requirements` and is written to `requirements/performance-requirements.yaml`.

## Document provenance flags
- The BRD itself states it is a **fictional training document**, not an official requirement from the site owner (BRD intro).
- All approval roles in Section 18 (Business/Product Owner, Application/Environment Owner, Performance Test Lead, Gen-e2 Authorised Approver) are listed as **TBD / Pending** — no plan may be treated as approved.
- Section 15 (Acceptance Criteria) explicitly requires: no execution plan is approved solely because the BRD contains sample workload values (AC-05); write operations and public-target load testing are blocked pending explicit authorisation (AC-06); a human approver must review the plan before generation/execution gates (AC-07).

## Scope (Section 4)
- In scope: storefront catalogue browsing, product detail, product search, category/brand filtering, customer login (approved test accounts only), cart read/update, checkout-related steps (subject to environment-owner approval), related read-only API operations, smoke/baseline/load scenarios (stress/spike only after explicit approval).
- Out of scope: admin/PIM/reporting, security/penetration testing, payment-provider load or real financial transactions, production traffic without written authorisation, browser-rendering/RUM, testing/modifying other users' data.

## Candidate business transactions (candidates only — not yet owner-approved)
| Candidate ID | Journey | Source | Related business requirements |
|---|---|---|---|
| CAND-T1 | Browse Catalogue | Section 7.1 | PST-BR-001, PST-BR-002 |
| CAND-T2 | Search and Filter Products | Section 7.2 | PST-BR-003, PST-BR-004 |
| CAND-T3 | Customer Shopping Cart (login → view/add/update cart → checkout-related steps) | Section 7.3 | PST-BR-005, PST-BR-006, PST-BR-007 |

The BRD itself notes (Section 7.3) these journeys describe business intent, not confirmed API sequences — actual endpoint sequence, correlation IDs, auth requirements and dynamic data still need to be derived from the current OpenAPI spec (`https://api.practicesoftwaretesting.com/api/documentation`).

## Stated business requirements (Section 8)
PST-BR-001..004 (Must/Should) — catalogue, product detail, search, category/brand filter.
PST-BR-005 (Must) — customer authentication with valid test credentials.
PST-BR-006, PST-BR-007 (Should) — cart management, checkout-related journey to an agreed safe stopping point.
PST-BR-008 (Must) — run traceability (plan, script/version, workload, environment, timestamps, results).

## Proposed performance targets (Section 9) — explicitly flagged by the source as sample, not approved
All rows are labelled by the BRD itself as **"PROPOSED – sample value; owner approval required"**:
- PST-NFR-001 Product listing: p95 ≤ 2.0s (High)
- PST-NFR-002 Product detail: p95 ≤ 2.0s (High)
- PST-NFR-003 Product search: p95 ≤ 2.5s (High)
- PST-NFR-004 Category/brand filter: p95 ≤ 2.5s (Medium)
- PST-NFR-005 Login API: p95 ≤ 2.0s (Medium)
- PST-NFR-006 Cart operations: p95 ≤ 2.5s (Medium)
- PST-NFR-007 Read/API transaction errors: error rate < 1% (High)
- PST-NFR-008 Availability during test window: no sustained outage caused by the test (Must, qualitative — abort rule still needs defining)

These must not be used as pass/fail gates until confirmed by the business/environment owner.

## Proposed workload profile (Section 10) — explicitly flagged as illustrative/unapproved
- Smoke: 1–2 VUs, 2–5 min. Baseline: 5–10 VUs, 10 min. Load: ramp to 25 VUs, hold 10 min. Extended load: ramp to 50 VUs, hold ≤15 min (optional, needs explicit approval). Stress/spike: not defined — out of scope pending separate risk assessment.
- Illustrative transaction mix: Browse listing 45%, Product detail 25%, Search 15%, Category/brand 10%, Auth/cart 5%.

## Environment / execution constraints (Section 12)
- Target URL: `https://practicesoftwaretesting.com/`. API docs: `https://api.practicesoftwaretesting.com/api/documentation`.
- **No load, stress, spike or endurance test may run against the public shared service without explicit written authorisation from the service owner.** Initial activity must be limited to low-rate discovery/smoke checks. Prefer a locally hosted or explicitly provisioned isolated environment for load testing.
- No DoS behaviour, destructive data operations, repeated account creation, or real payment processing. Stop immediately on elevated error rates, unexpected data changes, degradation, or an owner-defined abort condition.

## Open questions requiring owner input (verbatim from Section 16)
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
