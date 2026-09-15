   import { describe, it } from 'node:test';
   import assert from 'node:assert/strict';
   import { validateMessage, replyTo } from '../public/js/brain.js';

describe('validateMessage', () => {
  it('refuse une chaîne vide', () => {
    assert.equal(validateMessage('   ').ok, false);
  });
  it('nettoie les espaces', () => {
    assert.deepEqual(validateMessage('  salut  '), { ok: true, value: 'salut' });
  });
  it('280 caracteres sont acceptés', () => {
    assert.equal(validateMessage('a'.repeat(280)).ok, true)
  })
  it('Plus de 280 caracteres ne passe pas', () => {
    assert.equal(validateMessage('a'.repeat(281)).ok, false)
  })
  it('Les majuscules ne changent pas le résultat', () => {
    assert.deepEqual(replyTo('SALUT'), replyTo('salut'))
  })
  it('Les cas non gérés donnent un résultat différent', () => {
    assert.notDeepEqual(replyTo('lsfkj'), replyTo('aide'))
  })
});