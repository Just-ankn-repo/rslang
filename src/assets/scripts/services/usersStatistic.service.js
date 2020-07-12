import env from '../constants/env.conf';
import error from '../utils/error.utils';

const usersStatistics = {
  getUserStatistics: async (userId, authToken) => {
    let rawResponse;
    let result;

    try {
      rawResponse = await fetch(`${env.backendUrl}/users/${userId}/statistics`, {
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

  setUserStatistics: async (userId, authToken, data) => {
    let rawResponse;
    let result;
    const oldStatistics = await usersStatistics.getUserStatistics(userId, authToken);
    const newStatistics = {...oldStatistics, ...data};
    delete newStatistics.id;

    try {
      rawResponse = await fetch(`${env.backendUrl}/users/${userId}/statistics`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(newStatistics)
      });

      result = await rawResponse.json();
      return result;
    } catch(e) {
      throw error(rawResponse);
    }
  }
}

export default usersStatistics;
