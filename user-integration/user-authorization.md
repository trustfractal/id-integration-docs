# User authorization

Fractal ID implements the [authorization code grant](https://tools.ietf.org/html/rfc6749#section-1.3.1) of the [OAuth2 standard](https://tools.ietf.org/html/rfc6749).  
  
This flow can be summarized by the following steps:

* your application redirects your user to our authorization endpoint, with the KYC level described as a set of scopes;
* the user fills in their information on Fractal ID;
* the user gets redirected back to your application \(`redirect_uri`\), with a `code` in its URL parameters \(that expires after 10 minutes\);
* your application's backend exchanges the `code` for an `access_token` and a `refresh_token`, using your client credentials;
* when the access token expires \(after 2 hours\), you may obtain a new one using the `refresh_token` and your client credentials;
* 
## Obtaining an authorization code

Redirect the user to our authorization endpoint:

```text
https://FRONTEND_DOMAIN/authorize
  ?client_id={your-app-id}
  &redirect_uri={your-redirect-uri}
  &response_type=code
  &scope={desired-scope}
  &state={state-param}
```

This request has the following parameters:

| Parameter | Required? | Description |
| :--- | :--- | :--- |
| `client_id` | yes | The ID of your app on our system. |
| `redirect_uri` | yes | The URL that you want to redirect the person logging in back to. Must be HTTPS. |
| `response_type` | yes | `code` |
| `scope` | no | A **space-separated** list of authorization scopes to request. Defaults to `uid:read`. |
| `state` | yes | A value created by you to maintain state between the request and callback. This parameter is [mostly used to prevent CSRF](https://auth0.com/docs/protocols/oauth2/oauth-state) and will be passed back to you, unchanged, in your redirect URI. |

Once redirected, the user might have to log into Fractal ID. If so, they'll be presented with a page to that effect.  
  
Once they are logged in, they will be shown an authorization screen, where they're asked whether they're willing to grant your application the requested permissions as requested through the scopes. They will then be redirected back to `{your-redirect-uri}`.

## Authorization allowed

If the user **authorizes your application**, they will be redirected to:

```text
https://{your-redirect-uri}
  ?code={code}
  &state={state-param}
```

This request has the following parameters:

| Parameter | Description |
| :--- | :--- |
| `code` | Authorization code to be exchanged for an access token, expiring in 10 minutes. |
| `state` | Unchanged `state` parameter you provided during authorization request. |

## Authorization denied

If the user **refuses authorization**, Fractal ID will redirect them to:

```text
https://{your-redirect-uri}
  ?error=access_denied
  &error_description=The+resource+owner+or+authorization+server+denied+the+request.
```

## Other errors

The request might fail for reasons other than authorization refusal. Please refer to [RFC 6749 §4.1.2.1. \(Error Response\)](https://tools.ietf.org/html/rfc6749#section-4.1.2.1) for details.

## Obtaining an access token

You will then need to exchange the code for an access token. Be sure to do the following on your server, as your `client_secret` shouldn't be exposed to the client.

{% api-method method="post" host="https://AUTH\_DOMAIN" path="/oauth/token" %}
{% api-method-summary %}
Exchange authorization code for access token
{% endapi-method-summary %}

{% api-method-description %}
Obtained access token expires 2 hours later.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="client\_id" type="string" required=true %}
Your API application ID.
{% endapi-method-parameter %}

{% api-method-parameter name="client\_secret" type="string" required=true %}
Your API application secret.
{% endapi-method-parameter %}

{% api-method-parameter name="code" type="string" required=true %}
Authorization code ontained in the previous step.
{% endapi-method-parameter %}

{% api-method-parameter name="grant\_type" type="string" required=true %}
`authorization_code`
{% endapi-method-parameter %}

{% api-method-parameter name="redirect\_uri" type="string" required=true %}
The URL that the user was redirected to in the first step \(without parameters\).
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
  "access_token": "7rgojfemuk-aq8RcA7xWxJQKv6Ux0VWJ1DQtU6178B8",
  "token_type": "bearer",
  "expires_in": 7200,
  "refresh_token": "thPSSHGnk3NGU5vV4V_g-Qrs47RibO9KEEhfKYEgJOw",
  "scope": "uid:read email:read",
  "created_at": 1543585106
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% hint style="info" %}
Please refer to [RFC 6749 §5.1 \(Successful Response\)](https://tools.ietf.org/html/rfc6749#section-5.1) for further details on the fields.
{% endhint %}

{% hint style="info" %}
**Note**: the list of authorized scopes may be different from the required ones. Default scopes may be added, and the user may deny access to some of them. If you request both institution and person scopes, you will only be granted the ones that match the user type.
{% endhint %}

## Refreshing access token

Fractal ID implements refresh token rotation, which means that every access token refresh request will issue a new refresh token. Previous tokens are invalidated \(revoked\) only once the access token is used. For refreshed access tokens, the scopes are identical from the previous access token.

{% api-method method="post" host="https://AUTH\_DOMAIN" path="/oauth/token" %}
{% api-method-summary %}
Refresh access token
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="client\_id" type="string" required=true %}
Your API application ID.
{% endapi-method-parameter %}

{% api-method-parameter name="client\_secret" type="string" required=true %}
Your API application secret
{% endapi-method-parameter %}

{% api-method-parameter name="refresh\_token" type="string" required=true %}
Refresh token to be exchanged for an access token for access retrieval.
{% endapi-method-parameter %}

{% api-method-parameter name="grant\_type" type="string" required=true %}
`refresh_token`
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
  "access_token": "bftp_00bxmjiTyCqiptfR_hUDMMcPAZuGg9mylnNM3g",
  "token_type": "bearer",
  "expires_in": 7200,
  "refresh_token": "leZCHE_ZTggSB2wNiUM1Huy0X7ZgYpbLaJ9ZHk-rRas",
  "scope": "uid:read email:read",
  "created_at": 1543586706
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% hint style="info" %}
Please refer to [RFC 6749 §5.1 \(Successful Response\)](https://tools.ietf.org/html/rfc6749#section-5.1) for further details on the fields.
{% endhint %}

