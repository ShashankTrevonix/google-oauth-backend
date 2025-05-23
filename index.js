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
  const redirectToApp = 'com.example.googlesigninapp1://oauth2redirect?code='+code;

  res.redirect(redirectToApp);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`OAuth2 redirect server listening on port ${PORT}`);
});