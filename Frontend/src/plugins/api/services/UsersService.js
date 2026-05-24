import axios from 'axios';

const apiClient = axios.create({ baseURL: '/api', headers: { 'Content-Type': 'application/json' } });

class UserService {
  async getCurrentUser(recordId) {
    const response = await apiClient.get(`/users/${recordId}`);
    return response.data;
  }
}
export default new UserService();