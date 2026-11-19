import test from 'node:test';
import assert from 'node:assert/strict';
import { validateWorkloadModel } from '../src/workload/model-workload.js';

test('workload mix must total 100 percent', () => {
  const errors = validateWorkloadModel({ model: 'closed', peakConcurrentUsers: 10, mix: [{ transactionId: 'T1', percentage: 60 }], sourceRefs: ['BRD#5'] });
  assert.ok(errors.some((e) => e.includes('100%')));
});
