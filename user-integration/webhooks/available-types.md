# Available types

## Available notifications types

### Verification approved

Once user is approved, the partner can get notified about user verification process being successfully completed. Upon getting `verification_approved` notification, partner can use specified user access token and retrieve latest information about the user and/or perform its business logic.

Example payload:

```javascript
{
  "type": "verification_approved",
  "data": {
    "level": "v1",
    "user_id": "14ec6af0-12f8-4bce-a6ab-01ce87fa1812"
  }
}
```

{% hint style="info" %}
We send `verification_approved` notifications for each KYC level and add-on that you have requested initially and they can come in any order. Given client requested `light` KYC level with `selfie` and `wallet` add-ons, for example, we will send 3 notifications with the same value provided in `level` field. Available values are described in KYC levels section.
{% endhint %}

### Authorization revoked

User can revoke an application access at any given time without prior notice through Fractal ID dashboard. Fractal ID will emit a `authorization_revoked` notification when this happens. It means that all access grants and access tokens were revoked and partner won't be able to query this user anymore.

{% hint style="info" %}
Due to AML regulations, Fractal still has to make this information available upon Client request.
{% endhint %}

Example payload:

```javascript
{
  "type": "authorization_revoked",
  "data": {
    "user_id": "14ec6af0-12f8-4bce-a6ab-01ce87fa1812"
  }
}
```

