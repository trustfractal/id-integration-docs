---
description: Authorize transactions by looking up their sender on Fractal's DID Registry.
---

# Fractal DID registry

Both Credentials API and DID Registry enable you to verify the credentials associated with a wallet address in your smart contract (on-chain) or in your dApp.&#x20;

The DID Registry is a smart contract Fractal has deployed which contains two public [methods](fractal-did-registry.md#interface) your [dApp](fractal-did-registry.md#dapp-code-example) and [smart contract](fractal-did-registry.md#smart-contract-example) can call to verify a credential. Registries are deployed on Karura, Avalanche, Gnosis (soon),  Aurora (soon) and Polygon. Registries will be deployed on other chains on a demand basis. .

In order to verify a credential, you call `getFractalId()` to get a `fractalId` associated with a wallet address. Every `fractalId` in the DID Registry corresponds to a unique human. You call `isUserInList()` to determine whether a `fractalId` exists in one of the Registry's maintained [lists](fractal-did-registry.md#available-lists). Lists are currently maintained for KYC level, citizenship and residency.

The advantages of the DID Registry are:

* **No need to access or manage personal data.** You only need the user's connected wallet address to interact with the Registry.
* **No need to change the user flow.** Once a user has connected their wallet, your dApp can call the Registry in the background in order to verify their credentials. The user does not need to do anything more.
* **Same interface.** The interface used by your dApp and your smart contract is the same.

<figure><img src="https://user-images.githubusercontent.com/365821/166981861-3966c717-ffcc-4162-b6f0-5dd9e0ac4a76.png" alt=""><figcaption></figcaption></figure>

## Interface

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

## **Available lists**

Every `fractalId` in the DID Registry corresponds to a unique human. Use cases requiring additional guarantees, such as KYC/AML, can also make use of the following lists.

| listId       | Meaning                                                                                              |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| `basic`      | Passed KYC level _basic_                                                                             |
| `plus`       | Passed KYC level _plus_                                                                              |
| `fatf_grey`  | Resident of a country that's present in the FATF's list of jurisdictions under increased monitoring. |
| `fatf_black` | Resident of a country that's present in the FATF's list of high-risk jurisdictions.                  |

_If you have KYC compliance needs that don't fit these standards, please get in touch with_ [_engineering@fractal.id_](mailto:engineering@fractal.id) _for creating your own bespoke list._

## Smart contract code example

1. Import our `FractalRegistry.sol` contract and set its address.
2. Adapt the `requiresRegistry` `modifier` based on your KYC level and country requirements.

<details>

<summary><strong></strong><span data-gb-custom-inline data-tag="emoji" data-code="1f441">👁</span> <strong>See an example in Solidity</strong></summary>

```
import {FractalRegistry} from "github.com/trustfractal/web3-identity/FractalRegistry.sol";

contract Main {
  FractalRegistry registry = FractalRegistry(0x5FD6eB55D12E759a21C09eF703fe0CBa1DC9d88D);

  modifier requiresRegistry(
      string memory allowedLevel,
      string[3] memory blockedResidencyCountries,
      string[2] memory blockedCitizenshipCountries
  ) {
      bytes32 fractalId = registry.getFractalId(msg.sender);

      require(fractalId != 0);

      require(registry.isUserInList(fractalId, allowedLevel));

      for (uint256 i = 0; i < blockedResidencyCountries.length; i++) {
          require(!registry.isUserInList(fractalId, string.concat("residency_", blockedResidencyCountries[i])));
      }

      for (uint256 i = 0; i < blockedCitizenshipCountries.length; i++) {
          require(!registry.isUserInList(fractalId, string.concat("citizenship_", blockedCitizenshipCountries[i])));
      }

      _;
  }

  function main(
      /* your transaction arguments go here */
  ) external requiresRegistry("plus", ["ca", "de", "us"], ["de", "us"]) {
      /* your transaction logic goes here */
  }
}
```

</details>

## dApp code example

We have created this simple [demo](https://did-registry.demo.fractal.id/) dApp to show how a javascript app might interact with our Registry. You can find the code (written in Typescript and React) for this demo in this [repo](https://github.com/trustfractal/did-registry-demo-dapp).

The interface to the Registry in the demo can be found in [`miniBackoffice.ts`](https://github.com/trustfractal/did-registry-demo-dapp/blob/main/src/hooks/miniBackoffice.ts). The specific two functions are `fetchFractalId` and `fetchKycState`.

```
const fetchFractalId = (
  signer: providers.JsonRpcSigner,
  account: string
): Promise<string> => fractalRegistry.connect(signer).getFractalId(account);

const fetchKycStatus = (
  signer: providers.JsonRpcSigner,
  fractalId: string
): Promise<boolean> =>
  fractalRegistry.connect(signer).isUserInList(fractalId, KYCList);
```



## **Developer demo**

If you want to understand more deeply how our registries work, check out our [developer demo](https://github.com/trustfractal/did\_registry\_demo).
