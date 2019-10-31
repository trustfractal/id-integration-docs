# KYC levels

Fractal ID supports different levels of verification. Additionally, each level may be extended by a number of add-ons. This will impact the data the user is requested to share and consequently their journey in Fractal ID.

## Available levels

| Level | Attestations |
| :--- | :--- |
| `v1` | **\[Deprecated\]** Identity \(selfie/video\), Residency, PEP/Sanction lists, Age of Majority, High-risk Countries, and SSN. |
| `basic` | Identity \(liveness\) verification through OCR, PEP/Sanction lists, Age of Majority. |
| `light` | Identity \(selfie\). |
| `plus` | Identity \(selfie/video\), Residency, PEP/Sanction lists, Age of Majority, High-risk Countries. |

{% hint style="info" %}
Brief description of Attestations \(Attestations are the processes included in each Level\)

* **Residency**: collection and verification of proof of address document.
* **PEP/Sanction lists**: rejection of Users that are politically exposed persons \(PEPs\) or covered by any sanction list tracked by Fractal ID.
* **Age of majority**: rejection of Users under 18 years old.
* **High-risk Countries**: rejection of Users residing in countries included in the European Commission’s list of high-risk third countries and in the FATF monitored and call-for-action lists.

\[selfie, liveness, video and SSN are described in the _Available add-ons_ section below\]
{% endhint %}

## Available add-ons

| Add-on | Description |
| :--- | :--- |
| `selfie` | Identity verification though ID document scan and selfie with ID document. |
| `video` | Identity verification through real time video call with an operator \(Video ID\). |
| `liveness` | Automatic liveness detection and automatic face-match. |
| `accreditation` | Verification of accredited investor status; available for US and Canadian residents only. |
| `wallet` | Crypto currency wallet check using [Coinfirm](https://www.coinfirm.com/). |
| `sow` | Verification of source of wealth. |
| `ssn` | Social security number collection; applicable to US residents only. |

{% hint style="info" %}
Some addons are included automatically, while others may not be supported by all levels.
{% endhint %}

### Add-on support matrix

| Level | `liveness` | `selfie` | `video` | `accreditation` | `wallet` | `sow` | `ssn` |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `basic` | ➕ ⚠️ | 🚫 | 🚫 | 🚫 | 🚫 | 🚫 | 🚫 |
| `v1` | 🚫 | ✅ | ➕ | 🚫  | ➕ | ➕ | ✅ |
| `light` | 🚫 | ➕ ⚠️ | 🚫  | ➕ | ➕ | ➕ | ➕ |
| `plus` | 🚫 | ➕ ⚠️ | ➕ ⚠️ | ➕ | ➕ | ➕ | ➕ |

{% hint style="info" %}
✅ - included; ➕ - available; 🚫 - unavailable
{% endhint %}

{% hint style="warning" %}
⚠️ - **basic** level requires the **liveness** add-on to be used.  
⚠️ - **light** level requires the **selfie** add-on to be used.  
⚠️ - **plus** level requires either the **selfie** or the **video** add-on to be used.
{% endhint %}



