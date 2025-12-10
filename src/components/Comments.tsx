"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function Comments({ postId }: { postId: number }) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/comments", { params: { post_id: postId } });
      setComments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [postId]);

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!author || !body) return alert("fill both");
    try {
      const res = await api.post("/comments", { post_id: postId, author, body });
      setComments((s) => [...s, res.data]);
      setAuthor("");
      setBody("");
    } catch (err) {
      console.error(err);
      alert("Failed to post comment");
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Comments ({comments.length})</h3>
      {loading ? <div>Loading comments...</div> : (
        <div className="space-y-3 mb-4">
          {comments.map(c => (
            <div key={c.id} className="p-3 bg-white rounded shadow">
              <div className="text-sm text-gray-600">{c.author} • {new Date(c.created_at).toLocaleString()}</div>
              <div className="mt-1">{c.body}</div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={submitComment} className="space-y-2">
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" className="w-full border px-2 py-1 rounded" />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write a comment..." className="w-full border px-2 py-1 rounded" />
        <div className="flex gap-2">
          <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Post Comment</button>
          <button type="button" onClick={load} className="px-3 py-1 bg-gray-200 rounded">Refresh</button>
        </div>
      </form>
    </div>
  );
}
