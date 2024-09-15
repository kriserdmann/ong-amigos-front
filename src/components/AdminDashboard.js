import React, { useState, useEffect } from 'react';
import { volunteerService } from '../services/volunteerService';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVolunteers: 0,
    approvedVolunteers: 0,
    pendingVolunteers: 0,
    rejectedVolunteers: 0,
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const volunteers = await volunteerService.getVolunteers();
      const stats = calculateStats(volunteers);
      setStats(stats);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  }

  function calculateStats(volunteers) {
    const stats = {
      totalVolunteers: volunteers.length,
      approvedVolunteers: 0,
      pendingVolunteers: 0,
      rejectedVolunteers: 0,
      totalTasks: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
      completedTasks: 0,
    };

    volunteers.forEach(volunteer => {
      switch (volunteer.status) {
        case 'Aprovado':
          stats.approvedVolunteers++;
          break;
        case 'Pendente':
          stats.pendingVolunteers++;
          break;
        case 'Rejeitado':
          stats.rejectedVolunteers++;
          break;
      }

      if (volunteer.tasks) {
        stats.totalTasks += volunteer.tasks.length;
        volunteer.tasks.forEach(task => {
          switch (task.status) {
            case 'Pendente':
              stats.pendingTasks++;
              break;
            case 'Em andamento':
              stats.inProgressTasks++;
              break;
            case 'Concluída':
              stats.completedTasks++;
              break;
          }
        });
      }
    });

    return stats;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Total de Voluntários</h3>
          <p className="text-3xl font-bold">{stats.totalVolunteers}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Voluntários Aprovados</h3>
          <p className="text-3xl font-bold">{stats.approvedVolunteers}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Voluntários Pendentes</h3>
          <p className="text-3xl font-bold">{stats.pendingVolunteers}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Voluntários Rejeitados</h3>
          <p className="text-3xl font-bold">{stats.rejectedVolunteers}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Total de Tarefas</h3>
          <p className="text-3xl font-bold">{stats.totalTasks}</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Tarefas Pendentes</h3>
          <p className="text-3xl font-bold">{stats.pendingTasks}</p>
        </div>
        <div className="bg-pink-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Tarefas em Andamento</h3>
          <p className="text-3xl font-bold">{stats.inProgressTasks}</p>
        </div>
        <div className="bg-teal-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Tarefas Concluídas</h3>
          <p className="text-3xl font-bold">{stats.completedTasks}</p>
        </div>
      </div>
    </div>
  );
}
