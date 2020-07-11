import env from '../constants/env.conf';
import error from '../utils/error.utils';

const userMethods = {
  registerUser: async (username, email, password) => {
    let rawResponse;
    let result;
    
    try {
      rawResponse = await fetch(`${env.backendUrl}/users`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "name": username, "email": email, "password": password })
      });

      result = await rawResponse.json();
      return result;
    } catch(e) {
      throw error(rawResponse);
    }
  },

  getUserById: async (userId, authToken) => {
    let rawResponse;
    let result;
    try {
      rawResponse = await fetch(`${env.backendUrl}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        }
      });

      result = await rawResponse.json();
      return result;
    } catch(e) {
      throw error(rawResponse);
    }
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
  },

  getNewToken: async (userId, refreshToken) => {
    let rawResponse;
    let result;
    try {
      rawResponse = await fetch(`${env.backendUrl}/users/${userId}/tokens`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        }
      });

      result = await rawResponse.json();
      return result;
    } catch(e) {
      throw error(rawResponse);
    }
  },
}

export default userMethods;
