const express = require("express");
const uritemplate = require("uri-template");
const fetch = require("node-fetch");
const path = require("path");

const prefs = require("./prefs.js");

const app = express();

const loginTemplate = uritemplate.parse(
  `${prefs.frontendServer}/authorize{?client_id,redirect_uri,response_type,scope}`,
);

const tokenTemplate = uritemplate.parse(
  `${prefs.authServer}/oauth/token{?client_id,client_secret,code,grant_type,redirect_uri}`,
);

const getAccessToken = (code) =>
  fetch(tokenTemplate.expand({ ...prefs, code, grant_type: "authorization_code" }), { method: "POST" })
    .then(r => (console.log(r), r.json()))
    .then(r => (console.log(r), r.access_token));

const getUserInformation = (accessToken) =>
  fetch(`${prefs.resourceServer}/users/me`, { headers: { Authorization: `Bearer ${accessToken}` } })
   .then(r => r.json());

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, "index.html")));
app.get("/logo.png", (req, res) => res.sendFile(path.resolve(__dirname, "logo.png")));
app.get("/style.css", (req, res) => res.sendFile(path.resolve(__dirname, "style.css")));

app.get("/prefs", (req, res) => {
  res.send(JSON.stringify({ uri: loginTemplate.expand({ ...prefs, response_type: "code" }) }));
});

app.get("/oauth/callback", (req, res) => {
  if (req.query.error !== undefined) {
    res.send(req.query.error_description);
    return;
  }

  const code = req.query.code;

  getAccessToken(code)
    .then(token => getUserInformation(token))
    .then((r) => res.send(JSON.stringify(r)));
});

app.listen(8080);
