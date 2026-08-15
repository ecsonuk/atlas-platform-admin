"use client";
import TiptapEditor from "@/components/editor/TiptapEditor";
import { useEffect, useState, useRef,} from "react";
import { api } from "@/lib/api";
import MediaLibraryModal from "@/components/articles/MediaLibraryModal";

interface Category {
  id: string;
  name: string;
}

export default function NewArticlePage() {

const [categories, setCategories] =
  useState<Category[]>([]);

const [title, setTitle] =
  useState("");

const [slug, setSlug] =
  useState("");

const [excerpt, setExcerpt] =
  useState("");

const [content, setContent] =
  useState("");

const [categoryId, setCategoryId] =
  useState("");

const [tags, setTags] =
  useState("");

const [seoTitle, setSeoTitle] =
  useState("");

const [metaDescription, setMetaDescription] =
  useState("");

const [focusKeyword, setFocusKeyword] =
  useState("");

const [articleType, setArticleType] =
  useState("REVIEW");

const [status, setStatus] =
  useState("DRAFT");

const [featured, setFeatured] =
  useState(false);

const [publishDate, setPublishDate] =
  useState("");

const [aiTopic, setAiTopic] = useState("");

const [generating, setGenerating] = useState(false);

const [generatingImage, setGeneratingImage] =
  useState(false);

const [featuredImageUrl, setFeaturedImageUrl] =
  useState("");

const [mediaLibrary, setMediaLibrary] =
  useState<any[]>([]);

const [showMediaLibrary, setShowMediaLibrary] =
  useState(false);

const [featuredMediaId, setFeaturedMediaId] =
  useState("");

const fileInputRef =
  useRef<HTMLInputElement>(null);

const [imagePrompt, setImagePrompt] =
  useState("");

const [aiProvider, setAiProvider] =
  useState("OPENAI");

const [aiTone, setAiTone] =
  useState("PROFESSIONAL");

const [aiLength, setAiLength] =
  useState("MEDIUM");

const [contentType, setContentType] =
  useState("REVIEW");

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const response: any = await api("/admin/categories", {
        token: localStorage.getItem("token") || "",
      });

      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  }

useEffect(() => {
  setSlug(
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
  );
}, [title]);


async function generateWithAI() {
  if (!aiTopic.trim()) {
    alert("Please enter a topic.");
    return;
  }

  try {
    setGenerating(true);

    const response: any = await api("/ai/generate-article", {
      method: "POST",
      token: localStorage.getItem("token") || "",

body: JSON.stringify({
    provider: aiProvider,
    topic: aiTopic,
    type: contentType,
    tone: aiTone,
    length: aiLength,

}),

    });

    const article = response.data;

    setTitle(article.title ?? "");
    setExcerpt(article.excerpt ?? "");
    setContent(article.content ?? "");

setSlug(article.slug ?? "");

setTags(
  article.tags?.join(", ") ?? "",
);

setSeoTitle(
  article.seoTitle ?? "",
);

const matchedCategory =
  categories.find(
    (c) =>
      c.name.toLowerCase() ===
      (article.category ?? "").toLowerCase(),
  );

if (matchedCategory) {
  setCategoryId(matchedCategory.id);
}

setMetaDescription(
  article.metaDescription ?? "",
);

setFocusKeyword(
  article.focusKeyword ?? "",
);

setImagePrompt(
  article.imagePrompt ?? aiTopic,
);

  } catch (err: any) {
    alert(err.message);
  } finally {
    setGenerating(false);
  }
}

async function generateFeaturedImage() {

  if (!imagePrompt.trim()) {
    alert("Generate an article first.");
    return;
  }

  try {

    setGeneratingImage(true);

    const response: any =
      await api("/ai/generate-image", {

        method: "POST",

        token:
          localStorage.getItem("token") || "",

        body: JSON.stringify({
          prompt: imagePrompt,
        }),

      });

    setFeaturedImageUrl(
      response.data.imageUrl,
    );

    setFeaturedMediaId(
      response.data.mediaId,
    );

  } catch (err: any) {

    alert(err.message);

  } finally {

    setGeneratingImage(false);

  }

}


async function uploadFeaturedImage(
  event: React.ChangeEvent<HTMLInputElement>,
) {

  const file = event.target.files?.[0];

  if (!file) return;

  try {

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/media/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("token") || ""
          }`,
        },
        body: formData,
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    setFeaturedMediaId(
      result.data.id,
    );

setFeaturedImageUrl(
  "/" + result.data.filePath,
);

  } catch (err: any) {

    alert(err.message);

  }

}

async function openMediaLibrary() {
  try {

const response = await api<{ data: any[] }>(
  "/admin/media",
  {
    token:
      localStorage.getItem("token") || "",
  },
);

    setMediaLibrary(
      response.data,
    );

    setShowMediaLibrary(true);

  } catch (err: any) {

    alert(err.message);

  }
}

async function publishArticle(articleStatus = status) {
  try {
    await api("/admin/articles", {
      method: "POST",
      token: localStorage.getItem("token") || "",
body: JSON.stringify({
  title,
  slug,
  excerpt,
  content,

  categoryId,

  seoTitle,

  seoDescription: metaDescription,

  focusKeyword,

  tags: tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean),

  type: articleType,
  status: articleStatus,
  featured,
  featuredImageId: featuredMediaId,

publishedAt:
  articleStatus === "DRAFT"
    ? null
    : publishDate || new Date().toISOString(),

}),
    });

if (articleStatus === "DRAFT") {
  alert("Draft saved successfully!");
} else if (articleStatus === "SCHEDULED") {
  alert("Article scheduled successfully!");
} else {
  alert("Article published successfully!");
}

   window.location.href = "/articles";
  } catch (err: any) {
    alert(err.message);
  }
}

return (
  <>
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          Create New Article
        </h1>

<div className="mt-6 rounded-xl border bg-blue-50 p-6">

<h2 className="mb-4 text-xl font-bold">
  🤖 AI Content Generator
</h2>

<label className="mb-2 block font-semibold">
  AI Provider
</label>

<select
  value={aiProvider}
  onChange={(e) =>
    setAiProvider(e.target.value)
  }
  className="mb-4 w-full rounded-lg border p-3"
>
  <option value="OPENAI">
    OpenAI
  </option>

  <option value="GEMINI">
    Google Gemini
  </option>

  <option value="CLAUDE">
    Anthropic Claude
  </option>

  <option value="OLLAMA">
    Ollama (Local)
  </option>
</select>

<label className="mb-2 block font-semibold">
  Content Type
</label>

<select
  value={contentType}
  onChange={(e) =>
    setContentType(e.target.value)
  }
  className="mb-4 w-full rounded-lg border p-3"
>
  <option value="REVIEW">
    Review
  </option>

  <option value="BUYING_GUIDE">
    Buying Guide
  </option>

  <option value="NEWS">
    News
  </option>

  <option value="COMPARISON">
    Comparison
  </option>
</select>

<label className="mb-2 block font-semibold">
  Tone
</label>

<select
  value={aiTone}
  onChange={(e) =>
    setAiTone(e.target.value)
  }
  className="mb-4 w-full rounded-lg border p-3"
>
  <option value="PROFESSIONAL">
    Professional
  </option>

  <option value="FRIENDLY">
    Friendly
  </option>

  <option value="CASUAL">
    Casual
  </option>
</select>

<label className="mb-2 block font-semibold">
  Length
</label>

<select
  value={aiLength}
  onChange={(e) =>
    setAiLength(e.target.value)
  }
  className="mb-4 w-full rounded-lg border p-3"
>
  <option value="SHORT">
    Short
  </option>

  <option value="MEDIUM">
    Medium
  </option>

  <option value="LONG">
    Long
  </option>
</select>

<label className="mb-2 block font-semibold">
  Topic
</label>

<input
  type="text"
  value={aiTopic}
  onChange={(e) =>
    setAiTopic(e.target.value)
  }
  placeholder="Example: Best Gaming Laptop 2027"
  className="w-full rounded-lg border p-3"
/>

<button
  onClick={generateWithAI}
  disabled={generating}
  className="mt-5 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
>
  {generating
    ? "Generating..."
    : "Generate with AI"}
</button>

<div className="mt-8 rounded-xl border bg-white p-6">

  <h3 className="mb-4 text-lg font-semibold">
    🖼 Featured Image
  </h3>

<input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  hidden
  onChange={uploadFeaturedImage}
/>

<button
  type="button"
  onClick={() => fileInputRef.current?.click()}
  className="mb-3 mr-3 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
>
  Upload Image
</button>

<button
  type="button"
  onClick={openMediaLibrary}
  className="mb-3 mr-3 rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
>
  Choose From Media Library
</button>

  <button
    type="button"
    onClick={generateFeaturedImage}
    disabled={generatingImage}
    className="rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700 disabled:opacity-50"
  >
    {generatingImage
      ? "Generating Image..."
      : "Generate AI Image"}
  </button>

  {featuredImageUrl && (

    <div className="mt-6">

      <img
        src={`http://localhost:3000${featuredImageUrl}`}
        alt="AI Generated"
        className="w-full rounded-lg border shadow"
      />

      <p className="mt-3 text-sm text-gray-500">
        AI Generated Featured Image
      </p>

    </div>

  )}

</div>

</div>

        <div className="space-x-3">

<button
  onClick={() => publishArticle("DRAFT")}
  className="rounded border px-5 py-2"
>
  Save Draft
</button>

<button
  onClick={() => publishArticle("SCHEDULED")}
  className="rounded bg-amber-500 px-5 py-2 text-white"
>
  Schedule
</button>

<button
  onClick={() => publishArticle("PUBLISHED")}
  className="rounded bg-slate-900 px-5 py-2 text-white"
>
  Publish
</button>

        </div>

      </div>

      <div className="rounded-xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-semibold">
          Article Information
        </h2>

        <div className="space-y-6">

          <div>
            <label className="mb-2 block font-medium">
              Title
            </label>
<input
  className="w-full rounded border p-3"
  placeholder="Enter article title"
  value={title}
  onChange={(e) =>
    setTitle(e.target.value)
  }
/>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Slug
            </label>
<input
  className="w-full rounded border bg-gray-100 p-3"
  value={slug}
  onChange={(e) =>
    setSlug(e.target.value)
  }
/>
          </div>

<div>
  <label className="mb-2 block font-medium">
    Excerpt
  </label>

  <textarea
    rows={4}
    className="w-full rounded border p-3"
    placeholder="Short summary shown in listings..."
    value={excerpt}
    onChange={(e) => setExcerpt(e.target.value)}
  />
</div>

<div>
  <label className="mb-2 block font-medium">
    Article Content
  </label>

  <TiptapEditor
    value={content}
    onChange={setContent}
  />
</div>

</div>      {/* closes space-y-6 */}
</div>      {/* closes Article Information card */}

<div className="rounded-xl bg-white p-8 shadow">
  <h2 className="mb-6 text-2xl font-semibold">
    SEO
  </h2>

  <div className="space-y-6">

    <div>
      <label className="mb-2 block font-medium">
        SEO Title
      </label>

      <input
        className="w-full rounded border p-3"
        value={seoTitle}
        onChange={(e) =>
          setSeoTitle(e.target.value)
        }
      />
    </div>

    <div>
      <label className="mb-2 block font-medium">
        Meta Description
      </label>

      <textarea
        rows={4}
        className="w-full rounded border p-3"
        value={metaDescription}
        onChange={(e) =>
          setMetaDescription(e.target.value)
        }
      />
    </div>

    <div>
      <label className="mb-2 block font-medium">
        Focus Keyword
      </label>

      <input
        className="w-full rounded border p-3"
        value={focusKeyword}
        onChange={(e) =>
          setFocusKeyword(e.target.value)
        }
      />
    </div>
  </div>
</div>

      <div className="rounded-xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-semibold">
          Publishing Settings
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="mb-2 block font-medium">
              Category
            </label>
<select
  className="w-full rounded border p-3"
  value={categoryId}
  onChange={(e) => {
    setCategoryId(e.target.value);
  }}
>

<option value="">
  Select Category
</option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}

            </select>

          </div>

<div>
  <label className="mb-2 block font-medium">
    Tags
  </label>

  <input
    type="text"
    className="w-full rounded border p-3"
    placeholder="AI, Laptop, Gaming"
    value={tags}
    onChange={(e) => setTags(e.target.value)}
  />
</div>

          <div>

            <label className="mb-2 block font-medium">
              Article Type
            </label>

<select
  className="w-full rounded border p-3"
  value={articleType}
  onChange={(e) => setArticleType(e.target.value)}
>
  <option value="REVIEW">Review</option>
  <option value="BUYING_GUIDE">Buying Guide</option>
  <option value="COMPARISON">Comparison</option>
  <option value="NEWS">News</option>
</select>

          </div>

          <div>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Publish Date
            </label>

<input
  type="datetime-local"
  className="w-full rounded border p-3"
  value={publishDate}
  onChange={(e) => setPublishDate(e.target.value)}
/>

          </div>

        </div>

        <div className="mt-6 flex items-center gap-3">

<input
  id="featured"
  type="checkbox"
  checked={featured}
  onChange={(e) => setFeatured(e.target.checked)}
/>

          <label htmlFor="featured">
            Featured Article
          </label>

        </div>

      </div>

    </div>

<MediaLibraryModal
  open={showMediaLibrary}
  mediaLibrary={mediaLibrary}
  onClose={() => setShowMediaLibrary(false)}
  onSelect={(media) => {
    setFeaturedMediaId(media.id);

    setFeaturedImageUrl(
      "/" + media.filePath,
    );

    setShowMediaLibrary(false);
  }}
/>

    </>
  );
}
