# Delivery

## Content type

Fractal ID uses `application/json` content type to deliver the JSON payload directly as the body of the `POST` request.

## Expected response

Fractal ID expects your server to reply with response code `2xx` to identify successful delivery. All response codes outside this range, including `3xx` codes, will indicate to Fractal ID that you did not receive the webhook.

{% hint style="info" %}
Fractal ID will make sure to send notification successfully at least once to the client. There is a possibility of receiving the same successful webhook notification multiple times, but in very rare cases. This means you should likely want to ensure your endpoint is idempotent.
{% endhint %}

## Retrying sending notifications

Fractal ID will retry to send webhooks notification if:

* Client server failed to respond in 10 seconds.
* Client server is unavailable (network errors).
* Client server returns other response code than `2xx`.

Fractal ID uses exponential backoff to retry events.

### Example retry times table

| Retries | Next retry in seconds |
| ------- | --------------------- |
| 1       | 20                    |
| 2       | 40                    |
| 3       | 80                    |
| 5       | 320                   |
| 10      | 10240                 |
| 15      | 86400                 |
| 20      | 86400                 |

## Order of delivery

The order of callbacks to webhook endpoints is not guaranteed.&#x20;

For, e.g., two subsequent status changes, if initial attempt to deliver first notification fails it's being scheduled for retry. Second notification may arrive earlier than the retry on the first notification happens.

To mitigate the risk of setting incorrect user status based on received webhook callbacks we encourage you to keep track of the `timestamp` fields of the status change notifications and compare them internally, or [retrieve user information ](../user-information-retrieval.md#retrieve-user-information)upon getting a webhook callback.

## Example delivery

Suppose for the given example the secret token is `9d7e80c0f169ab94d34392d64617b7517fb07c40`.

```
POST /callback HTTP/1.1
Host: localhost:3001
X-Fractal-Signature: sha1=9e581dd775e5ba87e9839b595d6eb0d784ecfdb6
Content-Type: application/json
{"type":"verification_approved","data":{"level":"basic","user_id":"b5c5a2cd-643e-444b-9591-e7b25fec997d","timestamp":"2020-10-09T10:50:32Z"}}
```
