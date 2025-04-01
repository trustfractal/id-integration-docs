---
description: This page describes step-by-step how a client can migrate co to a new version.
---

# Migration to Kraken

## 1. Account creation

Items we need:

* Name
* Owner email address
* Public EC512 key (signing requests or accessing API)

```bash
echo "Generate private key:"
openssl ecparam -name secp521r1 -genkey -noout -out es512-private.pem
echo "Convert pkcs8 compatible private key:"
openssl pkcs8 -topk8 -nocrypt -in es512-private.pem -out es512-private-key-pkcs8.pem
echo "Generate public key:"
openssl ec -in es512-private.pem -pubout -out es512-public.pem
```

* Webhook URL
* Notification email (only if you want to get email changes)
* Redirect URL

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

The new link did not contain attributes but just a signed JWT token:

```javascript
const payload = {
  clientId: "CLIENT_ID",
  kyc: true,
  level: "basic+liveness+idos",
  state?: "state",
}

// There is no expiration
const token = jwt.sign(payload, privateKey, { algorithm: "ES512" });
```

```html
https://kraken.fractal.id/kyc?token=token # JWT signed token from previous step
```

The link is the same for redirection or an iframe interaction.

## 3. Redirection back behavior

**3.1. Generate an API token**

```javascript
const payload = {
  clientId: "CLIENT_ID",
  api: true,
}

// Expiration is max 10min for API tokens
// this token is private, don't expose it
const bearerToken = jwt.sign(payload, privateKey, { algorithm: "ES512", expiresIn: "600s" });
```

When a user is redirected back to your site or KYC ends in an iframe, you will receive a one-time token. This one-time token needs to be exchanged for a user ID.&#x20;

[https://kraken.fractal.id/api-doc#/PublicKyc/PublicKycController\_getSession](https://kraken.fractal.id/api-doc#/PublicKyc/PublicKycController_getSession)

The user ID should be stored next to your user; later, you can use it to receive a KYC status or user data.

[https://kraken.fractal.id/api-doc#/PublicKyc/PublicKycController\_getData](https://kraken.fractal.id/api-doc#/PublicKyc/PublicKycController_getData)

The structure has changed, and if you want to get files, you should use:

[https://kraken.fractal.id/api-doc#/PublicKyc/PublicKycController\_getFile](https://kraken.fractal.id/api-doc#/PublicKyc/PublicKycController_getFile)

## 4. Webhooks

Webhooks are (almost) the same; you would receive a message in your webhook endpoint like this:

```json
{
  "id": "USER_ID",
  "status": "approved|rejected",
  "note": "Rejection reason"
}
```

To verify the authenticity of a webhook request, validate the signature using the X-Fractal-Signature header. Example implementation in JavaScript:

```javascript
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
