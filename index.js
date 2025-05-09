const express = require("express");
const app = express();

app.get('/', (req, res) => {
    console.log("Calling root get")
    res.json({message: "Connected"});
})

app.get('/oauth2redirect', async (req, res) => {
  console.log("Calling oauth2redirect")
  const code = req.query.code;
  console.log(`code: ${code}`)
  const redirectToApp = 'com.example.google_signin_app_1://oauth2redirect?code='+code;

  // res.redirect(redirectToApp);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="0; url=${redirectToApp}">
        <title>Redirecting...</title>
      </head>
      <body>
        <p>Redirecting to the app...<a href="${redirectToApp}">Click here</a></p>
      </body>
    </html>
  `);
});

app.get(`/com.example.google_signin_app_1://oauth2redirect`, (req, res) => {
  res.json({message: "Saav marae"});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`OAuth2 redirect server listening on port ${PORT}`);
});