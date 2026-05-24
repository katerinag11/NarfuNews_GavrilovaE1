import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3010/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

class UserService {
  async getCurrentUser(recordId) {
    try {
      console.log('Запрос пользователя:', `http://localhost:3010/api/users/${recordId}`);
      const response = await apiClient.get(`/users/${recordId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  }
}

export default new UserService();