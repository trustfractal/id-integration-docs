# User information retrieval

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
`response1.json` supposes `access_token` has the following scopes, with plus, self and wallet verifications emitted.  
  
\* `uid:read`  
\* `email:read`  
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
{% endapi-method-response-example-description %}

{% code-tabs %}
{% code-tabs-item title="response1.json" %}
```javascript
{
  "emails": [
    {
      "address": "example@frctls.com"
    }
  ],
  "institution": null,
  "person": {},
  "uid": "28718cd0-84cb-4682-a56d-24b607420b2f",
  "verifications": [
    {
      "details": null,
      "level": "plus",
      "report": null
    },
    {
      "details": null,
      "level": "selfie",
      "report": null
    },
    {
      "details": {
        "wallet_address": "0x5432154321543215432154321543215432154321",
        "wallet_currency": "ETH"
      },
      "level": "wallet",
      "report": {
        "report_id": "cb0c703dd8ff15d7b1d902a9f238e90c9f538f16d9be7d80d53e6cafeec63710",
        "is_smart_contract": false,
        "version": "3.3",
        "report_type": "standard",
        "report_time": "2019-07-04T13:52:44.835Z",
        "report_block_height": 1,
        "address": "5432154321543215432154321543215432154321",
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
{% endcode-tabs-item %}

{% code-tabs-item title="response2.json" %}
```javascript
{
  "institution": null,
  "person": {
    "date_of_birth": "1980-04-10",
    "full_name": "full name",
    "identification_document_country": "PT",
    "identification_document_front_file": "<URL>",
    "identification_document_number": "1",
    "identification_document_selfie_file": "<URL>",
    "identification_document_type": "passport",
    "place_of_birth": "Porto",
    "residential_address": "x",
    "residential_address_country": "PY",
    "residential_address_proof_file": "<URL>"
  },
  "uid": "28718cd0-84cb-4682-a56d-24b607420b2f",
  "verifications": [
    {
      "details": {
        "residential_address": "Street Name, 1",
        "residential_address_country": "PT",
        "residential_address_proof_file": "<URL>",
        "identification_document_type": "passport",
        "place_of_birth": "Porto",
        "date_of_birth": "1980-04-10",
        "full_name": "full name",
        "identification_document_country": "PT",
        "identification_document_number": "1"
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
      "details": null,
      "level": "wallet",
      "report": null
    },
    {
      "details": null,
      "level": "wallet",
      "report": null
    }
  ]
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

## Response fields

#### Top level

| Field | Type / Format | Description |
| :--- | :--- | :--- |
| `emails` | `array` | A list of email addresses belonging to the user. |
| `institution` | `object` | The user data fields for an institutional user. |
| `person` | `object` | The user data fields for an individual user. |
| `verifications` | `array` | The list of verifications given to this user. |

#### Institution / Person

These fields contain the last version of the user data submitted to the platform. Only one of these fields will contain data, depending upon the user representing either an institution or themselves as a person. Since the user may edit their information at any time, verified data should be looked up under the `verifications` field only. For more details on these fields, please check the [User data](user-information-retrieval.md#user-data) section below.

#### Verifications

A verification represents information that has been validated internally by Fractal. Verifications are emitted  separately per each level and add-ons. A verification request for `light+video` will generate two verifications, one per item.

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
      <td style="text-align:left"><code>details</code>
      </td>
      <td style="text-align:left"><code>object</code>
      </td>
      <td style="text-align:left">The set of user data fields (see below for details) that have been validated
        with respect to this level or add-on. For more details on these fields,
        please check the <a href="user-information-retrieval.md#user-data">User data</a> section
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
</table>#### User data

The set of fields enumerated below contains the information submitted by the user. Since we allow the user to update his information at any moment, the most recent version of the information provided by the user in these fields will be enumerated either under the `institution` or `person` top-level field.  
  
The version of the information validated in the context of a verification will be present under the `details` key in each member of the `verifications` array.

| Field | Type / Format | KYC level availability | Restrictions |
| :--- | :--- | :--- | :--- |
| `accredited_investor_proof_file` | URL | `v1`, `accreditation` | USA & Canada residents only |
| `accredited_investor` | boolean | `v1`, `accreditation` | USA & Canada residents only |
| `date_of_birth` | `YYYY-MM-DD` | `v1`, `light`, `plus` |  |
| `full_name` | `string` | `v1`, `light`, `plus` |  |
| `identification_document_back_file` | URL | `v1`, `selfie` |  |
| `identification_document_country` | [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) | `v1`, `light`, `plus` |  |
| `identification_document_front_file` | URL | `v1`, `selfie` |  |
| `identification_document_number` | `string` | `v1`, `light`, `plus` |  |
| `identification_document_selfie_file` | URL | `v1`, `selfie` |  |
| `identification_document_type` | `national_id`, `passport` or `drivers_license` | `v1`, `light`, `plus` |  |
| `place_of_birth` | `string` | `v1`, `light`, `plus` |  |
| `residential_address_country` | [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) | `v1`, `light`, `plus` |  |
| `residential_address_proof_file` | URL | `v1`, `light`, `plus` |  |
| `residential_address` | `string` | `v1`, `light`, `plus` |  |
| `wallet_address` | `string` | `wallet` |  |
| `wallet_currency` | `BTC` or `ETH` | `wallet` |  |
| `social_security_number` | `string` | `v1`, `ssn` | USA residents only |
| `articles_of_association_file` | URL | `v1`, `light`, `plus` | Institutions only |
| `beneficial_owner` | `string` | `v1`, `light`, `plus` | Institutions only |
| `certificate_of_corporate_status_file` | URL | `v1`, `light`, `plus` | Canada institutions only |
| `certificate_of_good_standing_file` | URL | `v1`, `light`, `plus` | USA institutions only |
| `certificate_of_incorporation_file` | URL | `v1`, `light`, `plus` | USA & Canada institutions only |
| `commercial_register_entry_file` | URL | `v1`, `light`, `plus` | Institutions only |
| `commercial_register` | `string` | `v1`, `light`, `plus` | Institutions only |
| `company_name` | `string` | `v1`, `light`, `plus` | Institutions only |
| `company_seat` | `string` | `v1`, `light`, `plus` | Institutions only |
| `jurisdiction` | `string` | `v1`, `light`, `plus` | Institutions only |
| `legal_form` | `string` | `v1`, `light`, `plus` | Institutions only |
| `managing_directors` | `string` | `v1`, `light`, `plus` | Institutions only |
| `owner_identity_proof_file` | URL | `v1`, `light`, `plus` | Institutions only |
| `power_of_attorney_file` | URL | `v1`, `light`, `plus` | Institutions only |
| `secretary_certificate_file` | URL | `v1`, `light`, `plus` | USA & Canada institutions only |
| `shareholders_list_file` | URL | `v1`, `light`, `plus` | Institutions only |
| `transparency_register_entry_file` | URL | `v1`, `light`, `plus` | Institutions only |
| `unique_identification_number` | `string` | `v1`, `light`, `plus` | USA, Singapore & Hong-Kong institutions only |
| `sow_estimated_net_worth_currency` | `EUR` or `USD` | `sow` |  |
| `sow_estimated_net_worth_value` | `string` | `sow` |  |
| `sow_crypto_bank_statement_file` | URL | `sow` | People only |
| `sow_crypto_source_of_initial_investment_file` | URL | `sow` | People only |
| `sow_crypto_transactions_last_3_months_file` | URL | `sow` | People only |
| `sow_dividends_bank_statement_file` | URL | `sow` | People only |
| `sow_dividends_entitlement_file` | URL | `sow` | People only |
| `sow_divorce_settlement_bank_statement_file` | URL | `sow` | People only |
| `sow_divorce_settlement_proof_file` | URL | `sow` | People only |
| `sow_freelance_bank_statement_file` | URL | `sow` | People only |
| `sow_freelance_last_year_tax_returns_file` | URL | `sow` | People only |
| `sow_freelance_service_contracts_file` | URL | `sow` | People only |
| `sow_gifts_bank_statement_file` | URL | `sow` | People only |
| `sow_gifts_name_of_donator` | `string` | `sow` | People only |
| `sow_gifts_reason_for_donation` | `string` | `sow` | People only |
| `sow_gifts_relationship_with_donator` | `string` | `sow` | People only |
| `sow_inheritance_bank_statement_file` | URL | `sow` | People only |
| `sow_inheritance_proof_file` | URL | `sow` | People only |
| `sow_lease_revenue_agreement_file` | URL | `sow` | People only |
| `sow_lease_revenue_bank_statement_file` | URL | `sow` | People only |
| `sow_life_policy_bank_statement_file` | URL | `sow` | People only |
| `sow_life_policy_closing_statement_file` | URL | `sow` | People only |
| `sow_pension_bank_statement_file` | URL | `sow` | People only |
| `sow_pension_statement_file` | URL | `sow` | People only |
| `sow_salary_bank_statement_file` | URL | `sow` | People only |
| `sow_salary_last_year_tax_returns_file` | URL | `sow` | People only |
| `sow_salary_pay_slips_last_3_months_file` | URL | `sow` | People only |
| `sow_sale_of_company_bank_statement_file` | URL | `sow` | People only |
| `sow_sale_of_company_contract_file` | URL | `sow` | People only |
| `sow_sale_of_property_bank_statement_file` | URL | `sow` | People only |
| `sow_sale_of_property_contract_file` | URL | `sow` | People only |
| `sow_sale_of_shares_bank_statement_file` | URL | `sow` | People only |
| `sow_sale_of_shares_proof_file` | URL | `sow` | People only |
| `sow_type` | `crypto`, `dividends`, `divorce_settlement`, `freelance`, `gifts`, `inheritance`, `lease_revenue`, `life_policy`, `pension`, `salary`, `sale_of_company`, `sale_of_property`, or `sale_of_shares` | `sow` | People only |
| `sow_balance_sheet_file` | URL | `sow` | Institutions only |
| `sow_cash_flow_statement_file` | URL | `sow` | Institutions only |
| `sow_income_statement_file` | URL | `sow` | Institutions only |
| `sow_unaudited_accountant_name` | `string` | `sow` | Institutions only |
| `sow_unaudited_accountant_professional_body` | `string` | `sow` | Institutions only |

{% hint style="warning" %}
URLs are set expire a few hours after they were requested.
{% endhint %}

