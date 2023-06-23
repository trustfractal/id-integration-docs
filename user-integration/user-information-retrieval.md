# User information retrieval

As soon as you [obtain an user's access token](user-authorization.md), you are able to access the status of their verification case and the personal information they submitted.

{% hint style="info" %}
You can also access the user's provided information, as well as their KYC process status, in the [user explorer](../client-dashboard.md#user-explorer) within the client dashboard.
{% endhint %}

{% swagger baseUrl="https://RESOURCE_DOMAIN" path="/users/me" method="get" summary="Retrieve user information" %}
{% swagger-description %}
This endpoint returns JSON. The scopes associated with the access token will define which fields will be returned.
{% endswagger-description %}

{% swagger-parameter in="header" name="Content-Type" type="string" %}
`application/json`
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="string" %}
`Bearer`



_`access_token`_
{% endswagger-parameter %}

{% swagger-response status="200" description="response description"%}
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
{% endswagger-response %}
{% endswagger %}

## Response fields

#### Top level

| Field                | Type / Format | Description                                                                                                                             |
| -------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `uid`                | `string`      | This user's unique identifier.                                                                                                          |
| `emails`             | `array`       | A list of email addresses belonging to the user.                                                                                        |
| `phones`             | `array`       | A list of phone numbers belonging to the user.                                                                                          |
| `verification_cases` | `array`       | The verification cases that you requested for this user.                                                                                |
| `wallets`            | `array`       | The wallets this user has provided during onboarding.                                                                                   |
| `institution`        | `object`      | <p><strong>[Deprecated]</strong> Use <code>verification_cases</code> instead.</p><p>The user data fields for an institutional user.</p> |
| `person`             | `object`      | <p><strong>[Deprecated]</strong> Use <code>verification_cases</code> instead.</p><p>The user data fields for an individual user.</p>    |
| `verifications`      | `array`       | <p><strong>[Deprecated]</strong> Use <code>verification_cases</code> instead.</p><p>The list of verifications given to this user.</p>   |

#### `emails`

An array of email addresses belonging to the user. Available when users sign up using an email address. We do not support more than one email address. If the user registered using a phone number, this may be an empty array. Each email entry contains the following fields:

| Field     | Type / Format | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| `address` | `string`      | A email address, confirmed to belong to the user |

#### `phones`

An array of phone numbers belonging to the user. Available when users sign up using a phone number. We do not support more than one phone number. If the user registered using an email address, this may be an empty array. Each phone entry contains the following fields:

| Field    | Type / Format | Description                                                                              |
| -------- | ------------- | ---------------------------------------------------------------------------------------- |
| `number` | `string`      | A phone number, confirmed to belong to the user, in E.164 format (e.g. `+4400000000000`) |

#### `verification_cases`

A verification case represents information that has been validated internally by Fractal. Verifications are emitted  separately per each level and add-ons. A verification request for `basic+liveness` will generate two verifications, one per item.

| Field               | Type / Format                                                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `level`             | `string`                                                                            | The level (or add-on) that this verification refers to.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `journey_completed` | `boolean`                                                                           | `true` once a user completes all the journey steps required by your scopes, and gets redirected to `redirect_uri`. `false` until then.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `status`            | <p><code>pending</code></p><p><code>contacted</code></p><p><code>done</code></p>    | <ul><li><code>pending</code>: if Fractal needs to take action,</li><li><code>contacted</code>: if the user needs to take action</li><li><code>done</code>: if Fractal has reached a conclusion</li></ul>                                                                                                                                                                                                                                                                                                                                                                                   |
| `credential`        | <p><code>pending</code></p><p><code>approved</code></p><p><code>rejected</code></p> | <p>The outcome of our analysis.</p><ul><li><code>approved</code>: The user fulfills all the requirements</li><li><code>rejected</code>: The user is unable to fulfill all the requirements</li><li><code>pending</code>: Fractal is still evaluating the case</li></ul>                                                                                                                                                                                                                                                                                                                    |
| `id`                | `string`                                                                            | A unique identifier for this verification case.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `details`           | `object`                                                                            | The set of user data fields (see below for details) that have been validated with respect to this level or add-on. For more details on these fields, please check the [`details`](user-information-retrieval.md#details) section below.                                                                                                                                                                                                                                                                                                                                                    |
| `report`            | `object`                                                                            | <p><strong>[Deprecated]</strong> Coinfirm integration has been deprecated. If you wish to use Coinfirm, please integrate with it directly.</p><p></p><p><strong>Valid only for the wallet add-on verification.</strong> The AML report generated by <a href="https://www.coinfirm.com/">Coinfirm</a> for the cryptocurrency address present under <code>details</code>.</p><p>For further information on the report fields, please refer to the the <a href="https://id-docs-attachments.s3.eu-central-1.amazonaws.com/Report+fields+fromAPI+response.pdf">Coinfirm documentation</a>.</p> |

#### **`wallets`**

An array of wallet addresses and currencies the user has provided during onboarding. This array can be empty if you did not request the user to share a wallet address during onboarding. The array can grow even after the user is approved, as users are allowed to update their wallet addresses and decide with which applications they want to share them.\
At this time, this array cannot shrink.\
Please note that the wallet currency is merely representative of the addon that was used to request the wallet. For example, if you have used the `wallet-eth` addon to request any EVM-compatible wallet, the currency will be `eth`.

| Field      | Type / Format                                                                                                                                                                                   | Description                                                                   |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| `id`       | `uuid`                                                                                                                                                                                          | A unique identifier for the wallet.                                           |
| `address`  | `string`                                                                                                                                                                                        | The wallet address.                                                           |
| `currency` | <p><code>ada</code></p><p><code>algo</code></p><p><code>btc</code></p><p><code>eth</code></p><p><code>kar</code></p><p><code>sol</code></p><p><code>substrate</code></p><p><code>sui</code></p><p><code>xrp</code></p> | The wallet currency derived from the used wallet addon.                       |
| `verified` | `boolean`                                                                                                                                                                                       | Indicates wether the ownership of the wallet has been confirmed with Fractal. |

#### \[Deprecated] `institution`

This field will be removed eventually. Use `verification_cases` instead.

#### \[Deprecated] `person`&#x20;

This field will be removed eventually. Use `verification_cases` instead.

#### **\[Deprecated]** `verifications`

This field will be removed eventually. Use `verification_cases` instead.

### `details`

The set of fields enumerated below contains the information submitted by the user. The version of the information validated in the context of a verification will be present under the `details` key in each member of the `verification_cases` array. As our process evolves, we may add or remove fields from this list.

Some fields are available for natural `person`s only, while others are `institution` only. These will be marked in the "Restrictions" column below.

#### Identification related fields

| Field                                    | Type / Format                                                                                  | KYC level availability                                                     | Restrictions |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------ |
| `date_of_birth`                          | `YYYY-MM-DD`                                                                                   | <p><code>light</code></p><p><code>plus</code></p><p><code>basic</code></p> |              |
| `full_name`                              | `string`                                                                                       | <p><code>light</code></p><p><code>plus</code></p><p><code>basic</code></p> |              |
| `identification_document_back_file`      | URL                                                                                            | <p><code>selfie</code></p><p><code>basic</code></p>                        |              |
| `identification_document_country`        | [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO\_3166-1\_alpha-2)                       | <p><code>light</code></p><p><code>plus</code></p><p><code>basic</code></p> |              |
| `identification_document_front_file`     | URL                                                                                            | <p><code>selfie</code></p><p><code>basic</code></p>                        |              |
| `identification_document_number`         | `string`                                                                                       | <p><code>light</code></p><p><code>plus</code></p><p><code>basic</code></p> |              |
| `identification_document_type`           | <p><code>national_id</code></p><p><code>passport</code></p><p><code>drivers_license</code></p> | <p><code>light</code></p><p><code>plus</code></p>                          |              |
| `place_of_birth`                         | `string`                                                                                       | <p><code>light</code></p><p><code>plus</code></p>                          |              |
| `identification_document_selfie_file`    | URL                                                                                            | `selfie`                                                                   |              |
| `identification_document_date_of_issue`  | `YYYY-MM-DD`                                                                                   | <p><code>light</code></p><p><code>plus</code></p><p><code>basic</code></p> |              |
| `identification_document_date_of_expiry` | `YYYY-MM-DD`                                                                                   | <p><code>light</code></p><p><code>plus</code></p><p><code>basic</code></p> |              |

#### Liveness related fields

`liveness_audit_best_file` will generally be the best image of the user. `liveness_audit_least_similar_file` is the least similar image to the first image. `liveness_audit_open_eyes_file` is the image where the users' eyes are the most open. `liveness_audit_quality{1,2,3}_file` are the next 3 highest images.

| Field                               | Type / Format | KYC level availability | Restrictions |
| ----------------------------------- | ------------- | ---------------------- | ------------ |
| `liveness`                          | boolean       | `liveness`             |              |
| `liveness_audit_best_file`          | URL           | `liveness`             |              |
| `liveness_audit_least_similar_file` | URL           | `liveness`             |              |
| `liveness_audit_open_eyes_file`     | URL           | `liveness`             |              |
| `liveness_audit_quality1_file`      | URL           | `liveness`             |              |
| `liveness_audit_quality2_file`      | URL           | `liveness`             |              |
| `liveness_audit_quality3_file`      | URL           | `liveness`             |              |

#### Institution related fields

These fields will only be available if the user is an institution and not a natural person.

| Field                                  | Type / Format | KYC level availability                            | Restrictions                           |
| -------------------------------------- | ------------- | ------------------------------------------------- | -------------------------------------- |
| `articles_of_association_file`         | URL           | <p><code>light</code></p><p><code>plus</code></p> |                                        |
| `beneficial_owner`                     | `string`      | <p><code>light</code></p><p><code>plus</code></p> |                                        |
| `certificate_of_corporate_status_file` | URL           | <p><code>light</code></p><p><code>plus</code></p> | Canada institution                     |
| `certificate_of_good_standing_file`    | URL           | <p><code>light</code></p><p><code>plus</code></p> | USA institution                        |
| `certificate_of_incorporation_file`    | URL           | <p><code>light</code></p><p><code>plus</code></p> | USA & Canada institution               |
| `commercial_register_entry_file`       | URL           | <p><code>light</code></p><p><code>plus</code></p> |                                        |
| `commercial_register`                  | `string`      | <p><code>light</code></p><p><code>plus</code></p> |                                        |
| `company_name`                         | `string`      | <p><code>light</code></p><p><code>plus</code></p> |                                        |
| `company_seat`                         | `string`      | <p><code>light</code></p><p><code>plus</code></p> |                                        |
| `jurisdiction`                         | `string`      | <p><code>light</code></p><p><code>plus</code></p> |                                        |
| `legal_form`                           | `string`      | <p><code>light</code></p><p><code>plus</code></p> |                                        |
| `managing_directors`                   | `string`      | <p><code>light</code></p><p><code>plus</code></p> |                                        |
| `owner_identity_proof_file`            | URL           | <p><code>light</code></p><p><code>plus</code></p> |                                        |
| `power_of_attorney_file`               | URL           | <p><code>light</code></p><p><code>plus</code></p> |                                        |
| `secretary_certificate_file`           | URL           | <p><code>light</code></p><p><code>plus</code></p> | USA & Canada institution               |
| `shareholders_list_file`               | URL           | <p><code>light</code></p><p><code>plus</code></p> |                                        |
| `transparency_register_entry_file`     | URL           | <p><code>light</code></p><p><code>plus</code></p> |                                        |
| `unique_identification_number`         | `string`      | <p><code>light</code></p><p><code>plus</code></p> | USA, Singapore & Hong-Kong institution |

#### Residency related fields

| Field                                      | Type / Format                                                            | KYC level availability                            | Restrictions |
| ------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------- | ------------ |
| `residential_address_country`              | [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO\_3166-1\_alpha-2) | <p><code>light</code></p><p><code>plus</code></p> |              |
| `residential_address_proof_file`           | URL                                                                      | <p><code>light</code></p><p><code>plus</code></p> |              |
| `residential_address`                      | `string`                                                                 | <p><code>light</code></p><p><code>plus</code></p> |              |
| `residential_address_proof_date_of_expiry` | `YYYY-MM-DD`                                                             | `plus`                                            |              |

#### Wallet related fields

{% hint style="warning" %}
**\[Deprecated]** All fields are currently deprecated.

Use the top[-level wallets array](user-information-retrieval.md#wallets) for \`wallet\_address\` and \`wallet\_currency\`.

Coinfirm integration has been deprecated. If you wish to use Coinfirm, please integrate with it directly. This is now only used to return previously stored results.&#x20;
{% endhint %}

| Field                  | Type / Format  | KYC level availability | Restrictions |
| ---------------------- | -------------- | ---------------------- | ------------ |
| `wallet_address`       | `string`       | `wallet`               |              |
| `wallet_currency`      | `BTC` or `ETH` | `wallet`               |              |
| `wallet_check_reports` | `array`        | `wallet`               |              |

`wallet_check_reports` contains an array of every AML report we requested from [Coinfirm](https://www.coinfirm.com/) for this user's wallet address during the verification case process. For more information on the report fields, please refer to the the [Coinfirm documentation](https://id-docs-attachments.s3.eu-central-1.amazonaws.com/Report+fields+fromAPI+response.pdf).

#### Source of wealth related fields

| Field                              | Type / Format  | KYC level availability | Restrictions |
| ---------------------------------- | -------------- | ---------------------- | ------------ |
| `sow_estimated_net_worth_currency` | `EUR` or `USD` | `sow`                  |              |
| `sow_estimated_net_worth_value`    | `string`       | `sow`                  |              |

| Field                                        | Type / Format | KYC level availability | Restrictions  |
| -------------------------------------------- | ------------- | ---------------------- | ------------- |
| `sow_balance_sheet_file`                     | URL           | `sow`                  | `institution` |
| `sow_cash_flow_statement_file`               | URL           | `sow`                  | `institution` |
| `sow_income_statement_file`                  | URL           | `sow`                  | `institution` |
| `sow_unaudited_accountant_name`              | `string`      | `sow`                  | `institution` |
| `sow_unaudited_accountant_professional_body` | `string`      | `sow`                  | `institution` |

| Field                                          | Type / Format                                                                                                                                                                                                                                                                                                                                                                                                    | KYC level availability | Restrictions |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------ |
| `sow_type`                                     | <p><code>crypto</code></p><p><code>dividends</code></p><p><code>divorce_settlement</code></p><p><code>freelance</code></p><p><code>gifts</code></p><p><code>inheritance</code></p><p><code>lease_revenue</code></p><p><code>life_policy</code></p><p><code>pension</code></p><p><code>salary</code></p><p><code>sale_of_company</code></p><p><code>sale_of_property</code></p><p><code>sale_of_shares</code></p> | `sow`                  | `person`     |
| `sow_crypto_bank_statement_file`               | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_crypto_source_of_initial_investment_file` | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_crypto_transactions_last_3_months_file`   | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_dividends_bank_statement_file`            | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_dividends_entitlement_file`               | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_divorce_settlement_bank_statement_file`   | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_divorce_settlement_proof_file`            | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_freelance_bank_statement_file`            | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_freelance_last_year_tax_returns_file`     | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_freelance_service_contracts_file`         | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_gifts_bank_statement_file`                | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_gifts_name_of_donator`                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                         | `sow`                  | `person`     |
| `sow_gifts_reason_for_donation`                | `string`                                                                                                                                                                                                                                                                                                                                                                                                         | `sow`                  | `person`     |
| `sow_gifts_relationship_with_donator`          | `string`                                                                                                                                                                                                                                                                                                                                                                                                         | `sow`                  | `person`     |
| `sow_inheritance_bank_statement_file`          | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_inheritance_proof_file`                   | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_lease_revenue_agreement_file`             | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_lease_revenue_bank_statement_file`        | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_life_policy_bank_statement_file`          | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_life_policy_closing_statement_file`       | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_pension_bank_statement_file`              | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_pension_statement_file`                   | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_salary_bank_statement_file`               | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_salary_last_year_tax_returns_file`        | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_salary_pay_slips_last_3_months_file`      | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_sale_of_company_bank_statement_file`      | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_sale_of_company_contract_file`            | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_sale_of_property_bank_statement_file`     | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_sale_of_property_contract_file`           | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_sale_of_shares_bank_statement_file`       | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |
| `sow_sale_of_shares_proof_file`                | URL                                                                                                                                                                                                                                                                                                                                                                                                              | `sow`                  | `person`     |

#### Social security related fields

| Field                    | Type / Format | KYC level availability | Restrictions       |
| ------------------------ | ------------- | ---------------------- | ------------------ |
| `social_security_number` | `string`      | `ssn`                  | USA residents only |

{% hint style="warning" %}
URLs are set expire a few hours after they were requested.
{% endhint %}
