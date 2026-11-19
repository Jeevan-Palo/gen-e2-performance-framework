export type RequirementStatus =
  | 'READY'
  | 'MISSING'
  | 'NEEDS_CLARIFICATION'
  | 'NOT_APPLICABLE';

export type RequirementPriority = 'MUST' | 'SHOULD' | 'COULD';

export type RequirementEvidence = {
  sourceType: 'BRD' | 'MEETING' | 'TECHNICAL_DOCUMENT' | 'CLIENT_RESPONSE' | 'OBSERVATION' | 'OTHER';
  sourceRef: string;
  excerpt?: string;
  capturedAt?: string;
  confirmedBy?: string;
  confirmationStatus?: 'CONFIRMED' | 'UNCONFIRMED';
};

export type PerformanceRequirement = {
  id: string;
  transactionId: string | 'SYSTEM';
  metric: 'response_time' | 'throughput' | 'error_rate' | 'availability' | 'resource_utilisation' | 'stability';
  target?: number | string;
  unit?: string;
  percentile?: 'P50' | 'P90' | 'P95' | 'P99' | 'NA';
  loadCondition?: string;
  priority: RequirementPriority;
  status: RequirementStatus;
  evidence: RequirementEvidence[];
  rationale?: string;
};

export function isRequirementReady(requirement: PerformanceRequirement): boolean {
  if (requirement.status !== 'READY') return false;
  if (requirement.evidence.length === 0) return false;
  if (requirement.metric === 'response_time' && requirement.target === undefined) return false;
  if (requirement.metric === 'throughput' && requirement.target === undefined) return false;
  if (requirement.metric === 'error_rate' && requirement.target === undefined) return false;
  return true;
}
