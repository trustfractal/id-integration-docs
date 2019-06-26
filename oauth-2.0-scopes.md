# OAuth 2.0 scopes

Fractal ID uses OAuth 2.0 as its underlying protocol. This protocol relies on [scopes](https://oauth.net/2/scope/) to limit application's access to user information.

We have the following scopes available.

## User basic scopes

| Scope | Description |
| :--- | :--- |
| `email:read` | Email addresses of the user. |
| `uid:read` | **\(default scope\)** Anonymized unique user identifier. |

## User KYC level scopes

There are two types of KYC level scopes. One type allows you to request the verification, while the second type allows you to access the information used.

| KYC level / add-on | Verification scope | Information details scope |
| :--- | :--- | :--- |
| `v1` | `verification.v1:read` | `verification.v1.details:read` |
| `light` | `verification.light:read` | `verification.light.details:read` |
| `plus` | `verification.plus:read` | `verification.plus.details:read` |
| `accreditation` | `verification.accreditation:read` | `verification.accreditation.details:read` |
| `selfie` | `verification.selfie:read` | `verification.selfie.details:read` |
| `sow` | `verification.sow:read` | `verification.sow.details:read` |
| `ssn` | `verification.ssn:read` | `verification.ssn.details:read` |
| `video` | `verification.video:read` | `verification.video.details:read` |
| `wallet` | `verification.wallet:read` | `verification.wallet.details:read` |

{% hint style="info" %}
If you wish to see the information details scope and request that the user goes through a given KYC level verification, you must specify both scopes.
{% endhint %}

## Client scopes

These scopes can be used during the client credentials flow.

| Scope | Description |
| :--- | :--- |
| `client.stats:read` | Grants access to our statistics API |

