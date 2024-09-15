import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { animalService } from '../../services/animalService';

export default function AnimalDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchAnimal() {
        const fetchedAnimal = await animalService.getAnimal(id);
        setAnimal(fetchedAnimal);
      }
      fetchAnimal();
    }
  }, [id]);

  if (!animal) {
    return <Layout><div>Carregando...</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">{animal.name}</h1>
        <img src={animal.imageUrl} alt={animal.name} className="w-full h-64 object-cover mb-4 rounded-lg" />
        <p><strong>Espécie:</strong> {animal.species}</p>
        <p><strong>Raça:</strong> {animal.breed}</p>
        <p><strong>Idade:</strong> {animal.age} anos</p>
        <p><strong>Status:</strong> {animal.status}</p>
        <p className="mt-4">{animal.description}</p>
        <button className="btn-primary mt-4">Solicitar Adoção</button>
      </div>
    </Layout>
  );
}
