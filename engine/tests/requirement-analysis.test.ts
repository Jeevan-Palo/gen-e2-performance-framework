import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeRequirements } from '../src/requirement/analyze-requirement.js';

test('missing performance values are not invented', () => {
  const result = analyzeRequirements([{ id: 'PR-01', transactionId: 'T1', metric: 'response_time' }]);
  assert.equal(result.requirements[0].status, 'MISSING');
  assert.ok(result.openItems.some((item) => item.includes('target')));
});

test('evidence-backed requirement becomes READY', () => {
  const result = analyzeRequirements([{ id: 'PR-01', transactionId: 'T1', metric: 'response_time', target: 2000, percentile: 'P95', priority: 'MUST', evidence: [{ sourceType: 'BRD', sourceRef: 'BRD#6' }] }]);
  assert.equal(result.requirements[0].status, 'READY');
});
