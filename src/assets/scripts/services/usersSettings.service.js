import env from '../constants/env.conf';
import error from '../utils/error.utils';

const usersSettings = {
  getUserSettings: async (userId, authToken) => {
    let rawResponse;
    let result;

    try {
      rawResponse = await fetch(`${env.backendUrl}/users/${userId}/settings`, {
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

  setUserSettings: async (userId, authToken, data) => {
    let rawResponse;
    let result;
    const oldSettings = await usersSettings.getUserSetttings(userId, authToken);
    const newSettings = {...oldSettings, ...data};
    delete newSettings.id;

    try {
      rawResponse = await fetch(`${env.backendUrl}/users/${userId}/settings`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(newSettings)
      });

      result = await rawResponse.json();
      return result;
    } catch(e) {
      throw error(rawResponse);
    }
  }
}

export default usersSettings;
