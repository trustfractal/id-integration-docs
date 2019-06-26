# API Authorization

Every request sent to the Fractal ID API must be authorized by adding an `Authorization` header containing a valid access token \(except the endpoint used to obtain access tokens: `/oauth/token`\).

Conceptually, access tokens are tied to an identity. There are two types of identities:

* **User identities**; you obtain these tokens by following the **User authorization**

  **flow**. You should use these when you want to access information of one of your

  users.

* **Application identities**; you obtain these tokens by following the **Client**

  **authorization flow**. You should use these access tokens when you want to

  interact with our statistics endpoints, for example.
