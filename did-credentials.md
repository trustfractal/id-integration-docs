# Fractal DID Credentials

The Fractal DID credentials are automatically generated in our system after a supported KYC is approved. If the user has the Fractal Wallet installed, they will have instant access to them. If not, as a verifier you can access the credentials via Fractal OAuth.

The credentials are generated using [our SDK](https://github.com/trustfractal/sdk) and, along with [our wallet](https://github.com/trustfractal/wallet), give the users complete control of their data, including support for selective disclosure.

## **Credential Fields**

A Fractal DID credential is composed of the following fields:

* **`rootHash` -** the hash of the fields of the claim attested by Fractal. Fractal generates credentials by recursively hashing and signing a tree of data fields, concatenating the final result with the address of the owner of the credential and finally hashing it one final time.
* **`countryOfResidence` -** country tier of where the user is residing.
* **`countryOfIDIssuance` -**  country tier where the user ID has been issued from.
* **`subjectAddress` -** address of the credential owner, as verified by Fractal.
* **`kycType` -** identifies one of the several types of KYC available on Fractal. Depending on the regulation your project falls under, a specific type might be required.
* **`credentialSignature` -** signature of a signable hash produced by Fractal. This ensures that the credential has been validated and approved by Fractal and it hasn’t been tampered with.

Due to regulations, `countryOfResidence` and `countryOfIDIssuance` do not refer to a specific country. Instead, both fields represent a tier of countries the user belongs to. Some verifiers require stricter rules and restrict the countries of a user to a certain group. However, the user might not be comfortable providing that information.

This tiered solution is a compromise on both sides: by verifying a numeric field not bound to a specific country, the verifiers can ensure the credential is valid and from a supported country and the user can safely provide that information without disclosing their own country.

**The country tiers are made available in**[ **the following spreadsheet**](https://docs.google.com/spreadsheets/d/1Ot9YEpasZ3qVSnoZqQs2iEqgHUyYAAn2Q17d113PQZc/edit?usp=sharing)**.**

Similarly to the country tiers, the `kycType` is also a numeric field. It represents the type of KYC in our system. The following types are supported, followed by their KYC level code:

* **plus+liveness+wallet: 1**
* **plus+liveness+wallet+sow: 2**
* **plus+selfie+wallet: 3**
* **plus+selfie+wallet+sow: 4**
* **plus+liveness+accreditation+wallet: 5**
* **plus+liveness+accreditation+wallet+sow: 6**
* **plus+selfie+accreditation+wallet: 7**
* **plus+selfie+accreditation+wallet+sow: 8**

## **Accessing a Credential**

### **Fractal Wallet**

This is the recommended method for accessing the credential for the following reasons:

1. The user remains in control of their data, providing only access to what they wish to.
2. You are offered control of the fields you access, which means you don’t need to store them and thus can relax some security considerations.
3. Most of the flow for credential management is already implemented, resulting in much less code than traditional solutions like Fractal OAuth.

Integrating with the wallet is simple. When the wallet is installed, a `window.Fractal` object, containing the API to interact with the wallet, is made available.

**You can request a credential by doing the following:**

```
const fields = {
  full_name: true,
  liveness: true,
  country_of_residence: false,
}

const requester = {
  name: "Your Org",
  url: "https://example.org",
  icon: "https://example.org/icon.svg",
};

const credential = await window.Fractal.getVerificationRequest(
  kycType,
  requester,
  fields,
);
```

The first argument is the KYC type you wish to access, the second is an object with data about the requester (your organization). This data will be displayed in the prompt the user sees when allowing or rejecting data access. The final argument is a map where the keys are the fields to request access to (you can find the fields and schema for each KYC type [here](https://github.com/trustfractal/sdk/blob/main/src/Schema/schemas.ts)) and the values are a boolean indicating whether or not this field is required.&#x20;

### **Fractal OAuth**

An alternative method for accessing a credential is possible. To do so you need to implement the [classic OAuth solution](https://docs.developer.fractal.id/user-integration/user-authorization). Afterwards, you can perform a GET request to [https://maguro.fractal.id/credentials](https://maguro.fractal.id/credentials) using the token as a bearer token. If you’re using staging, use [https://maguro.staging.sandbox.fractal.id/credentials](https://maguro.staging.sandbox.fractal.id/credentials) instead.

****\
**Note that this will give you full-access to the user’s credentials and thus should be used with care.**

## **Verifying a Credential**

### **On-chain Verification**

If you prefer to perform on-chain credential validation, we recommend implementing a `verify`function is implemented, that should receive the following arguments:

* `kycType` - 1 byte
* `countryOfResidence` - 1 byte
* `countryOfIDIssuance` - 1 byte
* `rootHash` - 32 bytes
* `credentialSignature` - 65 bytes

The final argument, the address, should be inferred from the caller, although this can also be an argument sent to the smart contract. To call the smart contract, it is assumed credential access has already been provided, either via Fractal OAuth or via the Fractal Wallet.

****\
****Essentially, verifying a signature is computing the hash that Fractal has signed, using the previous parameters, and ensuring it was signed by a known Fractal address.

**`hash(address, kycType, countryOfResidence, countryOfIDIssuance, rootHash).`**\
****

**An example Solidity implementation of credential verification is the following:**

```
 function verify(
    uint8 kycType,
    uint8 countryOfIDIssuance,
    uint8 countryOfResidence,
    bytes32 rootHash,
    bytes calldata issuerSignature
  ) external pure returns (bool) {
    bytes32 signable = computeKey(
      msg.sender, // could also be a function argument
      kycType,
      countryOfIDIssuance,
      countryOfResidence,
      rootHash
    );

    // FRACTAL_SIGNER is a hard-coded address for valid Fractal Signatures
    return verifyWithPrefix(signable, issuerSignature, FRACTAL_SIGNER);
  }

  function computeKey(
    address sender,
    uint8 kycType,
    uint8 countryOfIDIssuance,
    uint8 countryOfResidence,
    bytes32 rootHash
  ) public pure returns (bytes32) {
    return keccak256(
      abi.encodePacked(
        sender,
        kycType,
        countryOfResidence,
        countryOfIDIssuance,
        rootHash
      )
    );
  }

  function verifyWithPrefix(
    bytes32 hash,
    bytes calldata sig,
    address signer
  ) internal pure returns (bool) {
    return _verify(addPrefix(hash), sig, signer);
  }

  function addPrefix(bytes32 hash) private pure returns (bytes32) {
    bytes memory prefix = "\x19Ethereum Signed Message:\n32";

    return keccak256(abi.encodePacked(prefix, hash));
  }

  function _verify(
    bytes32 hash,
    bytes calldata sig,
    address signer
  ) internal pure returns (bool) {
    return recover(hash, sig) == signer;
  }
```

**The current signing keys are (FRACTAL\_SIGNER in the code example) are:**

* **Staging:** 0xa372CA5A906f7FAD480C49bBc73453672d4d375d
* **Production:** 0xa3015543Ce7da7B9708076C1171E242C36452F10

You should note that, depending on your restrictions, verifying the signature is not enough to ensure the KYC is acceptable. It should still be checked if the `kycType` is of a desired value, as well as if the countryOfResidence and countryOfIDIssuance belong to supported tiers. This can be done on-chain or off-chain.

### **Off-chain Verification**

If you prefer to implement off-chain credential verification, you can do so by making use of [our SDK](https://github.com/trustfractal/sdk).\
****Assuming you have the credential in JSON format:

```
const credential = new Credential(json);
credential.verifyIntegrity() && credential.verifySignature();
```

Note that this does not verify if the credential was signed by a Fractal address, but instead if it is properly signed. As described in the On-chain Verification section, you should still make sure the KYC Type is supported by your organization and the country tiers are in line with the regulations you are subjected to:

```
credential.kycType // field for the KYC type
credential.countryOfResidence  // field for the country of residence
credential.countryOfIDIssuance // field for the country of ID Issuance
```

