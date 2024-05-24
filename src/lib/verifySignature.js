import crypto from 'crypto';

export function verifySignature(payload, signature, verifierToken) {
  const hmac = crypto.createHmac('sha256', verifierToken);
  const payloadString = JSON.stringify(payload);
  hmac.update(payloadString);
  const hash = hmac.digest('base64');
  
  console.log('Payload String:', payloadString);
  console.log('Computed Hash:', hash);
  console.log('Provided Signature:', signature);
  
  return hash === signature;
}

