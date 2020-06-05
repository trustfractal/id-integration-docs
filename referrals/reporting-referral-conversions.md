# Reporting referral conversions

## For clients with an OAuth integration

When the user is finally redirected, after their journey, to whichever destination you configured in your integration, you need to follow the steps described in [User authorization](../user-integration/user-authorization.md).

This will allow you to obtain the user's unique identifier, as described in [User information retrieval](../user-integration/user-information-retrieval.md). You need to store this ID so that you can report referral conversions back to us.

As soon as the user conversion happens \(for example, the user made a deposit over a certain amount\), make an API call to our referral reporting endpoint described below.

{% api-method method="post" host="https://RESOURCE\_DOMAIN" path="/referrals/redeem" %}
{% api-method-summary %}
Report referral conversion
{% endapi-method-summary %}

{% api-method-description %}
This endpoint returns `HTTP 201 Created` when successful.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="user\_id" type="string" required=true %}
The user ID \(uid\) you stored for this user
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=201 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

## For clients without an OAuth integration

This method requires the least effort on the client's part, but requires Fractal's explicit permission to use.

As soon as the user conversion happens \(for example, the user made a deposit over a certain amount\), ensure the following tracking pixel is rendered on the user's browser.

```text
<img src="https://resource.fractal.id/referrals/redeem_cookie" style="display:none" />
```

