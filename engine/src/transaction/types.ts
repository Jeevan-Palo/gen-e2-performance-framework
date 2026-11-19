export type TransactionStep = {
  id: string;
  action: 'http' | 'wait' | 'extract' | 'set-variable';
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path?: string;
  requestBody?: unknown;
  expectedStatus?: number | number[];
  responseExtraction?: Record<string, string>;
  safeToLoad: boolean;
  sideEffects: 'NONE' | 'REVERSIBLE' | 'PERSISTENT' | 'EXTERNAL';
  evidence: string[];
};

export type BusinessTransaction = {
  id: string;
  name: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  userType?: string;
  trafficShare?: number;
  approvedForPerformance: boolean;
  steps: TransactionStep[];
  evidence: string[];
};

export function validateTransaction(transaction: BusinessTransaction): string[] {
  const errors: string[] = [];
  if (!transaction.id || !transaction.name) errors.push('transaction id/name required');
  if (!transaction.approvedForPerformance) errors.push('transaction is not approved for performance testing');
  if (transaction.steps.length === 0) errors.push('transaction must contain at least one step');
  for (const step of transaction.steps) {
    if (step.action === 'http' && (!step.method || !step.path)) errors.push(`${step.id}: HTTP method/path required`);
    if (step.action === 'http' && step.evidence.length === 0) errors.push(`${step.id}: evidence required`);
    if (step.safeToLoad === false) errors.push(`${step.id}: unsafe transaction step`);
    if (step.sideEffects === 'EXTERNAL' || step.sideEffects === 'PERSISTENT') {
      errors.push(`${step.id}: persistent/external side effect requires explicit safe test design`);
    }
  }
  return errors;
}
