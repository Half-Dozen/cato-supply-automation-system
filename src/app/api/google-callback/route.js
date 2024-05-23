import { getOAuth2Client } from '../../../lib/googleClient';
import { setToken } from '../../../lib/tokenStore';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  try {
    const oAuth2Client = getOAuth2Client();
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    setToken(tokens);
    console.log('The Token is ' + JSON.stringify(tokens));

    // Reminder: Ensure to include the refresh_token and access_token in your environment variables
    // Example:
    // GOOGLE_TOKEN='{"access_token":"your-access-token","refresh_token":"your-refresh-token","scope":"https://www.googleapis.com/auth/gmail.readonly","token_type":"Bearer","expiry_date":1234567890}'

    return new Response(JSON.stringify(tokens), { status: 200 });
  } catch (e) {
    console.error('The error message is: ' + e.message);
    return new Response('Error during token exchange', { status: 500 });
  }
}

