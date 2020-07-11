/* eslint-disable class-methods-use-this */
import authorization from './authorization.service';
import sessionExpired from '../utils/sessionExpired.utils';
import cookie from '../utils/cookie.utils';
import users from './users.service';
import usersSettings from './usersSettings.service';
import usersAggregatedWords from './usersAggregatedWords.service';
import usersWords from './usersWords.service';
import usersStatistic from './usersStatistic.service';
import words from './words.service';

export default class Backend {
  constructor() {
    this.userId = '';
    this.authToken = '';
    this.refreshToken = '';
    this.init();
  }

  init() {
    const userId = cookie.getCookie('userId');
    const authToken = cookie.getCookie('authToken');
    if (userId && authToken) {
      this.userId = userId;
      this.authToken = authToken;
    }
  }

  async signIn(email, password) {
    try {
      const result = await authorization.getToken(email, password);
      this.userId = result.userId;
      this.authToken = result.token;
      this.refreshToken = result.refreshToken;
      cookie.setCookie('userId', this.userId);
      cookie.setCookie('authToken', this.authToken);
      console.log(this.userId, this.authToken, this.refreshToken)
    } catch(e) {
      throw new Error (e);
    }
  }

  async getNewToken() {
    try {
      const result = await users.getNewToken(this.userId, this.refreshToken);
      this.userId = result.userId;
      this.authToken = result.token;
      this.refreshToken = result.refreshToken;
      return result;
    } catch(e) {
      throw new Error (e);
    }
  }

  async registerUser(username, email, password) {
    try {
      const result = users.registerUser(username, email, password)
      return result;
    } catch(e) {
      return e;
    }
  }

  async getUserById() {
    try {
      const result = await users.getUserById(this.userId, this.authToken);
      return result;
    } catch(e) {
      const result = [401, 403].includes(e.status)
      ? await sessionExpired(this, 'getUserById')
      : e;
      return result;
    }
  }

  async updateUser(data) {
    try {
      const result = await users.updateUser(this.userId, this.authToken, data);
      return result;
    } catch(e) {
      const result = [401, 403].includes(e.status)
      ? await sessionExpired(this, 'updateUser', data)
      : e;
      return result;
    }
  }

  async getUserSettings() {
    try {
      const result = await usersSettings.getUserSettings(this.userId, this.authToken);
      return result;
    } catch(e) {
      const result = [401, 403].includes(e.status)
      ? await sessionExpired(this, 'getUserSettings')
      : e;
      return result;
    }
  }

  async setUserSettings(data) {
    try {
      const result = await usersSettings.setUserSettings(this.userId, this.authToken, data);
      return result;
    } catch(e) {
      const result = [401, 403].includes(e.status)
      ? await sessionExpired(this, 'setUserSettings', data)
      : e;
      return result;
    }
  }

  async getUserStatistics() {
    try {
      const result = await usersStatistic.getUserStatistics(this.userId, this.authToken);
      return result;
    } catch(e) {
      const result = [401, 403].includes(e.status)
      ? await sessionExpired(this, 'getUserStatistics')
      : e;
      return result;
    }
  }

  async setUserStatistics(data) {
    try {
      const result = await usersStatistic.setUserStatistics(this.userId, this.authToken, data);
      return result;
    } catch(e) {
      const result = [401, 403].includes(e.status)
      ? await sessionExpired(this, 'setUserStatistics', data)
      : e;
      return result;
    }
  }

  async getUsersWords() {
    try {
      const result = await usersWords.getUsersWords(this.userId, this.authToken);
      return result;
    } catch(e) {
      const result = [401, 403].includes(e.status)
      ? await sessionExpired(this, 'getUsersWords')
      : e;
      return result;
    }
  }

  async getUsersWordsById(wordId) {
    try {
      const result = await usersWords.getUsersWordsById(this.userId, this.authToken, wordId);
      return result;
    } catch(e) {
      const result = [401, 403].includes(e.status)
      ? await sessionExpired(this, 'getUsersWordsById', wordId)
      : e;
      return result;
    }
  }

  async setUsersWords(data) {
    try {
      const result = await usersWords.setUsersWords(this.userId, this.authToken, data);
      return result;
    } catch(e) {
      const result = [401, 403].includes(e.status)
      ? await sessionExpired(this, 'setUsersWords', data)
      : e;
    return result;
    }
  }

  async updateUsersWords(data) {
    try {
      const result = await usersWords.updateUsersWords(this.userId, this.authToken, data);
      return result;
    } catch(e) {
      const result = [401, 403].includes(e.status)
        ? await sessionExpired(this, 'updateUsersWords', data)
        : e;
      return result;
    }
  }

  async deleteUsersWordsById(wordId) {
    try {
      const result = await usersWords.deleteUsersWordsById(this.userId, this.authToken, wordId);
      return result;
    } catch(e) {
      const result = [401, 403].includes(e.status)
        ? await sessionExpired(this, 'deleteUsersWordsById', wordId)
        : e;
      return result;
    }
  }

  async getUsersAggregatedWordsWithFilters(data) {
    try {
      const result = await usersAggregatedWords.getUsersAggregatedWordsWithFilters(this.userId, this.authToken, data);
      return result;
    } catch(e) {
      const result = [401, 403].includes(e.status)
      ? await sessionExpired(this, 'getUsersAggregatedWordsWithFilters', data)
      : e;
      return result;
    }
  }

  async getUsersAggregatedWordsById(id) {
    try {
      const result = await usersAggregatedWords.getUsersAggregatedWordsById(this.userId, this.authToken, id);
      return result;
    } catch(e) {
      const result = [401, 403].includes(e.status)
      ? await sessionExpired(this, 'getUsersAggregatedWordsById', id)
      : e;
    return result;
    }
  }

  async getWordsWithFilters(data) {
      return words.getWordsWithFilters(data);
  }

  async getWordsCount(data) {
      return words.getWordsCount(data);
  }

  async getWordsById(id) {
      return words.getWordsById(id);
  }
}
