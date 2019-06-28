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
`response1.json` suppose `access_token` has the following scopes:  
  
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
  "uid": "d52bdee2-0543-4b60-8c46-5956a37db8af",
  "emails": [
    { "address": "ewd@example.com" }
  ],
  "verifications": [
    {
      "level": "plus"
    },
    {
      "level": "selfie"
    },
    {
      "level": "wallet",
      "details": {
        "wallet_currency": "ETH",
        "wallet_address": "0x0000000000000000000000000000000000000000"
      }
    }
  ]
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="response2.json" %}
```javascript
{
  "uid": "d52bdee2-0543-4b60-8c46-5956a37db8af",
  "verifications": [
    {
      "level": "plus",
      "details": {
        "accredited_investor": true,
        "accredited_investor_proof_file": "https://example.com/path-to-accreditation-file",
        "date_of_birth": "1930-05-11",
        "full_name": "Edsger Wybe Dijkstra",
        "place_of_birth": "Rotterdam",
        "identification_document_country": "NL",
        "identification_document_type": "national_id",
        "identification_document_number": "123456789",
        "residential_address": "Austin, Texas",
        "residential_address_country": "US",
        "residential_address_proof_file": "https://example.com/path-to-residence-file"
      }
    },
    {
      "level": "selfie",
      "details": {
        "identification_document_back_file": "https://example.com/path-to-back-file",
        "identification_document_front_file": "https://example.com/path-to-front-file",
        "identification_document_selfie_file": "https://example.com/path-to-selfie-file"
      }
    },
    {
      "level": "wallet"
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

| Parameter | Type / Format | KYC level availability | Restrictions |
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

