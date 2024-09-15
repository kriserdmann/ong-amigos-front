import { useState, useEffect } from 'react';
import { volunteerService } from '../services/volunteerService';
import VolunteerForm from './VolunteerForm';
import TaskForm from './TaskForm';
import ActivityLog from './ActivityLog';

export default function VolunteerDetails({ volunteerId, onClose }) {
  const [volunteer, setVolunteer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [error, setError] = useState(null);
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    fetchVolunteerDetails();
    fetchActivityLog();
  }, [volunteerId]);

  async function fetchVolunteerDetails() {
    try {
      const fetchedVolunteer = await volunteerService.getVolunteerById(volunteerId);
      setVolunteer(fetchedVolunteer);
      setError(null);
    } catch (error) {
      console.error('Erro ao buscar detalhes do voluntário:', error);
      setError('Erro ao carregar detalhes do voluntário. Por favor, tente novamente.');
    }
  }

  async function fetchActivityLog() {
    try {
      const log = await volunteerService.getActivityLog(volunteerId);
      setActivityLog(log);
    } catch (error) {
      console.error('Erro ao buscar histórico de atividades:', error);
    }
  }

  async function handleUpdate(updatedVolunteer) {
    try {
      const result = await volunteerService.updateVolunteer(updatedVolunteer);
      setVolunteer(result);
      setIsEditing(false);
      setError(null);
      await volunteerService.addActivityLog(volunteerId, "Informações atualizadas", "Detalhes do voluntário foram atualizados");
      fetchActivityLog();
    } catch (error) {
      console.error('Erro ao atualizar voluntário:', error);
      setError('Erro ao atualizar voluntário. Por favor, tente novamente.');
    }
  }

  async function handleAddTask(newTask) {
    try {
      const updatedVolunteer = await volunteerService.addTask(volunteerId, newTask);
      setVolunteer(updatedVolunteer);
      setIsAddingTask(false);
      setError(null);
      await volunteerService.addActivityLog(volunteerId, "Tarefa adicionada", `Nova tarefa: ${newTask.description}`);
      fetchActivityLog();
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      setError('Erro ao adicionar tarefa. Por favor, tente novamente.');
    }
  }

  async function handleUpdateTaskStatus(taskId, newStatus) {
    try {
      const updatedVolunteer = await volunteerService.updateTaskStatus(volunteerId, taskId, newStatus);
      setVolunteer(updatedVolunteer);
      setError(null);
      await volunteerService.addActivityLog(volunteerId, "Status da tarefa atualizado", `Tarefa ${taskId} atualizada para ${newStatus}`);
      fetchActivityLog();
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

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!volunteer) {
    return <div>Carregando...</div>;
  }

  if (isEditing) {
    return (
      <VolunteerForm
        volunteer={volunteer}
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  if (isAddingTask) {
    return (
      <TaskForm
        onSubmit={handleAddTask}
        onCancel={() => setIsAddingTask(false)}
      />
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Detalhes do Voluntário</h2>
      <div className="grid grid-cols-2 gap-4">
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
          <p className="font-semibold">Disponibilidade:</p>
          <p>{volunteer.availability}</p>
        </div>
        <div>
          <p className="font-semibold">Habilidades:</p>
          <p>{volunteer.skills}</p>
        </div>
        <div>
          <p className="font-semibold">Status:</p>
          <p>{volunteer.status}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Tarefas</h3>
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
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
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
        <button
          onClick={() => setIsAddingTask(true)}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Adicionar Tarefa
        </button>
      </div>
      <ActivityLog activities={activityLog} />
      <div className="mt-6 flex justify-end space-x-2">
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Editar
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
