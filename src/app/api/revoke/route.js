import { revokeToken } from '../../../lib/tokenStore';

export async function POST(request) {
  try {
    await revokeToken();
    return new Response('Token revoked successfully', { status: 200 });
  } catch (e) {
    return new Response('Error revoking token', { status: 500 });
  }
}

