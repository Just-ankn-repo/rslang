import env from '../constants/env.conf';
import error from '../utils/error.utils';

const userMethods = {
  registerUser: async (email, password) => {
    const rawResponse = await fetch(`${env.backendUrl}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email": email, "password": password })
    });
    const content = await rawResponse.json();

    return content
  },

  updateUser: async (userId, authToken, data) => {
    let rawResponse;
    let result;

    try {
      rawResponse = await fetch(`${env.backendUrl}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ "email": data.email, "password": data.password })
      });

      result = await rawResponse.json();
      return result;
    } catch(e) {
      throw error(rawResponse);
    }
  }
}

export default userMethods;
