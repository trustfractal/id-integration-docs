# Getting started

Integration of Fractal ID API is currently available upon request.  
  
To get started, we need you to provide us with:

1. the target authorization redirection endpoint, `redirect_uri`

   \(`https://example.com/oauth/callback`\);

2. the application homepage URL;
3. the application display name;
4. the application display logo \(in square format\);
5. optionally, the webhook callback URL \(`https://example.com/webhook`\);

We will then provide you with an API application ID and secret \(`CLIENT_ID` and `CLIENT_SECRET`\). If you are using Webhooks, we will also send you the webhook secret token \(`WEBHOOK_SECRET`\).

{% hint style="info" %}
Note: As a security measure, all URLs [MUST be secured using HTTPS](https://tools.ietf.org/html/rfc6749#section-3.1.2.1), except when using `localhost` addresses.
{% endhint %}

{% hint style="info" %}
We are actively working on improving client dashboard to allow clients manage webhooks without the steps above.
{% endhint %}

