import type { GeneratedArtifact } from '../generation/engine-adapter.js';

export type ValidationIssue = { severity: 'ERROR' | 'WARNING'; code: string; message: string };

export function validateGeneratedArtifact(artifact: GeneratedArtifact): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!artifact.manifest.planHash) issues.push({ severity: 'ERROR', code: 'PLAN_HASH_MISSING', message: 'Generated artifact is not bound to a plan hash' });
  if (!artifact.content.includes('BASE_URL')) issues.push({ severity: 'ERROR', code: 'BASE_URL_MISSING', message: 'Generated script does not resolve BASE_URL from runtime environment' });
  if (artifact.content.includes('password') || artifact.content.includes('Authorization: Bearer ey')) {
    issues.push({ severity: 'ERROR', code: 'POSSIBLE_SECRET', message: 'Generated artifact contains a possible credential or token' });
  }
  if (artifact.content.includes('http.post') && artifact.content.includes('checkout')) {
    issues.push({ severity: 'ERROR', code: 'SIDE_EFFECT_RISK', message: 'Checkout POST detected; requires explicit safe test design' });
  }
  return issues;
}
