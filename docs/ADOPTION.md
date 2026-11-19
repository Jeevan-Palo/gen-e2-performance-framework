# Adoption Sequence

## Step 1 — Copy the project input structure

Create `input/`, `requirements/`, `analysis/`, `transactions/` and `runs/` under each Gen-e2 application.

## Step 2 — Keep the existing requirement model

Do not replace the existing `performance-requirement.ts`. Add only missing fields or adapters after a compatibility review.

## Step 3 — Import the PoC concepts

Move evidence/provenance, open items, transaction safety metadata and requirement-to-metric mapping into the existing Gen-e2 models.

## Step 4 — Add engine adapter boundary

Introduce an adapter interface. Implement k6 first. Do not add JMeter/Gatling until the k6 path is stable.

## Step 5 — Generate only after approval

Generation must call the existing approval revalidation path. A stale approval must not be trusted.

## Step 6 — Validate independently

Validation must re-derive important properties instead of trusting generator metadata.

## Step 7 — Execute through existing safety governance

Do not bypass execution authorization. Record run metadata and evidence.

## Step 8 — Add observation and analysis

Consume raw metrics and monitoring evidence. Keep facts, hypotheses, recommendations and confirmed root causes explicitly separated.
