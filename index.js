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
  const redirectToApp = `com.example.google_signin_app_1://oauth2redirect?code=${code}`;

  // res.redirect(redirectToApp);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Redirecting...</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript">
          // Trigger Android app deep link
          window.location.href = "${redirectToApp}";
        </script>
      </head>
      <body>
        <p>Redirecting to the app...</p>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`OAuth2 redirect server listening on port ${PORT}`);
});