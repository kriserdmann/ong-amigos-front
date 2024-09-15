import { useState } from 'react';
import Layout from '../components/Layout';
import AnimalList from '../components/AnimalList';
import AddAnimalForm from '../components/AddAnimalForm';
import ProtectedRoute from '../components/ProtectedRoute';

function AnimaisPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAnimalAdded = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-4">Gerenciamento de Animais</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Adicionar Novo Animal</h2>
          <AddAnimalForm onAnimalAdded={handleAnimalAdded} />
        </div>
        <div>
          <AnimalList key={refreshKey} />
        </div>
      </div>
    </Layout>
  );
}

export default function ProtectedAnimaisPage() {
  return (
    <ProtectedRoute>
      <AnimaisPage />
    </ProtectedRoute>
  );
}
