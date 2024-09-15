import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (adminOnly && user.role !== 'admin') {
        router.push('/acesso-negado');
      }
    }
  }, [user, loading, router, adminOnly]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user || (adminOnly && user.role !== 'admin')) {
    return null;
  }

  return children;
}
