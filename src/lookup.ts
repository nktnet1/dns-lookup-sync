import { LookupAddress, LookupAllOptions, LookupOneOptions, LookupOptions } from 'dns';
import path from 'path';
import { execSync } from 'child_process';

const errorPrefix = 'DNSLookupSyncError:';
const scriptRelativePath = '../scripts/dns-lookup-sync-script.js';

const defaultOptions: LookupOptions = {
  family: 0,
  all: false,
  verbatim: true,
};

function dnsLookupSync(hostname: string): LookupAddress;
function dnsLookupSync(hostname: string, options: number | LookupOneOptions): LookupAddress;
function dnsLookupSync(hostname: string, options: LookupAllOptions | LookupOptions): LookupAddress[];
function dnsLookupSync(hostname: string, options = {}): any {
  const opts = typeof options === 'number'
    ? options
    : { ...defaultOptions, ...options };
  const scriptPath = path.join(__dirname, scriptRelativePath);
  const cmd = options === undefined
    ? `'${process.execPath}' '${scriptPath}' '${hostname}'`
    : `'${process.execPath}' '${scriptPath}' '${hostname}' '${JSON.stringify(opts)}'`;
  try {
    const results = execSync(cmd, { encoding: 'utf-8' }).trim();
    if (results.startsWith(errorPrefix)) {
      throw new Error(results);
    }
    return JSON.parse(results);
  } catch (error: any) {
    throw new Error(`
================================================================================

Failed to look up hostname '${hostname}':
- ${error.message}

Using Options:
${JSON.stringify(options)}

Please double check the documentation here:
- https://nodejs.org/api/dns.html#dnslookuphostname-options-callback

================================================================================
    `);
  }
}

export default dnsLookupSync;
