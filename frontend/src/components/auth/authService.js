const API_BASE_URL = 'http://localhost:3000/api/auth';

/**
 * Сервис для работы с API авторизации
 */
export const authService = {
  /**
   * Авторизация пользователя
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} - { success, data, message }
   */
  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    return await response.json();
  },

  /**
   * Регистрация пользователя
   * @param {Object} userData - данные пользователя
   * @returns {Promise<Object>} - { success, data, message }
   */
  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    return await response.json();
  },

  /**
   * Сохранение данных пользователя в localStorage
   * @param {Object} authData - { token, user }
   */
  saveAuthData(authData) {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
  }
};
