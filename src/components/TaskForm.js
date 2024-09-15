import { useState } from 'react';

export default function TaskForm({ onSubmit, onCancel }) {
  const [task, setTask] = useState({ description: '', dueDate: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="description" className="block mb-1">Descrição da Tarefa</label>
        <input
          type="text"
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="dueDate" className="block mb-1">Data de Conclusão</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Adicionar Tarefa
        </button>
      </div>
    </form>
  );
}
