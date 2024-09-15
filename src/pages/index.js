import Layout from '../components/Layout';
import AvailableAnimals from '../components/AvailableAnimals';

export default function HomePage() {
  return (
    <Layout>
      <h1 className="text-4xl font-semibold mb-4">Bem-vindo à ONG Amigos dos Animais</h1>
      <p className="mb-4">Ajudando animais necessitados desde 2023.</p>
      <div className="space-x-4 mb-8">
        <button className="btn-primary">Doar Agora</button>
        <button className="btn-secondary">Voluntariar</button>
      </div>
      <AvailableAnimals />
    </Layout>
  );
}
