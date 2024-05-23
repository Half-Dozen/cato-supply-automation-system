// app/api/callback/route.js
import { oauthClient } from '../../../lib/intuit';
import { setToken } from '../../../lib/tokenStore';
import OAuthClient from 'intuit-oauth'; // Add this import

export async function GET(request) {
  const url = new URL(request.url);
  const parseRedirect = url.searchParams.toString();

  try {
    const authResponse = await oauthClient.createToken(parseRedirect);
    console.log('The Token is ' + JSON.stringify(authResponse.json));
    setToken(authResponse.json);
    return new Response(JSON.stringify(authResponse.json), { status: 200 });
  } catch (e) {
    console.error('The error message is: ' + e.originalMessage);
    console.error(e.intuit_tid);
    return new Response('Error during token exchange', { status: 500 });
  }
}
