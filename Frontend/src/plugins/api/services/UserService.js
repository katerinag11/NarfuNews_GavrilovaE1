import axios from 'axios';

// ИСПРАВЛЕНО: используем относительный путь
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

class UserService {
  async getCurrentUser(recordId) {
    try {
      console.log('Запрос: /api/users/' + recordId);
      const response = await apiClient.get(`/users/${recordId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  }
}

export default new UserService();