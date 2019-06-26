# Client authorization

In order to access information related to your application, you must obtain an access token using the [client credentials grant](https://tools.ietf.org/html/rfc6749#section-1.3.4).

{% api-method method="post" host="https://AUTH\_DOMAIN" path="/oauth/token" %}
{% api-method-summary %}
Client credentials grant flow
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="client\_id" type="string" required=true %}
Your API application ID
Your API application secret
{% endapi-method-parameter %}

{% api-method-parameter name="client\_secret" type="string" required=true %}

{% endapi-method-parameter %}

{% api-method-parameter name="scope" type="string" required=false %}
A space-separated list of authorization scopes to request. If not mentioned, it defaults to `uid:read`.
You'll need to provide a token with the `client.stats:read` scope in order to access application statistics for example.
{% endapi-method-parameter %}

{% api-method-parameter name="grant\_type" type="string" required=true %}
`client_credentials`
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
  "access_token":"OUuf_tJs-J2AAxjWr0JHvzFure5Eb7KMUQRO0jpqXWc",
  "token_type":"Bearer",
  "expires_in":7200,
  "scope":"client.stats:read",
  "created_at":1554400723
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}
