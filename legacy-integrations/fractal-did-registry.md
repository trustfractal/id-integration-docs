---
description: Authorize transactions by looking up their sender on Fractal's DID Registry.
---

# Fractal DID registry

Both Credentials API and DID Registry enable you to verify the credentials associated with a wallet address in your smart contract (on-chain) or in your dApp.&#x20;

The DID Registry is a [smart contract](https://github.com/trustfractal/registry-deployer) Fractal has deployed which contains two public [methods](fractal-did-registry.md#interface) your [dApp](fractal-did-registry.md#dapp-code-example) and [smart contract](fractal-did-registry.md#smart-contract-example) can call to verify a credential. Registries are deployed on Karura, [Binance](https://bscscan.com/address/0x91562c86174656976E1a58f4eD02942Ac5a34e77#code), [Avalanche](https://snowtrace.io/address/0x187fa9c568522b5275f420245f6b00c79681c270), [Goerli](https://goerli.etherscan.io/address/0x4D9DE1bb481B9dA37A7a7E3a07F6f60654fEe7BB) (demos only), [Gnosis](https://gnosisscan.io/address/0xae94424d66f5758a7aa128c4125e25b1247143c3#code),  Aurora (soon) and [Polygon](https://polygonscan.com/address/0xfBDb867e7eFf0e3dBe63eE52eDA24d83fBacFe25). Registries will be deployed on other chains on a demand basis.

In order to verify a credential, you call `getFractalId()` to get a `fractalId` associated with a wallet address. Every `fractalId` in the DID Registry corresponds to a unique human. You call `isUserInList()` to determine whether a `fractalId` exists in one of the Registry's maintained [lists](fractal-did-registry.md#available-lists). Only client-specific lists are currently maintained.

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

Every `fractalId` in the DID Registry corresponds to a unique human. Aditionally, you can also make use of the following lists.

| listId               | Meaning                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `client_custom_list` | These are custom lists created for clients that have KYC compliance needs that don't fit the above lists. |

Please get in touch with [engineering@fractal.id](mailto:engineering@fractal.id) for creating your own `client_custom_list`

## Smart contract code example

1. Import our `FractalRegistry.sol` contract and set its address.
2. Adapt the `requiresRegistry` `modifier` based on your KYC level and country requirements.

<details>

<summary><span data-gb-custom-inline data-tag="emoji" data-code="1f441">👁</span> <strong>See an example in Solidity</strong></summary>

```
import {FractalRegistry} from "github.com/trustfractal/registry-deployer/blob/master/contracts/FractalRegistry.sol";

contract Main {
  FractalRegistry registry = FractalRegistry(0x5FD6eB55D12E759a21C09eF703fe0CBa1DC9d88D);

  function requiresRegistry(
      address sender,
      string[1] memory requiredLists,
      string[2] memory blockedLists
  ) private view {
      bytes32 fractalId = registry.getFractalId(sender);

      require(fractalId != 0);

      for (uint256 i = 0; i < requiredLists.length; i++) {
          require(registry.isUserInList(fractalId, requiredLists[i]));
      }

      for (uint256 i = 0; i < blockedLists.length; i++) {
          require(!registry.isUserInList(fractalId, blockedLists[i]));
      }
  }

  function main(
      /* your transaction arguments go here */
  ) external view {
      requiresRegistry(msg.sender, ["client_custom_list_id"], []);
      /* your transaction logic goes here */
  }
}
```

</details>

The example above adds **approximately 25k gas** to the transaction cost. Gas usage increases with the number of lookups.

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

If you want to understand more deeply how our registries work, check out our [developer demo](https://github.com/trustfractal/did\_registry\_demo). Or, you can review the registry smart contract along with a simple environment to deploy it [here](https://github.com/trustfractal/registry-deployer).
