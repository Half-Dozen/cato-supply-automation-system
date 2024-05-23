import crypto from 'crypto';

export function verifySignature(payload, signature, verifierToken) {
  const hmac = crypto.createHmac('sha256', verifierToken);
  hmac.update(JSON.stringify(payload));
  const hash = hmac.digest('base64');
  return hash === signature;
}

