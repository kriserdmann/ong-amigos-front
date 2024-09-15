import axios from 'axios';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.get('/api/users');
      const users = response.data;
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      throw error;
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await axios.post('/api/users', { name, email, password, role: 'volunteer' });
      const newUser = response.data;
      const { password: _, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error('E-mail já cadastrado');
      }
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const response = await axios.get('/api/users');
      return response.data.map(({ password, ...user }) => user);
    } catch (error) {
      throw error;
    }
  }
};
