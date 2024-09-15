import { useState, useEffect } from 'react';
import { animalService } from '../services/animalService';

export default function AnimalList() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    async function fetchAnimals() {
      const fetchedAnimals = await animalService.getAnimals();
      setAnimals(fetchedAnimals);
    }
    fetchAnimals();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Lista de Animais</h2>
      <ul className="space-y-4">
        {animals.map(animal => (
          <li key={animal.id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{animal.name}</h3>
            <p>Espécie: {animal.species}</p>
            <p>Raça: {animal.breed}</p>
            <p>Idade: {animal.age} anos</p>
            <p>Status: {animal.status}</p>
            <p>{animal.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
