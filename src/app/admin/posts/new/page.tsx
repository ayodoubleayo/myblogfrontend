"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function NewPostPage() {
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setMediaFile(f);

    if (!f) {
      setPreviewUrl(null);
      return;
    }

    // Only allow images (backend only supports images)
    if (!f.type.startsWith("image/")) {
      alert("Only images are allowed. Backend does not support videos.");
      return;
    }

    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
  }

  async function uploadMedia() {
    if (!mediaFile) return null;

    const form = new FormData();
    form.append("image", mediaFile); // backend expects 'image'

    const res = await api.post("/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.url; // full https:// URL already returned
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setSaving(true);

    try {
      const imageUrl = await uploadMedia();

      await api.post("/posts", {
        title: e.target.title.value,
        content: e.target.content.value,
        slug: e.target.slug.value,
        excerpt: e.target.excerpt.value || null,
        image_url: imageUrl || null,
        published: true,
      });

      alert("Post created!");
      e.target.reset();
      setMediaFile(null);
      setPreviewUrl(null);

    } catch (err: any) {
      console.error("Create post error:", err);
      alert(err?.response?.data?.error || "Failed to create post");
    }

    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <input
        name="title"
        placeholder="Title"
        className="border p-2 w-full"
        required
      />

      <textarea
        name="content"
        placeholder="Content (HTML or markdown)"
        className="border p-2 w-full"
      />

      <input
        name="slug"
        placeholder="Slug"
        className="border p-2 w-full"
        required
      />

      <input
        name="excerpt"
        placeholder="Excerpt (optional)"
        className="border p-2 w-full"
      />

      <div>
        <label className="block text-sm font-medium mb-1">
          Image (only)
        </label>
        <input type="file" accept="image/*" onChange={handleFile} />

        {previewUrl && (
          <img
            src={previewUrl}
            alt="preview"
            className="mt-2 w-64 h-40 object-cover rounded"
          />
        )}
      </div>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={saving}
      >
        {saving ? "Saving..." : "Create Post"}
      </button>
    </form>
  );
}
