import type { BusinessTransaction } from '../transaction/types.js';
import type { WorkloadModel } from '../workload/model-workload.js';
import type { PerformanceRequirement } from '../requirement/performance-requirement.js';

export type GenerationContext = {
  application: string;
  testId: string;
  planHash: string;
  engineVersion: string;
  workload: WorkloadModel;
  transactions: BusinessTransaction[];
  requirements: PerformanceRequirement[];
};

export type GeneratedArtifact = {
  engine: 'k6' | 'jmeter' | 'gatling';
  scriptPath: string;
  content: string;
  manifest: {
    application: string;
    testId: string;
    planHash: string;
    engineVersion: string;
    generatedAt: string;
  };
};

export interface PerformanceEngineAdapter {
  readonly engine: GenerationContext['engineVersion'];
  generate(context: GenerationContext): GeneratedArtifact;
}
