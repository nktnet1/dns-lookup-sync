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
 * package dns-lookup-sync:
 * - https://github.com/nktnet1/dns-lookup-sync
 */
const dnsLookupAsync = async (
  hostname: string,
  options?: LookupOptions | number
): Promise<LookupAddress |LookupAddress[]> => JSON.parse(
  JSON.stringify(await dns.promises.lookup(hostname, options as any))
);

test.each([
  '0.0.0.0',
  'localhost',
  '127.0.0.1',
  'www.google.com.au',
  'archlinux.org',
])('No options', async (hostname) => {
  expect(dnsLookupSync(hostname)).toStrictEqual(await dnsLookupAsync(hostname));
});

describe.each([
  '0.0.0.0',
  'localhost',
  '127.0.0.1',
])('Hostnames %s with options', (hostname) => {
  test.each([
    { options: 0 },
    { options: 4 },
    { options: 6 },
    { options: { family: 0 } },
    { options: { family: 4 } },
    { options: { family: 6 } },
    { options: { all: true } },
    { options: { all: false } },
    { options: { verbatim: true } },
    { options: { verbatim: false } },
    { options: { hints: dns.ADDRCONFIG } },
    { options: { hints: dns.V4MAPPED } },
    { options: { hints: dns.ALL } },
    { options: { family: 4, all: true, verbatim: false, hints: dns.V4MAPPED } },
  ])('options=$options', async ({ options }) => {
    expect(dnsLookupSync(hostname, options as any)).toStrictEqual(await dnsLookupAsync(hostname, options as any));
  });
});
