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
* Webhook Secret Key

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

When a user is redirected back to your site or KYC ends in an iframe, you will receive a one-time token:

```javascript
// redirect-back url
https://yourserver.com/redirect_back_url?oneTimeToken=[ONE_TIME_TOKEN]

// Iframe message
const messageReceiver = useCallback((message: any) => {
    // React only messages from ID iframe
    if (message.origin === "https://kraken.fractal.id") {
      if (message.data.response === "rejected") {
        setMessage(`KYC process failed with: ${JSON.stringify(message.data.error)}`);
        // Hide iframe ...
      } else if (message.data.open) {
        // If you want to use wallet-sign-in, this is required
        // since there are security limitations, especially with
        // opening metamask protocol link in mobile device
        window.open(message.data.open, message.data.target, message.data.features);
      } else {
        setMessage(`KYC process is completed.`);
        // Hide iframe, load data, etc...
        // { 
        //    "oneTimeToken": "MXES5XpDzMRAHyMI3Jx5K3nrxzZjWjEr-Cskq3Jevso",
        //    "state": "state_arg"
        // }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", messageReceiver);
    return () => window.removeEventListener("message", messageReceiver);
  }, []);
```

This one-time token needs to be exchanged for a user ID.&#x20;

[https://kraken.fractal.id/api-doc#/PublicKyc/PublicKycController\_getSession](https://kraken.fractal.id/api-doc#/PublicKyc/PublicKycController_getSession)

Our API is secured by a JWT token, which should be generated on your side:

```javascript
export async function getAuthToken() {
  const payload = {
    api: true,
    clientId: process.env.CLIENT_ID,
  };

  return jwt.sign(payload, process.env.PRIVATE_KEY, {
    algorithm: "ES512",
    expiresIn: "600s",
  });
}

export interface ShortUserInfo {
  userId: string;
  state: "approved" | "pending" | "rejected";
  externalState?: state;
}

async function getUserId(oneTimeToken: string): Promise<ShortUserInfo> {
  const response = await fetch(
    `https://kraken.fractal.id/public/kyc/token/${oneTimeToken}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAuthToken()}`,
      },
    },
  );
  const json = await response.json();
  
  if (!response.ok) {
    throw new Error(`Failed to call KYC service ${JSON.stringify(json)}`);
  }

  return json as ShortUserInfo;
}
```

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
