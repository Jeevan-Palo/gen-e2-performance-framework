import type { PerformanceRequirement, RequirementEvidence, RequirementStatus } from './performance-requirement.js';

export type RequirementInput = {
  id: string;
  transactionId?: string;
  metric?: PerformanceRequirement['metric'];
  target?: number | string;
  unit?: string;
  percentile?: PerformanceRequirement['percentile'];
  loadCondition?: string;
  priority?: PerformanceRequirement['priority'];
  evidence?: RequirementEvidence[];
  statement?: string;
};

export type RequirementAnalysis = {
  requirements: PerformanceRequirement[];
  openItems: string[];
  summary: { ready: number; missing: number; needsClarification: number; notApplicable: number };
};

export function analyzeRequirements(inputs: RequirementInput[]): RequirementAnalysis {
  const requirements = inputs.map((input): PerformanceRequirement => {
    const evidence = input.evidence ?? [];
    let status: RequirementStatus = 'READY';
    const missing: string[] = [];

    if (!input.transactionId) missing.push('transactionId');
    if (!input.metric) missing.push('metric');
    if (!input.priority) missing.push('priority');
    if (evidence.length === 0) missing.push('evidence');

    if (input.metric === 'response_time' && input.target === undefined) missing.push('target');
    if (input.metric === 'response_time' && !input.percentile) missing.push('percentile');
    if (input.metric === 'throughput' && input.target === undefined) missing.push('target');
    if (input.metric === 'error_rate' && input.target === undefined) missing.push('target');

    if (missing.length > 0) status = 'MISSING';

    return {
      id: input.id,
      transactionId: input.transactionId ?? 'SYSTEM',
      metric: input.metric ?? 'stability',
      target: input.target,
      unit: input.unit,
      percentile: input.percentile,
      loadCondition: input.loadCondition,
      priority: input.priority ?? 'MUST',
      status,
      evidence,
      rationale: missing.length > 0 ? `Missing: ${missing.join(', ')}` : input.statement,
    };
  });

  const openItems = requirements
    .filter((r) => r.status !== 'READY' && r.priority === 'MUST')
    .map((r) => `${r.id}: ${r.rationale ?? 'Clarification required'}`);

  return {
    requirements,
    openItems,
    summary: {
      ready: requirements.filter((r) => r.status === 'READY').length,
      missing: requirements.filter((r) => r.status === 'MISSING').length,
      needsClarification: requirements.filter((r) => r.status === 'NEEDS_CLARIFICATION').length,
      notApplicable: requirements.filter((r) => r.status === 'NOT_APPLICABLE').length,
    },
  };
}
