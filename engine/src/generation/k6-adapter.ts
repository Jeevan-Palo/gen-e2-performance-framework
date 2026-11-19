import type { GenerationContext, GeneratedArtifact, PerformanceEngineAdapter } from './engine-adapter.js';

export class K6Adapter implements PerformanceEngineAdapter {
  readonly engine = 'k6';

  generate(context: GenerationContext): GeneratedArtifact {
    const lines: string[] = [
      'import http from \'k6/http\';',
      'import { check, sleep } from \'k6\';',
      'import { Counter, Trend } from \'k6/metrics\';',
      '',
      'const BASE_URL = __ENV.BASE_URL;',
      "const errorCount = new Counter('gen_e2_errors');",
    ];

    for (const tx of context.transactions) {
      lines.push(`const ${metricName(tx.id)} = new Trend('transaction_duration_${safe(tx.id)}');`);
    }

    lines.push(
      '',
      'export const options = {',
      `  vus: ${context.workload.peakConcurrentUsers ?? 1},`,
      `  duration: '${context.workload.steadyState ?? '1m'}',`,
      '};',
      '',
      'export default function () {',
    );

    for (const tx of context.transactions) {
      for (const step of tx.steps.filter((s) => s.action === 'http')) {
        const expected = Array.isArray(step.expectedStatus)
          ? JSON.stringify(step.expectedStatus)
          : String(step.expectedStatus ?? 200);
        const checkExpression = Array.isArray(step.expectedStatus)
          ? `${expected}.includes(response.status)`
          : `response.status === ${expected}`;
        const body = step.requestBody === undefined ? '' : `, ${JSON.stringify(step.requestBody)}`;
        lines.push(
          '  {',
          '    const started = Date.now();',
          `    const response = http.${String(step.method ?? 'GET').toLowerCase()}(BASE_URL + ${JSON.stringify(step.path ?? '/')}${body});`,
          `    ${metricName(tx.id)}.add(Date.now() - started);`,
          `    const ok = check(response, { ${JSON.stringify(step.id + ': expected status')}: (r) => ${checkExpression} });`,
          '    if (!ok) errorCount.add(1);',
          '  }',
          `  sleep(${thinkTime(context)});`,
        );
      }
    }

    lines.push('}', '');

    return {
      engine: 'k6',
      scriptPath: `generated/${context.testId}/script.js`,
      content: lines.join('\n'),
      manifest: {
        application: context.application,
        testId: context.testId,
        planHash: context.planHash,
        engineVersion: context.engineVersion,
        generatedAt: new Date().toISOString(),
      },
    };
  }
}

function safe(value: string): string { return value.replace(/[^A-Za-z0-9_]/g, '_'); }
function metricName(value: string): string { return `${safe(value)}Duration`; }
function thinkTime(context: GenerationContext): number { return context.workload.thinkTime?.minSeconds ?? 1; }
