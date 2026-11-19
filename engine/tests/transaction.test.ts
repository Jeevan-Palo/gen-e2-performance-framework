import test from 'node:test';
import assert from 'node:assert/strict';
import { validateTransaction } from '../src/transaction/types.js';

test('unapproved transaction cannot be generated', () => {
  const errors = validateTransaction({ id: 'T1', name: 'Checkout', priority: 'HIGH', approvedForPerformance: false, steps: [], evidence: [] });
  assert.ok(errors.includes('transaction is not approved for performance testing'));
});
