# Example Performance BRD

This is a **synthetic fixture**. It is not an approved client requirement.

## Scope
- Load testing only.
- Read-only product browsing.

## Business transactions
- T1 Browse products.
- T2 Search products.

## Performance requirements
- PR-01: T1 response time <= 2 seconds at P95 under approved peak load.
- PR-02: T2 response time <= 2 seconds at P95 under approved peak load.

## Workload
- Peak concurrent users: 10.
- T1 share: 60%.
- T2 share: 40%.
- Ramp-up: 1 minute.
- Steady state: 2 minutes.
- Ramp-down: 1 minute.

## Safety
- No checkout, order, payment, account or administrative actions.
