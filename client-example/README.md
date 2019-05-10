# Sample client application

To use this client application, please create a file called `prefs.js` in this
directory with the credentials provided by us. There's a `prefs.js.example`
available if you need to confirm the format of the file.

Then, install the required dependencies:

```
yarn install
```

Finally, run the server:

```
node server.js
```

You can now access your client application by going to http://localhost:8080

## Testing video id flow

In order to test video type verification flow, you need to modify created `prefs.js` file and add `verification.video:read` scope. Having `verification.v1:read` scope is mandatory in video type verification flow.

Example:

```
  scope: "uid:read email:read person.full_name:read verification.v1:read verification.video:read"
```
