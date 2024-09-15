import { useState, useEffect } from 'react';
import { animalService } from '../services/animalService';
import Link from 'next/link';

export default function AvailableAnimals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    async function fetchAnimals() {
      const allAnimals = await animalService.getAnimals();
      const availableAnimals = allAnimals.filter(animal => animal.status === 'Disponível');
      setAnimals(availableAnimals);
    }
    fetchAnimals();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Animais Disponíveis para Adoção</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {animals.map(animal => (
          <div key={animal.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={animal.imageUrl} alt={animal.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{animal.name}</h3>
              <p>{animal.species} - {animal.breed}</p>
              <p>Idade: {animal.age} anos</p>
              <Link href={`/animais/${animal.id}`} className="mt-2 inline-block text-primary-blue hover:underline">
                Ver detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
