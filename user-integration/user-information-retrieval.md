# User information retrieval

As soon as you [obtain an user's access token](user-authorization.md), you are able to access the status of their verification case and the personal information they submitted.

{% hint style="info" %}
You can also access the user's provided information, as well as their KYC process status, in the [user explorer](../client-dashboard.md#user-explorer) within the client dashboard.
{% endhint %}

{% api-method method="get" host="https://RESOURCE\_DOMAIN" path="/users/me" %}
{% api-method-summary %}
Retrieve user information
{% endapi-method-summary %}

{% api-method-description %}
This endpoint returns JSON. The scopes associated with the access token will define which fields will be returned.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Content-Type" type="string" required=false %}
`application/json`
{% endapi-method-parameter %}

{% api-method-parameter name="Authorization" type="string" required=true %}
`Bearer` _`access_token`_
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
`response1.json` supposes `access_token` has the following scopes, with plus, selfie and wallet verifications emitted.  
  
\* `uid:read`  
\* `contact:read`  
\* `verification.plus:read`  
\* `verification.selfie:read`  
\* `verification.wallet:read`  
\* `verification.wallet.details:read`  
  
`response2.json` suppose `access_token` has the following scopes:  
  
\* `uid:read`  
\* `verification.plus:read`  
\* `verification.plus.details:read`  
\* `verification.selfie:read`  
\* `verification.selfie.details:read`  
\* `verification.wallet:read`   
\* `verification.wallet.details:read`  
{% endapi-method-response-example-description %}

{% tabs %}
{% tab title="response1.json" %}
```javascript
{
  "emails": [
    {
      "address": "example@frctls.com"
    }
  ],
  "phones:": [
    {
      "number": "+44000000000"
    }
  ],
  "uid": "b76ab44d-b71e-4d19-b6f9-f6e88cd73946",
  "verification_cases": [
    {
      "details": null,
      "level": "plus+selfie",
      "status": "pending",
      "credential": "pending",
    },
    {
      "details": null,
      "level": "basic+liveness",
      "status": "done",
      "credential": "approved",
    },
    {
      "details": {
        "wallet_address": "0xa1eD7e13271bFeB758CB5CB6F3EdcC97A0E5943D",
        "wallet_currency": "ETH"
      },
      "level": "wallet",
      "report": {
        "mock_response": true,
        "report_id": "28df4599a4256830a4285af140b00868a0e3566ad79ca058f609e6b7ea151fcb",
        "is_smart_contract": false,
        "version": "3.3",
        "report_type": "standard",
        "report_time": "2019-07-29T15:24:29.422Z",
        "report_block_height": 1,
        "address": "a1eD7e13271bFeB758CB5CB6F3EdcC97A0E5943D",
        "address_type": "ETH",
        "address_subtype": "ETH",
        "address_used": false,
        "address_estimation": null,
        "cscore": 0,
        "multisig": null,
        "whitelist": false,
        "cc_balance": 0,
        "usd_balance": 0,
        "usd_exchange_rate": 0,
        "profiles": [],
        "cscore_info": [],
        "assets_total_usd_value": 0,
        "assets_count": 4,
        "indicators": null
      }
    }
  ]
}
```
{% endtab %}

{% tab title="response2.json" %}
```javascript
{
  "institution": null,
  "person": {
    "date_of_birth": "1967-08-16",
    "full_name": "David Muller",
    "identification_document_country": "DE",
    "identification_document_front_file": "<URL>",
    "identification_document_number": "123456789",
    "identification_document_selfie_file": "<URL>",
    "identification_document_type": "passport",
    "place_of_birth": "Berlin",
    "residential_address": "Wiener Straße 10, Berlin, 10999",
    "residential_address_country": "DE",
    "residential_address_proof_file": "<URL>",
    "wallet_address": "0xa1eD7e13271bFeB758CB5CB6F3EdcC97A0E5943D",
    "wallet_currency": "ETH"
  },
  "uid": "b76ab44d-b71e-4d19-b6f9-f6e88cd73946",
  "verifications": [
    {
      "details": {
        "residential_address_country": "DE",
        "residential_address_proof_file": "<URL>",
        "residential_address": "Wiener Straße 10, Berlin, 10999",
        "identification_document_type": "passport",
        "place_of_birth": "Berlin",
        "date_of_birth": "1967-08-16",
        "full_name": "David Muller",
        "identification_document_country": "DE",
        "identification_document_number": "123456789"
      },
      "level": "plus",
      "report": null
    },
    {
      "details": {
        "identification_document_selfie_file": "<URL>",
        "identification_document_front_file": "<URL>"
      },
      "level": "selfie",
      "report": null
    },
    {
      "details": {
        "wallet_address": "0xa1eD7e13271bFeB758CB5CB6F3EdcC97A0E5943D",
        "wallet_currency": "ETH"
      },
      "level": "wallet",
      "report": {
        "mock_response": true,
        "report_id": "28df4599a4256830a4285af140b00868a0e3566ad79ca058f609e6b7ea151fcb",
        "is_smart_contract": false,
        "version": "3.3",
        "report_type": "standard",
        "report_time": "2019-07-29T15:24:29.422Z",
        "report_block_height": 1,
        "address": "a1eD7e13271bFeB758CB5CB6F3EdcC97A0E5943D",
        "address_type": "ETH",
        "address_subtype": "ETH",
        "address_used": false,
        "address_estimation": null,
        "cscore": 0,
        "multisig": null,
        "whitelist": false,
        "cc_balance": 0,
        "usd_balance": 0,
        "usd_exchange_rate": 0,
        "profiles": [],
        "cscore_info": [],
        "assets_total_usd_value": 0,
        "assets_count": 4,
        "indicators": null
      }
    }
  ]
}
```
{% endtab %}
{% endtabs %}
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

## Response fields

#### Top level

<table>
  <thead>
    <tr>
      <th style="text-align:left">Field</th>
      <th style="text-align:left">Type / Format</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>uid</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">This user&apos;s unique identifier.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>emails</code>
      </td>
      <td style="text-align:left"><code>array</code>
      </td>
      <td style="text-align:left">A list of email addresses belonging to the user.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>phones</code>
      </td>
      <td style="text-align:left"><code>array</code>
      </td>
      <td style="text-align:left">A list of phone numbers belonging to the user.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>verification_cases</code>
      </td>
      <td style="text-align:left"><code>array</code>
      </td>
      <td style="text-align:left">The verification cases that you requested for this user</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>institution</code>
      </td>
      <td style="text-align:left"><code>object</code>
      </td>
      <td style="text-align:left">
        <p><b>[Deprecated]</b> Use <code>verification_cases</code> instead.</p>
        <p>The user data fields for an institutional user.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>person</code>
      </td>
      <td style="text-align:left"><code>object</code>
      </td>
      <td style="text-align:left">
        <p><b>[Deprecated]</b> Use <code>verification_cases</code> instead.</p>
        <p>The user data fields for an individual user.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>verifications</code>
      </td>
      <td style="text-align:left"><code>array</code>
      </td>
      <td style="text-align:left">
        <p><b>[Deprecated]</b> Use <code>verification_cases</code> instead.</p>
        <p>The list of verifications given to this user.</p>
      </td>
    </tr>
  </tbody>
</table>

#### `emails`

An array of email addresses belonging to the user. Available when users sign up using an email address. We do not support more than one email address. If the user registered using a phone number, this may be an empty array. Each email entry contains the following fields:

| Field | Type / Format | Description |
| :--- | :--- | :--- |
| `address` | `string` | A email address, confirmed to belong to the user |

#### `phones`

An array of phone numbers belonging to the user. Available when users sign up using a phone number. We do not support more than one phone number. If the user registered using an email address, this may be an empty array. Each phone entry contains the following fields:

| Field | Type / Format | Description |
| :--- | :--- | :--- |
| `number` | `string` | A phone number, confirmed to belong to the user, in E.164 format \(e.g. `+4400000000000`\) |

#### `verification_cases`

A verification case represents represents information that has been validated internally by Fractal. Verifications are emitted  separately per each level and add-ons. A verification request for `light+video` will generate two verifications, one per item.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Field</th>
      <th style="text-align:left">Type / Format</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>level</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">The level (or add-on) that this verification refers to.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>status</code>
      </td>
      <td style="text-align:left">
        <p><code>pending</code>
        </p>
        <p><code>contacted</code>
        </p>
        <p><code>done</code>
        </p>
      </td>
      <td style="text-align:left">
        <ul>
          <li><code>pending</code>: if Fractal needs to take action,</li>
          <li><code>contacted</code>: if the user needs to take action</li>
          <li><code>done</code>: if Fractal has reached a conclusion</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>credential</code>
      </td>
      <td style="text-align:left">
        <p><code>pending</code>
        </p>
        <p><code>approved</code>
        </p>
        <p><code>rejected</code>
        </p>
      </td>
      <td style="text-align:left">
        <p>The outcome of our analysis.</p>
        <ul>
          <li><code>approved</code>: The user fulfills all the requirements</li>
          <li><code>rejected</code>: The user is unable to fulfill all the requirements</li>
          <li><code>pending</code>: Fractal is still evaluating the case</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>id</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">A unique identifier for this verification case.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>details</code>
      </td>
      <td style="text-align:left"><code>object</code>
      </td>
      <td style="text-align:left">The set of user data fields (see below for details) that have been validated
        with respect to this level or add-on. For more details on these fields,
        please check the <a href="user-information-retrieval.md#details"><code>details</code></a> section
        below.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>report</code>
      </td>
      <td style="text-align:left"><code>object</code>
      </td>
      <td style="text-align:left">
        <p><b>Valid only for the wallet add-on verification.</b> The AML report generated
          by <a href="https://www.coinfirm.com/">Coinfirm</a> for the cryptocurrency
          address present under <code>details</code>.</p>
        <p>For further information on the report fields, please refer to the the
          <a
          href="https://id-docs-attachments.s3.eu-central-1.amazonaws.com/Report+fields+fromAPI+response.pdf">Coinfirm documentation</a>.</p>
      </td>
    </tr>
  </tbody>
</table>

#### \[Deprecated\] `institution`

This field will be removed eventually. Use `verification_cases` instead.

#### \[Deprecated\] `person` 

This field will be removed eventually. Use `verification_cases` instead.

#### **\[Deprecated\]** `verifications`

This field will be removed eventually. Use `verification_cases` instead.

### `details`

The set of fields enumerated below contains the information submitted by the user. The version of the information validated in the context of a verification will be present under the `details` key in each member of the `verification_cases` array. As our process evolves, we may add or remove fields from this list.

Some fields are available for natural `person`s only, while others are `institution` only. These will be marked in the "Restrictions" column below.

#### Identification related fields

<table>
  <thead>
    <tr>
      <th style="text-align:left">Field</th>
      <th style="text-align:left">Type / Format</th>
      <th style="text-align:left">KYC level availability</th>
      <th style="text-align:left">Restrictions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>date_of_birth</code>
      </td>
      <td style="text-align:left"><code>YYYY-MM-DD</code>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
        <p><code>basic</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>full_name</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
        <p><code>basic</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>identification_document_back_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left">
        <p><code>selfie</code>
        </p>
        <p><code>basic</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>identification_document_country</code>
      </td>
      <td style="text-align:left"><a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2</a>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
        <p><code>basic</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>identification_document_front_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left">
        <p><code>selfie</code>
        </p>
        <p><code>basic</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>identification_document_number</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
        <p><code>basic</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>identification_document_type</code>
      </td>
      <td style="text-align:left">
        <p><code>national_id</code>
        </p>
        <p><code>passport</code>
        </p>
        <p><code>drivers_license</code>
        </p>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>place_of_birth</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>identification_document_selfie_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>selfie</code>
      </td>
      <td style="text-align:left"></td>
    </tr>
  </tbody>
</table>

#### Liveness related fields

`liveness_audit_best_file` will generally be the best image of the user. `liveness_audit_least_similar_file` is the least similar image to the first image. `liveness_audit_open_eyes_file` is the image where the users' eyes are the most open. `liveness_audit_quality{1,2,3}_file` are the next 3 highest images.

| Field | Type / Format | KYC level availability | Restrictions |
| :--- | :--- | :--- | :--- |
| `liveness` | boolean | `liveness` |  |
| `liveness_audit_best_file` | URL | `liveness` |  |
| `liveness_audit_least_similar_file` | URL | `liveness` |  |
| `liveness_audit_open_eyes_file` | URL | `liveness` |  |
| `liveness_audit_quality1_file` | URL | `liveness` |  |
| `liveness_audit_quality2_file` | URL | `liveness` |  |
| `liveness_audit_quality3_file` | URL | `liveness` |  |

#### Institution related fields

These fields will only be available if the user is an institution and not a natural person.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Field</th>
      <th style="text-align:left">Type / Format</th>
      <th style="text-align:left">KYC level availability</th>
      <th style="text-align:left">Restrictions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>articles_of_association_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>beneficial_owner</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>certificate_of_corporate_status_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left">Canada institution</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>certificate_of_good_standing_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left">USA institution</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>certificate_of_incorporation_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left">USA &amp; Canada institution</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>commercial_register_entry_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>commercial_register</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>company_name</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>company_seat</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>jurisdiction</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>legal_form</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>managing_directors</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>owner_identity_proof_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>power_of_attorney_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>secretary_certificate_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left">USA &amp; Canada institution</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>shareholders_list_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>transparency_register_entry_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>unique_identification_number</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left">USA, Singapore &amp; Hong-Kong institution</td>
    </tr>
  </tbody>
</table>

#### Residency related fields

<table>
  <thead>
    <tr>
      <th style="text-align:left">Field</th>
      <th style="text-align:left">Type / Format</th>
      <th style="text-align:left">KYC level availability</th>
      <th style="text-align:left">Restrictions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>residential_address_country</code>
      </td>
      <td style="text-align:left"><a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2</a>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>residential_address_proof_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><code>residential_address</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left">
        <p><code>light</code>
        </p>
        <p><code>plus</code>
        </p>
      </td>
      <td style="text-align:left"></td>
    </tr>
  </tbody>
</table>

#### Wallet related fields

| Field | Type / Format | KYC level availability | Restrictions |
| :--- | :--- | :--- | :--- |
| `wallet_address` | `string` | `wallet` |  |
| `wallet_currency` | `BTC` or `ETH` | `wallet` |  |
| `wallet_check_reports` | `array` | `wallet` |  |

 `wallet_check_reports` contains an array of every AML report we requested from [Coinfirm](https://www.coinfirm.com/) for this user's wallet address during the verification case process. For more information on the report fields, please refer to the the [Coinfirm documentation](https://id-docs-attachments.s3.eu-central-1.amazonaws.com/Report+fields+fromAPI+response.pdf).

#### Source of wealth related fields

| Field | Type / Format | KYC level availability | Restrictions |
| :--- | :--- | :--- | :--- |
| `sow_estimated_net_worth_currency` | `EUR` or `USD` | `sow` |  |
| `sow_estimated_net_worth_value` | `string` | `sow` |  |

| Field | Type / Format | KYC level availability | Restrictions |
| :--- | :--- | :--- | :--- |
| `sow_balance_sheet_file` | URL | `sow` | `institution` |
| `sow_cash_flow_statement_file` | URL | `sow` | `institution` |
| `sow_income_statement_file` | URL | `sow` | `institution` |
| `sow_unaudited_accountant_name` | `string` | `sow` | `institution` |
| `sow_unaudited_accountant_professional_body` | `string` | `sow` | `institution` |

<table>
  <thead>
    <tr>
      <th style="text-align:left">Field</th>
      <th style="text-align:left">Type / Format</th>
      <th style="text-align:left">KYC level availability</th>
      <th style="text-align:left">Restrictions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>sow_type</code>
      </td>
      <td style="text-align:left">
        <p><code>crypto</code>
        </p>
        <p><code>dividends</code>
        </p>
        <p><code>divorce_settlement</code>
        </p>
        <p><code>freelance</code>
        </p>
        <p><code>gifts</code>
        </p>
        <p><code>inheritance</code>
        </p>
        <p><code>lease_revenue</code>
        </p>
        <p><code>life_policy</code>
        </p>
        <p><code>pension</code>
        </p>
        <p><code>salary</code>
        </p>
        <p><code>sale_of_company</code>
        </p>
        <p><code>sale_of_property</code>
        </p>
        <p><code>sale_of_shares</code>
        </p>
      </td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_crypto_bank_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_crypto_source_of_initial_investment_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_crypto_transactions_last_3_months_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_dividends_bank_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_dividends_entitlement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_divorce_settlement_bank_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_divorce_settlement_proof_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_freelance_bank_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_freelance_last_year_tax_returns_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_freelance_service_contracts_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_gifts_bank_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_gifts_name_of_donator</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_gifts_reason_for_donation</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_gifts_relationship_with_donator</code>
      </td>
      <td style="text-align:left"><code>string</code>
      </td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_inheritance_bank_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_inheritance_proof_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_lease_revenue_agreement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_lease_revenue_bank_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_life_policy_bank_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_life_policy_closing_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_pension_bank_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_pension_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_salary_bank_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_salary_last_year_tax_returns_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_salary_pay_slips_last_3_months_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_sale_of_company_bank_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_sale_of_company_contract_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_sale_of_property_bank_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_sale_of_property_contract_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_sale_of_shares_bank_statement_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>sow_sale_of_shares_proof_file</code>
      </td>
      <td style="text-align:left">URL</td>
      <td style="text-align:left"><code>sow</code>
      </td>
      <td style="text-align:left"><code>person</code>
      </td>
    </tr>
  </tbody>
</table>

#### Social security related fields

| Field | Type / Format | KYC level availability | Restrictions |
| :--- | :--- | :--- | :--- |
| `social_security_number` | `string` | `ssn` | USA residents only |

{% hint style="warning" %}
URLs are set expire a few hours after they were requested.
{% endhint %}

