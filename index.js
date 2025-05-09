const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.json({message: "Connected"});
})

app.get('/oauth2redirect', async (req, res) => {
  const code = req.query.code;
  const redirectToApp = `com.your.package:/oauth2redirect?code=${code}`;
  res.redirect(redirectToApp);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`OAuth2 redirect server listening on port ${PORT}`);
});