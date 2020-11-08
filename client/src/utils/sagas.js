import ErrorSeverUnreachable from '../errors/ErrorServerUnreachable'

/**
 * Generate the request
 * @param {string} method http method : GET, POST, PUT, ...
 * @param {object} body the json object to send to the server
 */
export const generateRequest = (method, body = null) => {
  return {
    method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined // set body if defined
  }
}

/**
 * Call a request
 * @param {Request} request the request to call
 */
export async function callRequest (request) {
  try {
    const response = await fetch(request)

    if (!response.ok) {
      throw new ErrorSeverUnreachable()
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
