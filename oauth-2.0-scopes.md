# OAuth 2.0 scopes

Fractal ID uses OAuth 2.0 as its underlying protocol. This protocol relies on [scopes](https://oauth.net/2/scope/) to limit application's access to user information.

We have the following scopes available.

## User basic scopes

| Scope          | Description                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `contact:read` | Email address or phone number of the user (whichever they chose during registration, where they provide one or the other) |
| `uid:read`     | **(default scope)** Anonymized unique user identifier.                                                                    |

## User KYC scopes

There are two types of user KYC scopes, the verification scope and information details scope. One type allows you to request the verification status (like `verification.basic:read`), while the second type allows you to access the information provided during the onboarding (`verification.basic.details:read`).

{% hint style="info" %}
If you wish to see the information details scope and request that the user goes through a given KYC level verification, you must specify both scopes.
{% endhint %}

### Level scopes

| KYC level / add-on | Verification scope        | Information details scope         |
| ------------------ | ------------------------- | --------------------------------- |
| `basic`            | `verification.basic:read` | `verification.basic.details:read` |
| `v1`               | `verification.v1:read`    | `verification.v1.details:read`    |
| `light`            | `verification.light:read` | `verification.light.details:read` |
| `plus`             | `verification.plus:read`  | `verification.plus.details:read`  |

### Add-on scopes

{% hint style="warning" %}
Asking a user for the following scopes without the presence of a level scope (like the ones above) is unsupported, and will result in an unexpected user experience.
{% endhint %}

| KYC level / add-on | Verification scope             | Information details scope              |
| ------------------ | ------------------------------ | -------------------------------------- |
| `liveness`         | `verification.liveness:read`   | `verification.liveness.details:read`   |
| `selfie`           | `verification.selfie:read`     | `verification.selfie.details:read`     |
| `sow`              | `verification.sow:read`        | `verification.sow.details:read`        |
| `ssn`              | `verification.ssn:read`        | `verification.ssn.details:read`        |
| `telegram`         | `verification.telegram:read`   | `verification.telegram.details:read`   |
| `twitter`          | `verification.twitter:read`    | `verification.twitter.details:read`    |
| `wallet`           | `verification.wallet:read`     | `verification.wallet.details:read`     |
| `wallet-sol`       | `verification.wallet-sol:read` | `verification.wallet-sol.details:read` |

## Client scopes

These scopes can be used during the [client credentials](back-office-integration/client-authorization.md#client-credentials-grant-flow) flow.

| Scope               | Description                         |
| ------------------- | ----------------------------------- |
| `client.stats:read` | Grants access to our statistics API |
