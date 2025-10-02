import config from '../../config';

import qs from 'querystring';

let cachedToken: string | null = null;
let tokenExpiry: number | null = null; // Unix timestamp in ms

async function getEbayToken(): Promise<string> {
  const now = Date.now();

  console.log({ cachedToken, tokenExpiry, now });
  // Return cached token if still valid
  // if (cachedToken && tokenExpiry && now < tokenExpiry) {
  //   return cachedToken;
  // }

  const creds = Buffer.from(
    `${config.ebay_client_id}:${config.ebay_client_secret}`,
  ).toString('base64');

  const body = qs.stringify({
    grant_type: 'client_credentials',
    scope: 'https://api.ebay.com/oauth/api_scope', // adjust if needed
  });

  const res = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('Failed to get eBay token:', errText);
    throw new Error(`Token request failed: ${res.status}`);
  }

  const data = await res.json();

  cachedToken = data.access_token;
  tokenExpiry = now + (data.expires_in - 60) * 1000; // expire 1 min earlier than actual

  return cachedToken as string;
}

export async function getProducts(
  query: Record<string, unknown>,
  limit: number = 12,
) {
  const token = await getEbayToken();
  const search = query?.search || 'Weird Toy';
  const page = Number(query?.page) || 1;
  const offset = (page - 1) * limit;
  const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${search}&limit=${limit}&offset=${offset}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`eBay API error: ${errText}`);
  }

  const data = await res.json();

  return data?.itemSummaries || [];
}

export const ebayService = {
  getProducts,
};

// import config from '../../config';
// import qs from 'querystring';
// import Redis from 'ioredis';

// const redis = new Redis({
//   host: config.redis_host,
//   port: config.redis_port ? Number(config.redis_port) : undefined,
// });

// const TOKEN_KEY = 'ebay_access_token';
// const TOKEN_EXPIRY_KEY = 'ebay_token_expiry';

// async function getEbayToken(): Promise<string> {
//   const now = Date.now();

//   // Try to get token from Redis
//   const [cachedToken, tokenExpiryStr] = await redis.mget(
//     TOKEN_KEY,
//     TOKEN_EXPIRY_KEY,
//   );
//   const tokenExpiry = tokenExpiryStr ? Number(tokenExpiryStr) : null;

//   if (cachedToken && tokenExpiry && now < tokenExpiry) {
//     return cachedToken;
//   }

//   // Generate new token
//   const creds = Buffer.from(
//     `${config.ebay_client_id}:${config.ebay_client_secret}`,
//   ).toString('base64');
//   const body = qs.stringify({
//     grant_type: 'client_credentials',
//     scope: 'https://api.ebay.com/oauth/api_scope',
//   });

//   const res = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
//     method: 'POST',
//     headers: {
//       Authorization: `Basic ${creds}`,
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body,
//   });

//   if (!res.ok) {
//     const errText = await res.text();
//     console.error('Failed to get eBay token:', errText);
//     throw new Error(`Token request failed: ${res.status}`);
//   }

//   const data = await res.json();
//   const newToken = data.access_token;
//   const newExpiry = now + (data.expires_in - 60) * 1000; // 1 min earlier than actual

//   // Store token in Redis
//   await redis.mset(TOKEN_KEY, newToken, TOKEN_EXPIRY_KEY, newExpiry.toString());

//   return newToken;
// }

// export async function getProducts(
//   query: Record<string, unknown>,
//   limit: number = 12,
// ) {
//   const token = await getEbayToken();
//   const search = query?.search || ('Weird Toy' as string);
//   const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${search}&limit=${limit}`;

//   const res = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//   });

//   if (!res.ok) {
//     const errText = await res.text();
//     throw new Error(`eBay API error: ${errText}`);
//   }

//   const data = await res.json();
//   return data?.itemSummaries || [];
// }

// export const ebayService = {
//   getProducts,
// };
