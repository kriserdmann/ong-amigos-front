import { useState, useEffect } from 'react';
import { volunteerService } from '../services/volunteerService';
import VolunteerForm from './VolunteerForm';
import VolunteerDetails from './VolunteerDetails';

export default function VolunteerList() {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [error, setError] = useState(null);
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);
  const [isAddingVolunteer, setIsAddingVolunteer] = useState(false);

  useEffect(() => {
    fetchVolunteers();
  }, [updateTrigger]);

  useEffect(() => {
    filterAndSortVolunteers();
  }, [volunteers, searchTerm, statusFilter, sortField, sortDirection]);

  async function fetchVolunteers() {
    try {
      const fetchedVolunteers = await volunteerService.getVolunteers();
      setVolunteers(fetchedVolunteers);
      setError(null);
    } catch (error) {
      console.error('Erro ao buscar voluntários:', error);
      setError('Erro ao carregar voluntários. Por favor, tente novamente.');
    }
  }

  function filterAndSortVolunteers() {
    let filtered = volunteers.filter(volunteer => 
      (volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       volunteer.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
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
      setUpdateTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Erro ao aprovar voluntário:', error);
      setError('Erro ao aprovar voluntário. Por favor, tente novamente.');
    }
  }

  async function handleReject(id) {
    try {
      await volunteerService.rejectVolunteer(id);
      setUpdateTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Erro ao rejeitar voluntário:', error);
      setError('Erro ao rejeitar voluntário. Por favor, tente novamente.');
    }
  }

  async function handleEdit(volunteer) {
    setEditingVolunteer(volunteer);
  }

  async function handleUpdate(updatedVolunteer) {
    try {
      await volunteerService.updateVolunteer(updatedVolunteer);
      setEditingVolunteer(null);
      setUpdateTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Erro ao atualizar voluntário:', error);
      setError('Erro ao atualizar voluntário. Por favor, tente novamente.');
    }
  }

  async function handleAddVolunteer(newVolunteer) {
    try {
      await volunteerService.addVolunteer(newVolunteer);
      setIsAddingVolunteer(false);
      setUpdateTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Erro ao adicionar voluntário:', error);
      setError('Erro ao adicionar voluntário. Por favor, tente novamente.');
    }
  }

  function handleViewDetails(id) {
    setSelectedVolunteerId(id);
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (selectedVolunteerId) {
    return (
      <VolunteerDetails
        volunteerId={selectedVolunteerId}
        onClose={() => setSelectedVolunteerId(null)}
      />
    );
  }

  if (editingVolunteer) {
    return (
      <VolunteerForm
        volunteer={editingVolunteer}
        onSubmit={handleUpdate}
        onCancel={() => setEditingVolunteer(null)}
      />
    );
  }

  if (isAddingVolunteer) {
    return (
      <VolunteerForm
        onSubmit={handleAddVolunteer}
        onCancel={() => setIsAddingVolunteer(false)}
      />
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Voluntários</h2>
      <button
        onClick={() => setIsAddingVolunteer(true)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Adicionar Voluntário
      </button>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Pesquisar por nome ou e-mail"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded"
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
                E-mail {sortField === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="py-2 px-4 border-b text-left">Telefone</th>
              <th className="py-2 px-4 border-b text-left">Disponibilidade</th>
              <th className="py-2 px-4 border-b text-left">Habilidades</th>
              <th className="py-2 px-4 border-b text-left cursor-pointer" onClick={() => handleSort('status')}>
                Status {sortField === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="py-2 px-4 border-b text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredVolunteers.map((volunteer) => (
              <tr key={volunteer.id}>
                <td className="py-2 px-4 border-b">{volunteer.name}</td>
                <td className="py-2 px-4 border-b">{volunteer.email}</td>
                <td className="py-2 px-4 border-b">{volunteer.phone}</td>
                <td className="py-2 px-4 border-b">{volunteer.availability}</td>
                <td className="py-2 px-4 border-b">{volunteer.skills}</td>
                <td className="py-2 px-4 border-b">{volunteer.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleViewDetails(volunteer.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Ver Detalhes
                  </button>
                  <button
                    onClick={() => handleEdit(volunteer)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  {volunteer.status === 'Pendente' && (
                    <>
                      <button
                        onClick={() => handleApprove(volunteer.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={() => handleReject(volunteer.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
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
    </div>
  );
}