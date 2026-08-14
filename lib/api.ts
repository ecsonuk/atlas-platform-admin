const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3000/api/v1";

interface ApiOptions extends RequestInit {
  token?: string;
}

export async function api<T>(
  endpoint: string,
  options?: ApiOptions,
): Promise<T> {

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",

        ...(options?.token
          ? {
              Authorization: `Bearer ${options.token}`,
            }
          : {}),

        ...(options?.headers ?? {}),
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ?? "Request failed",
    );
  }

  return data;
}
