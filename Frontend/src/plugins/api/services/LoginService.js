import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',  
  headers: {
    'Content-Type': 'application/json',
  },
});

class LoginService {
  async authorizationUser(email, password) {
    try {
      console.log('Отправка на: /api/login');
      const response = await apiClient.post('/login', {
        login: email,
        password: password
      });
      
      console.log('Ответ:', response.data);
      
      if (response.data.success) {
        return {
          userId: response.data.recordId,
          user: response.data.user
        };
      }
      throw new Error(response.data.message);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async registerUser(userData) {
    try {
      const response = await apiClient.post('/login/register', {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        lastName: userData.lastName,
        secondName: userData.secondName || ''
      });
      
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }
}

export default new LoginService();