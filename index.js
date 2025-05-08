const express = require('express');
const axios = require('axios');
const app = express();

const CLIENT_ID = 'YOUR_WEB_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'https://google-oauth-backend-95v9.onrender.com/oauth2redirect'; // Must match Google Console

app.get('/', (req, res) => {
    res.json({message: "Connected"});
})

app.get('/oauth2redirect', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const tokens = tokenResponse.data;

    // Optionally, fetch user info
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const userInfo = userInfoResponse.data;

    // Respond with tokens and user info (or handle session/cookies as needed)
    res.json({
      tokens,
      userInfo,
    });
  } catch (error) {
    console.error('Token exchange error:', error.response?.data || error.message);
    res.status(500).send('Failed to exchange authorization code for tokens');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`OAuth2 redirect server listening on port ${PORT}`);
});