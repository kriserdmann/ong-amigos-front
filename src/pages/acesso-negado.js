import Layout from '../components/Layout';
import Link from 'next/link';

export default function AcessoNegado() {
  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-4">Acesso Negado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <Link href="/" className="text-primary-blue hover:underline">
        Voltar para a página inicial
      </Link>
    </Layout>
  );
}
