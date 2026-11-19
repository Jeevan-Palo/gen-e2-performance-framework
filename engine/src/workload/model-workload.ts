export type WorkloadModel = {
  model: 'closed' | 'open';
  peakConcurrentUsers?: number;
  targetRatePerSecond?: number;
  rampUp?: string;
  steadyState?: string;
  rampDown?: string;
  thinkTime?: { minSeconds?: number; maxSeconds?: number };
  mix: Array<{ transactionId: string; percentage: number }>;
  sourceRefs: string[];
};

export function validateWorkloadModel(model: WorkloadModel): string[] {
  const errors: string[] = [];
  if (model.model === 'closed' && model.peakConcurrentUsers === undefined) {
    errors.push('peakConcurrentUsers is required for a closed workload');
  }
  if (model.model === 'open' && model.targetRatePerSecond === undefined) {
    errors.push('targetRatePerSecond is required for an open workload');
  }
  const total = model.mix.reduce((sum, item) => sum + item.percentage, 0);
  if (Math.abs(total - 100) > 0.001) errors.push(`transaction mix must total 100%; got ${total}`);
  if (model.sourceRefs.length === 0) errors.push('workload model requires sourceRefs');
  return errors;
}
