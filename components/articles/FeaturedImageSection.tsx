"use client";

interface Props {
  featuredImageUrl: string;
  generatingImage: boolean;

  onGenerateAI: () => void;
  onUpload: () => void;
  onOpenLibrary: () => void;
}

export default function FeaturedImageSection({
  featuredImageUrl,
  generatingImage,
  onGenerateAI,
  onUpload,
  onOpenLibrary,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6">

      <h2 className="mb-4 text-xl font-bold">
        Featured Image
      </h2>

      <div className="mb-4 flex flex-wrap gap-3">

        <button
          type="button"
          onClick={onGenerateAI}
          disabled={generatingImage}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-60"
        >
          {generatingImage
            ? "Generating..."
            : "🤖 Generate AI Image"}
        </button>

        <button
          type="button"
          onClick={onUpload}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          📤 Upload Image
        </button>

        <button
          type="button"
          onClick={onOpenLibrary}
          className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          🖼️ Media Library
        </button>

      </div>

      {featuredImageUrl && (
        <img
          src={`http://localhost:3000${featuredImageUrl}`}
          alt="Featured"
          className="mt-4 w-full rounded-lg border"
        />
      )}

    </div>
  );
}
