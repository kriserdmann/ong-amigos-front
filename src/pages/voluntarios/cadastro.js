import Layout from '../../components/Layout';
import VolunteerForm from '../../components/VolunteerForm';

export default function VolunteerRegistrationPage() {
  const handleVolunteerAdded = () => {
    // Você pode adicionar lógica adicional aqui, se necessário
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Cadastro de Voluntários</h1>
        <p className="mb-4">Junte-se à nossa equipe de voluntários e faça a diferença na vida dos animais!</p>
        <VolunteerForm onVolunteerAdded={handleVolunteerAdded} />
      </div>
    </Layout>
  );
}
