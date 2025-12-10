"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import BlogCard from "@/components/BlogCard";
import PostsShimmer from "@/components/PostsShimmer";

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["posts", page, search],
    queryFn: async () => {
      const res = await api.get("/posts", { params: { page, limit, search } });
      return res.data;
    },
    placeholderData: (prev) => prev,
  });

  const posts = data?.data ?? [];
  const meta = data?.meta ?? { total: 0, page: 1, limit };

  return (
    <div className="py-10">
      {/* Header + search */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Blog</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="w-full sm:w-64 border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Posts */}
      {isLoading ? (
        <PostsShimmer />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((p: any) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-10">
        <div className="text-gray-600">
          Page {meta.page} • {meta.total} posts
        </div>
        <div className="flex gap-2">
          <button
            disabled={meta.page <= 1}
            onClick={() => setPage(meta.page - 1)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={meta.page * meta.limit >= meta.total}
            onClick={() => setPage(meta.page + 1)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
