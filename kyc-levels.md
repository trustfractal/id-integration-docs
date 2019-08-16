# KYC levels

Fractal ID supports different levels of verification. Additionally, each level may be extended by a number of add-ons. This will impact the data the user is requested to share and consequently their journey in Fractal ID.

## Available levels

| Level | Description |
| :--- | :--- |
| `v1` | Identity with selfie, residence, AML, accreditation, and SSN checks. |
| `light` | Identity and residence checks. |
| `plus` | Identity, residence and AML checks. |

## Available add-ons

| Add-on | Description |
| :--- | :--- |
| `selfie` | Identity check using selfie with document photo upload. |
| `video` | Identity check using real time video call \(Video ID\). |
| `accreditation` | Accreditated investor check; applicable to US and Canadian residents only. |
| `wallet` | Crypto currency wallet check; uses [Coinfirm](https://www.coinfirm.com/). |
| `sow` | Source of wealth check. |
| `ssn` | Social security number check; applicable to US residents only. |

{% hint style="info" %}
Some addons are included automatically, while others may not be supported by all levels.
{% endhint %}

### Add-on support matrix

| Level | `selfie` | `video` | `accreditation` | `wallet` | `sow` | `ssn` |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `v1` | ✅ | ➕ | ✅ | ➕ | ➕ | ✅ |
| `light` | ➕ ⚠  | 🚫  | ➕ | ➕ | ➕ | ➕ |
| `plus` | ➕ ⚠  | ➕ ⚠  | ➕ | ➕ | ➕ | ➕ |

{% hint style="info" %}
✅ - included; ➕ - available; 🚫 - unavailable;
{% endhint %}

{% hint style="warning" %}
⚠ - **light** level requires the **selfie** add-on to be used.   
⚠ - **plus** level requires either the **selfie** or the **video** add-on to be used.
{% endhint %}



