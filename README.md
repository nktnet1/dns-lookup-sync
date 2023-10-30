<div align="center">

# [![DNS Lookup Sync](logo.svg)](https://github.com/nktnet1/dns-lookup-sync)

[![pipeline](https://github.com/nktnet1/dns-lookup-sync/actions/workflows/pipeline.yml/badge.svg)](https://github.com/nktnet1/dns-lookup-sync/actions/workflows/pipeline.yml)
&nbsp;
[![codecov](https://codecov.io/gh/nktnet1/dns-lookup-sync/branch/main/graph/badge.svg?token=RAC7SKJTGU)](https://codecov.io/gh/nktnet1/dns-lookup-sync)
&nbsp;
[![Maintainability](https://api.codeclimate.com/v1/badges/46c9b884916b726d91ed/maintainability)](https://codeclimate.com/github/nktnet1/dns-lookup-sync/maintainability)
&nbsp;
[![Snyk Security](https://snyk.io/test/github/nktnet1/dns-lookup-sync/badge.svg)](https://snyk.io/test/github/nktnet1/dns-lookup-sync)
&nbsp;
[![GitHub top language](https://img.shields.io/github/languages/top/nktnet1/dns-lookup-sync)](https://github.com/search?q=repo%3Anktnet1%2Fdns-lookup-sync++language%3ATypeScript&type=code)

[![NPM Version](https://img.shields.io/npm/v/dns-lookup-sync?logo=npm)](https://www.npmjs.com/package/dns-lookup-sync?activeTab=versions)
&nbsp;
[![install size](https://packagephobia.com/badge?p=dns-lookup-sync)](https://packagephobia.com/result?p=dns-lookup-sync)
&nbsp;
[![Depfu](https://badges.depfu.com/badges/8f864f96bde332adb2a53fb30c4832a6/overview.svg)](https://depfu.com/github/nktnet1/dns-lookup-sync?project_id=39390)
&nbsp;
[![NPM License](https://img.shields.io/npm/l/dns-lookup-sync)](https://opensource.org/license/mit/)
&nbsp;
[![GitHub issues](https://img.shields.io/github/issues/nktnet1/dns-lookup-sync.svg?style=social)](https://github.com/nktnet1/dns-lookup-sync/issues)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=nktnet1_dns-lookup-sync&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=nktnet1_dns-lookup-sync)
&nbsp;
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b56caf9395e743deaccd3a0a67d22819)](https://app.codacy.com/gh/nktnet1/dns-lookup-sync/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
&nbsp;
[![DeepSource](https://app.deepsource.com/gh/nktnet1/dns-lookup-sync.svg/?label=active+issues&show_trend=true&token=_1JuBM2nzzo4t4DqFTdPMwwo)](https://app.deepsource.com/gh/nktnet1/dns-lookup-sync/)
&nbsp;
[![codebeat badge](https://codebeat.co/badges/20b443c6-3784-4b63-99de-c69f0701a633)](https://codebeat.co/projects/github-com-nktnet1-dns-lookup-sync-main)
&nbsp;
[![GitHub stars](https://img.shields.io/github/stars/nktnet1/dns-lookup-sync.svg?style=social)](https://github.com/nktnet1/dns-lookup-sync/stargazers)

[![Downloads Total](https://badgen.net/npm/dt/dns-lookup-sync)](https://moiva.io/?npm=dns-lookup-sync)
&nbsp;
[![Downloads Yearly](https://badgen.net/npm/dy/dns-lookup-sync)](https://moiva.io/?npm=dns-lookup-sync)
&nbsp;
[![Downloads Monthly](https://badgen.net/npm/dm/dns-lookup-sync)](https://moiva.io/?npm=dns-lookup-sync)
&nbsp;
[![Downloads Weekly](https://badgen.net/npm/dw/dns-lookup-sync)](https://moiva.io/?npm=dns-lookup-sync)
&nbsp;
[![Downloads Daily](https://badgen.net/npm/dd/dns-lookup-sync)](https://moiva.io/?npm=dns-lookup-sync)

---

Synchronous version of [dnsPromises.lookup](https://nodejs.org/api/dns.html#dnspromiseslookuphostname-options)

[![Try with Replit](https://replit.com/badge?caption=Try%20with%20Replit)](https://replit.com/@nktnet1/dns-lookup-sync-example#index.js)

</div>

---

- [1. Installation](#1-installation)
- [2. Usage](#2-usage)
    - [2.1. hostname](#21-hostname)
    - [2.2. options](#22-options)
    - [2.3. return](#23-return)
- [3. License](#3-license)
- [4. Limitations](#4-limitations)
- [5. Caveats](#5-caveats)

## 1. Installation

```
npm install dns-lookup-sync
```

## 2. Usage

Try with [Replit](https://replit.com/@nktnet1/dns-lookup-sync-example#index.js).

The API is identical to [dnsPromises.lookup](https://nodejs.org/api/dns.html#dnspromiseslookuphostname-options), with the promise being unwrapped in the return type to achieve synchronicity.

```
dnsLookupSync(hostname, options);
```

<details closed>
<summary>Examples (click to view)</summary>

<br/>

Looking up `'localhost'` with default options

```javascript
const dnsLookupSync = require('dns-lookup-sync');

console.log(dnsLookupSync('localhost'));

// Sample output:
// { address: '127.0.0.1', family: 4 }

```

Looking up a list of addresses from `'www.google.com'`

```javascript
const dnsLookupSync = require('dns-lookup-sync');

console.log(dnsLookupSync('www.google.com', { all: true }));

// Sample output:
// [
//   { address: '172.217.167.100', family: 4 },
//   { address: '2404:6800:4006:80b::2004', family: 6 }
// ]
```


</details>

<br/>

### 2.1. hostname

Hostname string to look up. For example,
- `'localhost'`
- `'www.google.com'`

### 2.2. options

If an integer is passed, for example `4`, it is equivalent to passing the object `{ family: 4 }`.

<table>
  <tr>
    <th>Option</th>
    <th>Description</th>
    <th>Example</th>
    <th>Default</th>
  </tr>

  <tr>
    <td>family<br /><code>number</code></td>
    <td>
      The record family. Must be <code>4</code>, <code>6</code>, or <code>0</code>. The value <code>0</code> indicates that IPv4 and IPv6 addresses are both returned.
    </td>
    <td><code>4</code></td>
    <td><code>0</code></td>

  <tr>
    <td>hints<br/><code>number</code></td>
    <td>One or more <a href="https://nodejs.org/api/dns.html#supported-getaddrinfo-flags">supported getaddrinfo flags</a>. Multiple flags may be passed by bitwise ORing their values.</td>
    <td>
      <code>dns.ADDRCONFIG</code>
    </td>
    <td><code>undefined</code></td>
  </tr>

  <tr>
    <td>all<br/><code>boolean</code></td>
    <td>When true, the <code>dnsLookupSync</code> will return all addresses in an array. Otherwise, returns a single address</td>
    <td>
      <code>true</code>
    </td>
    <td><code>false</code></td>
  </tr>

  <tr>
    <td>verbatim<br/><code>boolean</code></td>
    <td>
      When true, the returns the IPv4 and IPv6 addresses in the order the DNS resolver returned them. When false, IPv4 addresses are placed before IPv6 addresses.
    </td>
    <td>
      <code>true</code>
    </td>
    <td><a href="https://nodejs.org/api/dns.html#dnspromiseslookuphostname-options">see docs</a></td>
  </tr>
</table>

### 2.3. return

By default, i.e.  `options.all === false`, a `LookupAddress` of the form
```typescript
{ address: string, family: number };
```

is returned. For example `localhost` may resolve to:
```javascript
{ address: '127.0.0.1', family: 4 }
```

Otherwise, an array of `LookupAddress` is returned. For example, [www.google.com](https://www.google.com) may resolve to:
```javascript
[
  { address: '142.250.204.4', family: 4 },
  { address: '2404:6800:4006:814::2004', family: 6 }
]
```


## 3. License

<details closed>
<summary>
  Massachusetts Institute of Technology
  (<a href="https://opensource.org/license/mit" target="_blank">MIT</a>)
</summary>

<br/>

```
Copyright (c) 2023 Khiet Tam Nguyen

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the “Software”),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
```

</details>

## 4. Limitations

There are currently no known limitations.

## 5. Caveats
