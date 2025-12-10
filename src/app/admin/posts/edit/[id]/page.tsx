// C:\Users\HomePC\myblogfrontend\src\app\admin\posts\edit\[id]\page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "../../../../../lib/api";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams(); // get id from URL
  const id = params.id;

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);

  // fetch post once
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/posts/${id}`);
        const p = res.data;
        setTitle(p.title);
        setSlug(p.slug);
        setExcerpt(p.excerpt || "");
        setContent(p.content || "");
        setCurrentImageUrl(p.image_url || null);
      } catch (err) {
        alert("Post not found");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  useEffect(() => {
    if (!mediaFile) return;
    const obj = URL.createObjectURL(mediaFile);
    setPreviewUrl(obj);
    if (mediaFile.type.startsWith("image/")) setFileType("image");
    else if (mediaFile.type.startsWith("video/")) setFileType("video");
    return () => URL.revokeObjectURL(obj);
  }, [mediaFile]);

  async function uploadMedia() {
    if (!mediaFile) return null;
    const form = new FormData();
    form.append("image", mediaFile);
    const res = await api.post("/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.url;
  }

  async function updatePost(e: React.FormEvent) {
    e.preventDefault();
    try {
      let uploadedUrl = null;
      if (mediaFile) {
        uploadedUrl = await uploadMedia();
      }

      await api.put(`/posts/${id}`, {
        title,
        slug,
        excerpt,
        content,
        image_url: uploadedUrl !== null ? uploadedUrl : currentImageUrl,
        published: true,
      });
      router.push("/admin/posts");
    } catch (err: any) {
      alert(err?.response?.data?.error || "Failed to update");
    }
  }

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <form onSubmit={updatePost} className="max-w-2xl bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Edit Post</h3>

      <label className="block mb-2">Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <label className="block mb-2">Slug</label>
      <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <label className="block mb-2">Excerpt</label>
      <input
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <label className="block mb-2">Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        className="w-full mb-3 p-2 border rounded"
      />

      <div>
        <label className="block mb-2">Replace Image / Video (optional)</label>
        <input type="file" accept="image/*,video/*" onChange={(e) => setMediaFile(e.target.files?.[0] ?? null)} />
        <div className="mt-2">
          {previewUrl ? (
            fileType === "image" ? (
              <img src={previewUrl} alt="preview" className="w-64 h-40 object-cover rounded" />
            ) : (
              <video src={previewUrl} controls className="w-64 h-40 rounded" />
            )
          ) : currentImageUrl ? (
            // show existing saved media if present
            (/\.(mp4|webm|ogg|mov)$/i.test(currentImageUrl) ? (
              <video src={currentImageUrl} controls className="w-64 h-40 rounded" />
            ) : (
              <img src={currentImageUrl} alt="current" className="w-64 h-40 object-cover rounded" />
            ))
          ) : null}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">
          Update Post
        </button>
      </div>
    </form>
  );
}
