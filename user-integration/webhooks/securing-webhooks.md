# Securing webhooks

## Callback URL

Fractal ID accepts only secure sites \(HTTPS\) as callback URLs.

## Validating payloads from Fractal ID

When your secret token is set, Fractal ID uses it to create a hash signature with each payload. The hash signature is passed along with each request in the headers as `X-Fractal-Signature`.

Fractal ID generates signatures using a hash-based message authentication code \([HMAC](https://en.wikipedia.org/wiki/HMAC)\) with [SHA-1](https://en.wikipedia.org/wiki/SHA-1).

Your endpoint should verify the signature to make sure it came from Fractal ID. Example implementation in Ruby:

```ruby
def verify_signature
  payload_body = request.body.read
  signature = "sha1=" + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new("sha1"), ENV["SECRET_TOKEN"], payload_body)

  if Rack::Utils.secure_compare(signature, request.headers["X-Fractal-Signature"])
    render json: {}, status: 200
  else
    render json: { error: "signature_mismatch" }, status: 400
  end
end
```

Your language and server implementations may differ than this code. There are a couple of very important things to point out, however:

{% hint style="info" %}
No matter which implementation you use, the hash signature starts with `sha1=`, using the key of your secret token and your payload body.
{% endhint %}

{% hint style="info" %}
Using a plain `==` operator is **not advised**. A method like `secure_compare` performs a "constant time" string comparison, which renders it safe from certain timing attacks against regular equality operators.
{% endhint %}

