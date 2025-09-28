import { expect, test } from 'vitest';
import dnsLookupSync from '../src';

test('Undefined host', () => {
  expect(() => dnsLookupSync(undefined as any)).toThrow(Error);
});

test('Unknown host', () => {
  expect(() => dnsLookupSync('-hehehe')).toThrow(Error);
});

test('Invalid family', () => {
  expect(() => dnsLookupSync('localhost', -1)).toThrow(Error);
});

test('Invalid options.family', () => {
  expect(() => dnsLookupSync('localhost', { family: 5 })).toThrow(Error);
});

test('Invalid options.all', () => {
  expect(() => dnsLookupSync('localhost', { all: 'invalid' as unknown as boolean })).toThrow(Error);
});

test('Invalid options.verbatim', () => {
  expect(() => dnsLookupSync('localhost', { verbatim: 'invalid' as unknown as boolean })).toThrow(
    Error,
  );
});

test('Invalid options.hints', () => {
  expect(() => dnsLookupSync('localhost', { hints: 'invalid' as unknown as number })).toThrow(
    Error,
  );
});
