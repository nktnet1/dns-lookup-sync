import dns, { LookupAddress, LookupOptions } from 'dns';
import dnsLookupSync from '../src';

/**
 * This is the same as:
 * ```typescript
 * const dnsLookupAsync = dns.promises.lookup
 * ```
 * but with the returned value cloned to avoid the error
 *   "Received: serializes to the same string"
 *
 * This Jest issue is described in more details in the
 * package dns-lookup-sync: https://github.com/nktnet1/dns-lookup-sync
 */
const dnsLookupAsync = async (
  hostname: string,
  options: LookupOptions | number = {}
): Promise<LookupAddress |LookupAddress[]> => JSON.parse(
  JSON.stringify(await dns.promises.lookup(hostname, options as any))
);

test.each([
  'localhost',
  'www.google.com.au',
  '127.0.0.1',
  'archlinux.org',
  'www.npmjs.com',
])('No options', async (hostname) => {
  expect(dnsLookupSync(hostname)).toStrictEqual(await dnsLookupAsync(hostname));
});

test.each([
  { hostname: 'localhost', options: 0 },
  { hostname: 'localhost', options: 4 },
  { hostname: 'localhost', options: 6 },
  { hostname: 'localhost', options: { family: 0 } },
  { hostname: 'localhost', options: { family: 4 } },
  { hostname: 'localhost', options: { family: 6 } },
  { hostname: 'localhost', options: { all: true } },
  { hostname: 'localhost', options: { all: false } },
  { hostname: 'localhost', options: { verbatim: true } },
  { hostname: 'localhost', options: { verbatim: false } },
  { hostname: 'localhost', options: { verbatim: true } },
  { hostname: 'localhost', options: { verbatim: false } },
  { hostname: 'localhost', options: { hints: dns.ADDRCONFIG } },
  { hostname: 'localhost', options: { hints: dns.V4MAPPED } },
  { hostname: 'localhost', options: { hints: dns.ALL } },
])('Correctly resolves hostname=$hostname, options=$options', async ({ hostname, options }) => {
  expect(dnsLookupSync(hostname, options as any)).toStrictEqual(await dnsLookupAsync(hostname, options as any));
});
