import type { Handle } from '@sveltejs/kit';
import { connectToDb } from '$lib/db';

const handle: Handle = async ({ event, resolve }) => {
  const dbconn = await connectToDb();
  event.locals = { dbconn };

  const response = await resolve(event, {
    preload: ({ type }) => type === 'font'
  })
  dbconn.release();

  return response;
}

export { handle };