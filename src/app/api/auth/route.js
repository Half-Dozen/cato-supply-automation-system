import { oauthClient } from '../../../lib/intuit';
import OAuthClient from 'intuit-oauth'; // Add this import

export async function GET(request) {
  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: 'testState',
  });
  return new Response(null, {
    status: 302,
    headers: { Location: authUri },
  });
}