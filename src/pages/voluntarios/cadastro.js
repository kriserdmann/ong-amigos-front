import { useState } from 'react';
import Layout from '../../components/Layout';
import VolunteerForm from '../../components/VolunteerForm';

export default function VolunteerRegistrationPage() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleVolunteerAdded = (newVolunteer) => {
    console.log('Novo voluntário cadastrado:', newVolunteer);
    setRegistrationSuccess(true);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Cadastro de Voluntários</h1>
        <p className="mb-4">Junte-se à nossa equipe de voluntários e faça a diferença na vida dos animais!</p>
        {registrationSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Sucesso!</strong>
            <span className="block sm:inline"> Seu cadastro foi realizado com sucesso. Entraremos em contato em breve.</span>
          </div>
        ) : (
          <VolunteerForm onVolunteerAdded={handleVolunteerAdded} />
        )}
      </div>
    </Layout>
  );
}
