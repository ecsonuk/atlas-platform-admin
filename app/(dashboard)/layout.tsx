import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold">
          Atlas CMS
        </h2>

        <nav className="mt-8 space-y-3">

          <a href="/dashboard" className="block hover:text-blue-300">
            Dashboard
          </a>

          <a href="/articles" className="block hover:text-blue-300">
            Articles
          </a>

          <a href="/categories" className="block hover:text-blue-300">
            Categories
          </a>

          <a href="/offers" className="block hover:text-blue-300">
            Offers
          </a>

          <a href="/merchants" className="block hover:text-blue-300">
            Merchants
          </a>

          <a href="/media" className="block hover:text-blue-300">
            Media
          </a>

          <a href="/settings" className="block hover:text-blue-300">
            Settings
          </a>

        </nav>
      </aside>

      <main className="flex-1 bg-gray-100">
        <header className="border-b bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-semibold">
            Atlas Magazine CMS
          </h1>
        </header>

        <div className="p-8">
          {children}
        </div>

      </main>

    </div>
  );
}
