import type { Handle } from '@sveltejs/kit'

const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event, {
    preload: ({ type }) => type === 'font'
  })

  return response
}

export { handle }