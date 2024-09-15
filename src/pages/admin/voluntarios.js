import AdminLayout from '../../components/AdminLayout';
import VolunteerList from '../../components/VolunteerList';
import ProtectedRoute from '../../components/ProtectedRoute';

function AdminVolunteersPage() {
  return (
    <AdminLayout currentPage="voluntários">
      <h1 className="text-3xl font-semibold mb-4">Gerenciamento de Voluntários</h1>
      <VolunteerList />
    </AdminLayout>
  );
}

export default function ProtectedAdminVolunteersPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminVolunteersPage />
    </ProtectedRoute>
  );
}
