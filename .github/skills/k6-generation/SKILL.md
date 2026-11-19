# k6 Generation Skill

Generate k6 only from an already approved and freshly revalidated plan.

Rules:
- Use runtime environment variables for secrets and base URLs.
- Never write credentials into generated source.
- Every HTTP request must trace to an approved transaction step.
- Preserve requirement-to-metric mappings.
- Reject persistent/external side effects unless explicitly designed and approved.
- Emit a generation manifest containing plan hash and engine version.
