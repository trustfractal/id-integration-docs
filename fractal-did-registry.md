---
description: Authorize transactions by looking up their sender on Fractal's DID Registry.
---

# Fractal DID registry

You can verify the credentials associated with a wallet address in your smart contract (on-chain) or in your dApp using Fractal's [Credentials API](fractal-credentials-api.md) or DID Registry. With Credentials API, your dApp makes a call to the API with a wallet address which replies with a credential proof associated with that wallet address if it exists. Your dApp includes the proof with the transaction to your smart contract. Your smart contract can verify the credential using code Fractal provides.



_⚠️ Still in beta! Please reach out to_ [_sales@fractal.id_](mailto:sales@fractal.id) _if you want to use this method. It's currently available on Karura, Avalanche, Gnosis (soon), Aurora (soon) and Polygon; other chains will be supported on a demand basis._

* no need to access or manage personal data
* no need to change the user flow
* no need for user interaction (e.g. airdrops)

[![did-registry-lookup](https://user-images.githubusercontent.com/365821/166981861-3966c717-ffcc-4162-b6f0-5dd9e0ac4a76.png)](https://user-images.githubusercontent.com/365821/166981861-3966c717-ffcc-4162-b6f0-5dd9e0ac4a76.png)

#### Interface

A unique human has a unique Fractal ID, each with 1+ addresses and present in 0+ lists.

```
address [*]---[1] fractalId [*]---[*] listId
```

**Getting the Fractal ID for an address**

```solidity
bytes32 fractalId = getFractalId(address walletAddress);
```

**Looking for a Fractal ID in a list**

```solidity
bool presence = isUserInList(bytes32 fractaId, string listId);
```

**Available lists**

Every `fractalId` in the DID Registry corresponds to a unique human. Use cases requiring additional guarantees, such as KYC/AML, can also make use of the following lists.

| `listId`         | Meaning                                                                                                                                                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `basic`          | Passed KYC level _basic_                                                                                                                                                                                                               |
| `plus`           | Passed KYC level _plus_                                                                                                                                                                                                                |
| `residency_xy`   | <p>Resident in country <em>xy</em> (<a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2</a> country codes).<br>E.g. <code>residency_ca</code>, <code>residency_de</code>, <code>residency_us</code></p>      |
| `citizenship_xy` | <p>Citizen of country <em>xy</em> (<a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2</a> country codes).<br>E.g. <code>citizenship_ca</code>, <code>citizenship_de</code>, <code>citizenship_us</code></p> |

**In-depth demo**

If you want to understand more deeply how our registries work, check out [https://github.com/trustfractal/did\_registry\_demo](https://github.com/trustfractal/did\_registry\_demo)
