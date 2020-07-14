import env from '../constants/env.conf';
import error from '../utils/error.utils';

const usersWords = {
  getUsersWords : async (userId, authToken) => {
    let rawResponse;
    let result;

    try {
      rawResponse = await fetch(`${env.backendUrl}/users/${userId}/words`, {
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

  getUsersWordsById: async (userId, authToken, wordId) => {
    let rawResponse;
    let result;

    try {
      rawResponse = await fetch(`${env.backendUrl}/users/${userId}/words/${wordId}`, {
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

  setUsersWords: async (userId, authToken, data) => {
    let rawResponse;
    let result;

    try {
      rawResponse = await fetch(`${env.backendUrl}/users/${userId}/words/${data.wordId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ "difficulty": data.difficulty, "optional": data.optional })
      });

      result = await rawResponse.json();
      return result;
    } catch(e) {
      throw error(rawResponse);
    }
  },

  updateUsersWords: async (userId, authToken, data) => {
    let rawResponse;
    let result;

    try {
      rawResponse = await fetch(`${env.backendUrl}/users/${userId}/words/${data.wordId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ "difficulty": data.difficulty, "optional": data.optional })
      });

      result = await rawResponse.json();
      return result;
    } catch(e) {
      throw error(rawResponse);
    }
  },

  deleteUsersWordsById: async (userId, authToken, wordId) => {
    let rawResponse;

    try {
      rawResponse = await fetch(`${env.backendUrl}/users/${userId}/words/${wordId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        }
      });

      return {
        status: rawResponse.status,
        message: rawResponse.message || '',
        deleted: true
      };
    } catch(e) {
      throw error(rawResponse);
    }
  }

}

export default usersWords;
