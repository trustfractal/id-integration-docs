# Common issues

## You are missing an access token for a user

Ensure your application is [correctly using the code parameter to obtain an access token](../user-integration/user-authorization.md#obtaining-an-access-token) for users. Then [send the user your authorization link](../user-integration/user-authorization.md#obtaining-an-authorization-code).

**You can send the user through authorization again as many times as you like.** They will be transparently redirected to the redirection URL you set, provided they had authorized your application previously. Otherwise, they will be shown the authorization screen for your app and requested scopes.

Note that the user may have to log back in to Fractal.

