# Fractal ID API Documentation

Fractal ID is an online service for identity provisioning and verification. This service implements the OAuth2 protocol for user authentication, authorization and resource retrieval.

## Setup
The integration of Fractal ID API is currently available for select partners. Setup involves:
1. the partner providing Fractal with the target authentication redirection endpoint;
1. Fractal providing the partner with an API application ID and secret;
1. Fractal disclosing `AUTH_DOMAIN` and `RESOURCE_DOMAIN` at a later stage.

## User authentication and authorization

Fractal ID implements the [authorization code grant flow](https://tools.ietf.org/html/rfc6749#section-1.3.1) of the [OAuth2 standard](https://tools.ietf.org/html/rfc6749).

### Scopes

We have the following scopes available. All are read-only.

scope | type | description
----- | ---- | -----------
`contributions.{beneficiary}:read` | `[Contribution*]` | List of contributions made to `{beneficiary}`.
`emails:read` | `[string]` | Email addresses of the user.
`person.full_name:read` | `string` | Full name of the user.
`person.residential_address_country:read` | `string` | [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the user's residential address.
`person.accredited_investor:read` | `boolean` | Accredited investor status for the user's residential country.
`uid:read` | `string` | **(default scope)** Anonymized unique user identifier.
`verifications.v1:read` | `boolean` | Fractal v1 type verification, attesting the truthfulness of all the data requested.

#### Types

##### Contribution

member | type | description
------ | ---- | -----------
amount | string | Currency amount in its smallest subunit (e.g. satoshi, wei, eurocent).
currency | string | The currency all contributions are converted to (contributions may occur in multiple fiat and/or crypto currencies, and all calculations are performed after converting it to a pivot currency specific to each raise, e.g. BTC, ETH, EUR).

### Auth flow

#### Obtaining an authorization code

Redirect the user to our authentication endpoint as follows.

```
GET https://AUTH_DOMAIN/oauth/authorize
  ?client_id={your-app-id}
  &redirect_uri={your-redirect-uri}
  &response_type=code
  &scope={desired-scope}
  &state={state-param}
```

This request has the following parameters:

parameter | required? | description
--------- | --------- | -----------
`client_id` | yes | The ID of your app on our system.
`redirect_uri` | yes | The URL that you want to redirect the person logging in back to. Must be HTTPS.
`response_type` | yes | `code`
`scope` | no |  A space-separated list of authorization scopes to request. If not mentioned, it defaults to `uid:read`.
`state` | yes | A string value created by your app to maintain state between the request and callback. This parameter is [mostly used to prevent CSRF](https://auth0.com/docs/protocols/oauth2/oauth-state) and will be passed back to you, unchanged, in your redirect URI.

Once redirected, the user might have to log into Fractal ID. If so, they'll be presented with a page to that effect.

Once they are logged in, they will be shown an authorization screen, where they're asked whether they're willing to grant the client application the requested permissions as requested through the scopes. They will then be redirected back to `{your-redirect-uri}`.

##### Authorization grant

If the user **authorizes your application**, here's what the request will look like.

```
GET https://{your-redirect-uri}
  ?code={code}
  &state={state-param}
```

This request has the following parameters:

parameter | description
--------- | -----------
`code` | Authorization code to be exchanged for an access token for access retrieval.
`state` | Unchanged `state` parameter you provided during authorization request.

##### Authorization refusal

If the user **refuses authorization**, Fractal ID will issue the following request.

```
GET https://{your-redirect-uri}
  ?error=access_denied
  &error_description=The+resource+owner+or+authorization+server+denied+the+request.
```

##### Other errors

The request might fail for reasons other than authorization refusal. Please refer to [RFC 6749 §4.1.2.1. (Error Response)](https://tools.ietf.org/html/rfc6749#section-4.1.2.1) for details.

#### Obtaining an access token

You will then need to exchange the code for an access token. Be sure to do the following on your server, as your `client_secret` shouldn't be exposed to the client.

```
POST https://AUTH_DOMAIN/oauth/token
  ?client_id={your-app-id}
  &client_secret={your-app-secret}
  &code={code}
  &grant_type=authorization_code
  &redirect_uri={your-redirect-uri}
```

parameter | required? | description
--------- | --------- | -----------
`client_id` | yes | Your API application ID.
`client_secret` | yes | Your API application secret.
`code` | yes | Authorization code to be exchanged for an access token for access retrieval.
`grant_type` | yes | `authorization_code`
`redirect_uri` | yes | The URL that you want to redirect the person logging in back to. Must be HTTPS.

This access token expires 2 hours later.

This endpoint returns JSON. An example follows below.

```
{
  "access_token": "dbaf9757982a9e738f05d249b7b5b4a266b3a139049317c4909f2f263572c781",
  "token_type": "bearer",
  "expires_in": 7200,
  "refresh_token": "76ba4c5c75c96f6087f58a4de10be6c00b29ea1ddc3b2022ee2016d1363e3a7c",
  "scope": "public"
}
```

Please refer to [RFC 6749 §5.1 (Successful Response)](https://tools.ietf.org/html/rfc6749#section-5.1) for further details on the fields.

## Resource retrieval

You can retrieve information of a user through the `/users/me` endpoint. This requires posession of a valid `access_token`, obtained as described above.

```
GET https://RESOURCE_DOMAIN/api/me
Authorization: Bearer {access-token}
```

This endpoint returns JSON. An example follows below.

```
{
  "uid": "d52bdee2-0543-4b60-8c46-5956a37db8af",
  "emails": [
    "stallman@muh-freedums.com"
  ],
  "person": {
    "full_name": "Richard Stallman",
    "accredited_investor": true,
    "residential_address_country": "US"
  },
  "verifications": {
    "v1": true
  }
}

```
