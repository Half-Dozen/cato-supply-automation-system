import { processEmails } from '../../../lib/gmail';

export async function POST(req) {
    try {
        await processEmails();
        return new Response(JSON.stringify({ message: 'Emails processed successfully' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to process emails' }), { status: 500 });
    }
}

