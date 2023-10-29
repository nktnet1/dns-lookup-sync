const errorPrefix = 'DNSLookupSyncError:';

/**
 * Parse the command line arguments into hostname and Lookup Options
 *
 * @returns {{hostname: string, options: number | dns.LookupOptions}} arguments
 * to pass into dns.promises.lookup
 */
const parseArguments = () => {
  const basename = require('path').basename(__filename);
  const index = process.argv.findIndex(arg => arg.includes(basename));

  const hostname = process.argv[index + 1];
  if (hostname === undefined) {
    throw new Error(`${errorPrefix} hostname cannot be undefined`);
  }

  let options = {};
  const optionString = process.argv[index + 2];
  if (optionString !== undefined) {
    try {
      options = JSON.parse(optionString);
    } catch (error) {
      throw new Error(`${errorPrefix} cannot parse DNS options - ${error.message}`);
    }
  }
  return { hostname, options };
};

/**
 * Execute script to emulate dns.lookup
 * - https://nodejs.org/api/dns.html#dnslookuphostname-options-callback
 *
 * @returns result of dns lookup
 */
const main = async () => {
  const { hostname, options } = parseArguments();
  try {
    const result = await require('dns').promises.lookup(hostname, options);
    console.log(JSON.stringify(result));
  } catch (error) {
    console.log(`${errorPrefix} failed to lookup ${hostname} - ${error.message}`);
  }
};

main();
