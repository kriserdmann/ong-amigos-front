import Layout from './Layout';
import Link from 'next/link';

export default function AdminLayout({ children, currentPage }) {
  const adminPages = [
    { title: 'Dashboard', link: '/admin' },
    { title: 'Animais', link: '/admin/animais' },
    { title: 'Voluntários', link: '/admin/voluntarios' },
    { title: 'Doações', link: '/admin/doacoes' },
    { title: 'Eventos', link: '/admin/eventos' },
    { title: 'Usuários', link: '/admin/usuarios' },
  ];

  return (
    <Layout>
      <div className="flex">
        <aside className="w-64 bg-gray-100 min-h-screen p-4">
          <nav>
            <ul className="space-y-2">
              {adminPages.map((page) => (
                <li key={page.link}>
                  <Link
                    href={page.link}
                    className={`block p-2 rounded ${
                      currentPage === page.title.toLowerCase()
                        ? 'bg-primary-blue text-white'
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </Layout>
  );
}
