# Webhooks

## Description

Webhooks allow you to build or set up Applications which subscribe to certain events on Fractal ID. When one of those events is triggered, we'll send a HTTP `POST` payload to the webhook's configured URL.

## Terminology

* Callback URL - the URL of the server that will receive the webhook `POST` requests.
* Secret token - token that allows you to ensure that `POST` requests sent to the callback URL are from Fractal.
* Notification - webhooks `POST` request which is triggered by certain events on Fractal ID.

## Setup

To set up Webhooks, you need to provide us with the callback URL and the notification types that you would like to subscribe. We will then send you the webhook secret token.



