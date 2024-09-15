import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { authService } from '../services/authService';

export default function DebugUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = await authService.getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-4">Usuários Cadastrados</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} className="mb-2">
            {user.name} - {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </Layout>
  );
}
