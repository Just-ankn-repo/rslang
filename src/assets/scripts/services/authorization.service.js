import env from '../constants/env.conf';

const auth = {
  getToken: async (email, password) => {
    let result; 
    let rawResponse;
    try {
      rawResponse = await fetch(`${env.backendUrl}/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "email": email, "password": password })
      });

      result = await rawResponse.json();
      return result;
    } catch(e) {
      throw new Error(`
        status: ${rawResponse.status}
        text: ${rawResponse.statusText}
        message: ${JSON.stringify(rawResponse.body)}
      `);
    };
  }
}

export default auth;
