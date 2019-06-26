# Application statistics

You can retrieve information about how many users, and their individual KYC statuses, authorized your application.

To access information related to your application, you must obtain an access token using the [client credentials grant](https://tools.ietf.org/html/rfc6749#section-1.3.4), described in the previous section. You'll need to provide a token with the `client.stats:read` scope, which can be acquired via a client credentials grant.

## User statuses

| Status | Meaning |
| :--- | :--- |
| `approved` | User was issued a Credential for the requested KYC Level. |
| `rejected` | User was refused a Credential for the requested KYC Level. |
| `pending` | User has submitted information for review, either for the first time or as a follow-up to a contact, and is waiting to have their identity verified. |
| `contacted` | User has been contacted by Fractal to provide further information, and has yet to do so. |

{% api-method method="get" host="https://VERIFIER\_DOMAIN" path="/api/stats/total-verifications" %}
{% api-method-summary %}
Total verifications
{% endapi-method-summary %}

{% api-method-description %}
Returns total number of user verifications that are `approved`, `contacted`, `rejected` or `pending` right now.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Content-Type" type="string" required=true %}
application/json
{% endapi-method-parameter %}

{% api-method-parameter name="Authorization" type="string" required=true %}
Bearer {access-token}
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
  "approved": 55,
  "contacted": 4,
  "rejected": 10,
  "pending": 7
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://VERIFIER\_DOMAIN" path="/api/stats/country-verifications" %}
{% api-method-summary %}
Verifications by countries
{% endapi-method-summary %}

{% api-method-description %}
Returns total number of user verifications that are `approved`, `contacted`, `rejected` or `pending` by countries.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Content-Type" type="string" required=true %}
application/json
{% endapi-method-parameter %}

{% api-method-parameter name="Authorization" type="string" required=true %}
Bearer {access-token}
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

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
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://VERIFIER\_DOMAIN" path="/api/stats/user-verifications" %}
{% api-method-summary %}
Verifications by user ids
{% endapi-method-summary %}

{% api-method-description %}
Returns user ids and their status, which can be `approved`, `pending` or `rejected`.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Content-Type" type="string" required=true %}
application/json
{% endapi-method-parameter %}

{% api-method-parameter name="Authorization" type="string" required=true %}
Bearer {access-token}
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
  "320bfdaa-213e-41fb-8d77-ed98c415f01e": "approved",
  "87dd7fcb-c193-412e-8715-b13651fca2e4": "pending",
  "53406d1d-f06b-4fc3-960f-c5e608751aa9": "rejected",
  "63b35630-66b7-46ef-bce6-efbe31c7c366": "approved"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}
