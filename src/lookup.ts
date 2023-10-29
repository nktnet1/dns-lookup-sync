import { LookupAddress, LookupAllOptions, LookupOneOptions, LookupOptions } from 'dns';
import path from 'path';
import { execSync } from 'child_process';

const errorPrefix = 'DNSLookupSyncError:';
const scriptRelativePath = '../scripts/dns-lookup-sync-script.js';

/**
 * Creates a new error instance with a customised error message
 *
 * @param {string} message description of the dns error
 * @param {string} hostname hostname argument that resulted in the error
 * @param {number | LookupOptions} options options that resulted in the error
 * @returns {Error} a new instance of a NodeJS Error object
 */
const createError = (
  message: string,
  hostname: string,
  options?: number | LookupOptions
): Error => {
  return new Error(`
================================================================================

Failed to look up hostname '${hostname}':
- ${message}

Using Options:
${JSON.stringify(options)}

Please double check the documentation here:
- https://nodejs.org/api/dns.html#dnslookuphostname-options-callback

================================================================================
  `);
};

/**
 * Synchronous version of dns.lookup
 *
 * @param {string} hostname name of the host to look up, e.g. localhost
 * @param {number | LookupOptions} options to configure dns.lookup
 * @returns {LookupAddress | LookupAddress[]} a single address if options.all
 * is false, otherwise a list of addresses
 */
function dnsLookupSync(hostname:
   string,
   options?: number | LookupOneOptions
): LookupAddress;
function dnsLookupSync(
  hostname: string,
  options: LookupAllOptions | LookupOptions
): LookupAddress[];
function dnsLookupSync(
  hostname: string,
  options?: number | LookupOptions
): LookupAddress | LookupAddress[] {
  const scriptPath = path.join(__dirname, scriptRelativePath);
  const cmd = options === undefined
    ? `'${process.execPath}' '${scriptPath}' '${hostname}'`
    : `'${process.execPath}' '${scriptPath}' '${hostname}' '${JSON.stringify(options)}'`;
  try {
    const results = execSync(cmd, { encoding: 'utf-8' }).trim();
    if (results.startsWith(errorPrefix)) {
      throw new Error(results);
    }
    return JSON.parse(results);
  } catch (error: any) {
    throw createError(error.message, hostname, options);
  }
}

export default dnsLookupSync;
