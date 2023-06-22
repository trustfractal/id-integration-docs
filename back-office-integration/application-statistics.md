# Application statistics

You can retrieve information about how many users, and their individual KYC statuses, authorized your application.

To access information related to your application, you must obtain an access token using the [client credentials grant](https://tools.ietf.org/html/rfc6749#section-1.3.4), described in the previous section. You'll need to provide a token with the `client.stats:read` scope, which can be acquired via a client credentials grant.

{% hint style="info" %}
Some of these can also be easily inspected in the [statistics section](../client-dashboard.md#statistics) of the client dashboard.
{% endhint %}

## User statuses

| Status      | Meaning                                                                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `approved`  | User was issued a Credential for the requested KYC Level.                                                                                            |
| `rejected`  | User was refused a Credential for the requested KYC Level.                                                                                           |
| `pending`   | User has submitted information for review, either for the first time or as a follow-up to a contact, and is waiting to have their identity verified. |
| `contacted` | Fractal has contacted the user to provide further information and has yet to do so.                                                                  |
| `expired`   | The user has an expired POA or POI and the client has expiration enabled.                                                                            |

{% swagger baseUrl="https://RESOURCE_DOMAIN" path="/v2/stats/total-verifications" method="get" summary="Total verifications" %}
{% swagger-description %}
Returns total number of user verifications that are 

`approved`

, 

`contacted`

, 

`rejected`

 or 

`pending`

 right now.
{% endswagger-description %}

{% swagger-parameter in="header" name="Content-Type" type="string" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="string" %}
Bearer {access-token}
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```javascript
{
  "approved": 55,
  "contacted": 4,
  "rejected": 10,
  "pending": 7
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="https://RESOURCE_DOMAIN" path="/v2/stats/country-verifications" method="get" summary="Verifications by countries" %}
{% swagger-description %}
Returns total number of user verifications that are 

`approved`

, 

`contacted`

, 

`rejected`

 or 

`pending`

 by countries.
{% endswagger-description %}

{% swagger-parameter in="header" name="Content-Type" type="string" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="string" %}
Bearer {access-token}
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```javascript
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
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="https://RESOURCE_DOMAIN" path="/v2/stats/user-verifications" method="get" summary="Verifications by user ids" %}
{% swagger-description %}
Returns user ids and their status, which can be 

`approved`

, 

`pending`

, 

`contacted`

 or 

`rejected`

.
{% endswagger-description %}

{% swagger-parameter in="header" name="Content-Type" type="string" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="string" %}
Bearer {access-token}
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```javascript
[
    {
      "user_id": "320bfdaa-213e-41fb-8d77-ed98c415f01e",
      "level": "v1",
      "credential": "approved"
    },
    {
      "user_id": "320bfdaa-213e-41fb-8d77-ed98c415f01e",
      "level": "light+selfie+wallet",
      "credential": "pending",
    }
]
```
{% endswagger-response %}
{% endswagger %}
