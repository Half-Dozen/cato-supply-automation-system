import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

function getOAuth2Client() {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const { client_secret, client_id, redirect_uris } = credentials.installed;

    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    const token = JSON.parse(process.env.GOOGLE_TOKEN);
    oAuth2Client.setCredentials(token);

    return oAuth2Client;
}

export { getOAuth2Client, SCOPES };

