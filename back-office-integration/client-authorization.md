# Client authorization

In order to access information related to your application, you must obtain an access token using the [client credentials grant](https://tools.ietf.org/html/rfc6749#section-1.3.4).

{% swagger baseUrl="https://AUTH_DOMAIN" path="/oauth/token" method="post" summary="Client credentials grant flow" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="client_id" type="string" %}
Your API application ID
{% endswagger-parameter %}

{% swagger-parameter in="path" name="client_secret" type="string" %}
Your API application secret
{% endswagger-parameter %}

{% swagger-parameter in="path" name="scope" type="string" %}
A space-separated list of authorization scopes to request. If not mentioned, it defaults to `uid:read`.\
You'll need to provide a token with the `client.stats:read` scope in order to access application statistics for example.
{% endswagger-parameter %}

{% swagger-parameter in="path" name="grant_type" type="string" %}
`client_credentials`
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```javascript
{
  "access_token":"OUuf_tJs-J2AAxjWr0JHvzFure5Eb7KMUQRO0jpqXWc",
  "token_type":"Bearer",
  "expires_in":7200,
  "scope":"client.stats:read",
  "created_at":1554400723
}
```
{% endswagger-response %}
{% endswagger %}

##
