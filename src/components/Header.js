import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Início
            </Link>
          </li>
          <li>
            <Link href="/adopt" className="hover:text-gray-300">
              Adotar
            </Link>
          </li>
          <li>
            <Link href="/volunteer" className="hover:text-gray-300">
              Voluntariado
            </Link>
          </li>
          <li>
            <Link href="/donate" className="hover:text-gray-300">
              Doar
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-300">
              Sobre Nós
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-300">
              Contato
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
