import AdminLayout from '../../components/AdminLayout';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminDashboard from '../../components/AdminDashboard';
import Link from 'next/link';

function AdminCard({ title, link }) {
  return (
    <Link href={link} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">Clique para gerenciar</p>
    </Link>
  );
}

function AdminPanel() {
  return (
    <AdminLayout currentPage="dashboard">
      <AdminDashboard />
      <h1 className="text-3xl font-semibold mb-6">Painel de Administração</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminCard title="Gerenciar Animais" link="/admin/animais" />
        <AdminCard title="Gerenciar Voluntários" link="/admin/voluntarios" />
        <AdminCard title="Gerenciar Doações" link="/admin/doacoes" />
        <AdminCard title="Gerenciar Eventos" link="/admin/eventos" />
        <AdminCard title="Gerenciar Usuários" link="/admin/usuarios" />
      </div>
    </AdminLayout>
  );
}

export default function ProtectedAdminPanel() {
  return (
    <ProtectedRoute adminOnly>
      <AdminPanel />
    </ProtectedRoute>
  );
}
