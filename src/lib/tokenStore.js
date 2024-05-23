// lib/tokenStore.js
import { oauthClient } from './intuit';

let tokenStore = null;

export const getToken = () => tokenStore;

export const setToken = (token) => {
  tokenStore = token;
};

export const isAccessTokenValid = () => {
  return oauthClient.isAccessTokenValid();
};

export const refreshToken = async () => {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const authResponse = await oauthClient.refresh();
      setToken(authResponse.json);
      console.log('Tokens refreshed: ' + JSON.stringify(authResponse.json));
      return;
    } catch (e) {
      attempt++;
      const errorDetails = {
        attempt,
        message: e.originalMessage,
        intuit_tid: e.intuit_tid,
        stack: e.stack,
      };
      console.error(`Attempt ${attempt} - Error refreshing token:`, errorDetails);
      if (e.originalMessage.includes('invalid_grant') || e.originalMessage.includes('token_expired')) {
        // Redirect user to reauthorize the app
        window.location.href = oauthClient.authorizeUri({
          scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
          state: 'reconnect',
        });
        return;
      }
      if (attempt >= maxRetries) {
        console.error('Max retries reached. Failed to refresh token.');
        throw e;
      }
    }
  }
};

export const revokeToken = async () => {
  try {
    if (tokenStore && tokenStore.refresh_token) {
      await oauthClient.revoke(tokenStore.refresh_token);
      console.log('Token revoked successfully');
      tokenStore = null;
    } else {
      console.error('No token available to revoke');
    }
  } catch (e) {
    console.error('Error revoking token: ' + e.originalMessage);
    console.error(e.intuit_tid);
  }
};
