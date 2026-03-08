import { createClient, type Entry } from 'contentful';

// Configure these environment vars in your deployment or .env.local
const SPACE_ID = process.env.CF_SPACE_ID ?? '';
const ACCESS_TOKEN = process.env.CF_ACCESS_TOKEN ?? '';

console.log('Contentful SPACE_ID:', SPACE_ID);

if (!SPACE_ID || !ACCESS_TOKEN) {
  // Intentionally not throwing so local dev can still run other parts of the app.
  // If you need to fail fast, change this to throw an Error.
  console.warn('Contentful credentials are missing. Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN.');
}

// the Contentful client will infer any needed generics on its own
export const contentfulClient = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});



export async function getEntry<Fields = any>(
  id: string,
  query?: Record<string, unknown>
){
  return contentfulClient.getEntry(id);
}

