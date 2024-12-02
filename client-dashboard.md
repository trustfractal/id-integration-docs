# Client dashboard

We offer a dashboard in order for you to configure and consult your integrations with Fractal ID. Both our staging and development environments include one of these, and you can access through the following links:

* [Production client dashboard](https://developer.fractal.id)
* [Staging client dashboard](https://developer.staging.sandbox.fractal.id/)

The dashboard will list all integrations owned by you, as well as providing a way to create a new integration via the `Create integration` button at the top right of this page.

{% hint style="info" %}
We cover how to create your first integration in the [Getting started](getting-started.md) guide.
{% endhint %}

You can click on any of the shown integrations for further details and actions with them.&#x20;

## Accounts

You can create as many accounts as you need by letting us know which email addresses should have access to which application and we can do that manually; alternatively, you can use a group email.&#x20;

## Integration details page

In this page, after clicking an integration in the dashboard home, you can inspect multiple aspects of your integration, as well as edit it via the `Edit integration` button on the top right of this page. The page's sections are described below:

### Integration information

In this section, your integration's name and homepage URL and redirect URI are displayed.

### API Info

![](.gitbook/assets/screenshot-2019-07-04-at-19.13.32.png)

In this section, you can inspect your client ID and Secret, as well as revoking access for all users and resetting the client secret (in case of a security leak), via the appropriate buttons.

### Webhooks

![](.gitbook/assets/screenshot-2019-07-04-at-19.17.29.png)

In this section, you can enable and configure webhooks we offer. By clicking on each, you can setup its URL and access the webhook secret token. Further information on available webhooks and their use is [available here](user-integration/webhooks/).

### Statistics

![](.gitbook/assets/screenshot-2020-05-19-at-20.05.32.png)

In this section, you can at a glance understand how many users authorized your application (after their authorization code is exchanged by an access/refresh token combination). Further statistics, such as those found in this page, can be inspected by clicking the `View detailed stats` button.

### User Explorer

![](.gitbook/assets/screenshot-2020-05-19-at-20.06.29.png)

In this section, you can see the KYC status of every user that started a KYC process after authorizing your integration. If you asked for `details` scopes, you'll also have access to all the answers and files provided during onboarding.

If asked the user to share their contact, you can use the email address and phone number filters at the top of the table to find specific user rows faster.

If you want a copy of this information in file format, you can use the `Export CSV` button.

{% hint style="info" %}
The CSV export does not include user-submitted files, such as proofs of identity. Please contact your account manager if this is something you'd require.
{% endhint %}
