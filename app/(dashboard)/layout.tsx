"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    auth.logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen">

      <aside className="flex w-64 flex-col bg-slate-900 p-6 text-white">

        <div>
          <h2 className="text-2xl font-bold">
            Atlas CMS
          </h2>

          <nav className="mt-8 space-y-3">

            <a
              href="/dashboard"
              className="block hover:text-blue-300"
            >
              Dashboard
            </a>

            <a
              href="/articles"
              className="block hover:text-blue-300"
            >
              Articles
            </a>

            <a
              href="/categories"
              className="block hover:text-blue-300"
            >
              Categories
            </a>

            <a
              href="/offers"
              className="block hover:text-blue-300"
            >
              Offers
            </a>

            <a
              href="/merchants"
              className="block hover:text-blue-300"
            >
              Merchants
            </a>

            <a
              href="/media"
              className="block hover:text-blue-300"
            >
              Media
            </a>

            <a
              href="/settings"
              className="block hover:text-blue-300"
            >
              Settings
            </a>

          </nav>
        </div>

        <div className="mt-auto border-t border-slate-700 pt-6">

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg border border-slate-700 px-4 py-3 text-left font-semibold text-slate-200 transition hover:border-red-500 hover:bg-red-600 hover:text-white"
          >
            Logout
          </button>

        </div>

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
