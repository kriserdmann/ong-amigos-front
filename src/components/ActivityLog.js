import React from 'react';

export default function ActivityLog({ activities }) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Histórico de Atividades</h3>
      {activities && activities.length > 0 ? (
        <ul className="space-y-2">
          {activities.map(activity => (
            <li key={activity.id} className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleString()}</p>
              <p className="font-semibold">{activity.action}</p>
              <p className="text-sm">{activity.details}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma atividade registrada.</p>
      )}
    </div>
  );
}
