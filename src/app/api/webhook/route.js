import { verifySignature } from '../../../lib/verifySignature';

export async function POST(request) {
  const payload = await request.json();
  const signature = request.headers.get('intuit-signature');
  const verifierToken = process.env.QBO_VERIFIER_TOKEN;

  console.log('Payload:', JSON.stringify(payload));
  console.log('Verifier Token:', verifierToken);
  console.log('Signature from Header:', signature);

  if (!verifySignature(payload, signature, verifierToken)) {
    console.log('Signature verification failed');
    return new Response('Invalid signature', { status: 401 });
  }

  // Process the webhook payload
  console.log('Webhook received:', payload);

  return new Response('Webhook received', { status: 200 });
}