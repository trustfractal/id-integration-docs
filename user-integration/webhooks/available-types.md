# Available notifications

{% hint style="info" %}
We send `verification_approved` and `verification_rejected` notifications for each KYC level and add-on that you have requested initially and they can come in any order. Given the client requested `basic` KYC level with `liveness` add-on, for example, we will send 2 notifications of the same type with different values (`basic` and `liveness`) provided in a `level` field. Available values are described in the [KYC levels](../../kyc-levels.md) section.
{% endhint %}

{% hint style="warning" %}
The order of callbacks to webhook endpoints is not guaranteed. See [Delivery](delivery.md#order-of-delivery) section for details.
{% endhint %}

### Verification approved

Once the user is approved, the partner can get notified about the user verification process being completed. Upon getting `verification_approved` notification, the partner can use a specified user access token and retrieve the latest information about the user and/or perform its business logic.

Example payload:

```json
{
  "type": "verification_approved",
  "data": {
    "level": "basic",
    "user_id": "14ec6af0-12f8-4bce-a6ab-01ce87fa1812",
    "timestamp": "2020-04-02T13:35:35Z"
  }
}
```

### User contacted

Once the user is requested for additional information, the partner can get notified about the user verification process being marked for contact.&#x20;

Example payload:

```json
{
  "type": "verification_contacted",
  "data": {
    "level": "basic",
    "user_id": "14ec6af0-12f8-4bce-a6ab-01ce87fa1812",
    "timestamp": "2020-04-02T13:35:35Z"
  }
}
```

### Verification rejected

When the user fails verification for the selected level, the partner can get a webhook notification about the rejection. This can be caused by fake or expired documents, refusal to provide proof documents for certain validations, inability to pass a liveness check, etc. Fractal does not disclose the exact reason for rejection via the webhook call. Upon getting `verification_rejected` notification, the partner should mark the user internally as failed to pass the verification.

Example payload:

```json
{
  "type": "verification_rejected",
  "data": {
    "level": "basic",
    "user_id": "14ec6af0-12f8-4bce-a6ab-01ce87fa1812",
    "timestamp": "2020-04-02T13:35:35Z"
  }
}
```

### idOS - credentials have been shared

Webhook is used by ID when credentials have been approved and shared on behalf of the user. The application can now query and decrypt shared credentials from Kwill.

```json
{
  "type": "credential_shared",
  "data": {
    "idos_human_id": "IDOS_HUMAN_UUID",
    "credential_id": "IDOS_CREDENTIAL_DATA_ID",
    "shared_at": "2020-04-02T13:35:35Z"
  }
}
```

### &#x20;
