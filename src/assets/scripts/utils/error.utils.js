
const error = (errorResponse) => ({
    status: errorResponse.status,
    text: errorResponse.statusText,
    message: JSON.stringify(errorResponse.body),
  });

export default error;