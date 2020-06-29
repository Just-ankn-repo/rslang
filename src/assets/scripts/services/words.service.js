import env from '../constants/env.conf';
import error from '../utils/error.utils';

const words = {
  getWordsWithFilters : async (data) => {
    let rawResponse;
    let result;
    const group = data.group ? `?group=${data.group}` : '';
    const page = data.page ? `&page=${data.page}` : '';
    const wordsPerExampleSentenceLTE = data.wordsPerExampleSentenceLTE
      ? `&wordsPerExampleSentenceLTE=${data.wordsPerExampleSentenceLTE}`
      : '';
    const wordsPerPage = data.wordsPerPage ? `&wordsPerPage=${data.wordsPerPage}` : '';

    try {
      rawResponse = await fetch(`${env.backendUrl}/words/${group}${page}${wordsPerExampleSentenceLTE}${wordsPerPage}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      result = await rawResponse.json();
      return result;
    } catch(e) {
      throw error(rawResponse);
    }
  },

  getWordsCount: async (data) => {
    let rawResponse;
    let result;
    const group = data.group ? `?group=${data.group}` : '';
    const wordsPerExampleSentenceLTE = data.wordsPerExampleSentenceLTE
      ? `&wordsPerExampleSentenceLTE=${data.wordsPerExampleSentenceLTE}`
      : '';
    const wordsPerPage = data.wordsPerPage ? `&wordsPerPage=${data.wordsPerPage}` : '';

    try {
      rawResponse = await fetch(`${env.backendUrl}/words/count${group}${wordsPerExampleSentenceLTE}${wordsPerPage}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      result = await rawResponse.json();
      return result;
    } catch(e) {
      throw error(rawResponse);
    }
  },

  getWordsById: async (id) => {
    let rawResponse;
    let result;

    try {
      rawResponse = await fetch(`${env.backendUrl}/words/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      result = await rawResponse.json();
      return result;
    } catch(e) {
      throw error(rawResponse);
    }
  },
}

export default words;
