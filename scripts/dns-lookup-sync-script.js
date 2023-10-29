/**
 * Execute script to emulate dns.lookup
 * - https://nodejs.org/api/dns.html#dnslookuphostname-options-callback
 *
 * @returns result of dns lookup
 */
const main = () => {
  const basename = require('path').basename(__filename);
  const index = process.argv.findIndex(arg => arg.includes(basename));

  const hostname = process.argv[index + 1];
  const optionString = process.argv[index + 2];

  const errorPrefix = 'DNSLookupSyncError:';

  if (hostname === undefined) {
    return console.log(`${errorPrefix} hostname cannot be undefined`);
  }

  let options;
  if (optionString !== undefined) {
    try {
      options = JSON.parse(optionString);
    } catch (error) {
      return console.log(`${errorPrefix} cannot parse DNS options - ${error.message}`);
    }
  }

  try {
    require('dns').lookup(hostname, options, (error, address, family) => {
      if (error) {
        return console.log(`${errorPrefix} failed to look up address - ${error.message}`);
      }
      if (Array.isArray(address)) {
        return console.log(JSON.stringify(address));
      }
      console.log(JSON.stringify({ address, family }));
    });
  } catch (error) {
    console.log(`${errorPrefix} invalid DNS options - ${error.message}`);
  }
};

main();
