# Fractal ID API Documentation

Fractal ID is an online service for identity provisioning and verification.
This service implements the OAuth2 protocol for user authentication,
authorization and resource retrieval.

## Setup

The integration of Fractal ID API is currently available for select partners.
Setup involves:

1. the partner providing Fractal with:
   1. the target authentication redirection endpoint (`redirect_uri`);
   1. the application display name;
   1. the application display logo (in square format);
1. Fractal providing the partner with an API application ID and secret (`client_id` and `client_secret`).

## User authentication and authorization

Fractal ID implements the [authorization code grant
flow](https://tools.ietf.org/html/rfc6749#section-1.3.1) of the [OAuth2
standard](https://tools.ietf.org/html/rfc6749).

### Scopes

We have the following scopes available. All are read-only.

| scope                                          | type              | description                                                                                                               |
| ---------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `email:read`                                   | `[EmailAddress*]` | Email addresses of the user.                                                                                              |
| `institution.company_name:read`                | `string`          | Full name of the company.                                                                                                 |
| `institution.residential_address_country:read` | `string`          | [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the company's residential address. |
| `institution.accredited_investor:read`         | `boolean`         | Accredited investor status for the company's residential country.                                                         |
| `person.full_name:read`                        | `string`          | Full name of the user.                                                                                                    |
| `person.residential_address_country:read`      | `string`          | [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the user's residential address.    |
| `person.accredited_investor:read`              | `boolean`         | Accredited investor status for the user's residential country.                                                            |
| `uid:read`                                     | `string`          | **(default scope)** Anonymized unique user identifier.                                                                    |
| `verification.v1:read`                         | `boolean`         | Fractal v1 type verification, attesting the truthfulness of all the data requested.                                       |

#### Types

##### EmailAddress

| member  | type   | description   |
| ------- | ------ | ------------- |
| address | string | Email address |

### Auth flow

#### Domains

| domain          | staging                     | production          |
| --------------- | --------------------------- | ------------------- |
| FRONTEND_DOMAIN | next-id.frctls.com          | fractal.id          |
| AUTH_DOMAIN     | auth.next-id.frctls.com     | auth.fractal.id     |
| RESOURCE_DOMAIN | resource.next-id.frctls.com | resource.fractal.id |
| VERIFIER_DOMAIN | verifier.next-id.frctls.com | verifier.fractal.id |

#### Obtaining an authorization code

Redirect the user to our authentication endpoint as follows.

```
Location: https://FRONTEND_DOMAIN/authorize
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
| `scope`         | no        | A space-separated list of authorization scopes to request. If not mentioned, it defaults to `uid:read`.                                                                                                                                                      |
| `state`         | yes       | A string value created by your app to maintain state between the request and callback. This parameter is [mostly used to prevent CSRF](https://auth0.com/docs/protocols/oauth2/oauth-state) and will be passed back to you, unchanged, in your redirect URI. |

Once redirected, the user might have to log into Fractal ID. If so, they'll be
presented with a page to that effect.

Once they are logged in, they will be shown an authorization screen, where
they're asked whether they're willing to grant the client application the
requested permissions as requested through the scopes. They will then be
redirected back to `{your-redirect-uri}`.

##### Authorization grant

If the user **authorizes your application**, here's what the request will look like.

```
GET https://{your-redirect-uri}
  ?code={code}
  &state={state-param}
```

This request has the following parameters:

| parameter | description                                                                  |
| --------- | ---------------------------------------------------------------------------- |
| `code`    | Authorization code to be exchanged for an access token for access retrieval. |
| `state`   | Unchanged `state` parameter you provided during authorization request.       |

##### Authorization refusal

If the user **refuses authorization**, Fractal ID will issue the following request.

```
GET https://{your-redirect-uri}
  ?error=access_denied
  &error_description=The+resource+owner+or+authorization+server+denied+the+request.
```

##### Other errors

The request might fail for reasons other than authorization refusal. Please
refer to [RFC 6749 §4.1.2.1. (Error
Response)](https://tools.ietf.org/html/rfc6749#section-4.1.2.1) for details.

#### Obtaining an access token

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
| `code`          | yes       | Authorization code to be exchanged for an access token for access retrieval.    |
| `grant_type`    | yes       | `authorization_code`                                                            |
| `redirect_uri`  | yes       | The URL that you want to redirect the person logging in back to. Must be HTTPS. |

This access token expires 2 hours later.

This endpoint returns JSON. An example follows.

```
{
  "access_token": "dbaf9757982a9e738f05d249b7b5b4a266b3a139049317c4909f2f263572c781",
  "token_type": "bearer",
  "expires_in": 7200,
  "refresh_token": "76ba4c5c75c96f6087f58a4de10be6c00b29ea1ddc3b2022ee2016d1363e3a7c",
  "scope": "uid:read email:read",
  "created_at": 1543585106
}
```

Please refer to [RFC 6749 §5.1 (Successful
Response)](https://tools.ietf.org/html/rfc6749#section-5.1) for further details
on the fields.

The list of authorized scopes may be different from the required ones. Default
scopes may be added, and the user may deny access to some of them. If you
request both institution and person scopes, you will only be granted the ones
that match the user type.

#### Refreshing access token

Fractal ID OAuth authorization server implements refresh token rotation, which
means that every access token refresh request will issue a new refresh token.
Previous tokens are invalidated (revoked) only once the access token is used.
For refreshed access tokens, the scopes are identical from the previous access
token.

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

```
{
  "access_token": "20f6c2a5318b84421077fca8c9863359f78857b5b3a5c53d29f07b9e285231e7",
  "token_type": "bearer",
  "expires_in": 7200,
  "refresh_token": "72abdf1b4c284232a18b3116bc161b09235cdeb06147b2a5f5c3367f8997c094",
  "scope": "uid:read email:read",
  "created_at": 1543586706
}
```

Please refer to [RFC 6749 §5.1 (Successful
Response)](https://tools.ietf.org/html/rfc6749#section-5.1) for further details
on the fields.

#### Obtaining a token via a client credentials grant

Some endpoints, like the stats endpoint, will require a token for authentication. You can get a token for those situations using the client credentials grant, which returns a token specific to your application, instead of any specific user, which avoids having to send a client_id and client_secret to services other than the authorization server.
To obtain one, make a request similar to the following:

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

```
{
  "access_token":"19ae3a3b73e0323c48bcf610a842dc8963ef56e8b9b89b7135258631bec8fed9",
  "token_type":"Bearer",
  "expires_in":7200,
  "scope":"uid:read",
  "created_at":1554400723
}
```

## Resource retrieval

You can retrieve information of a user through the `/users/me` endpoint. This
requires posession of a valid `access_token`, obtained as described above.

```
GET https://RESOURCE_DOMAIN/users/me
Authorization: Bearer {access-token}
```

This endpoint returns JSON. A few examples follow.

When the user is a natural person:

```
{
  "uid": "d52bdee2-0543-4b60-8c46-5956a37db8af",
  "emails": [
    { "address": "stallman@muh-freedums.com" }
  ],
  "person": {
    "full_name": "Richard Stallman",
    "accredited_investor": true,
    "residential_address_country": "US"
  },
  "institution": null,
  "verifications": [
    { level: "v1" }
  ]
}
```

When the user is an institution:

```
{
  "uid": "d52bdee2-0543-4b60-8c46-5956a37db8af",
  "emails": [
    { "address": "support@fractal.id" }
  ],
  "person": null,
  "institution": {
    "company_name": "Fractal Blockchain GmbH",
    "accredited_investor": true,
    "residential_address_country": "DE"
  },
  "verifications": [
    { level: "v1" }
  ]
}
```

Note that some of the keys may be missing if access to them was not requested
and granted.

## Statistics

You can retrieve information about how many users, and their individual KYC statuses, authorized your application. You'll need to provide a token with the `client.stats:read` scope, which can be aquired via a client credentials grant, explained in this document.

### User statuses

| Status | Meaning |
| ------ | ------- |
| approved | User was issued a Credential for the requested KYC Level |
| rejected | User was refused a Credential for the requested KYC Level |
| pending | User has submitted information for review, either for the first time or as a follow-up to a contact, and is waiting in the queue |
| contacted | User has been contacted by Fractal to provide further information, and has yet to do so |

### Total verifications

Returns total number of user verifications that are `approved`, `contacted`, `rejected` or `pending` right now.

```
GET https://VERIFIER_DOMAIN/api/stats/total-verifications
Content-Type: application/json
Authorization: Bearer {access-token}
```

Example response:

```
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

```
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

```
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

The integration of Webhooks is currently available for select partners.

Setup involves:

1. Partner providing Fractal with callback URL and available notification types it wants to subscribe.
1. Fractal providing the partner with a secret token.

### Available notifications types

#### Verification approved

Once user is approved, the partner can get notified about user verification process being successfully completed. Upon getting `verification_approved` notification, partner can use specified user access token and retrieve latest information about the user and/or perform its business logic.

Example payload:

```
{
  "type": "verification_approved",
  "data": {
    "level": "v1",
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
