
const error = (errorResponse) => new Error(`
  status: ${errorResponse.status}
  text: ${errorResponse.statusText}
  message: ${JSON.stringify(errorResponse.body)}
  `)

export default error;