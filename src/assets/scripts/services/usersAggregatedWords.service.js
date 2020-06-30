import env from '../constants/env.conf';
import error from '../utils/error.utils';

const usersAggregatedWords = {
  getUsersAggregatedWordsWithFilters: async (userId, authToken, data) => {
    let rawResponse;
    let result;
    const wordsPerPage = data.wordsPerPage ? `?wordsPerPage=${data.wordsPerPage}` : '';
    const groupWords = data.group ? `&group=${data.group}` : '';
    const filter = data.filter ? `&filter=${encodeURIComponent(JSON.stringify(data.filter))}` : '';

    try {
      rawResponse = await fetch(`${env.backendUrl}/users/${userId}/aggregatedWords${wordsPerPage}${groupWords}${filter}`, {
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

  getUsersAggregatedWordsById: async (userId, authToken, id) => {
    let rawResponse;
    let result;

    try {
      rawResponse = await fetch(`${env.backendUrl}/users/${userId}/aggregatedWords/${id}`, {
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
}

export default usersAggregatedWords;
