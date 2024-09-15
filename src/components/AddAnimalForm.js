import { useState } from 'react';
import { animalService } from '../services/animalService';

export default function AddAnimalForm({ onAnimalAdded }) {
  const [animal, setAnimal] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    description: '',
    status: 'Disponível',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAnimal({ ...animal, imageUrl: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await animalService.addAnimal(animal);
      onAnimalAdded();
      setAnimal({
        name: '',
        species: '',
        breed: '',
        age: '',
        description: '',
        status: 'Disponível',
        imageUrl: ''
      });
    } catch (error) {
      console.error('Erro ao adicionar animal:', error);
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
          value={animal.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="species" className="block mb-1">Espécie</label>
        <input
          type="text"
          id="species"
          name="species"
          value={animal.species}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="breed" className="block mb-1">Raça</label>
        <input
          type="text"
          id="breed"
          name="breed"
          value={animal.breed}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="age" className="block mb-1">Idade</label>
        <input
          type="number"
          id="age"
          name="age"
          value={animal.age}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1">Descrição</label>
        <textarea
          id="description"
          name="description"
          value={animal.description}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        ></textarea>
      </div>
      <div>
        <label htmlFor="status" className="block mb-1">Status</label>
        <select
          id="status"
          name="status"
          value={animal.status}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Disponível">Disponível</option>
          <option value="Adotado">Adotado</option>
          <option value="Em tratamento">Em tratamento</option>
        </select>
      </div>
      <div>
        <label htmlFor="image" className="block mb-1">Foto do Animal</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageUpload}
          accept="image/*"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      {animal.imageUrl && (
        <div>
          <img src={animal.imageUrl} alt="Preview" className="w-32 h-32 object-cover" />
        </div>
      )}
      <button type="submit" className="btn-primary w-full">Adicionar Animal</button>
    </form>
  );
}
