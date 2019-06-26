# Delivery

## Content type

Fractal ID uses `application/json` content type to deliver the JSON payload directly as the body of the `POST` request.

## Expected response

Fractal ID expects your server to reply with response code `2xx` to identify successful delivery. All response codes outside this range, including `3xx` codes, will indicate to Fractal ID that you did not receive the webhook.

## Retrying sending notifications

Fractal ID will retry to send webhooks notification if:

* Client server failed to respond in 10 seconds.
* Client server is unavailable \(network errors\).
* Client server returns other response code than `2xx`.

Fractal ID uses exponential backoff to retry events.

### Example retry times table

| Retries | Next retry in seconds |
| :--- | :--- |
| 1 | 20 |
| 2 | 40 |
| 3 | 80 |
| 5 | 320 |
| 10 | 10240 |
| 15 | 86400 |
| 20 | 86400 |

## Example delivery

Suppose for the given example the secret token is `9d7e80c0f169ab94d34392d64617b7517fb07c40`.

```text
POST /callback HTTP/1.1
Host: localhost:3001
X-Fractal-Signature: sha1=2e7c4e307e25dd0ce4baad4d90dc7d4b63bdbab6
Content-Type: application/json
{"type": "verification_approved","data":{"level":"v1","user_id":"d6d782ef-568b-4355-8eb4-2d32ac97b44c"}}
```
