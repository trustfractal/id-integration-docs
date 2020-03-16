# Mobile app integration

Fractal is a web-based application and is designed to be operated within a browser environment. As such, integration with mobile apps is currently only achievable using deep linking mechanisms.

The integration flow is essentially the same, whether the user's starting point is your web application or your native app \(see [User authorization](user-authorization.md) for more details\):

1. You redirect the user to Fractal
2. The user goes through the Fractal journey
3. Fractal redirects the user back to your application

The redirection in point 3 is towards the `redirect_uri` you configure in your integration \(see [Getting started](../getting-started.md#create-an-application) for more details\). If you want this redirection to happen towards your native app, instead of your web application, you need to make use of the operating system's deep linking mechanisms: [Android App Links](https://developer.android.com/training/app-links) in Android, and [Universal Links](https://developer.apple.com/ios/universal-links/) in iOS. They allow you to register particular URLs as URLs to be opened inside your native application instead of the browser.

Once these are set up, the user will be redirected to your app at the end of their journey in Fractal.

## Roadmap

* Q3 2020: new login flow to enable Fractal to be loaded within a web view \(only `SFSafariViewController` in iOS\)
* Q4 2020: native SDKs for Android and iOS

