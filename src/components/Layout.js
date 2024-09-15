import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <>
      <Head>
        <title>ONG Amigos dos Animais</title>
        <meta name="description" content="ONG dedicada ao resgate e cuidado de animais" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-primary-blue text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold">
            Amigos dos Animais
          </Link>
          <ul className="flex space-x-4">
            <li><Link href="/animais" className="hover:text-primary-green">Animais</Link></li>
            <li><Link href="/voluntarios/cadastro" className="hover:text-primary-green">Seja Voluntário</Link></li>
            <li><Link href="/doacoes" className="hover:text-primary-green">Doações</Link></li>
            <li><Link href="/eventos" className="hover:text-primary-green">Eventos</Link></li>
            {user && user.role === 'admin' && (
              <li><Link href="/admin" className="hover:text-primary-green">Admin</Link></li>
            )}
            {user ? (
              <>
                <li>Olá, {user.name}</li>
                <li><button onClick={logout} className="hover:text-primary-green">Sair</button></li>
              </>
            ) : (
              <>
                <li><Link href="/login" className="hover:text-primary-green">Login</Link></li>
                <li><Link href="/register" className="hover:text-primary-green">Registro</Link></li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main className="container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-secondary-darkGray text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 ONG Amigos dos Animais. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  )
}
