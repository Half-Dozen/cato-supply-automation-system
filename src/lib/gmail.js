import { google } from 'googleapis';
import { getOAuth2Client } from './googleClient';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function fetchUnreadEmails() {
    const auth = getOAuth2Client();
    const gmail = google.gmail({ version: 'v1', auth });

    const res = await gmail.users.messages.list({
        userId: 'me',
        q: 'is:unread',
    });

    const messages = res.data.messages || [];
    return messages;
}

async function getMessage(gmail, messageId) {
    const res = await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
    });
    return res.data;
}

async function getAttachment(gmail, messageId, attachmentId) {
    const res = await gmail.users.messages.attachments.get({
        userId: 'me',
        messageId: messageId,
        id: attachmentId,
    });
    return res.data.data;
}

async function processEmails() {
    const auth = getOAuth2Client();
    const gmail = google.gmail({ version: 'v1', auth });

    const messages = await fetchUnreadEmails();
    for (const message of messages) {
        const msg = await getMessage(gmail, message.id);

        for (const part of msg.payload.parts) {
            if (part.filename && part.body && part.body.attachmentId) {
                const attachment = await getAttachment(gmail, message.id, part.body.attachmentId);
                const buffer = Buffer.from(attachment, 'base64');
                saveAttachment(buffer, part.filename);

                await gmail.users.messages.modify({
                    userId: 'me',
                    id: message.id,
                    resource: { removeLabelIds: ['UNREAD'] },
                });
            }
        }
    }
}

function saveAttachment(data, filename) {
    const filePath = join(process.cwd(), 'attachments', filename);
    writeFileSync(filePath, data);
    console.log(`Attachment saved to ${filePath}`);
}

export { processEmails };

