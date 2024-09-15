import { useState, useEffect } from 'react';
import { volunteerService } from '../services/volunteerService';

export default function VolunteerForm({ volunteer, onVolunteerAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    availability: '',
    skills: '',
  });

  useEffect(() => {
    if (volunteer) {
      setFormData(volunteer);
    }
  }, [volunteer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newVolunteer = await volunteerService.addVolunteer(formData);
      if (onVolunteerAdded) {
        onVolunteerAdded(newVolunteer);
      }
      // Limpar o formulário após o envio bem-sucedido
      setFormData({
        name: '',
        email: '',
        phone: '',
        availability: '',
        skills: '',
      });
    } catch (error) {
      console.error('Erro ao adicionar voluntário:', error);
      // Você pode adicionar um estado para mostrar uma mensagem de erro ao usuário
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block mb-1">Telefone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="availability" className="block mb-1">Disponibilidade</label>
        <input
          type="text"
          id="availability"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="skills" className="block mb-1">Habilidades</label>
        <textarea
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        ></textarea>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Cadastrar
        </button>
      </div>
    </form>
  );
}
