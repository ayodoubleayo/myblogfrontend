"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Link from "next/link";
import LikeButtonClient from "@/components/LikeButtonClient";

export default function ManagePosts() {
  const { data, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await api.get("/posts");
      return res.data; // returns { data: [...], meta: {...} }
    },
  });

  async function handleDelete(id: number) {
    if (!confirm("Delete this post?")) return;
    await api.delete(`/posts/${id}`);
    refetch();
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Manage Posts</h2>

        <Link
          href="/admin/posts/new"
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          New Post
        </Link>
      </div>

      <div className="space-y-4">
        {data?.data?.map((p: any) => (
          <div
            key={p.id}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <div className="font-medium text-lg">{p.title}</div>
              <div className="text-gray-500 text-sm">{p.slug}</div>

              <div className="text-xs text-gray-700">
                {p.views ?? 0} views • {p.likes_count ?? 0} likes
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <Link
                href={`/admin/posts/edit/${p.id}`}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(p.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>

              <LikeButtonClient
                postId={p.id}
                initialLikes={p.likes_count ?? 0}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
