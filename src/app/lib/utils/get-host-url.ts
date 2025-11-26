import { headers } from 'next/headers';

/**
 * 
 * Get host url - i.e localhost in local dev
 */
export async function getHostUrl() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  return `${protocol}://${host}`;
}
