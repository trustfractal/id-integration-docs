---
description: Description how can be ID used in Iframe.
---

# Embedded Journey Iframe

### Basic skeleton and permissions

```html
<iframe
    allow="camera *; fullscreen *"
    sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
/>
```

### Generating iframe URL

There is no difference between the URL for the journey and the iframe URL, they are the same, but it can be enhanced with a few query attributes:

| Attribute       | Values               | Description                                                                                                 |
| --------------- | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| `method`        | wallet, email, phone | Preferred login method.                                                                                     |
| `currency`      | eth, kar             | Preferred currency.                                                                                         |
| `ensure_wallet` | 0x...                | Required wallet address, this address will be forced for wallet login or later in the journey to be shared. |

### Iframe messages

When the user rejects or completes the journey, the redirections from OAuth2 behavior are replaced by messages from the iframe to the parent window. The developer should create listeners for these messages. Here is a React example of how to do that:

```typescript
  const messageReceiver = useCallback((message: any) => {
    // React only messages from ID iframe
    if (message.origin === "https://app.fractal.id") {
      if (message.data.error) {
        setMessage(`KYC process failed with: ${JSON.stringify(message.data.error)}`);
        // Hide iframe ...
      } else if (message.data.open) {
        // If you want to use wallet-sign-in, this is required
        // since there are security limitations, especially with
        // opening metamask protocol link in mobile device
        window.open(message.data.open, message.data.target, message.data.features);
      } else {
        setMessage(`KYC process is completed.`);
        // Hide iframe, load data, etc...
        // Oauth2 attributes are presented in the message data
        // { 
        //    "code": "MXES5XpDzMRAHyMI3Jx5K3nrxzZjWjEr-Cskq3Jevso",
        //    "sub1": "MXES5XpDzMRAHyMI3Jx5K3nrxzZjWjEr-Cskq3Jevso",
        //    "state": "state_arg"
        // }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", messageReceiver);

    return () => window.removeEventListener("message", messageReceiver);
  }, []);
```

