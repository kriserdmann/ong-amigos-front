import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Login</h1>
        <LoginForm />
      </div>
    </Layout>
  );
}
