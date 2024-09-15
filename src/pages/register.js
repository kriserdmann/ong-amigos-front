import Layout from '../components/Layout';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RegisterPage() {
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
        <h1 className="text-3xl font-semibold mb-4">Registro</h1>
        <RegisterForm />
      </div>
    </Layout>
  );
}
