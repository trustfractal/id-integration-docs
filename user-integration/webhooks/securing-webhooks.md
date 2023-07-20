# Securing webhooks

## Callback URL

Fractal ID accepts only secure sites (HTTPS) as callback URLs.

## Validating payloads from Fractal ID

When your secret token is set, Fractal ID uses it to create a hash signature with each payload. The hash signature is passed along with each request in the headers as `X-Fractal-Signature`.

Fractal ID generates signatures using a hash-based message authentication code ([HMAC](https://en.wikipedia.org/wiki/HMAC)) with [SHA-1](https://en.wikipedia.org/wiki/SHA-1).

Your endpoint should verify the signature to make sure it came from Fractal ID. Example implementation in Ruby:

```ruby
def verify_signature
  payload_body = request.body.read
  signature = "sha1=" + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new("sha1"), ENV["WEBHOOK_SECRET_TOKEN"], payload_body)

  if Rack::Utils.secure_compare(signature, request.headers["X-Fractal-Signature"])
    render json: {}, status: 200
  else
    render json: { error: "signature_mismatch" }, status: 400
  end
end
```

Your language and server implementations may differ than this code. There are a couple of very important things to point out, however:

{% hint style="info" %}
Use your [webhook secret token](./#terminology), **not your client secret**, for generating the digest for verification.
{% endhint %}

{% hint style="info" %}
No matter which implementation you use, the hash signature starts with `sha1=`, using the key of your secret token and your payload body.
{% endhint %}

{% hint style="info" %}
Using a plain `==` operator is **not advised**. A method like `secure_compare` performs a "constant time" string comparison, which renders it safe from certain timing attacks against regular equality operators.
{% endhint %}

## Local verification

To aid with your development process, here are some example scripts you can use to validate your assumptions.

{% tabs %}
{% tab title="Ruby" %}
{% code title="ver.rb" %}
```ruby
require 'openssl'

webhook_secret_token = ARGV[0]
payload_body = ARGV[1]
expected_signature = ARGV[2]

calculated_signature =
  OpenSSL::HMAC.hexdigest(
    OpenSSL::Digest.new("sha1"),
    webhook_secret_token,
    payload_body,
  )

signature_matches = calculated_signature == expected_signature

puts Hash[
  webhook_secret_token:,
  payload_body:,
  expected_signature:,
  calculated_signature:,
  signature_matches:
].inspect
```
{% endcode %}

{% code overflow="wrap" %}
```bash
$ ruby --version
ruby 3.2.2 (2023-03-30 revision e51014f9c0) [x86_64-linux]

$ ruby ver.rb SUP3RS3CR3T my-payload sig
{:webhook_secret_token=>"SUP3RS3CR3T", :payload_body=>"my-payload", :expected_signature=>"badsig", :calculated_signature=>"6a89633e5f131bfb5f0b5826b33b3bab4bf52068", :signature_matches=>false}

$ ruby ver.rb SUP3RS3CR3T my-payload 6a89633e5f131bfb5f0b5826b33b3bab4bf52068
{:webhook_secret_token=>"SUP3RS3CR3T", :payload_body=>"my-payload", :expected_signature=>"6a89633e5f131bfb5f0b5826b33b3bab4bf52068", :calculated_signature=>"6a89633e5f131bfb5f0b5826b33b3bab4bf52068", :signature_matches=>true}
```
{% endcode %}
{% endtab %}

{% tab title="node.js" %}
{% code title="ver.js" %}
```javascript
const { argv } = require('process');
const { createHmac } = require('node:crypto');
argv.splice(0, 2) // Get rid of invocation stuff.

const webhook_secret_token = argv[0]
const payload_body = argv[1]
const expected_signature = argv[2]

const calculated_signature =
  createHmac('sha1', webhook_secret_token)
  .update(payload_body)
  .digest('hex');

signature_matches = calculated_signature == expected_signature

console.log(JSON.stringify({
  webhook_secret_token,
  payload_body,
  expected_signature,
  calculated_signature,
  signature_matches,
}));

```
{% endcode %}

{% code overflow="wrap" %}
```bash
$ node --version
v18.15.0

$ node ver.js SUP3RS3CR3T my-payload sig
{"webhook_secret_token":"SUP3RS3CR3T","payload_body":"my-payload","expected_signature":"badsig","calculated_signature":"6a89633e5f131bfb5f0b5826b33b3bab4bf52068","signature_matches":false}

$ node ver.js SUP3RS3CR3T my-payload 6a89633e5f131bfb5f0b5826b33b3bab4bf52068
{"webhook_secret_token":"SUP3RS3CR3T","payload_body":"my-payload","expected_signature":"6a89633e5f131bfb5f0b5826b33b3bab4bf52068","calculated_signature":"6a89633e5f131bfb5f0b5826b33b3bab4bf52068","signature_matches":true}
```
{% endcode %}
{% endtab %}
{% endtabs %}
