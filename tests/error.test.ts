import dnsLookupSync from '../src';

test('Undefined host', () => {
  expect(() => dnsLookupSync(undefined as any)).toThrow(Error);
});

test('Unknown host', () => {
  expect(() => dnsLookupSync('-hehehe')).toThrow(Error);
});

test('Invalid options', () => {
  expect(() => dnsLookupSync('localhost', -1)).toThrow(Error);
});
