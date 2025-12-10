"use client";
import { useState } from "react";
import { api } from "@/lib/api";

export default function LikeButtonClient({ postId, initialLikes }: { postId: number; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes ?? 0);
  const [loading, setLoading] = useState(false);

  async function handleLike() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await api.post(`/posts/${postId}/like`, { /* user_id: optional */ });
      setLikes(res.data.likes_count ?? res.data.likes_count ?? likes + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleLike} className="px-3 py-1 bg-blue-600 text-white rounded">
      {loading ? "..." : `Like (${likes})`}
    </button>
  );
}
