import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/AdminLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { volunteerService } from '../../../services/volunteerService';
import Link from 'next/link';

function VolunteerDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedVolunteer, setEditedVolunteer] = useState(null);
  const [newTask, setNewTask] = useState({ description: '', dueDate: '' });

  useEffect(() => {
    if (id) {
      fetchVolunteerDetails();
    }
  }, [id]);

  async function fetchVolunteerDetails() {
    try {
      const data = await volunteerService.getVolunteerById(id);
      setVolunteer(data);
      setEditedVolunteer(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar detalhes do voluntário:', error);
      setError('Erro ao carregar detalhes do voluntário. Por favor, tente novamente.');
      setLoading(false);
    }
  }

  async function handleUpdate() {
    try {
      const updatedVolunteer = await volunteerService.updateVolunteer(editedVolunteer);
      setVolunteer(updatedVolunteer);
      setIsEditing(false);
      await volunteerService.addActivityLog(id, 'Informações atualizadas', 'Detalhes do voluntário foram atualizados');
    } catch (error) {
      console.error('Erro ao atualizar voluntário:', error);
      setError('Erro ao atualizar voluntário. Por favor, tente novamente.');
    }
  }

  async function handleAddTask(e) {
    e.preventDefault();
    try {
      const updatedVolunteer = await volunteerService.addTask(id, newTask);
      setVolunteer(updatedVolunteer);
      setNewTask({ description: '', dueDate: '' });
      await volunteerService.addActivityLog(id, 'Tarefa adicionada', `Nova tarefa: ${newTask.description}`);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      setError('Erro ao adicionar tarefa. Por favor, tente novamente.');
    }
  }

  async function handleUpdateTaskStatus(taskId, newStatus) {
    try {
      const updatedVolunteer = await volunteerService.updateTaskStatus(id, taskId, newStatus);
      setVolunteer(updatedVolunteer);
      await volunteerService.addActivityLog(id, 'Status da tarefa atualizado', `Tarefa ${taskId} atualizada para ${newStatus}`);
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
      setError('Erro ao atualizar status da tarefa. Por favor, tente novamente.');
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-200 text-yellow-800';
      case 'Em andamento':
        return 'bg-blue-200 text-blue-800';
      case 'Concluída':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  }

  if (loading) return <AdminLayout currentPage="voluntarios"><div>Carregando...</div></AdminLayout>;
  if (error) return <AdminLayout currentPage="voluntarios"><div>{error}</div></AdminLayout>;
  if (!volunteer) return <AdminLayout currentPage="voluntarios"><div>Voluntário não encontrado</div></AdminLayout>;

  return (
    <AdminLayout currentPage="voluntarios">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6">Detalhes do Voluntário</h1>
        {isEditing ? (
          <div className="mb-4">
            <input
              type="text"
              value={editedVolunteer.name}
              onChange={(e) => setEditedVolunteer({...editedVolunteer, name: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="email"
              value={editedVolunteer.email}
              onChange={(e) => setEditedVolunteer({...editedVolunteer, email: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="tel"
              value={editedVolunteer.phone}
              onChange={(e) => setEditedVolunteer({...editedVolunteer, phone: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              value={editedVolunteer.skills}
              onChange={(e) => setEditedVolunteer({...editedVolunteer, skills: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              value={editedVolunteer.availability}
              onChange={(e) => setEditedVolunteer({...editedVolunteer, availability: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
            />
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-black px-4 py-2 rounded ml-2">Cancelar</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-semibold">Nome:</p>
              <p>{volunteer.name}</p>
            </div>
            <div>
              <p className="font-semibold">E-mail:</p>
              <p>{volunteer.email}</p>
            </div>
            <div>
              <p className="font-semibold">Telefone:</p>
              <p>{volunteer.phone}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p>{volunteer.status}</p>
            </div>
            <div>
              <p className="font-semibold">Habilidades:</p>
              <p>{volunteer.skills}</p>
            </div>
            <div>
              <p className="font-semibold">Disponibilidade:</p>
              <p>{volunteer.availability}</p>
            </div>
          </div>
        )}
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-2 rounded mb-4">Editar Informações</button>
        )}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Tarefas</h2>
          {volunteer.tasks && volunteer.tasks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Descrição</th>
                    <th className="py-2 px-4 border-b text-left">Prazo</th>
                    <th className="py-2 px-4 border-b text-left">Status</th>
                    <th className="py-2 px-4 border-b text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteer.tasks.map(task => (
                    <tr key={task.id}>
                      <td className="py-2 px-4 border-b">{task.description}</td>
                      <td className="py-2 px-4 border-b">{task.dueDate}</td>
                      <td className="py-2 px-4 border-b">
                        <span className={`px-2 py-1 rounded ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <select
                          value={task.status}
                          onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                          className="p-1 border rounded"
                        >
                          <option value="Pendente">Pendente</option>
                          <option value="Em andamento">Em andamento</option>
                          <option value="Concluída">Concluída</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Nenhuma tarefa atribuída.</p>
          )}
          <form onSubmit={handleAddTask} className="mt-4">
            <input
              type="text"
              placeholder="Descrição da tarefa"
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Adicionar Tarefa</button>
          </form>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Histórico de Atividades</h2>
          {volunteer.activityLog && volunteer.activityLog.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Data</th>
                    <th className="py-2 px-4 border-b text-left">Ação</th>
                    <th className="py-2 px-4 border-b text-left">Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteer.activityLog.map(activity => (
                    <tr key={activity.id}>
                      <td className="py-2 px-4 border-b">{new Date(activity.date).toLocaleString()}</td>
                      <td className="py-2 px-4 border-b">{activity.action}</td>
                      <td className="py-2 px-4 border-b">{activity.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Nenhuma atividade registrada.</p>
          )}
        </div>
        <div className="mt-6">
          <Link href="/admin/voluntarios" className="text-blue-500 hover:underline">
            Voltar para a lista de voluntários
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function ProtectedVolunteerDetails() {
  return (
    <ProtectedRoute adminOnly>
      <VolunteerDetails />
    </ProtectedRoute>
  );
}
