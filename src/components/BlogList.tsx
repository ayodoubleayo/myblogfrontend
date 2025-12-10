"use client";

import { useQuery } from "@tanstack/react-query";
import BlogCard from "./BlogCard";
import { api } from "../lib/api";
import { useState } from "react";

export default function BlogList() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["posts", page],
    queryFn: async () => {
      const res = await api.get("/posts", { params: { page } });
      return res.data;
    },
  });

  const posts = data?.data ?? [];
  const meta = data?.meta ?? { page: 1, total: 0, limit: 10 };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((x) => (
          <div key={x} className="p-6 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post: any) => (
        <BlogCard key={post.id} post={post} />
      ))}

      {/* Pagination */}
      <div className="flex gap-4 mt-6">
        <button
          disabled={meta.page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40"
        >
          Previous
        </button>

        <button
          disabled={meta.page * meta.limit >= meta.total}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
