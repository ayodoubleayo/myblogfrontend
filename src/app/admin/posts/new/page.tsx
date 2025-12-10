// C:\Users\HomePC\myblogfrontend\src\app\admin\posts\new\page.tsx
"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function NewPostPage() {
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const [saving, setSaving] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setMediaFile(f);
    if (!f) {
      setPreviewUrl(null);
      setFileType(null);
      return;
    }
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
    if (f.type.startsWith("image/")) setFileType("image");
    else if (f.type.startsWith("video/")) setFileType("video");
  }

  async function uploadMedia() {
    if (!mediaFile) return null;
    const form = new FormData();
    form.append("image", mediaFile); // backend expects field name 'image'
    const res = await api.post("/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.url;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setSaving(true);
    try {
      const uploadedUrl = await uploadMedia();

      await api.post("/posts", {
        title: e.target.title.value,
        content: e.target.content.value,
        slug: e.target.slug.value,
        excerpt: e.target.excerpt.value || null,
        image_url: uploadedUrl || null,
        published: true,
      });

      alert("Post created!");
      // optional: clear form
      e.target.reset();
      setMediaFile(null);
      setPreviewUrl(null);
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.error || "Failed to create post");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <input name="title" placeholder="Title" className="border p-2 w-full" required />

      <textarea name="content" placeholder="Content (HTML or markdown)" className="border p-2 w-full" />

      <input name="slug" placeholder="Slug" className="border p-2 w-full" required />

      <input name="excerpt" placeholder="Excerpt (optional)" className="border p-2 w-full" />

      {/* Media Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Image or Video (optional)</label>
        <input type="file" accept="image/*,video/*" onChange={handleFile} />
        {previewUrl && fileType === "image" && (
          <img src={previewUrl} alt="preview" className="mt-2 w-64 h-40 object-cover rounded" />
        )}
        {previewUrl && fileType === "video" && (
          <video src={previewUrl} controls className="mt-2 w-64 h-40 rounded" />
        )}
      </div>

      <button className="px-4 py-2 bg-blue-600 text-white rounded" disabled={saving}>
        {saving ? "Saving..." : "Create Post"}
      </button>
    </form>
  );
}
