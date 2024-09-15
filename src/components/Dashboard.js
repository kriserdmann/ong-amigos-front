import React, { useState, useEffect } from 'react';
import { volunteerService } from '../services/volunteerService';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalVolunteers: 0,
    activeVolunteers: 0,
    pendingVolunteers: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const volunteers = await volunteerService.getVolunteers();
      const statistics = calculateStats(volunteers);
      setStats(statistics);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  }

  function calculateStats(volunteers) {
    const stats = {
      totalVolunteers: volunteers.length,
      activeVolunteers: 0,
      pendingVolunteers: 0,
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0
    };

    volunteers.forEach(volunteer => {
      if (volunteer.status === 'Aprovado') {
        stats.activeVolunteers++;
      } else if (volunteer.status === 'Pendente') {
        stats.pendingVolunteers++;
      }

      if (volunteer.tasks) {
        stats.totalTasks += volunteer.tasks.length;
        volunteer.tasks.forEach(task => {
          if (task.status === 'Concluída') {
            stats.completedTasks++;
          } else {
            stats.pendingTasks++;
          }
        });
      }
    });

    return stats;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Total de Voluntários</h3>
          <p className="text-3xl font-bold">{stats.totalVolunteers}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Voluntários Ativos</h3>
          <p className="text-3xl font-bold">{stats.activeVolunteers}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Voluntários Pendentes</h3>
          <p className="text-3xl font-bold">{stats.pendingVolunteers}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Total de Tarefas</h3>
          <p className="text-3xl font-bold">{stats.totalTasks}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Tarefas Concluídas</h3>
          <p className="text-3xl font-bold">{stats.completedTasks}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Tarefas Pendentes</h3>
          <p className="text-3xl font-bold">{stats.pendingTasks}</p>
        </div>
      </div>
    </div>
  );
}
