# Fractal ID API Documentation

Fractal ID is an online service for identity provisioning and verification.
This service implements the [OAuth2](https://oauth.net/2/) protocol for user
authentication, authorization and resource retrieval.

## Getting started

Integration of Fractal ID API is currently available upon request.

To get started, we need you to provide us with:
   1. the target authorization redirection endpoint, `redirect_uri`
      (`https://example.com/oauth/callback`);
   1. the application homepage URL;
   1. the application display name;
   1. the application display logo (in square format);
   1. optionally, the webhook callback URL (`https://example.com/webhook`);

We will then provide you with an API application ID and secret (`CLIENT_ID` and
`CLIENT_SECRET`). If you are using Webhooks, we will also send you the webhook
secret token (`WEBHOOK_SECRET`).

Note: As a security measure, all URLs [MUST be secured using
HTTPS](https://tools.ietf.org/html/rfc6749#section-3.1.2.1), except when using
`localhost` addresses.

We have staging and production environments available. Throughout this
document, we will use the following placeholders. You should use the domains
that match the environment you are using.

| domain            | staging                  | production          |
| ----------------- | ------------------------ | ------------------- |
| `FRONTEND_DOMAIN` | next.fractal.id          | fractal.id          |
| `AUTH_DOMAIN`     | auth.next.fractal.id     | auth.fractal.id     |
| `RESOURCE_DOMAIN` | resource.next.fractal.id | resource.fractal.id |
| `VERIFIER_DOMAIN` | verifier.next.fractal.id | verifier.fractal.id |


## KYC levels

Fractal ID supports different levels of verification. Additionally, each level
may be extended by a number of addons. This will impact the data the user is requested to share and consequently their journey in Fractal ID.

Available levels:

* `v1`: Identity with selfie, residence, AML, accreditation, and SSN checks;
* `light`: Identity and residence checks;
* `plus`: Identity, residence, and AML checks;

Available addons:

* `selfie`: Identity check using selfie with document photo upload.
* `video`: Identity check using real time video call (Video ID).
* `accreditation`: Accreditated investor check; applicable to US and Canadian residents only.
* `wallet`: Crypto currency wallet check; uses [Coinfirm](https://www.coinfirm.com/).
* `ssn`: Social security number check; applicable to US residents only.

Some addons are included automatically, while others may not be supported by
all levels. Here is our current addon support matrix:

| level   | selfie    | video       | accreditation | wallet    | ssn       |
| ------- | --------- | ----------- | ------------- | --------- | --------- |
| `v1`    | included  | available   | included      | available | included  |
| `light` | available | unavailable | available     | available | available |
| `plus`  | available | unavailable | available     | available | available |

**Note**: For light and plus levels, you must specify the `selfie` addon.


## API Authorization

Every request sent to the Fractal ID API must be authorized by adding an
`Authorization` header containing a valid access token (except the endpoint
used to obtain access tokens: `/oauth/token`).

Conceptually, access tokens are tied to an identity. There are two types of
identities:

* User identities; you obtain these tokens by following the User authorization
  flow. You should use these when you want to access information of one of your
  users.

* Application identities; you obtain these tokens by following the Client
  authorization flow. You should use these access tokens when you want to
  interact with our statistics endpoints, for example.


## OAuth2 scopes

Fractal ID uses OAuth2 as its underlying protocol. This protocol relies on
[scopes](https://oauth.net/2/scope/) to limit application's access to user
information.

We have the following scopes available.

User basic scopes:

| scope          | description                                            |
| -------------- | ------------------------------------------------------ |
| `email:read`   | Email addresses of the user.                           |
| `uid:read`     | **(default scope)** Anonymized unique user identifier. |


User KYC level scopes:

There are two types of KYC level scopes. One type allows you to request the
verification, while the second type allows you to access the
information used.

| kyc level / addon | verification scope                | information details scope                 |
| ----------------- | --------------------------------- | ----------------------------------------- |
| `v1`              | `verification.v1:read`            | `verification.v1.details:read`            |
| `light`           | `verification.light:read`         | `verification.light.details:read`         |
| `plus`            | `verification.plus:read`          | `verification.plus.details:read`          |
| `accreditation`   | `verification.accreditation:read` | `verification.accreditation.details:read` |
| `selfie`          | `verification.selfie:read`        | `verification.selfie.details:read`        |
| `ssn`             | `verification.ssn:read`           | `verification.ssn.details:read`           |
| `video`           | `verification.video:read`         | `verification.video.details:read`         |
| `wallet`          | `verification.wallet:read`        | `verification.wallet.details:read`        |

**Note**: If you wish to see the information details scope and request that the
user goes through a given KYC level verification, you must specify both scopes.

Client scopes:

These scopes can be used during the client credentials flow.

| scope               | description                         |
| ------------------- | ----------------------------------- |
| `client.stats:read` | Grants access to our statistics API |

## User authorization

Fractal ID implements the [authorization code
grant](https://tools.ietf.org/html/rfc6749#section-1.3.1) of the [OAuth2
standard](https://tools.ietf.org/html/rfc6749).

This flow can be summarized by the following steps:

- your application redirects your user to our authorization endpoint, with the KYC level described as a set of scopes;
- the user fills in their information on Fractal ID;
- the user gets redirected back to your application (`redirect_uri`), with a `code` in its URL parameters (that expires after 10 minutes);
- your application's backend exchanges the `code` for an `access_token` and a `refresh_token`, using your client credentials;
- when the access token expires (after 2 hours), you may obtain a new one using the `refresh_token` and your client credentials;

### Obtaining an authorization code

Redirect the user to our authorization endpoint:

```
https://FRONTEND_DOMAIN/authorize
  ?client_id={your-app-id}
  &redirect_uri={your-redirect-uri}
  &response_type=code
  &scope={desired-scope}
  &state={state-param}
```

This request has the following parameters:

| parameter       | required? | description                                                                                                                                                                                                                                                  |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `client_id`     | yes       | The ID of your app on our system.                                                                                                                                                                                                                            |
| `redirect_uri`  | yes       | The URL that you want to redirect the person logging in back to. Must be HTTPS.                                                                                                                                                                              |
| `response_type` | yes       | `code`                                                                                                                                                                                                                                                       |
| `scope`         | no        | A **space-separated** list of authorization scopes to request. Defaults to `uid:read`.                                                                                                                                                      |
| `state`         | yes       | A value created by you to maintain state between the request and callback. This parameter is [mostly used to prevent CSRF](https://auth0.com/docs/protocols/oauth2/oauth-state) and will be passed back to you, unchanged, in your redirect URI. |

Once redirected, the user might have to log into Fractal ID. If so, they'll be
presented with a page to that effect.

Once they are logged in, they will be shown an authorization screen, where
they're asked whether they're willing to grant your application the
requested permissions as requested through the scopes. They will then be
redirected back to `{your-redirect-uri}`.

#### Authorization allowed

If the user **authorizes your application**, they will be redirected to:

```
https://{your-redirect-uri}
  ?code={code}
  &state={state-param}
```

This request has the following parameters:

| parameter | description                                                                     |
| --------- | ------------------------------------------------------------------------------- |
| `code`    | Authorization code to be exchanged for an access token, expiring in 10 minutes. |
| `state`   | Unchanged `state` parameter you provided during authorization request.          |

#### Authorization denied

If the user **refuses authorization**, Fractal ID will redirect them to:

```
https://{your-redirect-uri}
  ?error=access_denied
  &error_description=The+resource+owner+or+authorization+server+denied+the+request.
```

#### Other errors

The request might fail for reasons other than authorization refusal. Please
refer to [RFC 6749 §4.1.2.1. (Error
Response)](https://tools.ietf.org/html/rfc6749#section-4.1.2.1) for details.

### Obtaining an access token

You will then need to exchange the code for an access token. Be sure to do the
following on your server, as your `client_secret` shouldn't be exposed to the
client.

```
POST https://AUTH_DOMAIN/oauth/token
  ?client_id={your-app-id}
  &client_secret={your-app-secret}
  &code={code}
  &grant_type=authorization_code
  &redirect_uri={your-redirect-uri}
```

| parameter       | required? | description                                                                     |
| --------------- | --------- | ------------------------------------------------------------------------------- |
| `client_id`     | yes       | Your API application ID.                                                        |
| `client_secret` | yes       | Your API application secret.                                                    |
| `code`          | yes       | Authorization code obtained in the previous step.                               |
| `grant_type`    | yes       | `authorization_code`                                                            |
| `redirect_uri`  | yes       | The URL that the user was redirected to in the first step (without parameters). |

This access token expires 2 hours later.

This endpoint returns JSON. An example follows.

```json
{
  "access_token": "7rgojfemuk-aq8RcA7xWxJQKv6Ux0VWJ1DQtU6178B8",
  "token_type": "bearer",
  "expires_in": 7200,
  "refresh_token": "thPSSHGnk3NGU5vV4V_g-Qrs47RibO9KEEhfKYEgJOw",
  "scope": "uid:read email:read",
  "created_at": 1543585106
}
```

Please refer to [RFC 6749 §5.1 (Successful
Response)](https://tools.ietf.org/html/rfc6749#section-5.1) for further details
on the fields.

**Note**: the list of authorized scopes may be different from the required
ones. Default scopes may be added, and the user may deny access to some of
them. If you request both institution and person scopes, you will only be
granted the ones that match the user type.


### Refreshing access token

Fractal ID implements refresh token rotation, which means that every access
token refresh request will issue a new refresh token. Previous tokens are
invalidated (revoked) only once the access token is used. For refreshed access
tokens, the scopes are identical from the previous access token.

```
POST https://AUTH_DOMAIN/oauth/token
  ?client_id={your-app-id}
  &client_secret={your-app-secret}
  &refresh_token={refresh-token}
  &grant_type=refresh_token
```

This request has the following parameters:

| parameter       | required? | description                                                             |
| --------------- | --------- | ----------------------------------------------------------------------- |
| `client_id`     | yes       | Your API application ID.                                                |
| `client_secret` | yes       | Your API application secret.                                            |
| `refresh_token` | yes       | Refresh token to be exchanged for an access token for access retrieval. |
| `grant_type`    | yes       | `refresh_token`                                                         |

Example response:

```json
{
  "access_token": "bftp_00bxmjiTyCqiptfR_hUDMMcPAZuGg9mylnNM3g",
  "token_type": "bearer",
  "expires_in": 7200,
  "refresh_token": "leZCHE_ZTggSB2wNiUM1Huy0X7ZgYpbLaJ9ZHk-rRas",
  "scope": "uid:read email:read",
  "created_at": 1543586706
}
```

Please refer to [RFC 6749 §5.1 (Successful
Response)](https://tools.ietf.org/html/rfc6749#section-5.1) for further details
on the fields.

## Client authorization

To access information related to your application, you must obtain an access
token using the [client credentials
grant](https://tools.ietf.org/html/rfc6749#section-1.3.4).

This flow is composed of a single step. You must send the following request to
our authorization server:

```
POST https://AUTH_DOMAIN/oauth/token
  ?client_id={your-app-id}
  &client_secret={your-app-secret}
  &grant_type=client_credentials
  &scope={your-wanted-scopes}
```

This request has the following parameters:

| parameter       | required? | description                                                                                             |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------- |
| `client_id`     | yes       | Your API application ID.                                                                                |
| `client_secret` | yes       | Your API application secret.                                                                            |
| `scope`         | no        | A space-separated list of authorization scopes to request. If not mentioned, it defaults to `uid:read`. |
| `grant_type`    | yes       | `client_credentials`                                                                                    |

Example response:

```json
{
  "access_token":"OUuf_tJs-J2AAxjWr0JHvzFure5Eb7KMUQRO0jpqXWc",
  "token_type":"Bearer",
  "expires_in":7200,
  "scope":"client.stats:read",
  "created_at":1554400723
}
```

## User information retrieval

You can obtain user information through the `/users/me` endpoint. This requires
a valid `access_token`.

```
GET https://RESOURCE_DOMAIN/users/me
Authorization: Bearer {access-token}
```

This endpoint returns JSON. The scopes associated with the access token will
define which fields will be returned. A few examples follow.

Assuming the access token has the following scopes:

* `uid:read`
* `email:read`
* `verification.plus:read`
* `verification.selfie:read`
* `verification.wallet:read`
* `verification.wallet.details:read`

The response payload would be:

```json
{
  "uid": "d52bdee2-0543-4b60-8c46-5956a37db8af",
  "emails": [
    { "address": "ewd@example.com" }
  ],
  "verifications": [
    {
      "level": "plus"
    },
    {
      "level": "selfie"
    },
    {
      "level": "wallet",
      "details": {
        "wallet_currency": "ETH",
        "wallet_address": "0x0000000000000000000000000000000000000000"
      }
    }
  ]
}
```

If the scopes were:

* `uid:read`
* `verification.plus:read`
* `verification.plus.details:read`
* `verification.selfie:read`
* `verification.selfie.details:read`
* `verification.wallet:read`

The response payload would be:

```json
{
  "uid": "d52bdee2-0543-4b60-8c46-5956a37db8af",
  "verifications": [
    {
      "level": "plus",
      "details": {
        "accredited_investor": true,
        "accredited_investor_proof_file": "https://example.com/path-to-accreditation-file",
        "date_of_birth": "1930-05-11",
        "full_name": "Edsger Wybe Dijkstra",
        "place_of_birth": "Rotterdam",
        "identification_document_country": "NL",
        "identification_document_type": "national_id",
        "identification_document_number": "123456789",
        "residential_address": "Austin, Texas",
        "residential_address_country": "US",
        "residential_address_proof_file": "https://example.com/path-to-residence-file"
      }
    },
    {
      "level": "selfie",
      "details": {
        "identification_document_back_file": "https://example.com/path-to-back-file",
        "identification_document_front_file": "https://example.com/path-to-front-file",
        "identification_document_selfie_file": "https://example.com/path-to-selfie-file"
      }
    },
    {
      "level": "wallet"
    }
  ]
}
```

We expose the following fields:

| parameter | type / format | kyc level availability | restrictions |
| --------- | ------------- | ---------------------- | ------------ |
| `accredited_investor_proof_file` | URL | `v1`, `accreditation` | USA & Canada residents only |
| `accredited_investor` | boolean | `v1`, `accreditation` | USA & Canada residents only |
| `date_of_birth` | `YYYY-MM-DD` | `v1`, `light`, `plus` | |
| `full_name` | `string` | `v1`, `light`, `plus` | |
| `identification_document_back_file` | URL | `v1`, `selfie` | |
| `identification_document_country` | [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) | `v1`, `light`, `plus` | |
| `identification_document_front_file` | URL | `v1`, `selfie` | |
| `identification_document_number` | `string` | `v1`, `light`, `plus` | |
| `identification_document_selfie_file` | URL | `v1`, `selfie` | |
| `identification_document_type` | `national_id`, <br> `passport`, or <br> `drivers_license` | `v1`, `light`, `plus` | |
| `place_of_birth` | `string` | `v1`, `light`, `plus` | |
| `residential_address_country` | [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) | `v1`, `light`, `plus` | |
| `residential_address_proof_file` | URL | `v1`, `light`, `plus` | |
| `residential_address` | `string` | `v1`, `light`, `plus` | |
| `wallet_address` | `string` | `wallet` | |
| `wallet_currency` | `BTC`, or `ETH` | `wallet` | |
| `social_security_number` | `string` | `v1`, `ssn` | USA residents only |
| `articles_of_association_file` | URL | `v1`, `light`, `plus` | institutions only |
| `beneficial_owner` | `string` | `v1`, `light`, `plus` | institutions only |
| `certificate_of_corporate_status_file` | URL | `v1`, `light`, `plus` | Canada institutions only |
| `certificate_of_good_standing_file` | URL | `v1`, `light`, `plus` | USA institutions only |
| `certificate_of_incorporation_file` | URL | `v1`, `light`, `plus` | USA & Canada institutions only |
| `commercial_register_entry_file` | URL | `v1`, `light`, `plus` | institutions only |
| `commercial_register` | `string` | `v1`, `light`, `plus` | institutions only |
| `company_name` | `string` | `v1`, `light`, `plus` | institutions only |
| `company_seat` | `string` | `v1`, `light`, `plus` | institutions only |
| `jurisdiction` | `string` | `v1`, `light`, `plus` | institutions only |
| `legal_form` | `string` | `v1`, `light`, `plus` | institutions only |
| `managing_directors` | `string` | `v1`, `light`, `plus` | institutions only |
| `owner_identity_proof_file` | URL | `v1`, `light`, `plus` | institutions only |
| `power_of_attorney_file` | URL | `v1`, `light`, `plus` | institutions only |
| `secretary_certificate_file` | URL | `v1`, `light`, `plus` | USA & Canada institutions only |
| `shareholders_list_file` | URL | `v1`, `light`, `plus` | institutions only |
| `transparency_register_entry_file` | URL | `v1`, `light`, `plus` | institutions only |
| `unique_identification_number` | `string` | `v1`, `light`, `plus` | USA, Singapore & Hong-Kong institutions only |

**Note**: URLs are set expire a few hours after they were requested.


## Statistics

You can retrieve information about how many users, and their individual KYC
statuses, authorized your application. You'll need to provide a token with the
`client.stats:read` scope, which can be aquired via a client credentials grant.

### User statuses

| Status    | Meaning                                                                                                                                             |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| approved  | User was issued a Credential for the requested KYC Level                                                                                            |
| rejected  | User was refused a Credential for the requested KYC Level                                                                                           |
| pending   | User has submitted information for review, either for the first time or as a follow-up to a contact, and is waiting to have their identity verified |
| contacted | User has been contacted by Fractal to provide further information, and has yet to do so                                                             |

### Total verifications

Returns total number of user verifications that are `approved`, `contacted`, `rejected` or `pending` right now.

```
GET https://VERIFIER_DOMAIN/api/stats/total-verifications
Content-Type: application/json
Authorization: Bearer {access-token}
```

Example response:

```json
{
  "approved": 55,
  "contacted": 4,
  "rejected": 10,
  "pending": 7
}
```

### Verifications by countries

Returns total number of user verifications that are `approved`, `contacted`, `rejected` or `pending` by countries.

```
GET https://VERIFIER_DOMAIN/api/stats/country-verifications
Content-Type: application/json
Authorization: Bearer {access-token}
```

Example response:

```json
{
  "US": {
    "approved": 8,
    "contacted": 1,
    "rejected": 2,
    "pending": 3
  },
  "DK": {
    "approved": 12
  },
  "RO": {
    "approved": 3
  }
}
```

### Verifications by user ids

Returns user ids and their status, which can be `approved`, `pending` or `rejected`.

```
GET https://VERIFIER_DOMAIN/api/stats/user-verifications
Content-Type: application/json
Authorization: Bearer {access-token}
```

Example response:

```json
{
  "320bfdaa-213e-41fb-8d77-ed98c415f01e": "approved",
  "87dd7fcb-c193-412e-8715-b13651fca2e4": "pending",
  "53406d1d-f06b-4fc3-960f-c5e608751aa9": "rejected",
  "63b35630-66b7-46ef-bce6-efbe31c7c366": "approved"
}
```

## Webhooks

### Description

Webhooks allow you to build or set up Applications which subscribe to certain events on Fractal ID. When one of those events is triggered, we'll send a HTTP `POST` payload to the webhook's configured URL.

### Terminology

- Callback URL - the URL of the server that will receive the webhook `POST` requests.
- Secret token - token that allows you to ensure that `POST` requests sent to the callback URL are from Fractal.
- Notification - webhooks `POST` request which is triggered by certain events on Fractal ID.

### Setup

To set up Webhooks, you need to provide us with the callback URL and the notification types that you would like to subscribe.
We will then send you the webhook secret token.

### Available notifications types

#### Verification approved

Once user is approved, the partner can get notified about user verification process being successfully completed. Upon getting `verification_approved` notification, partner can use specified user access token and retrieve latest information about the user and/or perform its business logic.

Example payload:

```json
{
  "type": "verification_approved",
  "data": {
    "level": "v1",
    "user_id": "14ec6af0-12f8-4bce-a6ab-01ce87fa1812"
  }
}
```

#### Application access revoked

User can revoke an application access at any given time without prior notice trough Fractal ID dashboard. Upon getting `application_access_revoked` notification, partner can be notified that the user has decided not to share his information from now on. It means that all access grants and access tokens are being revoked and partner won't be able to query this user anymore.

Example payload:

```json
{
  "type": "application_access_revoked",
  "data": {
    "user_id": "14ec6af0-12f8-4bce-a6ab-01ce87fa1812"
  }
}
```

### Securing webhooks

#### Callback URL

Fractal ID accepts only secure sites (HTTPS) as callback URLs.

#### Validating payloads from Fractal ID

When your secret token is set, Fractal ID uses it to create a hash signature with each payload. The hash signature is passed along with each request in the headers as `X-Fractal-Signature`.

Fractal ID generates signatures using a hash-based message authentication code ([HMAC](https://en.wikipedia.org/wiki/HMAC)) with [SHA-1](https://en.wikipedia.org/wiki/SHA-1).

Your endpoint should verify the signature to make sure it came from Fractal ID. Example implementation in Ruby:

```ruby
def verify_signature
  payload_body = request.body.read
  signature = "sha1=" + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new("sha1"), ENV["SECRET_TOKEN"], payload_body)

  if Rack::Utils.secure_compare(signature, request.headers["X-Fractal-Signature"])
    render json: {}, status: 200
  else
    render json: { error: "signature_mismatch" }, status: 400
  end
end
```

Your language and server implementations may differ than this code. There are a couple of very important things to point out, however:

- No matter which implementation you use, the hash signature starts with `sha1=`, using the key of your secret token and your payload body.
- Using a plain `==` operator is **not advised**. A method like `secure_compare` performs a "constant time" string comparison, which renders it safe from certain timing attacks against regular equality operators.

### Delivery

#### Content type

Fractal ID uses `application/json` content type to deliver the JSON payload directly as the body of the `POST` request.

#### Expected Response

Fractal ID expects your server to reply with response code `2xx` to identify successful delivery. All response codes outside this range, including `3xx` codes, will indicate to Fractal ID that you did not receive the webhook.

#### Retrying sending notifications

Fractal ID will retry to send webhooks notification if:

- Client server failed to respond in 10 seconds.
- Client server is unavailable (network errors).
- Client server returns other response code than `2xx`.

Fractal ID uses exponential backoff to retry events.

**Example retry times table:**

| Retries | Next retry in seconds |
| ------- | --------------------- |
| 1       | 20                    |
| 2       | 40                    |
| 3       | 80                    |
| 5       | 320                   |
| 10      | 10240                 |
| 15      | 86400                 |
| 20      | 86400                 |

#### Example delivery

Suppose for given example the secret token is `9d7e80c0f169ab94d34392d64617b7517fb07c40`.

```
POST /callback HTTP/1.1
Host: localhost:3001
X-Fractal-Signature: sha1=2e7c4e307e25dd0ce4baad4d90dc7d4b63bdbab6
Content-Type: application/json
{"type": "verification_approved","data":{"level":"v1","user_id":"d6d782ef-568b-4355-8eb4-2d32ac97b44c"}}
```
