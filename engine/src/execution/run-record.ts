export type RunRecord = {
  runId: string;
  application: string;
  testId: string;
  engine: 'k6' | 'jmeter' | 'gatling';
  engineVersion: string;
  scriptVersion: string;
  planHash: string;
  workloadConfig: unknown;
  environment: string;
  startedAt: string;
  endedAt?: string;
  outcome: 'PASSED' | 'FAILED' | 'ABORTED';
  evidence: Array<{ type: string; path: string; sha256?: string }>;
};
