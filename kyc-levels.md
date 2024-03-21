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

| Add-on                     | Description                                                                |
| -------------------------- | -------------------------------------------------------------------------- |
| `liveness`                 | Automatic liveness detection and automatic face-match.                     |
| `selfie`                   | Identity verification though ID document scan and selfie with ID document. |
| `sow`                      | Verification of source of wealth.                                          |
| `telegram`                 | Telegram username collection.                                              |
| `twitter`                  | Twitter username collection.                                               |
| `uniq`                     | Uniqueness check                                                           |
| **\[DEPRECATED]** `wallet` | ERC-20 (ETH) wallet address collection.                                    |
| `wallet-ada`               | Cardano wallet address collection.                                         |
| `wallet-algo`              | Algorand wallet address collection.                                        |
| `wallet-btc`               | Bitcoin wallet address collection.                                         |
| `wallet-eth`               | ERC-20 (ETH) wallet address collection.                                    |
| `wallet-kar`               | Karura wallet address collection and ownership verification.               |
| `wallet-sol`               | Solana wallet address collection.                                          |
| `wallet-substrate`         | Substrate wallet address collection.                                       |



{% hint style="info" %}
Some add-ons are included automatically, while others may not be supported by all levels.
{% endhint %}

### Add-on support matrix

<table><thead><tr><th width="176.83098725743793">Addon/Level</th><th align="center">uniqueness</th><th width="186.28571428571428" align="center">basic</th><th width="193.94328076609133" align="center">plus</th></tr></thead><tbody><tr><td><code>liveness</code></td><td align="center">✅</td><td align="center">➕</td><td align="center">➕</td></tr><tr><td><code>selfie</code></td><td align="center"><span data-gb-custom-inline data-tag="emoji" data-code="1f6ab">🚫</span></td><td align="center">➕</td><td align="center">➕</td></tr><tr><td><code>sow</code></td><td align="center">➕</td><td align="center">➕</td><td align="center">➕</td></tr><tr><td><code>ssn</code></td><td align="center">➕</td><td align="center">➕</td><td align="center">➕</td></tr><tr><td><code>telegram</code></td><td align="center">➕</td><td align="center">➕</td><td align="center">➕</td></tr><tr><td><code>twitter</code></td><td align="center">➕</td><td align="center">➕</td><td align="center">➕</td></tr><tr><td><code>idos</code></td><td align="center">➕</td><td align="center">➕</td><td align="center">➕</td></tr><tr><td><strong>[DEPRECATED]</strong> <code>wallet</code></td><td align="center">➕</td><td align="center">➕</td><td align="center">➕</td></tr><tr><td><code>wallet-ada</code></td><td align="center">➕</td><td align="center">➕</td><td align="center">➕</td></tr><tr><td><code>wallet-algo</code></td><td align="center">➕</td><td align="center">➕</td><td align="center">➕</td></tr><tr><td><code>wallet-btc</code></td><td align="center">➕</td><td align="center">➕</td><td align="center">➕</td></tr><tr><td><code>wallet-eth</code></td><td align="center">➕</td><td align="center">➕</td><td align="center">➕</td></tr><tr><td><code>wallet-kar</code></td><td align="center">➕</td><td align="center">➕</td><td align="center">➕</td></tr><tr><td><code>wallet-sol</code></td><td align="center">➕</td><td align="center">➕</td><td align="center">➕</td></tr><tr><td><code>wallet-substrate</code></td><td align="center">➕</td><td align="center">➕</td><td align="center">➕</td></tr></tbody></table>

{% hint style="info" %}
✅ - included; ➕ - available; :no\_entry\_sign: - unavailable
{% endhint %}

