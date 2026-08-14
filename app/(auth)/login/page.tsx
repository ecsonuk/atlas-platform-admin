"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function login(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response: any =
        await api(
          "/admin/auth/login",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
            }),
          },
        );

      localStorage.setItem(
        "token",
        response.data.accessToken,
      );

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <div className="hidden md:flex w-1/2 items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold">
            Atlas Magazine
          </h1>

          <p className="mt-6 text-gray-300">
            AI Powered Publishing Platform
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">

        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">

          <h2 className="mb-8 text-center text-3xl font-bold">
            Admin Login
          </h2>

          <form
            onSubmit={login}
            className="space-y-5"
          >

            <input
              className="w-full rounded border p-3"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              className="w-full rounded border p-3"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            {error && (
              <p className="text-red-600 text-sm">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full rounded bg-slate-900 p-3 text-white"
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}
