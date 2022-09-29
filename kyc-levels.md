# KYC levels

Fractal ID supports different levels of verification. Additionally, each level may be extended by a number of add-ons. This will impact the data the user is requested to share and consequently their journey in Fractal ID.

## Available levels

| Level        | Attestations                                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------------------------- |
| `uniqueness` | Liveness check, uniqueness check                                                                               |
| `basic`      | ID document verification, Liveness check, Age of Majority, PEP/Sanction lists                                  |
| `plus`       | ID document verification, Liveness check, Age of Majority, PEP/Sanction lists, Residency, High-risk Countries. |

{% hint style="info" %}
Brief description of Attestations (Attestations are the processes included in each Level)

* **ID document verification:** collection and validation of ID document through OCR technology.
* **Residency**: collection and verification of proof of address document/country.&#x20;
* **PEP/Sanction lists**: rejection of Users that are politically exposed persons (PEPs) or covered by any sanction list tracked by Fractal ID.
* **Age of majority**: rejection of Users under 18 years old.
* **High-risk Countries**: rejection of Users residing in countries included in the European Commission’s list of high-risk third countries and in the FATF monitored and call-for-action lists.

\[selfie, liveness are described in the _Available add-ons_ section below]
{% endhint %}

## Available add-ons

| Add-on             | Description                                                                |
| ------------------ | -------------------------------------------------------------------------- |
| `liveness`         | Automatic liveness detection and automatic face-match.                     |
| `selfie`           | Identity verification though ID document scan and selfie with ID document. |
| `sow`              | Verification of source of wealth.                                          |
| `telegram`         | Telegram username collection.                                              |
| `twitter`          | Twitter username collection.                                               |
| `uniq`             | Uniqueness check                                                           |
| `wallet`           | ERC-20 (ETH) wallet address collection.                                    |
| `wallet-ada`       | Cardano wallet address collection.                                         |
| `wallet-algo`      | Algorand wallet address collection.                                        |
| `wallet-sol`       | Solana wallet address collection.                                          |
| `wallet-substrate` | Substrate wallet address collection.                                       |



{% hint style="info" %}
Some add-ons are included automatically, while others may not be supported by all levels.
{% endhint %}

### Add-on support matrix

| Addon/Level        |     uniqueness    | basic | plus |
| ------------------ | :---------------: | :---: | :--: |
| `liveness`         |         ✅         |   ➕   |   ➕  |
| `selfie`           | :no\_entry\_sign: |   ➕   |   ➕  |
| `sow`              |         ➕         |   ➕   |   ➕  |
| `ssn`              |         ➕         |   ➕   |   ➕  |
| `telegram`         |         ➕         |   ➕   |   ➕  |
| `twitter`          |         ➕         |   ➕   |   ➕  |
| `wallet`           |         ➕         |   ➕   |   ➕  |
| `wallet-ada`       |         ➕         |   ➕   |   ➕  |
| `wallet-algo`      |         ➕         |   ➕   |   ➕  |
| `wallet-sol`       |         ➕         |   ➕   |   ➕  |
| `wallet-substrate` |         ➕         |   ➕   |   ➕  |

{% hint style="info" %}
✅ - included; ➕ - available; :no\_entry\_sign: - unavailable
{% endhint %}

