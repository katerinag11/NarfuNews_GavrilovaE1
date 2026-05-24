import axios from 'axios';

const apiClient = axios.create({ baseURL: '/api', headers: { 'Content-Type': 'application/json' } });

class LoginService {
  async authorizationUser(email, password) {
    const response = await apiClient.post('/login', { login: email, password: password });
    if (response.data.success) return { userId: response.data.recordId, user: response.data.user };
    throw new Error(response.data.message);
  }
  async registerUser(userData) {
    const response = await apiClient.post('/login/register', {
      email: userData.email, password: userData.password, name: userData.name,
      lastName: userData.lastName, secondName: userData.secondName || ''
    });
    return response.data;
  }
}
export default new LoginService();