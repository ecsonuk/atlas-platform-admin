"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function ArticlesPage() {

const [articles, setArticles] = useState<any[]>([]);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [loading, setLoading] = useState(false);

useEffect(() => {
  loadArticles(page);
}, [page]);

async function loadArticles(currentPage: number) {
  try {
    setLoading(true);

    const response: any = await api(
      `/admin/articles?page=${currentPage}&limit=10`,
      {
        token: localStorage.getItem("token") || "",
      },
    );

    setArticles(response.data.items);
    setTotalPages(
      response.data.pagination?.totalPages ?? 1,
    );
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

async function deleteArticle(id: string) {

  const confirmed = window.confirm(
    "Are you sure you want to delete this article?",
  );

  if (!confirmed) {
    return;
  }

  try {
    await api(
      `/admin/articles/${id}`,
      {
        method: "DELETE",
        token:
          localStorage.getItem("token") || "",
      },
    );

    alert("Article deleted successfully.");
	loadArticles(page);
  } catch (err: any) {

    alert(
      err.message ??
      "Unable to delete article.",
    );
  }
}

  return (
    <div>
      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Articles
        </h1>

<Link
  href="/articles/new"
  className="rounded bg-slate-900 px-5 py-3 text-white"
>
  New Article
</Link>

      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">
                Title
              </th>

              <th className="text-left">
                Category
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Published
              </th>

	      <th className="text-left">
       	       Actions
       	     </th>

            </tr>

          </thead>

          <tbody>

            {articles.map((article) => (

              <tr
                key={article.id}
                className="border-b"
              >

                <td className="py-4">
                  {article.title}
                </td>

                <td>
                  {article.category?.name}
                </td>

                <td>
                  {article.status}
                </td>

<td>
  {article.publishedAt
    ? new Date(
        article.publishedAt,
      ).toLocaleString()
    : "-"}
</td>

<td>

  <Link
    href={`/articles/${article.id}/edit`}
    className="mr-3 rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
  >
    Edit
  </Link>

<button
  type="button"
  onClick={() =>
    deleteArticle(article.id)
  }
  className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
>
  Delete
</button>

</td>

              </tr>

            ))}

            {articles.length === 0 && (

              <tr>

                <td
                  colSpan={5}
                  className="py-6"
                >
                  No Articles Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

{totalPages > 1 && (
  <div className="mt-6 flex items-center justify-between border-t pt-4">

    <button
      type="button"
      onClick={() =>
        setPage((current) =>
          Math.max(current - 1, 1),
        )
      }
      disabled={page === 1 || loading}
      className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
    >
      ← Previous
    </button>

    <span className="text-sm text-slate-600">
      Page {page} of {totalPages}
    </span>

    <button
      type="button"
      onClick={() =>
        setPage((current) =>
          Math.min(current + 1, totalPages),
        )
      }
      disabled={
        page === totalPages || loading
      }
      className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Next →
    </button>

  </div>
)}

      </div>

    </div>

  );

}
