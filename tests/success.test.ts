import dns, { type LookupOptions } from 'dns';
import { describe, expect, test } from 'vitest';
import dnsLookupSync from '../src';

test.each(['0.0.0.0', 'localhost', '127.0.0.1', 'www.google.com.au', 'archlinux.org'])(
  'No options',
  async (hostname) => {
    expect(dnsLookupSync(hostname)).toStrictEqual(await dns.promises.lookup(hostname));
  },
);

describe.each(['0.0.0.0', 'localhost', '127.0.0.1'])('Hostnames %s with options', (hostname) => {
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
    expect(dnsLookupSync(hostname, options as LookupOptions)).toStrictEqual(
      await dns.promises.lookup(hostname, options as LookupOptions),
    );
  });
});
