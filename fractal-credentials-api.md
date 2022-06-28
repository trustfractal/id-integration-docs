# Fractal Credentials API

**Authorize transactions by including a Fractal proof in their payload.**

Using this API, you can leverage our existing user base with a quick and easy solution to access the provably verifiable KYC status of the identity behind a wallet address and validate it on-chain.

## Environments

| Environment | URL                                  | Signing address                              |
| ----------- | ------------------------------------ | -------------------------------------------- |
| Staging     | resource.next.fractal.id/credentials | `0x2fCAb633adFA6aF8266025D63228047033c3ceD0` |
| Production  | resource.fractal.id/credentials      | `0xacD08d6714ADba531beFF582e6FD5DA1AFD6bc65` |

## Before using

You are required to create an application using our Developer Dashboard in order to use this API. See how [here](getting-started.md#create-an-application).

## Usage

1. Before a user interacts with your contract, ask them to sign a message authorizing Fractal to respond on their behalf.
2. Send this message and signature to Fractal's API, which returns an expiry timestamp (24 hours in the future), a proof (Fractal's signature of the user's credential) and other relevant fields.
3. Use this these fields and the proof as arguments to your contract's method.

```javascript
// using web3.js and MetaMask

const message = `I authorize Defistarter (dc3aa1910acbb7ff4d22c07e43a6926adc3a81305a9355a304410048c9a91afd) to get a proof from Fractal that:
- I passed KYC level plus+liveness
- I am not a citizen of the following countries: Germany (DE)
- I am not a resident of the following countries: Germany (DE)`;

const account = (await web3.eth.getAccounts())[0];
const signature = await ethereum.request({
    method: "personal_sign", 
    params: [message, account]
});

const { 
    address,
    approvedAt,
    fractalId,
    proof,
    validUntil
} = await FractalAPI.getProof(message, signature);

const mainContract = new web3.eth.Contract(contractABI, contractAddress);
mainContract.methods.main(proof, validUntil, approvedAt, fractalId).send({ from: account });
```

## Getting a KYC proof

{% swagger method="get" path="/credentials" baseUrl="resource.fractal.id" summary="Get proof of KYC" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="message" required="true" %}
Message that authorizes sharing KYC data and defines credential requirements
{% endswagger-parameter %}

{% swagger-parameter in="query" name="signature" required="true" %}
Signature of message using 

`personal_sign`
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    "approvedAt": 1654693829,
    "address": "0xC61bA26E1C0F463Cd1BB57C962c6e7E411E79cb4",
    "fractalId": "0x02f1da55bc94926ef44faa6153cc9ad4f1e0f5ec3844b7c12ef96dea88657fdd",
    "validUntil": 1656080869,
    "proof": "0x8951496d1d0091945647fb425310e66ea766254bf52899bdca6d8fd70cda2e26091ba3fefad64428b07d78caf1f1ed077b6ca1ee1e6682c6838ad73a3d95ace51c"
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}
```javascript
{
    "error": <error_code>
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="No user with this wallet meets the KYC requirements" %}
```javascript
{
    "address": "0x123",
    "error": "user_not_found"
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="A pending user with this wallet meets the KYC requirements" %}
```javascript
{
    "address": "0x123",
    "error": "user_pending"
}
```
{% endswagger-response %}
{% endswagger %}

#### JavaScript example&#x20;

```javascript
// using web3.js and MetaMask

async function main() {
  const message = `I authorize Defistarter (dc3aa1910acbb7ff4d22c07e43a6926adc3a81305a9355a304410048c9a91afd) to get a proof from Fractal that:
- I passed KYC level plus+liveness
- I am not a citizen of the following countries: Germany (DE)
- I am not a resident of the following countries: Canada (CA), Germany (DE), United States of America (US)`;

  const account = (await web3.eth.getAccounts())[0];
  const signature = await ethereum.request({
    method: "personal_sign", 
    params: [message, account]
  });

  const encMessage = encodeURIComponent(message);

  try {
    const res = await fetch(`https://resource.fractal.id/credentials?message=${encMessage}&signature=${signature}`);
    const proof = await res.json();
    // do something with proof
    console.log(proof);
  } catch (err) {
    console.log(err);
  }
}
```

### Message format

You can easily generate a valid message using the [example code](fractal-credentials-api.md#message-generator-example).

```
I authorize <application_name> (<client_id>) to get a proof from Fractal that:
- I passed KYC level <level>
[- I am not a citizen of the following countries: <citizenship_country_list>]
[- I am not a resident of the following countries: <residency_country_list>]
```

| Parameter                    |                                     |
| ---------------------------- | ----------------------------------- |
| `<application_name>`         | Name of your Fractal ID application |
| `<client_id>`                | UID of your Fractal ID application  |
| `<level>`                    | Requested KYC level                 |
| `<citizenship_country_list>` | Citizenship country blocklist       |
| `<residency_country_list>`   | Residency country blocklist         |

#### Application name and UID

These can be found in the [Developer Dashboard](getting-started.md#create-an-application).

#### Level

Choose your required [KYC level and addons](kyc-levels.md). Please reach out to [sales@fractal.id](mailto:sales@fractal.id) if you don't know what to choose.

You must choose 1 level and any number of addons in the following format:

```
<level>[+<addon>]* (e.g., basic+liveness+sow)
```

#### Country blocklists

You can define which countries should not be accepted for citizenship and/or residency. If a user matches your other requirements but is a citizen of or resides in one of the define countries, a credential will not be issued — it will result in a 404 response.

The format for each country list is the following:

```
<country_name> (<country_code>)[, <country_name> (<country_code>)]*
e.g., Germany (DE), United States of America (US)
```

The country code and name is checked against the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO\_3166-1\_alpha-2) list.

{% hint style="info" %}
Both lists are optional. In case you don't want to restrict any citizenship/residency country, the full line should be removed. An empty list of countries is not accepted.
{% endhint %}

{% hint style="info" %}
`uniqueness` level does **not** support **any** country restrictions;

`basic` level supports **only** citizenship country restrictions;

`plus` level supports **both** citizenship and residency country restrictions.
{% endhint %}

#### Message examples

Example #1 — citizenship and residency restrictions

```
I authorize Defistarter (dc3aa1910acbb7ff4d22c07e43a6926adc3a81305a9355a304410048c9a91afd) to get a proof from Fractal that:
- I passed KYC level plus+liveness
- I am not a citizen of the following countries: Germany (DE)
- I am not a resident of the following countries: Canada (CA), Germany (DE), United States of America (US)
```

Example #2 — citizenship restriction

```
I authorize Defistarter (dc3aa1910acbb7ff4d22c07e43a6926adc3a81305a9355a304410048c9a91afd) to get a proof from Fractal that:
- I passed KYC level basic
- I am not a citizen of the following countries: Germany (DE)
```

Example #3 — no country restrictions

```
I authorize Defistarter (dc3aa1910acbb7ff4d22c07e43a6926adc3a81305a9355a304410048c9a91afd) to get a proof from Fractal that:
- I passed KYC level plus+liveness
```

#### Message generator example

You can easily generate a message by using this [example code snippet](https://gist.github.com/tiagofragoso/26f7551a1f339d36b8e88e9fed266fd3) and inputting your own values.

### Response format

Example response

```json
{
    "approvedAt": 1654693829,
    "address": "0xC61bA26E1C0F463Cd1BB57C962c6e7E411E79cb4",
    "fractalId": "0x02f1da55bc94926ef44faa6153cc9ad4f1e0f5ec3844b7c12ef96dea88657fdd",
    "validUntil": 1656080869,
    "proof": "0x8951496d1d0091945647fb425310e66ea766254bf52899bdca6d8fd70cda2e26091ba3fefad64428b07d78caf1f1ed077b6ca1ee1e6682c6838ad73a3d95ace51c"
}
```

| Field        | Type           | Description                                      |
| ------------ | -------------- | ------------------------------------------------ |
| `approvedAt` | UNIX timestamp | User approval timestamp                          |
| `address`    | EVM address    | User address                                     |
| `fractalId`  | Hex string     | User unique identifier                           |
| `validUntil` | UNIX timestamp | Credential expiry timestamp (24h after issuance) |
| `proof`      | Hex string     | Signed proof of KYC                              |

### Error codes

#### 400 Bad request

`error: invalid_configuration`\
``**Why?** You've tried to add country restrictions that are not supported by the level you chose.\
**Fix:** Use only valid country restrictions — see [Country blocklists](fractal-credentials-api.md#country-blocklists).

`error: invalid_client_id`\
``**Why?** The `application_uid` you have supplied is not in the system.\
**Fix:** Check if there's a typo; or [create an application](getting-started.md#create-an-application) if you have not done so.

`error: invalid_country`\
``**Why?** The country list(s) you supplied contain invalid country names or codes.\
**Fix:** Please refer to the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO\_3166-1\_alpha-2) list or use our [example message generator](fractal-credentials-api.md#message-generator-example).

`error: invalid_level`\
``**Why?** The `level` you supplied is not valid.\
**Fix:** Please refer to the [KYC levels page](kyc-levels.md).

`error: invalid_message_schema`\
``**Why?** The `message` you supplied is not valid.\
**Fix:** Please use our [example message generator](fractal-credentials-api.md#message-generator-example) or make sure that the message that you created matches the format described above.

`error: invalid_params`\
``**Why?** The `message` and/or `signature` query parameter is missing.\
**Fix:** Both parameters are required.

`error: invalid_signature`\
``**Why?** The `signature` you supplied is invalid.\
**Fix:** Please make sure to use `personal_sign` when requesting the user to sign the message.

#### 404 Not Found

`error: user_pending`\
``**Why?** There is a user in our system that matches your KYC requirements and is identified by the wallet address that signed the message. However, their verification has not yet been approved.\
**Fix:** Direct the user to Fractal ID — if they're waiting on Fractal to approve their verification, there's no further action; if they've been contacted by Fractal's Identity Specialists to update their data, they should do so in Fractal ID.&#x20;

`error: user_not_found`\
``**Why?** There is no user in our system that matches your KYC requirements and is identified by the wallet address that signed the message.\
**Fix:** Use your authorization link to direct the user to our KYC journey.

{% hint style="info" %}
If you supply a valid `signature parameter`but the message does not match, the flow of `personal_recover` may yield a random address. We include the recovered address in the response, so that you can check if it matches with the one that signed the message.

If it does not match, then there's a difference between the message you asked the user to sign and the one you sent to our endpoint.
{% endhint %}

## Using the KYC proof

Please refer to [this repo](https://github.com/trustfractal/web3-identity) for an example on how to use the KYC proof in your smart contract. &#x20;

