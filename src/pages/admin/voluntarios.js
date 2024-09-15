import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { volunteerService } from '../../services/volunteerService';
import Link from 'next/link';

function VolunteerList() {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  useEffect(() => {
    filterAndSortVolunteers();
  }, [volunteers, searchTerm, statusFilter, sortField, sortDirection]);

  async function fetchVolunteers() {
    try {
      const data = await volunteerService.getVolunteers();
      setVolunteers(data);
    } catch (error) {
      console.error('Erro ao buscar voluntários:', error);
      setError('Erro ao carregar voluntários. Por favor, tente novamente.');
    }
  }

  function filterAndSortVolunteers() {
    let filtered = volunteers.filter(volunteer => 
      (volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       volunteer.skills.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'Todos' || volunteer.status === statusFilter)
    );

    filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredVolunteers(filtered);
  }

  function handleSort(field) {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }

  async function handleApprove(id) {
    try {
      await volunteerService.approveVolunteer(id);
      fetchVolunteers(); // Atualiza a lista após aprovar
    } catch (error) {
      console.error('Erro ao aprovar voluntário:', error);
      setError('Erro ao aprovar voluntário. Por favor, tente novamente.');
    }
  }

  async function handleReject(id) {
    try {
      await volunteerService.rejectVolunteer(id);
      fetchVolunteers(); // Atualiza a lista após rejeitar
    } catch (error) {
      console.error('Erro ao rejeitar voluntário:', error);
      setError('Erro ao rejeitar voluntário. Por favor, tente novamente.');
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <AdminLayout currentPage="voluntarios">
      <h1 className="text-3xl font-semibold mb-6">Gerenciar Voluntários</h1>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Pesquisar por nome, email ou habilidades"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Todos">Todos os status</option>
          <option value="Pendente">Pendente</option>
          <option value="Aprovado">Aprovado</option>
          <option value="Rejeitado">Rejeitado</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left cursor-pointer" onClick={() => handleSort('name')}>
                Nome {sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="py-2 px-4 border-b text-left cursor-pointer" onClick={() => handleSort('email')}>
                Email {sortField === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="py-2 px-4 border-b text-left">Habilidades</th>
              <th className="py-2 px-4 border-b text-left cursor-pointer" onClick={() => handleSort('status')}>
                Status {sortField === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="py-2 px-4 border-b text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredVolunteers.map(volunteer => (
              <tr key={volunteer.id}>
                <td className="py-2 px-4 border-b">{volunteer.name}</td>
                <td className="py-2 px-4 border-b">{volunteer.email}</td>
                <td className="py-2 px-4 border-b">{volunteer.skills}</td>
                <td className="py-2 px-4 border-b">{volunteer.status}</td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/admin/voluntarios/${volunteer.id}`} className="text-blue-500 hover:underline mr-2">
                    Detalhes
                  </Link>
                  {volunteer.status === 'Pendente' && (
                    <>
                      <button
                        onClick={() => handleApprove(volunteer.id)}
                        className="text-green-500 hover:underline mr-2"
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={() => handleReject(volunteer.id)}
                        className="text-red-500 hover:underline"
                      >
                        Rejeitar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default function ProtectedVolunteerList() {
  return (
    <ProtectedRoute adminOnly>
      <VolunteerList />
    </ProtectedRoute>
  );
}
