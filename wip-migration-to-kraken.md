---
description: This page describes step-by-step how a client can migrate co to a new version.
---

# (WIP) Migration to Kraken

## 1. Credentials

You have to request our OPS for the following credentials:

* Client ID
* API Key
* Webhook Secret Key
* Link

## 2. Update link

Links are similar to the previous version:

```
https://app.staging.sandbox.fractal.id/authorize?response_type=code&scope=contact%3Aread%20verification.basic%3Aread%20verification.basic.details%3Aread%20verification.liveness%3Aread%20verification.liveness.details%3Aread&client_id=dc3aa1910acbb7ff4d22c07e43a6926adc3a81305a9355a304410048c9a91afd&redirect_uri=https%3A%2F%2Fdemo.staging.sandbox.fractal.id%2Fapi%2Fcallback
```

The new link did not contain a redirect URI, and it's more readable:

```
https://kraken.fractal.id/kyc?clientId=CLIENT_ID&level=basic%2Bliveness
```

The link is the same for redirection or an iframe interaction.

## 3. Redirection back behavior

When a user is redirected back to your site, or KYC ends in an iframe. You will receive a one-time token, this one-time token needs to be exchanged for user-id:

[https://kraken.fractal.id/api-doc#/PublicKyc/PublicKycController\_getSession](https://kraken.fractal.id/api-doc#/PublicKyc/PublicKycController_getSession)

The user ID should be stored next to your user; later, you can use it to receive a KYC status or user data:

[https://kraken.fractal.id/api-doc#/PublicKyc/PublicKycController\_getData](https://kraken.fractal.id/api-doc#/PublicKyc/PublicKycController_getData)

The structure has changed, and if you want to get files, you should use:

[https://kraken.fractal.id/api-doc#/PublicKyc/PublicKycController\_getFile](https://kraken.fractal.id/api-doc#/PublicKyc/PublicKycController_getFile)

## 4. Webhooks

Webhooks are (almost) the same, you would receive a message in your webhook endpoint like this:

```
{
  "id": "USER_ID",
  "status": "approved|rejected|pending",
  "note": "Rejection reason"
}
```

To verify the authenticity of a webhook request, validate the signature using the X-Fractal-Signature header. Example implementation in JavaScript:

```
import crypto from "node:crypto";

const rawBody = request.body;

const calculatedDigest = crypto
  .createHmac("sha256", "WEBHOOK_SECRET") // Webhook secret key received during client account setup
  .update(rawBody)
  .digest("hex");

return crypto.timingSafeEqual(
  calculatedDigest,
  headers["X-Fractal-Signature"]
);
```
